import type { Corso as CorsoInterface, User } from "../data/data-model"
import type { ReactElement } from "react"

export type Permessi = "POSSIEDO" | "SEGUITO" | "OPEN";

interface CorsoProps {
    permessi: Permessi;
    currentUser: User | null;
    corso: CorsoInterface;
    removeCourse: (id:number) => void;
    followCourse: (id:number) => void;
    unfollowCourse: (id:number) => void;
}

export function Corso({ permessi, currentUser, corso, removeCourse, followCourse, unfollowCourse }: CorsoProps): ReactElement {
    return (
        <div className="corso-card">
            <div className="corso-header">
                <h1>{corso.nome}</h1>
                <p className="sub-text">by {corso.owner}</p>
                <p>{corso.mediaRecensioni}</p> 
            </div>
            
            <div className="corso-body">
                <img src={corso.icona} alt="Icona corso" />
            </div>
            
            <div className="corso-footer">
                <p>Materia: <strong>{corso.materia}</strong></p>
                <p>Difficoltà: <strong>{corso.difficolta}</strong></p>
                {(currentUser?.username === corso.owner && permessi === "POSSIEDO") && <button className="btn-remove" onClick = {() => removeCourse(corso.id)}>Rimuovi</button>}
                {(permessi === "OPEN" && corso.prezzo == 0) && <button className="btn-follow" onClick = {() => followCourse(corso.id)}>Segui</button>}
                {(permessi === "OPEN" && corso.prezzo > 0) && <button className="btn-buy" onClick = {() => followCourse(corso.id)}>Compra a {corso.prezzo}€</button>}
                {(permessi === "SEGUITO" && corso.prezzo == 0) && <button className="btn-buy" onClick = {() => unfollowCourse(corso.id)}>Disiscriviti</button>}
                {(permessi === "SEGUITO" && corso.prezzo > 0) && <p>Acquistato</p>}
            </div>
        </div>
    );
}