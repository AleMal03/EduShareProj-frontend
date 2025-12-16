import {useState} from "react";
import type { ReactElement } from "react";

import type { ContentNavItem } from "./../App";
import type {User} from "../data/data-model.ts";

interface UserNavProps{
    currentUser : User|null;
	onLogin: (s:string) => void;
	onLogout: () => void;
    onNav: (c : ContentNavItem) => void;
}

function UserNav({currentUser, onLogin, onLogout, onNav} : UserNavProps): ReactElement {
    // utilizzata per modificare il menu dinamicamente tramite l'effetto Hover
    const [isHoverItem, setIsHoverItem] = useState<boolean>(false);
    
    return (
    
    // onMouseLeave() su nav serve a "nascondere"(state isHoverItem) se il mouse
    // non "punta" più sul menù
    <nav className="user-nav" onMouseLeave={() => setIsHoverItem(false)}>

		<GenerateUserNav currentUser={currentUser} onLogout={onLogout} onLogin={onLogin} onNav={onNav} isHover={isHoverItem} onHover={setIsHoverItem}/>

    </nav>
    );
}

interface GenerationProps{
	currentUser:User|null;
	onLogin: (s:string) => void;
	onLogout: () => void;
	onNav: (c : ContentNavItem) => void;
	isHover: boolean;
	onHover:  (b:boolean) => void;
}

function GenerateUserNav({currentUser, onLogin, onLogout, onNav, isHover, onHover}:GenerationProps):ReactElement{
	const [isActiveFormLogin, setIsActiveFormLogin] = useState<boolean>(false);
	let nav:ReactElement;

	if(currentUser != null){
		nav =<>
			<div className="level-1" onClick={() => {(onHover(!isHover))}}
				 onMouseEnter={() => onHover(true)} >{currentUser.username}</div>

			{/* Mostriamo l'intero contenitore solo se isHoverItem è true*/}
			{isHover &&
				<div className="submenu-container">
					<div className="level-2" onClick={ () => {
						onNav("gestione profilo");	// prima funzione
						onHover(false);  // seconda funzione
					}} >Gestione Profilo</div>

					<div className="level-2" onClick={() => {
						onLogout();
						onHover(false);
					}}>Esci</div>

				</div>
			}
		</>;
	}
	else{

		function handleLogin(username:string){
			onLogin(username);
			setIsActiveFormLogin(false);
		}

		nav = <>
			<div className="level-1" onClick={() => setIsActiveFormLogin(true)}>Login</div>

			{isActiveFormLogin && <LoginForm onCancel={() => setIsActiveFormLogin(false)}
											 onConfirm={(name) => handleLogin(name)}/>}
		</>;
	}

	return nav;
}

interface LoginFormProps{
	onCancel: () => void;
	onConfirm: (u:string) => void;
}

function LoginForm({onCancel, onConfirm}: LoginFormProps): ReactElement {
	const [usr, setUsr] = useState("");

	return (
		<div className = {"glasspane"} onClick = {(e) => {
			if(e.target === e.currentTarget) onCancel()
		}}>
			<form className="create-collection-request">

				<h1>Inserire username:</h1>
				<div>
					<input type="text" placeholder={"username "} name="username" value={usr} onChange={(e) => {
						setUsr(e.currentTarget.value);
					}}/>
				</div>
				<div className="actions">
					<div className="form-action cancel" onClick = {() => onCancel()}>Annulla</div>
					<div className="form-action ok" onClick={() => onConfirm(usr)}>Accedi</div>
				</div>
			</form>
		</div>
	);
}

export default UserNav;
