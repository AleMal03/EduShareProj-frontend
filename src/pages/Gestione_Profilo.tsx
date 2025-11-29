import { ModificaDatiForm } from "../components/ModificaDatiForm";
import {user_mgr} from "./../data/data"
import type {User} from "./../data/data-model"
import {useState} from "react"

export function Gestione_Profilo(){
    const id_user = 1;

    const [user, setUser] = useState<User | undefined>(user_mgr.getUserById(id_user));

    const [isActiveFormEta, setIsActiveFormEta] = useState<boolean>(false);
    const [isActiveFormEmail, setIsActiveFormEmail] = useState<boolean>(false);
    const [isActiveFormLParlate, setIsActiveFormLParlate] = useState<boolean>(false); 

    return (
        <>
            <h1>PAGINA Gestione Profilo</h1>
             
            <h3>Nome: {user?.name}</h3>
            <h3>Cognome: {user?.surname}</h3>
            <h3>Username: {user?.username}</h3>
            <div>
                <h3>Età: {user?.age}</h3>
                <button onClick = {() => setIsActiveFormEta(true)}>Modifica Eta</button>
            </div>
            <div>
                <h3>Email: {user?.email}</h3>
                <button onClick = {() => setIsActiveFormEmail(true)}>Modifica Email</button>
            </div>
            <h3>Nazionalità: {user?.nationality}</h3>
            <div>
                <h3>Lingue parlate: {user?.spoken_languages.join(" | ")}</h3>
                <button onClick = {() => setIsActiveFormLParlate(true)}>Modifica Lingue Parlate</button>
            </div>
            <div>
                <h3>Credito Residuo: 0 €</h3>
                <button>Ricarica Credito</button>
            </div>
            
            {isActiveFormEta && <ModificaDatiForm setIsActive={setIsActiveFormEta} field="Eta" value_field={user?.age + ""} />}
            {isActiveFormEmail && <ModificaDatiForm setIsActive={setIsActiveFormEmail} field="Email" value_field={user?.email + ""} />}
            {isActiveFormLParlate && <ModificaDatiForm setIsActive={setIsActiveFormLParlate} field="Lingue Parlate" value_field={user?.spoken_languages.join(" ") + ""} />}
        </>
    );
}