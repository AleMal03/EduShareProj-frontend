import { useState, useEffect } from "react";
import { Corso as CorsoInterface, type User } from "./../data/data-model";
import { Corso } from "./../components/Corso";

interface CorsiCompratiProps{
    currentUser: User | null;
}

export default function CorsiComprati({currentUser}: CorsiCompratiProps) {
    // Stato per la lista dei corsi
    const [corsi, setCorsi] = useState<CorsoInterface[]>([]);

    const handleFollowCourse = (index: number) => {};

    useEffect(() => {
        if (!currentUser) return;

        const fetchCorsi = async () => {
            try {
                const response = await fetch(`http://localhost:7777/corsi_seguiti?username=${currentUser.username}`);
                
                if (response.ok) {
                    const data = await response.json();
                    
                    const corsiConvertiti = data.courses.map((item: any) => {
                        return new CorsoInterface(
                            item.id,
                            item.nome,
                            item.materia,
                            item.prezzo,
                            item.difficolta,
                            item.icona,
                            item.owner
                        );
                    });
                    setCorsi(corsiConvertiti); 

                } else {
                    console.error("Errore server:", response.status);
                }
            } catch (error) {
                console.error("Errore di connessione:", error);
            }
        };

        fetchCorsi();
    });


    return (
        <>
            <div>
                <h1>Corsi seguiti di <strong>{currentUser?.name} {currentUser?.surname}</strong></h1>
            </div>

            <div className="lista-corsi">
                {corsi.length > 0 && corsi.map((c) => (
                    <Corso  currentUser={currentUser}
                            corso={c} 
                            removeCourse={() => {return}} 
                            followCourse={() => handleFollowCourse(c.id)}/>
                ))}
                
                {corsi.length === 0 && <p>Nessun corso seguito.</p>}
            </div>

        </>
    );
}