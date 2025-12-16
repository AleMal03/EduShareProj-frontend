import {type ReactElement, useState} from "react";

interface ModificaDatiFormProps{
    onConfirm:(s:string) => void;
	onCancel: () => void;
    field: string;
    value_field: string;
}

export function ModificaDatiForm({onConfirm, onCancel, field, value_field}: ModificaDatiFormProps): ReactElement {
	const [dato, setDato] = useState("");

    return (
    <div className = "glasspane" onClick = {(e) => {
		if(e.target === e.currentTarget) onCancel();
	}}>
        <form className="create-collection-request">
            <h1>Modifica Dato: {field}</h1>
            <div>
                <input type="text" placeholder={"Nuovo " + field} name={field.toLowerCase()} defaultValue={value_field} value={dato} onChange={(e) => {
					setDato(e.currentTarget.value);
				}}/>
            </div>
            <div className="actions">
                <div className="form-action cancel" onClick = {() => onCancel()}>Annulla</div>
                <div className="form-action ok" onClick={() => onConfirm(dato)}>Modifica</div>
            </div>

        </form>
    </div>
    );
}
