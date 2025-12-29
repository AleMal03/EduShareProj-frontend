import {type Corso as CorsoInterface} from "./data-model.ts"
import {useCallback, useEffect, useState} from "react";
import {queryGet} from "./queries.ts";

export interface Filtri {
	nomeCorso?: string,
	teacher?: string,
	materia?: string,
	difficolta?: string,
	prezzo?: number,
	rating?: number
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
        const params = new URLSearchParams();   // Gestore parametri GET
        
        const currentPrice = filters.prezzo ?? maxCost;

        // per aggiungere parametri solo se validi
        const appendIfValid = (key: string, value?: string | number) => {
            if (value === undefined || value === null) return;
            if (typeof value === 'string' && value.trim() === "") return;
            params.append(key, value.toString());
        };

        appendIfValid("nomeCorso", filters.nomeCorso);
        appendIfValid("teacher", filters.teacher);
        appendIfValid("materia", filters.materia);
        appendIfValid("difficolta", filters.difficolta);
		appendIfValid("rating", filters.rating);
        
        // Il prezzo c'è sempre
        params.append("prezzo", currentPrice.toString()); 

        console.log("Query Params:", params.toString());

        queryGet<CorsiResponse>(`${hostName}${path}?${params.toString()}`)
            .then((r: CorsiResponse) => {
                setCorsi(r.listaCorsi);
            })
            .catch((err: Error) => {
                console.error("Errore fetch corsi:", err.message);
            })
    }, [maxCost, hostName, path]);

	return {
        corsi,
        getCorsi,
        maxCost
    }

}