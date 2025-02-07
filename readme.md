# E-commerce Application

Questo è un progetto di e-commerce sviluppato con una struttura full-stack che include un backend Node.js con Express e un frontend React. Il progetto è ancora in WIP ed utilizza Stripe per i pagamenti, un database per la gestione degli oggetti (prodotti) e include funzionalità di login, registrazione e logout.

## Struttura del Progetto

Il progetto è diviso in due principali directory:

- **`backend/`**: Contiene il server Express che gestisce le API, la logica del backend, l'autenticazione, e l'integrazione con Stripe.
- **`frontend/`**: Contiene il frontend React che consente agli utenti di interagire con il sito, visualizzare i prodotti e effettuare il pagamento.

## Funzionalità

### Backend

- **Gestione degli utenti**:
  - **Registrazione (Sign Up)**: Gli utenti possono registrarsi creando un account.
  - **Login**: Gli utenti possono effettuare il login con le proprie credenziali.
  - **Logout**: Gli utenti possono effettuare il logout dal sistema.
  
- **Gestione dei prodotti**: Il backend gestisce un database di prodotti che gli utenti possono visualizzare. Ogni prodotto è un oggetto con informazioni come nome, prezzo, descrizione, ecc.

- **Integrazione con Stripe**: 
  - **Creazione di Payment Intent**: Viene creato un `PaymentIntent` per gestire i pagamenti tramite Stripe.
  - **Pagamento**: Gli utenti possono completare il pagamento per i loro acquisti tramite un modulo di pagamento Stripe.

### Frontend

- **Visualizzazione dei prodotti**: Gli utenti possono esplorare i prodotti disponibili nel sistema.
- **Autenticazione**:
  - Gli utenti possono registrarsi e accedere con le proprie credenziali.
  - Gli utenti possono uscire dal sistema tramite il logout.
- **Checkout con Stripe**: Gli utenti possono pagare tramite il modulo di pagamento Stripe.
- **Responsive Design**: Il sito è progettato per essere mobile-friendly e si adatta a vari dispositivi.

## Tecnologie Utilizzate

### Backend
- **Node.js**
- **Express.js**
- **Stripe API**
- **MySQL (o altro database)**

### Frontend
- **React**
- **Stripe React Library**
- **Bootstrap 5** (per lo stile)

## Installazione e Avvio

### Backend

1. Vai alla cartella `backend/` e installa le dipendenze:
   ```bash
   cd backend
   npm install

2. Crea un file .env nella cartella backend/ con le variabili necessarie:

    ```
    STRIPE_SECRET_KEY=your_stripe_secret_key
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=ecommerce
    JWT_SECRET=your_jwt_secret_key

3. Avvia il server tramite lo script
    ```bash
    npm run dev

### Frontend

1. Vai nella cartella frontend/ e installa le dipendenze:
    ```bash
    cd frontend
    npm install

2. Crea un file .env nella cartella frontend/ e aggiungi la tua chiave pubblica di Stripe:
    ```
    REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key

3. Avvia il server frontend:
    ```bash
    npm run dev


