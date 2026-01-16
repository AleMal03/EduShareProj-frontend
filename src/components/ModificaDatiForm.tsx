import {type ReactElement, useState} from "react";
import "../style/GlasspaneForm.css"

interface ModificaDatiFormProps{
    onConfirm:(oldS:string, newS:string) => void;
	onCancel: () => void;
    field: string;
    value_field: string;
	errorMsg: string;
}

export function ModificaDatiForm({onConfirm, onCancel, field, value_field, errorMsg}: ModificaDatiFormProps): ReactElement {
	const [newDato, setNewDato] = useState("");
	const [oldDato, setOldDato] = useState(value_field);

    return (
	<div className="modal-overlay" onMouseDown={(e) => {
		if(e.target === e.currentTarget) onCancel();
	}}>
		<div className = "glasspane">
			<form className="modify-data-request">
				<h1>Modifica Dato: {field}</h1>
				<div>
					{field.toLowerCase() === "password" &&
						<>
							<input type="password" placeholder="Vecchia password" name="oldPsw"
											onChange={(e) => {setOldDato(e.currentTarget.value);}}/>
							<input type="password" placeholder="Nuova password" name="newPsw"
											onChange={(e) => {setNewDato(e.currentTarget.value);}}/>
						</>
					}
					{field.toLowerCase() === "descrizione" &&
						<textarea defaultValue={value_field} name={field.toLowerCase()} placeholder="Descrizione..." maxLength={500}
								  onChange={(e) => {setNewDato(e.currentTarget.value);}}/>
					}
					{field.toLowerCase() !== "password" && field.toLowerCase() !== "descrizione" &&
						<input type="text" placeholder={"Inserire " + field} name={field.toLowerCase()}
										onChange={(e) => {setNewDato(e.currentTarget.value);}}/>
					}
				</div>

				{/* Per visualizzare il messaggio di errore*/}
				{errorMsg != "" && <div className="errorMessage"> {errorMsg} </div>}

				<div className="actions">
					<div className="form-action cancel" onClick = {() => onCancel()}>Annulla</div>
					<div className="form-action ok" onClick={() => onConfirm(oldDato, newDato)}>Modifica</div>
				</div>


			</form>
		</div>
	</div>
    );
}
