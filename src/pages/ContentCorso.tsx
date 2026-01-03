import { type ReactElement, useEffect, useState } from "react";
// Ho unito gli import delle interfacce per pulizia
import type { Corso as CorsoInterface, File } from "../data/data-model.ts";
import { queryGet } from "../data/queries.ts";
import "./../style/ContentCorso.css"; // Assicurati che il percorso sia corretto

interface ContentCorsoProps {
    hostName: string;
    corso: CorsoInterface;
    onDeactivateCourse: () => void;
}

interface FilesResponse {
    listaFiles: File[];
    message: string;
}

export default function ContentCorso({ hostName, corso, onDeactivateCourse }: ContentCorsoProps): ReactElement {
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        // Recupero i file dal server
        queryGet<FilesResponse>(`${hostName}/files?idCorso=${corso.id}`)
            .then((res) => {
                // Log opzionale per debug
                // console.log(res.message, res.listaFiles);
                setFiles(res.listaFiles ?? []);
            })
            .catch((err: Error) => console.error(err.message));
    }, [corso.id, hostName]);

    return (
        /* OVERLAY SFOCATO */
        <div className="glasspane">
            
            <div className="content-corso">
                
                {/* HEADER: Tasto indietro, Icona, Titolo */}
                <div className="content-corso-header">
                    <div className="backBtn" onClick={onDeactivateCourse} title="Torna indietro">
                        ←
                    </div>
                    <div className="iconaCorso">
                        <img src={`../../public/images/corsi/${corso.icona}`} alt="Icona Corso" />
                    </div>
                    <div className="titleCorso">
                        {corso.nome}
                    </div>
                </div>

                {/* BODY: Griglia dei file */}
                <div className="content-corso-body">
                    {files.length > 0 ? (
                        files.map((file) => (
                            <div className="fileCorso" key={file.id}>
                                {/* Icona del file */}
                                <img src={`../../public/images/files/${file.icona}`} alt="File" />
                                {/* Nome del file (va a capo se lungo) */}
                                <span>{file.nome}</span>
                            </div>
                        ))
                    ) : (
                        /* Feedback visivo se non ci sono file */
                        <p style={{ 
                            textAlign: 'center', 
                            color: 'var(--c-text-sub)', 
                            width: '100%', 
                            marginTop: '2rem' 
                        }}>
                            Nessun file presente in questo corso.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}