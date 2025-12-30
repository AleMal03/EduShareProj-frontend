import { ModificaDatiForm } from "../components/ModificaDatiForm";
import type {User, Teacher} from "./../data/data-model"
import {useState} from "react"
import {queryPost} from "../data/queries.ts";
import type {SessionData} from "../App.tsx";

interface GestioneProfiloProps {
	currentUser: User | null;
	hostName: string;
	onUpdateUser: () => void;
}

export default function GestioneProfilo({currentUser, hostName, onUpdateUser}:GestioneProfiloProps){
    const [isActiveFormFotoProfilo, setIsActiveFormFotoProfilo] = useState<boolean>(false);
    const [isActiveFormEmail, setIsActiveFormEmail] = useState<boolean>(false);
    const [isActiveFormLParlate, setIsActiveFormLParlate] = useState<boolean>(false);
    const [isActiveFormDescrizione, setIsActiveFormDescrizione] = useState<boolean>(false);
    const [isActiveFormTitoli, setIsActiveFormTitoli] = useState<boolean>(false);
    const [isActiveFormPassword, setIsActiveFormPassword] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState("");

	function handleModificaDatiString(setIsActiveForm:(b:boolean)=>void, campo:string, oldData:string, newData:string){
		if(newData.length < 3){
			setErrorMsg("Inserire un dato con almeno 3 caratteri");
			return;
		}
		if(newData === oldData){
			setErrorMsg("Il nuovo valore dev'essere diverso dal precedente");
			return;
		}

		queryModificaDati(setIsActiveForm, campo, {data:newData});
	}

	function handleModificaDatiList(setIsActiveForm:(b:boolean)=>void, campo:string, oldData:string[], newData:string[]){
		oldData = oldData.filter(s => s.trim() !== "");
		newData = newData.filter(s => s.trim() !== "");

		console.log(newData);

		if(newData.length < 1){
			setErrorMsg("Inserire almeno un elemento");
			return;
		}
		if(newData === oldData){
			setErrorMsg("Il nuovo valore dev'essere diverso dal precedente");
			return;
		}

		queryModificaDati(setIsActiveForm, campo, {data:newData});
	}

	function handleModificaPassword(setIsActiveForm:(b:boolean)=>void, oldPassword:string, newPassword:string){
		interface pswPayload{
			oldPsw:string,
			newPsw:string
		}

		const data:pswPayload = {
			oldPsw: oldPassword,
			newPsw: newPassword
		}

		queryModificaDati(setIsActiveForm, "password", data);
	}

	function queryModificaDati(setIsActiveForm:(b:boolean)=>void, campo:string, data:unknown){
		setErrorMsg("");

		// Query per la modifica del dato server side
		queryPost<SessionData>(`${hostName}/modify_data/${campo}`, data)
			.then((s:SessionData)=>{
				console.log(s.message);
				setIsActiveForm(false);
				onUpdateUser();
			})
			.catch((err:Error) => {
				setErrorMsg(err.message);	// Messaggio di errore da visualizzare sul form
			});
	}

    return (
        <>
            <h1>PAGINA Gestione Profilo</h1>

			<img src={"../../public/images/utenti/" + currentUser?.fotoProfilo} alt = "Foto Profilo"/>
			<button onClick = {() => setIsActiveFormFotoProfilo(true)}>Modifica foto profilo</button>

            <h3>Nome: {currentUser?.nome}</h3>
            <h3>Cognome: {currentUser?.cognome}</h3>
            <h3>Username: {currentUser?.username}</h3>
			<button onClick = {() => setIsActiveFormPassword(true)}>Modifica Password</button>

            <div>
                <h3>Età: {currentUser?.eta}</h3>
            </div>
            <div>
                <h3>Email: {currentUser?.email}</h3>
                <button onClick = {() => setIsActiveFormEmail(true)}>Modifica Email</button>
            </div>
            <h3>Nazionalità: {currentUser?.nazionalita}</h3>
            <div>
                <h3>Lingue parlate: {currentUser?.lingueParlate?.join(" | ")}</h3>
                <button onClick = {() => setIsActiveFormLParlate(true)}>Modifica Lingue Parlate</button>
            </div>
            <div>
                <h3>Credito Residuo: {currentUser?.credito}</h3>
                <button>Ricarica Credito</button>
            </div>

			{currentUser?.ruoli.includes("TEACHER") && (
				<>
					<div>
						<h3>About me: {(currentUser as Teacher)?.aboutMe}</h3>
						<button onClick = {() => setIsActiveFormDescrizione(true)}>Modifica descrizione</button>
					</div>
					<div>
						<h3>Titoli di studio: {(currentUser as Teacher)?.titoliStudio?.join(" | ")}</h3>
						<button onClick = {() => setIsActiveFormTitoli(true)}>Modifica titoli di studio</button>
					</div>
				</>
			)}

			{isActiveFormFotoProfilo && <ModificaDatiForm onCancel={() => {setIsActiveFormFotoProfilo(false); setErrorMsg("");}}
														  onConfirm={(oldDato, newDato) => handleModificaDatiString(setIsActiveFormFotoProfilo, "fotoProfilo", oldDato, newDato)} field="Foto profilo" value_field={currentUser?.fotoProfilo + ""} errorMsg={errorMsg}/>}

            {isActiveFormEmail && <ModificaDatiForm onCancel={() => {setIsActiveFormEmail(false); setErrorMsg("");}}
													onConfirm={(oldDato, newDato) => handleModificaDatiString(setIsActiveFormEmail, "email", oldDato, newDato)} field="Email" value_field={currentUser?.email + ""} errorMsg={errorMsg}/>}

            {isActiveFormDescrizione && <ModificaDatiForm onCancel={() => {setIsActiveFormDescrizione(false); setErrorMsg("");}}
														  onConfirm={(oldDato, newDato) => handleModificaDatiString(setIsActiveFormDescrizione, "aboutMe", oldDato, newDato)} field="Descrizione" value_field={(currentUser as Teacher)?.aboutMe + ""}  errorMsg={errorMsg}/>}

            {isActiveFormLParlate && <ModificaDatiForm onCancel={() => {setIsActiveFormLParlate(false); setErrorMsg("");}}
													   onConfirm={(oldDato, newDato) => handleModificaDatiList(setIsActiveFormLParlate, "lingueParlate", oldDato.split(" "), newDato.split(" "))} field="Lingue Parlate" value_field={currentUser?.lingueParlate?.join(" ") + ""}  errorMsg={errorMsg}/>}

			{isActiveFormTitoli&& <ModificaDatiForm onCancel={() => {setIsActiveFormTitoli(false); setErrorMsg("");}}
													onConfirm={(oldDato, newDato) => handleModificaDatiList(setIsActiveFormTitoli, "titoliStudio", oldDato.split(" "), newDato.split(" "))} field="Titoli di Studio" value_field={(currentUser as Teacher)?.titoliStudio + ""}  errorMsg={errorMsg}/>}
                                                    
			{isActiveFormPassword && <ModificaDatiForm onCancel={() => {setIsActiveFormPassword(false); setErrorMsg("");}}
													   onConfirm={(oldDato, newDato) => handleModificaPassword(setIsActiveFormPassword, oldDato, newDato)} field="Password" value_field={""}  errorMsg={errorMsg}/>}
		</>
    );
}