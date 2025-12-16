import type {ReactElement} from "react";

import ContentNav from "./components/ContentNav"
import UserNav from "./components/UserNav"

import type { ContentNavItem } from "./App";

interface HeaderProps{
    user : string;
    onNav: (c : ContentNavItem) => void;
}

export function Header({user, onNav} : HeaderProps) : ReactElement{

    return (
    <header>
        <div className="left-section">
            <div className="logo" onClick = {() => onNav("home")}>
                <img src="/images/logo.jpeg"
                    alt="logo"/>
            </div>
            
            <ContentNav user={user} onNav={onNav}/>
        </div>

        <div className="right-section">
            <UserNav user={user} onNav={onNav}/>
        </div>
    </header>
    );
}
