import { useState } from "react";
import type { ReactElement } from "react";

interface AggiungiCorsoProps {
    closeForm: () => void; 
    addCourse: (nome: string, prezzo: number, materia: string, icona: string, difficolta: string) => void; 
}

export function AggiungiCorso({closeForm, addCourse}: AggiungiCorsoProps): ReactElement {
    
    // Stato locale del form
    const [nome, setNome] = useState("");
    const [icona, setIcona] = useState("default.png"); 
    const [difficolta, setDifficolta] = useState("Media");
    const [prezzo, setPrezzo] = useState("0");
    const [materia, setMateria] = useState("materia");

    const handleConfirm = () => {
        if (nome.trim() === "") {
            setNome("Nuovo Corso");
            return;
        }

        addCourse(nome, parseInt(prezzo, 10), materia, icona, difficolta.toUpperCase());
        closeForm();
    };

    return (
        <div className="glasspane" onMouseDown={closeForm}>
            
            <form className="create-collection-request" onMouseDown={(e) => e.stopPropagation()}>

                <h1>Aggiungi Nuovo Corso</h1>
                <div>
                    <label>Nome Corso</label>
                    <input 
                        type="text" 
                        placeholder="Es. Tecnologie Web" 
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

                <div>
                    <label>Nome Materia</label>
                    <input 
                        type="text" 
                        placeholder="materia" 
                        value={materia}
                        onChange={(e) => setMateria(e.target.value)}
                    />
                </div>

                <div>
                    <label>Prezzo richiesto</label>
                    <input 
                        type="text" 
                        placeholder="0"
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
                    <select 
                        value={difficolta} 
                        onChange={(e) => setDifficolta(e.target.value)}
                    >
                        <option value="Facile">Facile</option>
                        <option value="Media">Media</option>
                        <option value="Difficile">Difficile</option>
                    </select>
                </div>

                <div >
                    <div className="form-action ok" onClick={handleConfirm}>
                        Aggiungi
                    </div>
                    <div className="form-action cancel" onClick={closeForm}>
                        Annulla
                    </div>
                </div>

            </form>
        </div>
    );
}