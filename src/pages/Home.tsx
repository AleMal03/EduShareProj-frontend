import {type ReactElement, useCallback, useEffect, useState} from "react";
import type {Corso as CorsoInterface, User} from "../data/data-model.ts";
import {queryGet} from "../data/queries.ts";
import {Corso} from "../components/Corso.tsx";

interface HomeProps {
	currentUser: User | null;
	hostName: string;
}

interface Filtri {
	nomeCorso?: string,
	teacher?: string,
	materia?: string,
	difficolta?: string,
	prezzo?: number
}

interface CorsiResponse{
	listaCorsi:CorsoInterface[],
	message:string
}

export default function Home({currentUser, hostName}: HomeProps): ReactElement {
	const [corsi, setCorsi] = useState<CorsoInterface[]>([]);
	const [maxCost, setMaxCost] = useState<number>(200);

	const handleGetCorsi = useCallback((filters: Filtri) => {
		const params = new URLSearchParams();
		if (filters.prezzo == null)
			filters.prezzo = maxCost;

		// Aggiungi solo se il valore esiste ed è diverso da stringa vuota
		if (filters.nomeCorso) params.append("nomeCorso", filters.nomeCorso);
		if (filters.teacher) params.append("teacher", filters.teacher);
		if (filters.materia) params.append("materia", filters.materia);
		if (filters.difficolta) params.append("difficolta", filters.difficolta);
		params.append("prezzo", filters.prezzo+"");	// Il prezzo lo passiamo a prescindere

		console.log(params.toString());

		queryGet<CorsiResponse>(`${hostName}/corsi?${params.toString()}`)
			.then((r:CorsiResponse) => {
				console.log(r.message);
				console.log(r)
				setCorsi(r.listaCorsi);
			})
			.catch((err: Error) => {
				console.log(err.message);
			});
	}, [hostName, maxCost]);

	useEffect(() => {
		handleGetCorsi({});
	}, [handleGetCorsi]);

	useEffect(() => {
		queryGet<number>(`${hostName}/corsi/maxCosto`).then(n => setMaxCost(n));
	}, [hostName]);

	return (
		<div className="home">
			<div className="home-header">
				<CourseFilter onConfirm={handleGetCorsi} hostName={hostName} maxCost={maxCost}/>
			</div>
			<div className="home-body">
				<CorsiTrovati corsi={corsi} currentUser={currentUser}/>
			</div>
		</div>
	);
}

interface CourseFilterProps {
	onConfirm: (filters: Filtri) => void
	hostName: string;
	maxCost: number;
}

function CourseFilter({onConfirm, hostName, maxCost}:CourseFilterProps): ReactElement {
	const [nomeCorso, setNomeCorso] = useState<string | undefined>(undefined);
	const [teacher, setTeacher] = useState<string | undefined>(undefined);
	const [materia, setMateria] = useState<string | undefined>(undefined);
	const [difficolta, setDifficolta] = useState<string | undefined>(undefined);
	const [prezzo, setPrezzo] = useState<number>(maxCost);
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
			<input type="text" name="courseName" placeholder="Nome corso"
				   onChange={(e) => setNomeCorso(e.currentTarget.value)}/>
		</div>
		<div className="filter-item">
			<input type="text" name="courseTeacher" placeholder="Username insegnante"
				   onChange={(e) => setTeacher(e.currentTarget.value)}/>
		</div>
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
		<div className="filter-item">
			<label htmlFor="coursePrezzo">Prezzo massimo</label>
			<input name="coursePrezzo" type="range" min="0" max={maxCost} step="1" defaultValue={maxCost}
				   onChange={e => setPrezzo(e.currentTarget.valueAsNumber)}/>
			<label htmlFor="coursePrezzo">€{prezzo}</label>
		</div>
		<div className="actions">
			<div className="form-action ok" onClick={() => onConfirm({nomeCorso, teacher, materia, difficolta, prezzo})}>Cerca
			</div>
		</div>
	</form>
}

interface CorsiTrovatiProps {
	corsi: CorsoInterface[],
	currentUser: User|null,
}

function CorsiTrovati({corsi, currentUser}: CorsiTrovatiProps): ReactElement {
	return <>
		{corsi?.map((corso) =>
			<Corso key={corso.id} permessi={"OPEN"} currentUser={currentUser} corso={corso} removeCourse={()=>{}} followCourse={()=>{}}/>
		)}
	</>
}