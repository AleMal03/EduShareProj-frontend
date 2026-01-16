import type { Corso as CorsoInterface, User } from "../data/data-model"
import type { ReactElement } from "react"
import "../style/Corso.css"

export type Permessi = "POSSIEDO" | "SEGUITO" | "OPEN";

interface CorsoProps {
    permessi: Permessi;
    currentUser: User | null;
    corso: CorsoInterface;
    removeCourse: (id:number) => void;
    followCourse: (id:number) => void;
    unfollowCourse: (id:number) => void;
	onChangeActiveCourse: (corso:CorsoInterface) => void;
}

export function Corso({ permessi, currentUser, corso, removeCourse, followCourse, unfollowCourse, onChangeActiveCourse }: CorsoProps): ReactElement {
    return (
        <div className="corso-card" >
            <div className="corso-header">
				<h1><a onClick={() => onChangeActiveCourse(corso)}>{corso.nome}</a></h1>
                <p className="sub-text">by {corso.owner}</p>
                <p className="mediaRecensioni">{corso.mediaRecensioni > 0 ? corso.mediaRecensioni+"★" : "Ancora nessuna recensione"}</p>
            </div>
            
            <div className="corso-body" onClick={() => onChangeActiveCourse(corso)}>
                <img src={`/images/corsi/${corso.icona}`} alt="Icona corso" />
            </div>
            
            <div className="corso-footer">
                <p>Materia: <strong>{corso.materia}</strong></p>
                <p>Difficoltà: <strong>{corso.difficolta}</strong></p>
                {(currentUser?.username === corso.owner && permessi === "POSSIEDO") && <button className="btn-remove" onClick = {(e) => {
					e.stopPropagation();
					removeCourse(corso.id)
				}}>Rimuovi</button>}
                {(permessi === "OPEN" && corso.prezzo == 0) && <button className="btn-follow" onClick = {(e) => {
					e.stopPropagation();
					followCourse(corso.id)
				}}>Segui</button>}
                {(permessi === "OPEN" && corso.prezzo > 0) && <button className="btn-buy" onClick = {(e) => {
					e.stopPropagation();
					followCourse(corso.id)
				}}>Compra a {corso.prezzo}€</button>}
                {(permessi === "SEGUITO" && corso.prezzo == 0) && <button className="btn-buy" onClick = {(e) => {
					e.stopPropagation();
					unfollowCourse(corso.id)
				}}>Disiscriviti</button>}
                {(permessi === "SEGUITO" && corso.prezzo > 0) && <button className="btn-buy" onClick = {(e) => {
					e.stopPropagation();
					unfollowCourse(corso.id)
				}}>Chiedi Rimborso</button>}
            </div>
        </div>
    );
}