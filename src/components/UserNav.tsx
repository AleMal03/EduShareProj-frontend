import {useState} from "react";
import type { ReactElement } from "react";

import type { ContentNavItem } from "./../App";
import type {User} from "../data/data-model.ts";

interface UserNavProps{
    currentUser : User|null;
	onLogin: (u:string, p:string) => Promise<boolean>;
	onLogout: () => void;
    onNav: (c : ContentNavItem) => void;
	error : [m:string, f:(s:string)=>void];
}

function UserNav({currentUser, onLogin, onLogout, onNav, error} : UserNavProps): ReactElement {
    // utilizzata per modificare il menu dinamicamente tramite l'effetto Hover
    const [isHoverItem, setIsHoverItem] = useState<boolean>(false);
    
    return (
    // onMouseLeave() su nav serve a "nascondere"(state isHoverItem) se il mouse non "punta" più sul menù
		<nav className="user-nav" onMouseLeave={() => setIsHoverItem(false)}>

			<GenerateUserNav currentUser={currentUser} onLogout={onLogout} onLogin={onLogin} onNav={onNav}
							 isHover={isHoverItem} onHover={setIsHoverItem} error={error}/>

		</nav>
    );
}

interface GenerationProps{
	currentUser:User|null;
	onLogin: (u:string, p:string) => Promise<boolean>;
	onLogout: () => void;
	onNav: (c : ContentNavItem) => void;
	isHover: boolean;
	onHover:  (b:boolean) => void;
	error:[m:string, f:(s:string)=>void];
}

function GenerateUserNav({currentUser, onLogin, onLogout, onNav, isHover, onHover, error:[errorMsg, setErrorMsg]}:GenerationProps):ReactElement{
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

		async function handleLogin(username:string, password:string){
			const logged:boolean = await onLogin(username, password);
			if(logged)
				setIsActiveFormLogin(false);
		}

		nav = <>
			<div className="level-1" onClick={() => setIsActiveFormLogin(true)}>Login</div>

			{isActiveFormLogin && <LoginForm onCancel={() => {
												setIsActiveFormLogin(false);
												setErrorMsg("");
											}}
											 onConfirm={(name, password) => handleLogin(name, password)}
											 errorMsg={errorMsg}/>}
		</>;
	}

	return nav;
}

interface LoginFormProps{
	onCancel: () => void;
	onConfirm: (u:string, p:string) => void;
	errorMsg: string;
}

function LoginForm({onCancel, onConfirm, errorMsg}: LoginFormProps): ReactElement {
	const [usr, setUsr] = useState("");
	const [psw, setPsw] = useState("");

	return (
		<div className = "glasspane" onMouseDown = {(e) => {
			if(e.target === e.currentTarget) onCancel();
		}}>
			<form className="create-collection-request">

				<h1>Inserire dati di accesso:</h1>
				<div>
					<input type="text" placeholder={"Username "} name="username" value={usr} onChange={(e) => {
						setUsr(e.currentTarget.value);
					}}/>
					<input type="text" placeholder={"Password "} name="password" value={psw} onChange={(e) => {
						setPsw(e.currentTarget.value);
					}}/>
				</div>

				{/* Buttons */}
				<div className="actions">
					<div className="form-action cancel" onClick = {() => onCancel()}>Annulla</div>
					<div className="form-action ok" onClick={() => onConfirm(usr, psw)}>Accedi</div>
				</div>

				{/* Per visualizzare il messaggio di errore*/}
				{errorMsg != "" && <div className="errorMessage"> <p>{errorMsg}</p> </div>}
			</form>
		</div>
	);
}

export default UserNav;
