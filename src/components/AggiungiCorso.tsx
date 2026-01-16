import {useEffect, useState} from "react";
import type { ReactElement } from "react";
import {queryGet} from "../data/queries.ts";

interface AggiungiCorsoProps {
    hostName: string;
	closeForm: () => void;
    addCourse: (nome: string, prezzo: number, materia: string, icona: string, difficolta: string) => void;
}

export function AggiungiCorso({hostName, closeForm, addCourse}: AggiungiCorsoProps): ReactElement {
    
    // Stato locale del form
	const [livelliDifficolta, setLivelliDifficolta] = useState<string[]>([]);
    const [nome, setNome] = useState("");
    const [icona, setIcona] = useState("default.png");
    const [difficolta, setDifficolta] = useState("FACILE");
    const [prezzo, setPrezzo] = useState("0");
    const [materia, setMateria] = useState("");
	const [errorMsg, setErrorMsg] = useState("");


	useEffect(() => {
		queryGet<string[]>(`${hostName}/corsi/difficolta`).then(d => setLivelliDifficolta(d));
	}, [hostName]);

    const handleConfirm = () => {
        if (nome.trim() === "" || materia.trim() === "") {
            setErrorMsg("Campi obbligatori mancanti!")
            return;
        }
		else{
			addCourse(nome, parseInt(prezzo, 10), materia, icona, difficolta);
			closeForm();
		}
    };

    return (
        <div className="glasspane" onMouseDown={closeForm}>
            
            <form className="create-course-request" onMouseDown={(e) => e.stopPropagation()}>

                <h1>Aggiungi Nuovo Corso</h1>
                <div>
                    <label>Nome Corso <b>(*)</b></label>
                    <input 
                        type="text" 
                        placeholder="Es. Tecnologie Web"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

                <div>
                    <label>Nome Materia <b>(*)</b></label>
                    <input 
                        type="text" 
                        placeholder="Es. Informatica"
                        value={materia}
                        onChange={(e) => setMateria(e.target.value)}
                    />
                </div>

                <div>
                    <label>Prezzo richiesto</label>
                    <input 
                        type="text" 
                        placeholder="Prezzo"
                        value={prezzo}
                        onChange={(e) => setPrezzo(e.target.value)}
                    />
                </div>

                <div>
                    <label>Nome File Icona</label>
                    <input 
                        type="text" 
                        placeholder="Es. icona_corso.png" 
                        value={icona}
                        onChange={(e) => setIcona(e.target.value)}
                    />
                </div>

                <div>
                    <label>Difficoltà</label>
                    <select value={difficolta} onChange={(e) => setDifficolta(e.target.value)}>
						{livelliDifficolta.map((livello, i) => <option key={i} value={livello + ""}>{livello}</option>)}
					</select>
                </div>

				{/* Per visualizzare il messaggio di errore*/}
				{errorMsg != "" && <div className="errorMessage"> {errorMsg} </div>}

				<div className="actions">
                    <div className="form-action cancel" onClick={closeForm}>
                        Annulla
                    </div>
                    <div className="form-action ok" onClick={handleConfirm}>
                        Aggiungi
                    </div>
                </div>

            </form>
        </div>
    );
}