import type {Filtri} from "../data/handleFiltroCorsi.ts"
import {Corso, type Permessi} from "./Corso.tsx";
import {type ReactElement, useEffect, useState} from "react";
import type {User} from "../data/data-model.ts";
import type {Corso as CorsoInterface} from "../data/data-model.ts"
import {queryGet} from "../data/queries.ts";
import ContentCorso from "../pages/ContentCorso.tsx";
import "../style/Filter.css"


interface CourseFilterProps {
	onConfirm: (filters: Filtri) => void;
	hostName:string;
	maxCost: number;
	isOwnerAsking: boolean;
	isOwned: boolean;
}

export function CourseFilter({onConfirm, hostName, maxCost, isOwnerAsking, isOwned}:CourseFilterProps): ReactElement {
	const [nomeCorso, setNomeCorso] = useState<string>("");
	const [teacher, setTeacher] = useState<string>("");
	const [materia, setMateria] = useState<string>("");
	const [difficolta, setDifficolta] = useState<string>("");
	const [prezzo, setPrezzo] = useState<number>(maxCost);
	const [rating, setRating] = useState<number>(5);
	const [materie, setMaterie] = useState<string[]>([]);
	const [livelliDifficolta, setLivelliDifficolta] = useState<string[]>([]);

	useEffect(() => {
		setPrezzo(maxCost);
	}, [maxCost]);

	useEffect(() => {
		queryGet<string[]>(`${hostName}/corsi/materie`).then(s => setMaterie(s));
		queryGet<string[]>(`${hostName}/corsi/difficolta`).then(d => setLivelliDifficolta(d));
	}, [hostName]);

	return <form className="filter">
		<div className="filter-title">
			Filtra:
		</div>
		<div className="filter-item">
			<label htmlFor="nomeCorso">Nome corso</label>
			<input type="text" name="courseName" id="nomeCorso" placeholder="Nome corso" value={nomeCorso}
				   onChange={(e) => setNomeCorso(e.currentTarget.value)}/>
		</div>
		{!isOwnerAsking &&
			<div className="filter-item">
				<label htmlFor="usrTeacher">Username insegnante</label>
				<input type="text" name="courseTeacher" id="usrTeacher" placeholder="Username insegnante" value={teacher}
					   onChange={(e) => setTeacher(e.currentTarget.value)}/>
			</div>
		}
		<div className="filter-item">
			<label htmlFor="selectMateria">Materia</label>
			<select name="courseMateria" id="selectMateria" value={materia || ""}
					onChange={(e) => setMateria(e.currentTarget.value)}>
				<option value="">Tutte</option>
				{materie.map((materia, i) => <option key={i} value={materia + ""}>{materia}</option>)}
			</select>
		</div>
		<div className="filter-item">
			<label htmlFor="selectDifficolta">Difficoltà</label>
			<select name="courseDifficolta" id="selectDifficolta" value={difficolta || ""}
					onChange={(e) => setDifficolta(e.currentTarget.value)}>
				<option value="">Tutte</option>
				{livelliDifficolta.map((livello, i) => <option key={i} value={livello + ""}>{livello}</option>)}
			</select>
		</div>
		{!isOwnerAsking && !isOwned &&
			<div className="filter-item">
				<label htmlFor="coursePrezzo">Prezzo massimo</label>
				<input id="coursePrezzo" type="range" min="0" max={maxCost} step="1" defaultValue={maxCost}
					   onChange={e => setPrezzo(e.currentTarget.valueAsNumber)}/>
				<label htmlFor="coursePrezzo">€{prezzo}</label>
			</div>
		}
		{!isOwnerAsking && !isOwned &&
            <div className="filter-item">
                <label htmlFor="courseRating">Voto medio minimo: {rating}</label>
                <input id="courseRating" type="range" min="1" max="5" step="1"
                       value={rating}
                       onChange={e => setRating(e.currentTarget.valueAsNumber)} />

            </div>
        }
		<div className="actions">
            <div className="form-action ok"
                 onClick={() => onConfirm({ nomeCorso, teacher, materia, difficolta, prezzo, rating })}>
                 Cerca
            </div>
        </div>

	</form>
}

interface CorsiTrovatiProps {
	hostName:string,
	corsi: CorsoInterface[],
	currentUser: User|null,
	permessi: Permessi,
	removeCourse: (id:number) => void;
    followCourse: (id:number) => void;
    unfollowCourse: (id:number) => void;
	btnCreaCorso?: ReactElement;
}


export function CorsiTrovati({hostName, corsi, currentUser, permessi, removeCourse, followCourse, unfollowCourse, btnCreaCorso}: CorsiTrovatiProps): ReactElement {
	const [activeCourse, setActiveCourse] = useState<CorsoInterface|undefined>(undefined);

	function handleChangeActiveCourse(corso:CorsoInterface){
		setActiveCourse(corso);
	}

	function handleDeactivateCourse(){
		setActiveCourse(undefined);
	}

	return <div className="lista-corsi">
		{btnCreaCorso}
		{corsi?.map((corso) =>
			<Corso key={corso.id} permessi={permessi} currentUser={currentUser} corso={corso}
				   removeCourse={removeCourse} followCourse={followCourse} unfollowCourse={unfollowCourse} onChangeActiveCourse={handleChangeActiveCourse}/>
		)}

		{activeCourse !== undefined && <ContentCorso hostName={hostName} corso={activeCourse} onDeactivateCourse={handleDeactivateCourse}/>}
	</div>
}