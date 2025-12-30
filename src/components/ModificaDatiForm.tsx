import {type ReactElement, useState} from "react";
import "../style/ModificaDatiForm.css"

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
    <div className = "glasspane" onMouseDown={(e) => {
		if(e.target === e.currentTarget) onCancel();
	}}>
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
					<textarea defaultValue={value_field} name={field.toLowerCase()} placeholder="Descrizione..."
							  onChange={(e) => {setNewDato(e.currentTarget.value);}}/>
				}
				{field.toLowerCase() !== "password" && field.toLowerCase() !== "descrizione" &&
					<input type="text" placeholder={"Inserire " + field} name={field.toLowerCase()}
									onChange={(e) => {setNewDato(e.currentTarget.value);}}/>
				}
			</div>
            <div className="actions">
                <div className="form-action cancel" onClick = {() => onCancel()}>Annulla</div>
                <div className="form-action ok" onClick={() => onConfirm(oldDato, newDato)}>Modifica</div>
            </div>

			{/* Per visualizzare il messaggio di errore*/}
			{errorMsg != "" && <div className="errorMessage"> {errorMsg} </div>}

        </form>
    </div>
    );
}
