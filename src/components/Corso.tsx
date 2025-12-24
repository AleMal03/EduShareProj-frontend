import type { Corso as CorsoInterface, User } from "../data/data-model"
import type { ReactElement } from "react"

type Permessi = "POSSIEDO" | "SEGUITO" | "OPEN";

interface CorsoProps {
    permessi: Permessi;
    currentUser: User | null;
    corso: CorsoInterface;
    removeCourse: () => void;
    followCourse: () => void;
}

export function Corso({ permessi, currentUser, corso, removeCourse, followCourse }: CorsoProps): ReactElement {

    return (
        <div className="corso-card">
            <div className="corso-header">
                <h1>{corso.nome}</h1>
                <p className="sub-text">by {corso.owner}</p>
            </div>
            
            <div className="corso-body">
                <img src={corso.icona} alt="Icona corso" />
            </div>
            
            <div className="corso-footer">
                <p>Materia: <strong>{corso.materia}</strong></p>
                <p>Difficoltà: <strong>{corso.difficolta}</strong></p>
                {(permessi == "POSSIEDO") && <button className="btn-remove" onClick = {() => removeCourse()}>Rimuovi</button>}
                {(permessi == "OPEN" && corso.prezzo == 0) && <button className="btn-follow" onClick = {() => followCourse()}>Segui</button>}
                {(permessi == "OPEN" && corso.prezzo > 0) && <button className="btn-buy" onClick = {() => followCourse()}>Compra a {corso.prezzo}€</button>}
                {(permessi == "SEGUITO" && corso.prezzo == 0) && <p>Già seguito</p>}
                {(permessi == "SEGUITO" && corso.prezzo > 0) && <p>Già acquistato</p>}
            </div>
        </div>
    );
}