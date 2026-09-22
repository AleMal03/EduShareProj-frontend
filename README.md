# EduShare - Frontend Client

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

## 🎓 Contesto
Progetto sviluppato per il corso di Tecnologie Web presso il Corso di Laurea in Informatica dell'Università degli Studi di Torino.
Questo repository contiene l'interfaccia utente della piattaforma e-learning EduShare, un'applicazione web concepita come Single Page Application (SPA) e progettata per consumare in modo asincrono le API REST del server dedicato.

> ⚠️ **Architettura Disaccoppiata:** Questo repository contiene esclusivamente il Client Frontend sviluppato in React e TypeScript. 
> Il server di backend (Java/Spring Boot) associato a questo progetto è disponibile qui: [EduShare Backend](https://github.com/AleMal03/EduShareProj-backend)

## 🏗 Architettura & Stack Tecnologico
- **Framework:** Sviluppo UI basato su React 19.
- **Linguaggio:** TypeScript configurato in modalità `strict` per garantire type-safety, robustezza e prevenzione degli errori a tempo di compilazione.
- **Build tool:** Utilizzo di Vite per compilare e impacchettare il progetto.

## ✨ Funzionalità UI
* **Navigazione Reattiva:** Transizioni fluide tra le viste (Corsi, Dashboard, Modifica Profilo) garantite dall'architettura SPA.
* **Integrazione API:** Comunicazione asincrona con il backend per la gestione del fetching dei corsi (filtrati tramite il custom hook `useCorsi`) e la persistenza delle azioni utente.
* **Gestione Stato & Sicurezza:** Adattamento dinamico dell'interfaccia in base al ruolo dell'utente loggato (Docente / Studente).

## 🚀 Installazione e Avvio

**Prerequisiti di Sistema**
*   **Ambiente di esecuzione:** Node.js.
*   **Package Manager:** NPM.

**Setup dell'Ambiente**
1. Clonare il repository in locale e posizionarsi nella cartella radice:
   ```bash
   git clone https://github.com/AleMal03/EduShareProj-frontend
   cd EduShareProj-frontend
   ```
2. Installare le dipendenze del progetto definite nel `package.json`:
   ```bash
   npm install
   ```
3. Avviare l'ambiente in locale:
   ```bash
   npm run dev
   ```
Il client sarà accessibile all'indirizzo predefinito `http://localhost:5173`.
