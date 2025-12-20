export interface User{
    name: string;
	surname: string;
	username: string;
	email: string;
    age?: number;
    nationality?: string;
    spokenLanguages: string[];
}


// User <- {Student, Teacher}

export interface Student extends User{
	role: "STUDENT";	// Discriminante
}

export interface Teacher extends User{
	role: "TEACHER";	// Discriminante
	aboutMe: string;
	titoliStudio: string[];
}

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