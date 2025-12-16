import {useState} from "react";
import type { ReactElement } from "react";

import type {ContentNavItem} from "./../App";
import type {User} from "../data/data-model.ts";

interface ContentNavProps{
   	currentUser:User|null;
    onNav: (c : ContentNavItem) => void;
}

export default function ContentNav({currentUser, onNav} : ContentNavProps): ReactElement {
    // utilizzata per modificare il menu dinamicamente tramite l'effetto Hover
    const [isHoverItem, setIsHoverItem] = useState<boolean>(false);

    return (
    // onMouseLeave() su nav serve a "nascondere"(state isHoverItem) se il mouse non "punta" più sul menù
    <nav className="content-nav" onMouseLeave={() => setIsHoverItem(false)}>

        {/*Se con il mouse "punto" alla prima voce Menu, si aprirà tutto il menu a tendina*/}
        <div className="level-1"
             onClick={() => {setIsHoverItem(!isHoverItem)}}
             onMouseEnter={() => setIsHoverItem(true)} >

            <span className="dropdown-text">Menu</span>
            <span className={isHoverItem ? "dropdown expanded" : "dropdown"}>
                 <img alt="dropdown" src="/images/down-arrow.png"/>
            </span>
        </div>


        {/* Mostriamo l'intero contenitore solo se isHoverItem è true */}

		{isHoverItem && <SubMenu currentUser={currentUser} onNav={onNav}/>}

    </nav>
    );
}

interface SubMenuProps{
	currentUser:User|null;
	onNav: (c:ContentNavItem) => void;
}

function SubMenu({currentUser, onNav}:SubMenuProps){
	return <div className="submenu-container">

		<div className="level-2" onClick={ () => {onNav("home");}}>Home</div>
		{currentUser && (<>
			<div className="level-2" onClick={ () => {onNav("miei corsi");}}>Miei Corsi</div>
			<div className="level-2" onClick={ () => {onNav("mie lezioni");}}>Mie Lezioni</div>
			<div className="level-2" onClick={ () => {onNav("corsi comprati");}}>Corsi Comprati</div>
			<div className="level-2" onClick={ () => {onNav("lezioni comprate");}}>Lezioni Comprate</div>
		</>)}

	</div>
}