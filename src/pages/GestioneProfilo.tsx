import { ModificaDatiForm } from "../components/ModificaDatiForm";
import type { User, Teacher } from "./../data/data-model";
import { useState } from "react";
import { queryPost } from "../data/queries.ts";
import type { SessionData } from "../App.tsx";
import "./../style/GestioneProfilo.css";

interface GestioneProfiloProps {
    currentUser: User | null;
    hostName: string;
    onUpdateUser: () => void;
}

export default function GestioneProfilo({ currentUser, hostName, onUpdateUser }: GestioneProfiloProps) {
    const [isActiveFormFotoProfilo, setIsActiveFormFotoProfilo] = useState<boolean>(false);
    const [isActiveFormEmail, setIsActiveFormEmail] = useState<boolean>(false);
    const [isActiveFormLParlate, setIsActiveFormLParlate] = useState<boolean>(false);
    const [isActiveFormDescrizione, setIsActiveFormDescrizione] = useState<boolean>(false);
    const [isActiveFormTitoli, setIsActiveFormTitoli] = useState<boolean>(false);
    const [isActiveFormPassword, setIsActiveFormPassword] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState("");

    function handleModificaDatiString(setIsActiveForm: (b: boolean) => void, campo: string, oldData: string, newData: string) {
        if (newData.length < 3) { setErrorMsg("Inserire un dato con almeno 3 caratteri"); return; }
        if (newData === oldData) { setErrorMsg("Il nuovo valore dev'essere diverso dal precedente"); return; }
        queryModificaDati(setIsActiveForm, campo, { data: newData });
    }

    function handleModificaDatiList(setIsActiveForm: (b: boolean) => void, campo: string, oldData: string[], newData: string[]) {
        oldData = oldData.filter(s => s.trim() !== "");
        newData = newData.filter(s => s.trim() !== "");
        if (newData.length < 1) { setErrorMsg("Inserire almeno un elemento"); return; }
        if (newData === oldData) { setErrorMsg("Il nuovo valore dev'essere diverso dal precedente"); return; }
        queryModificaDati(setIsActiveForm, campo, { data: newData });
    }

    function handleModificaPassword(setIsActiveForm: (b: boolean) => void, oldPassword: string, newPassword: string) {
        const data = { oldPsw: oldPassword, newPsw: newPassword }
        queryModificaDati(setIsActiveForm, "password", data);
    }

    function queryModificaDati(setIsActiveForm: (b: boolean) => void, campo: string, data: unknown) {
        setErrorMsg("");
        queryPost<SessionData>(`${hostName}/modify_data/${campo}`, data)
            .then((s: SessionData) => {
                console.log(s.message);
                setIsActiveForm(false);
                onUpdateUser();
            })
            .catch((err: Error) => {
                setErrorMsg(err.message);
            });
    }

    return (
        <div className="profile-page">
            <div className="profile-card">
                
                {/* --- HEADER: Foto, Nome, Username --- */}
                <div className="profile-header">
                    <div className="profile-avatar-wrapper">
                        <img 
                            className="profile-img"
                            src={"../../public/images/utenti/" + currentUser?.fotoProfilo} 
                            alt="Foto Profilo" 
                        />
                        <button 
                            className="btn-edit-photo" 
                            onClick={() => setIsActiveFormFotoProfilo(true)}
                            title="Modifica Foto"
                        >
                            ✎
                        </button>
                    </div>
                    
                    <div className="profile-name">
                        <h2>{currentUser?.nome} {currentUser?.cognome}</h2>
                        <h4>@{currentUser?.username}</h4>
                        <button className="btn-action" onClick={() => setIsActiveFormPassword(true)}>
                            Modifica Password
                        </button>
                    </div>
                </div>

                {/* --- BODY: Dati Utente --- */}
                <div className="profile-body">
                    <div className="data-section">
                        {/* Età */}
                        <div className="data-item">
                            <div>
                                <div className="data-label">Età</div>
                                <div className="data-value">{currentUser?.eta} anni</div>
                            </div>
                        </div>

                        {/* Nazionalità */}
                        <div className="data-item">
                            <div>
                                <div className="data-label">Nazionalità</div>
                                <div className="data-value">{currentUser?.nazionalita}</div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="data-item full-width">
                            <div>
                                <div className="data-label">Email</div>
                                <div className="data-value">{currentUser?.email}</div>
                            </div>
                            <button className="btn-action" onClick={() => setIsActiveFormEmail(true)}>Modifica</button>
                        </div>

                        {/* Lingue */}
                        <div className="data-item full-width">
                            <div>
                                <div className="data-label">Lingue Parlate</div>
                                <div className="data-value">{currentUser?.lingueParlate?.join(" | ")}</div>
                            </div>
                            <button className="btn-action" onClick={() => setIsActiveFormLParlate(true)}>Modifica</button>
                        </div>

                        {/* Credito */}
                        <div className="data-item full-width" style={{borderLeftColor: 'var(--c-primary)'}}>
                            <div>
                                <div className="data-label">Credito Residuo</div>
                                <div className="data-value" style={{color: 'var(--c-primary)'}}>€ {currentUser?.credito}</div>
                            </div>
                            <button className="btn-action">Ricarica Credito</button>
                        </div>
                    </div>

                    {/* --- SEZIONE TEACHER --- */}
                    {currentUser?.ruoli.includes("TEACHER") && (
                        <div className="teacher-area">
                            <h3 className="area-title">Area Insegnante</h3>
                            <div className="data-section">
                                <div className="data-item full-width">
                                    <div>
                                        <div className="data-label">About Me</div>
                                        <div className="data-value">{(currentUser as Teacher)?.aboutMe}</div>
                                    </div>
                                    <button className="btn-action" onClick={() => setIsActiveFormDescrizione(true)}>Modifica</button>
                                </div>

                                <div className="data-item full-width">
                                    <div>
                                        <div className="data-label">Titoli di Studio</div>
                                        <div className="data-value">{(currentUser as Teacher)?.titoliStudio?.join(" | ")}</div>
                                    </div>
                                    <button className="btn-action" onClick={() => setIsActiveFormTitoli(true)}>Modifica</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- MODULES --- */}
            
            {isActiveFormFotoProfilo && (
				<ModificaDatiForm
					onCancel={() => {setIsActiveFormFotoProfilo(false); setErrorMsg("");}}
					onConfirm={(oldDato, newDato) => handleModificaDatiString(setIsActiveFormFotoProfilo, "fotoProfilo", oldDato, newDato)}
					field="Foto profilo"
					value_field={currentUser?.fotoProfilo + ""}
					errorMsg={errorMsg}
				/>
            )}

            {isActiveFormEmail && (
				<ModificaDatiForm
					onCancel={() => {setIsActiveFormEmail(false); setErrorMsg("");}}
					onConfirm={(oldDato, newDato) => handleModificaDatiString(setIsActiveFormEmail, "email", oldDato, newDato)}
					field="Email"
					value_field={currentUser?.email + ""}
					errorMsg={errorMsg}
				/>
            )}

            {isActiveFormDescrizione && (
				<ModificaDatiForm
					onCancel={() => {setIsActiveFormDescrizione(false); setErrorMsg("");}}
					onConfirm={(oldDato, newDato) => handleModificaDatiString(setIsActiveFormDescrizione, "aboutMe", oldDato, newDato)}
					field="Descrizione"
					value_field={(currentUser as Teacher)?.aboutMe + ""}
					errorMsg={errorMsg}
				/>
            )}

            {isActiveFormLParlate && (
				<ModificaDatiForm
					onCancel={() => {setIsActiveFormLParlate(false); setErrorMsg("");}}
					onConfirm={(oldDato, newDato) => handleModificaDatiList(setIsActiveFormLParlate, "lingueParlate", oldDato.split(" "), newDato.split(" "))}
					field="Lingue Parlate"
					value_field={currentUser?.lingueParlate?.join(" ") + ""}
					errorMsg={errorMsg}
				/>
            )}

            {isActiveFormTitoli && (
				<ModificaDatiForm
					onCancel={() => {setIsActiveFormTitoli(false); setErrorMsg("");}}
					onConfirm={(oldDato, newDato) => handleModificaDatiList(setIsActiveFormTitoli, "titoliStudio", oldDato.split(" "), newDato.split(" "))}
					field="Titoli di Studio"
					value_field={(currentUser as Teacher)?.titoliStudio + ""}
					errorMsg={errorMsg}
				/>
            )}

            {isActiveFormPassword && (
				<ModificaDatiForm
					onCancel={() => {setIsActiveFormPassword(false); setErrorMsg("");}}
					onConfirm={(oldDato, newDato) => handleModificaPassword(setIsActiveFormPassword, oldDato, newDato)}
					field="Password"
					value_field={""}
					errorMsg={errorMsg}
				/>
            )}
        </div>
    );
}