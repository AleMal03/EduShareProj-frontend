import {useState} from "react";
import type { ReactElement } from "react";

import type { ContentNavItem } from "./../App";

interface ContentNavProps{
    user : string;
    onNav: (c : ContentNavItem) => void;
}

function ContentNav({user, onNav} : ContentNavProps): ReactElement {
    // utilizzata per modificare il menu dinamicamente tramite l'effetto Hover
    const [isHoverItem, setIsHoverItem] = useState<boolean>(false);

    return (
    
    // onMouseLeave() su nav serve a "nascondere"(state isHoverItem) se il mouse
    // non "punta" più sul menù
    <nav className="content-nav" onMouseLeave={() => setIsHoverItem(false)}>

        {/*Se con il mouse "punto" alla prima voce Menu, si aprirà tutto il menu a tendina*/}
        <div className="level-1"
             onClick={() => {isHoverItem ? setIsHoverItem(false) : setIsHoverItem(true)}}
             onMouseEnter={() => setIsHoverItem(true)} >

            <span className="dropdown-text">Menu</span>
            <span className={isHoverItem ? "dropdown expanded" : "dropdown"}>
                 <img
                    alt="dropdown"
                    src="/images/down-arrow.png"/>
            </span>
        </div>

        
        {/* Mostriamo l'intero contenitore solo se isHoverItem è true */}
        <div className={`submenu-container ${isHoverItem ? "" : "hide"}`}>
                
            <div className="level-2" onClick={ () => {
                    onNav("home");          // prima funzione
                    setIsHoverItem(false);  // seconda funzione
                }} >Home</div>

            <div className="level-2" onClick={ () => {
                    onNav("miei corsi");          // prima funzione
                    setIsHoverItem(false);  // seconda funzione
                }} >Miei Corsi</div>

            <div className="level-2" onClick={ () => {
                    onNav("corsi comprati");          // prima funzione
                    setIsHoverItem(false);  // seconda funzione
                }} >Corsi Comprati</div>

            <div className="level-2" onClick={ () => {
                    onNav("mie lezioni");          // prima funzione
                    setIsHoverItem(false);  // seconda funzione
                }} >Mie Lezioni</div>

            <div className="level-2" onClick={ () => {
                    onNav("lezioni comprate");          // prima funzione
                    setIsHoverItem(false);  // seconda funzione
                }} >Lezioni Comprate</div>

        </div>

    </nav>
    );
}

export default ContentNav;