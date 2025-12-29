import {type ReactElement, useEffect, useState} from "react";
import type {Corso as CorsoInterface} from "../data/data-model.ts"
import type {File} from "../data/data-model.ts"
import {queryGet} from "../data/queries.ts";
import "../style/ContentCorso.css"

interface ContentCorsoProps{
	hostName:string,
	corso:CorsoInterface,
	onDeactivateCourse:()=>void,
}

interface FilesResponse{
	listaFiles:File[],
	message:string,
}

export default function ContentCorso({hostName, corso, onDeactivateCourse}:ContentCorsoProps):ReactElement{
	const [files, setFiles] = useState<File[]>([]);

	useEffect(() => {
		queryGet<FilesResponse>(`${hostName}/files?idCorso=${corso.id}`)
			.then((res) => {
				console.log(res.message + ": " + res.listaFiles)
				setFiles(res.listaFiles ?? []);
			})
			.catch((err:Error)=>console.error(err.message))
	}, [corso.id, hostName]);

	return (
		<div className="glasspane">
			<div className="content-corso">
				<div className="content-corso-header">
					<div className="backBtn" onClick={() => onDeactivateCourse()}>
						←
					</div>
					<div className="iconaCorso"> <img src={`../../public/miei_corsi/${corso.icona}`} alt="Icona"/> </div>
					<div className="titleCorso"> {corso.nome} </div>
				</div>
				<div className="content-corso-body">
					{files.map((file) =>
						<div className="fileCorso" key={file.id}>
							<img src={`../../public/files/${file.icona}`} alt="Icona file"/>
							<span>{file.nome}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}