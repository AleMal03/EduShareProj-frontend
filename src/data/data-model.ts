export interface User{
    id: number;
    name : string;
    surname : string;
    username : string;
    email: string;
    age : number;
    nationality: string;
    spoken_languages : string[];
    corsi: Corso[];
}

export class UsersManagment{

    private users : User[];

    constructor(){
        this.users = [];
    }

    addNewUser(name: string, surname: string, username: string, email: string, age: number, nationality: string, spoken_languages: string[], corsi: Corso[]): boolean{
        if(this.users.find(u => u.email === email))
            return false;

        const newId = this.users.length + 1;

        // 3. Creo il nuovo oggetto User
        const newUser: User = {
            id: newId,
            name: name,          
            surname: surname,    
            username: username,
            email: email,
            age: age,
            nationality: nationality,
            spoken_languages: spoken_languages,
            corsi: corsi
        };

        this.users.push(newUser);
        return true;
    }

    getAllUsers(){
        return this.users.map(x => x);
    }

    getUserById(id: number): User | undefined{
        return this.users.find(u => u.id === id);
    } 

    getUsersByName(name: string): User[]{
        const filteredUsers : User[] = [];

        for(let u of this.users){
            if(u.name === name)
                filteredUsers.push(u);
        }

        return filteredUsers;
    }

    getUsersByNameAndSurname(name: string, surname: string): User[]{
        const filteredUsers : User[] = [];

        for(let u of this.users){
            if(u.name === name && u.surname === surname)
                filteredUsers.push(u);
        }

        return filteredUsers;
    }

    getUsersByNationality(nationality: string): User[]{
        const filteredUsers : User[] = [];

        for(let u of this.users){
            if(u.nationality === nationality)
                filteredUsers.push(u);
        }

        return filteredUsers;
    }

    getUsersByUsername(username: string): User[]{
        const filteredUsers : User[] = [];

        for(let u of this.users){
            if(u.username === username)
                filteredUsers.push(u);
        }

        return filteredUsers;
    }

    getAllCoursesByUsername(username: string): Corso[]{
        for(let i of this.users){
            if(i.username == username)
                return i.corsi;
        }

       return [];
    }

    addNewCourse(username: string, nome_corso: string, nome_icona: string, difficolta: string): boolean {
        const userTarget = this.users.find(u => u.username === username);

        if (!userTarget) 
            return false;

        const nuovoCorso = new Corso(userTarget.corsi.length+1, nome_corso, nome_icona, difficolta);
        userTarget.corsi.push(nuovoCorso);
        return true;
    }

    removeCourse(username: string, index: number): boolean{
        const userTarget = this.users.find(u => u.username === username);

        if (!userTarget) 
            return false;

        userTarget.corsi.find(() => userTarget.corsi.splice(index-1, 1));
        
        for(let i of userTarget.corsi)
            if(i.getIndex() >= index)
                i.setIndex(i.getIndex() - 1);

        return true;
    }


}


export interface Video{
    titolo: string;
    percorso: string;
}


export class Corso{
    private index: number;
    private nome: string;
    private percorso_icona: string;
    private difficolta: string;
    private video: Video[];

    constructor(index: number, nome: string, nome_icona: string, difficolta: string){
        this.index = index;
        this.nome = nome;
        this.percorso_icona = "./public/miei_corsi/" + nome_icona;
        this.difficolta = difficolta
        this.video = [];
    }

    getIndex(){
        return this.index;
    }

    setIndex(index: number){
        this.index = index;
    }

    getNome(){
        return this.nome;
    }

    getDifficolta(){
        return this.difficolta;
    }

    getNumberOfVideos(){
        return this.video.length;
    }

    getPercorsoIcona(){
        return this.percorso_icona;
    }

    setDifficolta(difficolta: string){
        this.difficolta = difficolta;
    }

    setNomeIcona(nome: string){
        this.percorso_icona = this.percorso_icona + nome;
    }

    getAllVideo(){
        return this.video.map((x) => x);
    }

    addNewVideo(video: Video){
        this.video.push(video);
    }

    removeVideoByIndex(index: number){
        this.video.splice(index, 1);
    }

}
