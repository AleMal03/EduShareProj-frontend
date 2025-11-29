import './App.css'
import {useState} from "react"

import {Header} from "./Header"
import {Footer} from "./Footer"
import {Home} from "./pages/Home"
import {Gestione_Profilo} from "./pages/Gestione_Profilo"
import {Miei_Corsi} from "./pages/Miei_Corsi"
import {Corsi_Comprati} from "./pages/Corsi_Comprati"
import {Mie_Lezioni} from "./pages/Mie_Lezioni"
import {Lezioni_Comprate} from "./pages/Lezioni_Comprate"

export type ContentNavItem = "home" | "miei corsi" | "corsi comprati" | "mie lezioni" | "lezioni comprate" | "gestione profilo";

function App() {
  const currentUser = "Simone";
  const [currentPage, setCurrentPage] = useState<ContentNavItem>("home");

  const handleChangeContentNavItem = (c : ContentNavItem) => {
      setCurrentPage(() => c);
  }

  return (
    <>
      <Header user={currentUser} onNav={handleChangeContentNavItem} />

      <section className="main">
            {currentPage === "home" && <Home />}
            {currentPage === "gestione profilo" && <Gestione_Profilo />}
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