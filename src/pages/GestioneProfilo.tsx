import { ModificaDatiForm } from "../components/ModificaDatiForm";
import type {User} from "./../data/data-model"
import {useState} from "react"

interface GestioneProfiloProps {
	currentUser: User | null;
}

export default function GestioneProfilo({currentUser}:GestioneProfiloProps){
    const [isActiveFormEta, setIsActiveFormEta] = useState<boolean>(false);
    const [isActiveFormEmail, setIsActiveFormEmail] = useState<boolean>(false);
    const [isActiveFormLParlate, setIsActiveFormLParlate] = useState<boolean>(false);

	function handleModificaDati(setIsActiveform:(b:boolean)=>void, dato:string){
		setIsActiveform(false);

		//Query cambio dato
		console.log(dato);
	}

    return (
        <>
            <h1>PAGINA Gestione Profilo</h1>
             
            <h3>Nome: {currentUser?.name}</h3>
            <h3>Cognome: {currentUser?.surname}</h3>
            <h3>Username: {currentUser?.username}</h3>
            <div>
                <h3>Età: {currentUser?.age}</h3>
                <button onClick = {() => setIsActiveFormEta(true)}>Modifica Eta</button>
            </div>
            <div>
                <h3>Email: {currentUser?.email}</h3>
                <button onClick = {() => setIsActiveFormEmail(true)}>Modifica Email</button>
            </div>
            <h3>Nazionalità: {currentUser?.nationality}</h3>
            <div>
                <h3>Lingue parlate: {currentUser?.spoken_languages?.join(" | ")}</h3>
                <button onClick = {() => setIsActiveFormLParlate(true)}>Modifica Lingue Parlate</button>
            </div>
            <div>
                <h3>Credito Residuo: 0 €</h3>
                <button>Ricarica Credito</button>
            </div>
            
            {isActiveFormEta && <ModificaDatiForm onCancel={() => setIsActiveFormEta(false)} onConfirm={(dato) => handleModificaDati(setIsActiveFormEta, dato)} field="Eta" value_field={currentUser?.age + ""} />}
            {isActiveFormEmail && <ModificaDatiForm onCancel={() => setIsActiveFormEmail(false)} onConfirm={(dato) => handleModificaDati(setIsActiveFormEmail, dato)} field="Email" value_field={currentUser?.email + ""} />}
            {isActiveFormLParlate && <ModificaDatiForm onCancel={() => setIsActiveFormLParlate(false)} onConfirm={(dato) => handleModificaDati(setIsActiveFormLParlate, dato)} field="Lingue Parlate" value_field={currentUser?.spoken_languages?.join(" ") + ""} />}
        </>
    );
}