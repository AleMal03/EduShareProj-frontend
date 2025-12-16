import type {ReactElement} from "react";

export default function Footer(): ReactElement {
    return (
    <footer>
        <p className="copy">
            <span className="highlight">EduShare</span> è un progetto no profit realizzato per il corso di
            Tecnologie Web,
            CdL in Informatica,
            Università di Torino.
        </p>
        <p className="license">&copy; 2025-2026 Mallardi Alessandro & Stridi Simone <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.it"><img alt="creative commons license"
                                                                                  className="cclicense"
                                                                                  src="/images/by-nc-sa.png"/></a>
        </p>
        <p className="credits"><a href="https://www.flaticon.com/free-icons/down-arrow"
                                  title="down arrow icons">Down arrow icons created by Roundicons - Flaticon</a></p>
    </footer>
    );
}
