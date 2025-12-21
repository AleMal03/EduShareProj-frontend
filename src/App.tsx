import './App.css'
import {useEffect, useState} from "react"

import Header from "./Header"
import Footer from "./Footer"
import Home from "./pages/Home"
import GestioneProfilo from "./pages/GestioneProfilo.tsx"
import MieiCorsi from "./pages/MieiCorsi.tsx"
import CorsiComprati from "./pages/CorsiComprati.tsx"
import MieLezioni from "./pages/MieLezioni.tsx"
import LezioniComprate from "./pages/LezioniComprate.tsx"
import type {User} from "./data/data-model.ts";
import {queryGet, queryPost} from "./data/queries.ts";

export type ContentNavItem = "home" | "miei corsi" | "corsi comprati" | "mie lezioni" | "lezioni comprate" | "gestione profilo";

const hostName = "http://localhost:7777";

export interface SessionData {
	user: User,
	message: string
}

function App() {
	const [currentUser, setCurrentUser] = useState<User|null>(null);
	const [currentPage, setCurrentPage] = useState<ContentNavItem>("home");
	const [errorMsg, setErrorMsg] = useState("");

	const handleChangeContentNavItem = (c : ContentNavItem) => {
	  setCurrentPage(() => c);
	}

	async function handleLogin(username:string, password:string):Promise<boolean>{
		setErrorMsg("");

		return queryPost<SessionData>(`${hostName}/session/login`, {username, password})
		  .then((s:SessionData)=> {
			  console.log(s.user);
			  console.log(s.message);
			  setCurrentUser(s.user);
			  return true;
		  })
		  .catch((err:Error) => {
			  console.log(err.message);
			  setErrorMsg(err.message);
			  return false;
		  });
	}

	function handleLogout(){
		queryGet<SessionData>(`${hostName}/session/logout`)
			.then((s:SessionData) =>{
			  console.log(s.message)
			  setCurrentUser(null);
			  setCurrentPage("home");
		  	})
			.catch((err:Error) => {
				console.log(err.message);
				alert("Errore logout: " + err.message);
			});
	}

	function checkConnection() {
		let valid = true;
		queryGet<SessionData>(`${hostName}/session/get`)
			.then((s:SessionData) => {
				if (valid) {
					if (s.user != null) {
						// User loggato
						console.log(s.user)
						console.log(s.message)
						setCurrentUser(s.user);
					}
					else {
						// Nessuno user loggato
						console.log(s.user)
						console.log(s.message)
						setCurrentUser(null);
						setCurrentPage("home");
					}
				}
			})
			.catch((err:Error) => {
				console.log(err.message);
				alert("Errore sessione: " + err.message);
			});

		return () => {
			valid = false;
		};
	}

	useEffect(() => {	//Verifica la connessione della sessione ogni volta che la pagina viene ricaricata o focussata
		checkConnection(); // Controllo iniziale

		const onFocus = () => {
			checkConnection(); // Ricontrolla sessione quando clicco sulla tab
		};

		window.addEventListener('focus', onFocus);

		return () => { window.removeEventListener('focus', onFocus); };
	}, []);


	return (
    <>
      <Header currentUser={currentUser} onLogin={handleLogin} onLogout={handleLogout} onNav={handleChangeContentNavItem}
	  		error={[errorMsg, setErrorMsg]}/>
      
      <section className="main">
            {currentPage === "home" && <Home />}
            {currentPage === "gestione profilo" && <GestioneProfilo currentUser={currentUser} hostName={hostName}/>}
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