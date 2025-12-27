import {useState, useEffect} from "react";
import { AggiungiCorso } from "./../components/AggiungiCorso"; 
import { type Corso as CorsoInterface, type User } from "./../data/data-model";
import { hostName } from "./../App";
import { queryPost } from "../data/queries";
import {CorsiTrovati, CourseFilter} from "../components/FiltroCorsi.tsx";
import {useCorsi} from "../data/handleFiltroCorsi.ts";

interface MieiCorsiProps {
    hostName: string;
	currentUser: User | null;
}



export default function MieiCorsi({ currentUser }: MieiCorsiProps) {
    const {corsi, getCorsi, maxCost} = useCorsi(hostName, "/corsi/miei");
    const [showAddCourseForm, setShowAddCourseForm] = useState(false);

	interface CorsiResponse{
		listaCorsi:CorsoInterface[],
		message:string
	}

    // --- GET INIZIALE ---
	useEffect(() => {
		getCorsi();
	}, [getCorsi, currentUser]);

    // --- RIMUOVI CORSO ---
    const handleRemoveCourse = (id: number) => {
        queryPost<CorsiResponse>(`${hostName}/corsi/miei/rimuovi`, { id })
            .then((r:CorsiResponse) => {
				console.log(r.message);
				getCorsi();
			})
            .catch((err) => console.error(err.message));
    };

    // --- AGGIUNGI CORSO ---
    const handleAddCourse = (nome: string, prezzo: number, materia: string, icona: string, difficolta: string) => {
		//Corso da aggiungere
        const corso: CorsoInterface = ({
            id: -1,
            owner: currentUser?.username ?? "",
            nome: nome,
            prezzo: prezzo,
            materia: materia,
            difficolta: difficolta,
            icona: icona,
            files: []
        });

		// Post per aggiungere il corso
        queryPost<CorsiResponse>(`${hostName}/corsi/miei/aggiungi`, corso)
			.then((r:CorsiResponse) => {
				console.log(r.message);
				getCorsi();
			})
			.catch((err:Error) => console.error(err.message));
    };

    return (
        <>
            <div className="mieicorsi-header">
                <h1>Corsi pubblicati di <strong>{currentUser?.nome} {currentUser?.cognome}</strong></h1>
                <button onClick={() => setShowAddCourseForm(true)}>Aggiungi Corso</button>

				<CourseFilter hostName={hostName} onConfirm={getCorsi} maxCost={maxCost}
							  isOwnerAsking={true} isOwned={false}/>
			</div>
            <div className="lista-corsi">
				<CorsiTrovati
					permessi={"POSSIEDO"}
					currentUser={currentUser}
					corsi={corsi}
					removeCourse={() => handleRemoveCourse}
					followCourse={() => { return }}
				/>
                {corsi.length === 0 && <p>Nessun corso trovato.</p>}
            </div>

            {showAddCourseForm && (
                <AggiungiCorso hostName={hostName} closeForm={() => setShowAddCourseForm(false)} addCourse={handleAddCourse}/>
            )}
        </>
    );
}