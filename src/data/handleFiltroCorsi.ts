import {type Corso as CorsoInterface} from "./data-model.ts"
import {useCallback, useEffect, useState} from "react";
import {queryGet} from "./queries.ts";

export interface Filtri {
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

/**
 * Hook personalizzato per il filtro dei corsi
 */
export function useCorsi(hostName:string, path:string) {
	const [corsi, setCorsi] = useState<CorsoInterface[]>([]);
	const [maxCost, setMaxCost] = useState<number>(200);

	useEffect(() => {
		queryGet<number>(`${hostName}/corsi/maxCosto`).then(n => setMaxCost(n));
	}, [hostName]);

	const getCorsi = useCallback((filters: Filtri = {}) => {
		const params = new URLSearchParams();	// Gestore parametri GET
		if (filters.prezzo == null)
			filters.prezzo = maxCost;

		// Aggiungi solo se il valore esiste ed è diverso da stringa vuota
		if (filters.nomeCorso) params.append("nomeCorso", filters.nomeCorso);
		if (filters.teacher) params.append("teacher", filters.teacher);
		if (filters.materia) params.append("materia", filters.materia);
		if (filters.difficolta) params.append("difficolta", filters.difficolta);
		params.append("prezzo", filters.prezzo + "");	// Il prezzo lo passiamo a prescindere

		console.log(params.toString());

		queryGet<CorsiResponse>(`${hostName}${path}?${params.toString()}`)
			.then((r: CorsiResponse) => {
				console.log(r.message);
				setCorsi(r.listaCorsi);
			})
			.catch((err: Error) => {
				console.error(err.message);
			})
	}, [maxCost, hostName, path]);

	return {
		corsi,
		getCorsi,
		maxCost
	};
}