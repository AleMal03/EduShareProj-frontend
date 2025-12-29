import './style/App.css'
import {useEffect, useState} from "react"

import Header from "./Header"
import Footer from "./Footer"
import Home from "./pages/Home"
import GestioneProfilo from "./pages/GestioneProfilo.tsx"
import MieiCorsi from "./pages/MieiCorsi.tsx"
import CorsiComprati from "./pages/CorsiComprati.tsx"
import type {User} from "./data/data-model.ts";
import {queryGet, queryPost} from "./data/queries.ts";

export type ContentNavItem = "home" | "miei corsi" | "corsi comprati" | "gestione profilo";

export const hostName = "http://localhost:7777";

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
					} else {
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
				setCurrentPage("home");
			});

		return () => {
			valid = false;
		};
	}

	useEffect(checkConnection, [currentPage]);

	return (
    <>
      <Header currentUser={currentUser} onLogin={handleLogin} onLogout={handleLogout} onNav={handleChangeContentNavItem}
	  		error={[errorMsg, setErrorMsg]}/>
      
      <section className="main">
            {currentPage === "home" && <Home hostName={hostName} currentUser={currentUser}/>}
            {currentPage === "gestione profilo" &&
				<GestioneProfilo currentUser={currentUser} hostName={hostName} onUpdateUser={checkConnection}/>}
            {currentPage === "miei corsi" && <MieiCorsi hostName={hostName} currentUser = {currentUser} />}
            {currentPage === "corsi comprati" && <CorsiComprati currentUser = {currentUser} />}
      </section>

      <Footer />
    </>
  )
}


export default App