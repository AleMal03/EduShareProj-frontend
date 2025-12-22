import { useState, useEffect } from "react";
import type { Corso as CorsoInterface, User } from "./../data/data-model";
import { Corso } from "./../components/Corso";
import { queryGet, queryPost } from "../data/queries";
import { hostName } from "../App";

interface CorsiCompratiProps{
    currentUser: User | null;
}

export default function CorsiComprati({currentUser}: CorsiCompratiProps) {
    // Stato per la lista dei corsi
    const [corsi, setCorsi] = useState<CorsoInterface[]>([]);

    const handleFollowCourse = (index: number) => {};


    interface CoursesResponse {
            courses: any[]; 
        }
    
        const handleGetCorsiSeguiti = () => {
            if (!currentUser) return;
    
            queryGet<CoursesResponse>(`${hostName}/corsi_seguiti?username=${currentUser.username}`)
                .then((data) => {
                    
                    const corsiConvertiti: CorsoInterface[] = data.courses.map((item: any) => {
                        return {
                            owner: item.owner,
                            id: item.id,
                            nome: item.nome,
                            prezzo: item.prezzo,
                            materia: item.materia,
                            difficolta: item.difficolta,
                            icona: "/miei_corsi/" + item.icona,
                            files: []
                        };
                    });
    
                    setCorsi(corsiConvertiti); 
                })
                .catch((err: Error) => {
                    console.error(err.message);
                });
        };
    
    
        useEffect(handleGetCorsiSeguiti, []);


    return (
        <>
            <div>
                <h1>Corsi seguiti di <strong>{currentUser?.nome} {currentUser?.cognome}</strong></h1>
            </div>

            <div className="lista-corsi">
                {corsi.length > 0 && corsi.map((c) => (
                    <Corso  permessi={"SEGUITO"}
                            currentUser={currentUser}
                            corso={c} 
                            removeCourse={() => {return}} 
                            followCourse={() => handleFollowCourse(c.id)}/>
                ))}
                
                {corsi.length === 0 && <p>Nessun corso seguito.</p>}
            </div>

        </>
    );
}