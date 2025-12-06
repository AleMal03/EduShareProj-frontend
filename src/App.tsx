import './App.css'
import {useState} from "react"

import Header from "./Header"
import Footer from "./Footer"
import Home from "./pages/Home"
import GestioneProfilo from "./pages/GestioneProfilo.tsx"
import Miei_Corsi from "./pages/MieiCorsi.tsx"
import Corsi_Comprati from "./pages/CorsiComprati.tsx"
import Mie_Lezioni from "./pages/MieLezioni.tsx"
import Lezioni_Comprate from "./pages/LezioniComprate.tsx"

import type {User} from "./data/data-model.ts";

export type ContentNavItem = "home" | "miei corsi" | "corsi comprati" | "mie lezioni" | "lezioni comprate" | "gestione profilo";

function App() {
  const [currentUser, setCurrentUser] = useState<User|null>(null);
  const [currentPage, setCurrentPage] = useState<ContentNavItem>("home");

  const handleChangeContentNavItem = (c : ContentNavItem) => {
      setCurrentPage(() => c);
  }

  function handleLogin(username:string){
	  setCurrentUser({username});	// Provvisorio
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
            {currentPage === "miei corsi" && <Miei_Corsi />}
            {currentPage === "corsi comprati" && <Corsi_Comprati />}
            {currentPage === "mie lezioni" && <Mie_Lezioni />}
            {currentPage === "lezioni comprate" && <Lezioni_Comprate />}
      </section>

      <Footer />
    </>
  )
}


export default App