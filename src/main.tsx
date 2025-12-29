import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import App from './App.tsx'

// Salva la funzione originale per poterla ripristinare se serve
const originalLog = console.log;

// Funzione per attivare/disattivare i log (warn ed err saranno ancora attivi!)
const toggleLogs = (enable: boolean) => {
	if (enable) {
		console.log = originalLog;
	} else {
		console.log = () => {}; // Funzione vuota (noop)
	}
};

toggleLogs(false);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
