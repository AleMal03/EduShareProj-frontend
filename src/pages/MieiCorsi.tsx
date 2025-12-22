import { useState, useEffect } from "react";
import { AggiungiCorso } from "./../components/AggiungiCorso"; 

import { type Corso as CorsoInterface, type User } from "./../data/data-model";
import { Corso } from "./../components/Corso";

interface MieiCorsiProps{
    currentUser: User | null;
}

export default function MieiCorsi({currentUser}: MieiCorsiProps) {
    // Stato per la lista dei corsi
    const [corsi, setCorsi] = useState<CorsoInterface[]>([]);

    // Stato per visibilità del form AggiungiCorso (glasspane)
    const [showAddCourseForm, setShowAddCourseForm] = useState(false);



    const handleAddCourse = (nome: string, icona: string, difficolta: string) => {};
    const handleRemoveCourse = (index: number) => {};



    useEffect(() => {
        if (!currentUser) return;

        const fetchCorsi = async () => {
            try {
                const response = await fetch(`http://localhost:7777/miei_corsi?username=${currentUser.username}`);
                
                if (response.ok) {
                    const data = await response.json();
                    
                    const corsiConvertiti: CorsoInterface[] = data.courses.map((item: any) => {
                        return(
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
                <h1>Corsi pubblicati di <strong>{currentUser?.name} {currentUser?.surname}</strong></h1>
                <button onClick={() => setShowAddCourseForm(true)}>Aggiungi Corso</button>
            </div>

            <div className="lista-corsi">
                {corsi.length > 0 && corsi.map((c) => (
                    <Corso  currentUser={currentUser}
                            corso={c} 
                            removeCourse={() => handleRemoveCourse(c.id)} 
                            followCourse={() => {return}}/>
                ))}
                
                {corsi.length === 0 && <p>Nessun corso trovato.</p>}
            </div>

            {showAddCourseForm && (
                <AggiungiCorso 
                    closeForm={() => setShowAddCourseForm(false)} 
                    addCourse={handleAddCourse} 
                />
            )}
        </>
    );
}