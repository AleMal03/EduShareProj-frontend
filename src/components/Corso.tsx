import { Corso as CorsoClass } from "../data/data-model"
import type { ReactElement } from "react"

interface CorsoProps {
    professore: string | undefined;
    corso: CorsoClass;
    gestione: [boolean, () => void];
}

export function Corso({ professore, corso, gestione }: CorsoProps): ReactElement {

    const [permessi, removeCourse] = gestione;

    return (
        <div className="corso-card">
            <div className="corso-header">
                <h1>{corso.getNome()}</h1>
                <p className="sub-text">by {professore}</p>
            </div>
            
            <div className="corso-body">
                <img src={corso.getPercorsoIcona()} alt="Icona corso" />
            </div>
            
            <div className="corso-footer">
                <p>Difficoltà: <strong>{corso.getDifficolta()}</strong></p>
                {permessi && <button className="btn-remove" onClick = {() => removeCourse()}>Rimuovi</button>}
            </div>
        </div>
    );
}