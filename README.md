# Documentazione del Progetto – Snake Game

## Descrizione Generale
Il progetto è un semplice **Snake Game** sviluppato con **HTML, CSS e JavaScript**.  
Il giocatore controlla un serpente che si muove su una griglia, mangia cibo per aumentare il punteggio e cresce in lunghezza.  
La partita termina quando il serpente collide con se stesso o con i bordi.

---

## Gestione Utenti

Il gioco utilizza **localStorage** per salvare e gestire gli utenti.  
Sono presenti due chiavi principali:

- **users** → contiene l’elenco completo degli utenti registrati  
- **currentUser** → contiene l’utente attualmente loggato

###  Flusso Utente
1. L’utente effettua il login.  
2. Il sistema cerca l’utente nell’array `users`.  
3. L’utente trovato viene salvato in `currentUser`.  
4. Durante il gioco, se viene superato il best score, i dati vengono aggiornati.  
5. Sia `users` che `currentUser` vengono risalvati nel localStorage.

---

##  Aggiornamento del Best Score

Quando il giocatore ottiene un nuovo record:

- `currentUser.bestScore` viene aggiornato  
- si trova l’indice dell’utente corrispondente in `users` tramite `findIndex`  
- l’utente aggiornato sostituisce quello precedente nell’array  
- entrambi i valori vengono salvati nel localStorage  

Questo garantisce che:

- il gioco usi subito i dati aggiornati (tramite `currentUser`)  
- la lista utenti rimanga coerente (tramite `users`)

---

## Funzionamento del Gioco

- Il movimento del serpente è gestito tramite `setInterval`, il cui ID viene salvato nella variabile `game`.  
- Il timer viene fermato con `clearInterval(game)` quando necessario.  
- La funzione `draw()` aggiorna:
  - la posizione del serpente  
  - la posizione del cibo  
  - le collisioni  
  - il punteggio  

---

## Tecnologie Utilizzate

- **HTML** → struttura della pagina  
- **CSS** → grafica e layout  
- **JavaScript** → logica del gioco e gestione utenti  

---

## Obiettivo del Progetto

Realizzare un gioco semplice ma completo, con:

- gestione utenti  
- salvataggio dei dati  
- interfaccia intuitiva  
- logica di gioco fluida  