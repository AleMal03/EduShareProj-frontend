import {type ReactElement, useEffect} from "react";
import type {User} from "../data/data-model.ts";
import {CorsiTrovati, CourseFilter} from "../components/FiltroCorsi.tsx";
import {useCorsi} from "../data/handleFiltroCorsi.ts";

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

	return (
		<div className="home">
			<div className="home-header">
				<CourseFilter onConfirm={getCorsi} hostName={hostName} maxCost={maxCost}
							  isOwnerAsking={false} isOwned={false}/>
			</div>
			<div className="home-body">
				<CorsiTrovati corsi={corsi} currentUser={currentUser} permessi={"OPEN"} removeCourse={()=>{}} followCourse={()=>{}}/>
			</div>
		</div>
	);
}