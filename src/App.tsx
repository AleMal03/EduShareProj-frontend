import './App.css'
import {useState} from "react"

import Header from "./Header"
import Footer from "./Footer"
import Home from "./pages/Home"
import GestioneProfilo from "./pages/GestioneProfilo.tsx"
import MieiCorsi from "./pages/MieiCorsi.tsx"
import CorsiComprati from "./pages/CorsiComprati.tsx"
import MieLezioni from "./pages/MieLezioni.tsx"
import LezioniComprate from "./pages/LezioniComprate.tsx"

import type {User} from "./data/data-model.ts";
import {user_mgr} from "./data/data.ts"

export type ContentNavItem = "home" | "miei corsi" | "corsi comprati" | "mie lezioni" | "lezioni comprate" | "gestione profilo";

function App() {
  const [currentUser, setCurrentUser] = useState<User|null>(null);
  const [currentPage, setCurrentPage] = useState<ContentNavItem>("home");

  const handleChangeContentNavItem = (c : ContentNavItem) => {
      setCurrentPage(() => c);
  }

  function handleLogin(username:string){
	  setCurrentUser(user_mgr.getUserByUsername(username));	// Provvisorio
	  // setCurrentUser(/*Query login utente by username*/);
  }

  function handleLogout(){
	  setCurrentUser(null);
	  setCurrentPage("home");
  }

  return (
    <>
      <Header currentUser={currentUser} onLogin={handleLogin} onLogout={handleLogout} onNav={handleChangeContentNavItem} />
      
      <section className="main">
            {currentPage === "home" && <Home />}
            {currentPage === "gestione profilo" && <GestioneProfilo currentUser={currentUser}/>}
            {currentPage === "miei corsi" && <MieiCorsi />}
            {currentPage === "corsi comprati" && <CorsiComprati />}
            {currentPage === "mie lezioni" && <MieLezioni />}
            {currentPage === "lezioni comprate" && <LezioniComprate />}
      </section>

      <Footer />
    </>
  )
}


export default App