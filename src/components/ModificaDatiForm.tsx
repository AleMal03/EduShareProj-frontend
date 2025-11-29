import type {ReactElement} from "react";
import {useState} from "react";

interface ModificaDatiForm{
    setIsActive: (b: boolean) => void;
    field: string;
    value_field: string;
}

export function ModificaDatiForm({setIsActive, field, value_field}: ModificaDatiForm): ReactElement {
    const [hide, setHide] = useState<boolean>(false);

    const hideClasses = ["glasspane", "hide"];
    const notHideClasses = "glasspane";
    setIsActive(!hide);

    return (
    <div className = {hide ? hideClasses.join(" ") : notHideClasses} onClick = {() => setHide(true)}>
        <form className="create-collection-request" onClick = {(e) => {e.stopPropagation()}}>

            <h1>Modifica Dato: {field}</h1>
            <div>
                <input type="text" placeholder={"Nuovo " + field} name={field.toLowerCase()} defaultValue={value_field}/>
            </div>
            <div className="actions">
                <div className="form-action ok">Modifica</div>
                <div className="form-action cancel" onClick = {() => setHide(true)}>Annulla</div>
            </div>

        </form>
    </div>
    );
}
