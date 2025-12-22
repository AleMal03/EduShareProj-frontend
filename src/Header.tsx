import type {ReactElement} from "react";

import ContentNav from "./components/ContentNav"
import UserNav from "./components/UserNav"

import type { ContentNavItem } from "./App";
import type {User} from "./data/data-model.ts";

interface HeaderProps{
    currentUser : User|null;
	onLogin: (u:string, p:string) => Promise<boolean>;
	onLogout: () => void;
    onNav: (c : ContentNavItem) => void;
	error:[m:string, f:(s:string)=>void];
}

export default function Header({currentUser, onLogin, onLogout, onNav, error} : HeaderProps) : ReactElement{

    return (
    <header>
        <div className="left-section">
            <div className="logo" onClick = {() => onNav("home")}>
                <img src="/images/logo.jpeg" alt="logo"/>
            </div>
            
            <ContentNav currentUser={currentUser} onNav={onNav}/>
        </div>

        <div className="right-section">
            <UserNav currentUser={currentUser} onLogout={onLogout} onLogin={onLogin} onNav={onNav} error={error}/>
        </div>
    </header>
    );
}
