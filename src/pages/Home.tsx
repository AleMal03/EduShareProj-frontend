import {type ReactElement, useEffect} from "react";
import type {User, Corso as CorsoInterface} from "../data/data-model.ts";
import {CorsiTrovati, CourseFilter} from "../components/FiltroCorsi.tsx";
import {useCorsi} from "../data/handleFiltroCorsi.ts";
import { queryPost } from "../data/queries.ts";


interface HomeProps {
	currentUser: User | null;
	hostName: string;
}

export default function Home({currentUser, hostName}: HomeProps): ReactElement {
	const {corsi, getCorsi, maxCost} = useCorsi(hostName, "/corsi");

	//Ricerca iniziale corsi senza filtri
	useEffect(() => {
		getCorsi();
	}, [getCorsi, currentUser]);


	interface CorsiResponse{
		listaCorsi:CorsoInterface[],
		message:string
	}

	// --- ISCRIVITI CORSO ---
	const handleFollowCourse= (id: number) => {
		queryPost<CorsiResponse>(`${hostName}/corsi/iscrizione`, { id })
				.then((r:CorsiResponse) => {
					console.log(r.message);
					getCorsi();
				})
				.catch((err:Error) => {
					if(!currentUser)
						alert("Devi essere loggato per poter seguire un corso");
					console.error(err.message)
				});
	}

	return (
		<div className="home">
			<div className="home-header">
				<CourseFilter onConfirm={getCorsi} hostName={hostName} maxCost={maxCost}
							  isOwnerAsking={false} isOwned={false}/>
			</div>
			<div className="home-body">
				<CorsiTrovati hostName={hostName} corsi={corsi} currentUser={currentUser} permessi={"OPEN"} removeCourse={()=>{}} followCourse={handleFollowCourse} unfollowCourse={()=>{}}/>
			</div>
		</div>
	);
}