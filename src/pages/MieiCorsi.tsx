import { useState } from "react";
import { AggiungiCorso } from "./../components/AggiungiCorso"; 

import { user_mgr } from "./../data/data";
import type { Corso as CorsoInterface, User } from "./../data/data-model";
import { Corso } from "./../components/Corso";

export default function MieiCorsi() {
    const id_user = 1;
    const user: User | undefined = user_mgr.getUserById(id_user);
    
    // Stato per la lista dei corsi
    const initialCorsi = user ? user_mgr.getAllCoursesByUsername(user.username) : [];
    const [corsi, setCorsi] = useState<CorsoInterface[]>(initialCorsi);

    // Stato per visibilità del form AggiungiCorso (glasspane)
    const [showAddCourseForm, setShowAddCourseForm] = useState(false);



    const handleAddCourse = (nome: string, icona: string, difficolta: string) => {
        if (!user) return;

        // Aggiungo al "Database" (usersManager)
        const success = user_mgr.addNewCourse(user.username, nome, icona, difficolta);

        if (success) {
            const corsiAggiornati = user_mgr.getAllCoursesByUsername(user.username);
            setCorsi([...corsiAggiornati]);
        }
    };


    const handleRemoveCourse = (index: number) => {
        if(!user) return;

        const success = user_mgr.removeCourse(user.username, index);

        if (success) {
            const corsiAggiornati = user_mgr.getAllCoursesByUsername(user.username);
            setCorsi([...corsiAggiornati]);
        }
    };


    return (
        <>
            <div>
                <h1>Corsi pubblicati di <strong>{user?.name} {user?.surname}</strong></h1>
                <button onClick={() => setShowAddCourseForm(true)}>Aggiungi Corso</button>
            </div>

            <div className="lista-corsi">
                {corsi.length > 0 && corsi.map((c) => (
                    <Corso  professore={user?.username}
                            corso={c} 
                            gestione={[true, () => handleRemoveCourse(c.getIndex())]} />
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