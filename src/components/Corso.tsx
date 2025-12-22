import { Corso as CorsoClass, type User } from "../data/data-model"
import type { ReactElement } from "react"

interface CorsoProps {
    currentUser: User | null;
    corso: CorsoClass;
    removeCourse: () => void;
    followCourse: () => void;
}

export function Corso({ currentUser, corso, removeCourse, followCourse }: CorsoProps): ReactElement {

    let permessi = false;
    if(currentUser?.username == corso.owner)
        permessi = true;


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
                {permessi && <button className="btn-remove" onClick = {() => removeCourse()}>Rimuovi</button>}
                {(!permessi && corso.prezzo == 0) && <button className="btn-follow" onClick = {() => followCourse()}>Segui</button>}
                {(!permessi && corso.prezzo > 0) && <button className="btn-buy" onClick = {() => followCourse()}>Compra a {corso.prezzo}€</button>}
            </div>
        </div>
    );
}