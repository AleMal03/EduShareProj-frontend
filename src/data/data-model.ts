interface GenericUser{
	nome: string;
	cognome: string;
	username: string;
	email: string;
	eta?: number;
	nazionalita?: string;
	lingueParlate: string[];
	ruoli: string[];
	credito: number;
	fotoProfilo: string;
}


// User <- {Student, Teacher}

export type Student = GenericUser	// Student è espandibile

export interface Teacher extends GenericUser{
	aboutMe: string;
	titoliStudio: string[];
}

export type User = Student | Teacher;

export interface File{
	nome: string;
	path: string;
	icona: string;
}

export interface Corso{
	id: number;
	nome: string;
	prezzo: number;
	materia: string;
	difficolta: string;
	icona: string;
	files: File[];
}