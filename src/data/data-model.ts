export interface User{
    id: number;
    name : string;
    surname : string;
    username : string;
    email: string;
    age : number;
    nationality: string;
    spoken_languages : string[];
}

export class UsersManagment{

    private users : User[];

    constructor(){
        this.users = [];
    }

    addNewUser(name: string, surname: string, username: string, email: string, age: number, nationality: string, spoken_languages: string[]): boolean{
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
            spoken_languages: spoken_languages
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


}