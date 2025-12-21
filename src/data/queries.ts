/**
 * Centralizzazione della POST
 * @param path path su cui eseguire la query (host server)
 * @param data dati da passare nella POST
 */
export async function queryPost<T, B = unknown>(path:string, data:B):Promise<T>{
	return fetch(`${path}`,{
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json' // Dice al backend che invii JSON
		},
		body: JSON.stringify(data)
	})
		.then(async res => {
			if(res.ok)
				return res.json();
			else{
				// Se c'è un body JSON con il messaggio di errore (es. "Credenziali non valide"), lo leggiamo
				const errorData = await res.json().catch(() => ({}));
				// Lanciamo un errore che verrà catturato dal .catch() in fondo (nel componente)
				throw new Error(errorData?.message || `Errore richiesta: ${res.status}`);
			}
		})
		.then((d:T) => d)
}

/**
 * Centralizzazione della GET
 * @param path path su cui eseguire la query (host server)
 */
export async function queryGet<T>(path:string):Promise<T>{
	return fetch(`${path}`, {
		credentials: 'include'
	})
		.then(async res => {
			if(res.ok)
				return res.json();
			else{
				// Se c'è un body JSON con il messaggio di errore (es. "Credenziali non valide"), lo leggiamo
				const errorData = await res.json().catch(() => ({}));
				// Lanciamo un errore che verrà catturato dal .catch() in fondo (nel componente)
				throw new Error(errorData?.message || `Errore richiesta: ${res.status}`);
			}
		})
		.then((d:T) => d)
}