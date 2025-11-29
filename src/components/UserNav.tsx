import {useState} from "react";
import type { ReactElement } from "react";

import type { ContentNavItem } from "./../App";

interface UserNavProps{
    user : string;
    onNav: (c : ContentNavItem) => void;
}

function UserNav({user, onNav} : UserNavProps): ReactElement {
    // utilizzata per modificare il menu dinamicamente tramite l'effetto Hover
    const [isHoverItem, setIsHoverItem] = useState<boolean>(false);
    
    return (
    
    // onMouseLeave() su nav serve a "nascondere"(state isHoverItem) se il mouse
    // non "punta" più sul menù
    <nav className="user-nav" onMouseLeave={() => setIsHoverItem(false)}>

        <div className="nav-item level-1"
            onClick={() => {isHoverItem ? setIsHoverItem(false) : setIsHoverItem(true)}}
            onMouseEnter={() => setIsHoverItem(true)} >{user}</div>

        {/* Mostriamo l'intero contenitore solo se isHoverItem è true */}
        <div className={`submenu-container ${isHoverItem ? "" : "hide"}`}>    

            <div className="level-2" onClick={ () => {
                    onNav("gestione profilo");          // prima funzione
                    setIsHoverItem(false);  // seconda funzione
                }} >Gestione Profilo</div>

            <div className="level-2" onClick={() => setIsHoverItem(false)}>Esci</div>    
                
        </div>

    </nav>
    );
}

export default UserNav;
