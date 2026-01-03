import { useEffect } from "react";
import type { Corso as CorsoInterface, User } from "./../data/data-model";
import { queryGet, queryPost } from "../data/queries";
import { hostName } from "../App";
import {CorsiTrovati, CourseFilter} from "../components/FiltroCorsi.tsx";
import {useCorsi} from "../data/handleFiltroCorsi.ts";
import "../style/MieiCorsi.css"

interface CorsiCompratiProps{
    currentUser: User | null;
}

export default function CorsiComprati({currentUser}: CorsiCompratiProps) {
	const {corsi, getCorsi, maxCost} = useCorsi(hostName, "/corsi/seguiti");

	//Ricerca iniziale corsi senza filtri
	useEffect(() => {
		getCorsi();
	}, [getCorsi, currentUser]);

	interface CorsiResponse{
		listaCorsi:CorsoInterface[],
		message:string
	}

	const handleGetCorsiSeguiti = () => {
		if (!currentUser) return;

		queryGet<CorsiResponse>(`${hostName}/corsi/seguiti`)
			.then((r:CorsiResponse) => {
				console.log(r.message);
				getCorsi();
			})
			.catch((err: Error) => {
				console.error(err.message);
			});
	};


	useEffect(handleGetCorsiSeguiti, [currentUser, getCorsi]);


	// --- DISISCRIVITI CORSO ---
    const handleUnfollowCourse = (id: number) => {

		queryPost<CorsiResponse>(`${hostName}/corsi/seguiti/disiscrizione`, { id }) 
            .then((r: CorsiResponse) => {
                console.log(r.message);
                // Ricarichiamo la lista dei corsi dopo la rimozione
                getCorsi(); 
            })
            .catch((err) => {
				if(!currentUser)
					alert("Devi essere loggato per poter seguire un corso");
				console.error(err.message)
			});
    }



    return (
        <>
            <div className="corsiComprati-header">
                <h1>Corsi seguiti di <strong>{currentUser?.nome} {currentUser?.cognome}</strong></h1>

				<CourseFilter hostName={hostName} onConfirm={getCorsi} maxCost={maxCost}
							  isOwnerAsking={false} isOwned={true}/>
			</div>
            <div className="corsiComprati-body">
                    <CorsiTrovati
							hostName={hostName}
						    permessi={"SEGUITO"}
                            currentUser={currentUser}
                            corsi={corsi}
                            removeCourse={() => {return}} 
                            followCourse={() => {}}
							unfollowCourse={handleUnfollowCourse}
							/>
                {corsi.length === 0 && <p>Nessun corso seguito.</p>}
            </div>

        </>
    );
}