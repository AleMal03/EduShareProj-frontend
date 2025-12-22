import { useState, useEffect } from "react";
import { AggiungiCorso } from "./../components/AggiungiCorso"; 
import { type Corso as CorsoInterface, type User } from "./../data/data-model";
import { Corso } from "./../components/Corso";
import { hostName } from "./../App";
import { queryGet, queryPost } from "../data/queries";

interface MieiCorsiProps {
    currentUser: User | null;
}

interface CoursesResponse {
    courses: any[];
}

export default function MieiCorsi({ currentUser }: MieiCorsiProps) {
    const [corsi, setCorsi] = useState<CorsoInterface[]>([]);
    const [showAddCourseForm, setShowAddCourseForm] = useState(false);


    const aggiornaListaCorsi = (data: CoursesResponse) => {
        const corsiConvertiti: CorsoInterface[] = data.courses.map((item: any) => ({
            owner: item.owner,
            id: item.id,
            nome: item.nome,
            prezzo: item.prezzo,
            materia: item.materia,
            difficolta: item.difficolta,
            icona: "/miei_corsi/" + item.icona,
            files: []
        }));
        setCorsi(corsiConvertiti);
    };

    // --- GET INIZIALE ---
    const handleGetCorsi = () => {
        if (!currentUser) return;
        queryGet<CoursesResponse>(`${hostName}/miei_corsi?username=${currentUser.username}`)
            .then(aggiornaListaCorsi) 
            .catch((err) => console.error(err.message));
    };

    // --- RIMUOVI CORSO ---
    const handleRemoveCourse = (id: number) => {
        queryPost<CoursesResponse>(`${hostName}/miei_corsi/rimuovi`, { id })
            .then(aggiornaListaCorsi) 
            .catch((err) => console.error(err.message));
    };

    // --- AGGIUNGI CORSO ---
    const handleAddCourse = (nome: string, prezzo: number, materia: string, icona: string, difficolta: string) => {

        const corso: CorsoInterface = ({
            id: -1,
            owner: currentUser?.username ?? "",
            nome: nome,
            prezzo: prezzo,
            materia: materia,
            difficolta: difficolta,
            icona: icona,
            files: []
        });

        queryPost<CoursesResponse>(`${hostName}/miei_corsi/aggiungi`, corso)
            .then(aggiornaListaCorsi) 
            .catch((err) => console.error(err.message));
    };

    // --- USE EFFECT (Solo per il caricamento iniziale) ---
    useEffect(() => {
        handleGetCorsi();
    }, []); 

    return (
        <>
            <div>
                <h1>Corsi pubblicati di <strong>{currentUser?.nome} {currentUser?.cognome}</strong></h1>
                <button onClick={() => setShowAddCourseForm(true)}>Aggiungi Corso</button>
            </div>

            <div className="lista-corsi">
                {corsi.length > 0 && corsi.map((c) => (
                    <Corso 
                        key={c.id} 
                        permessi={"POSSIEDO"}
                        currentUser={currentUser}
                        corso={c}
                        removeCourse={() => handleRemoveCourse(c.id)} 
                        followCourse={() => { return }} 
                    />
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