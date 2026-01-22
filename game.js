const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// recupera utente loggato
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  // se non loggato torna al login
  window.location.href = "index.html";
}

document.getElementById("userEmail").textContent = currentUser.email;
document.getElementById("bestScore").textContent = currentUser.bestScore;

let box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];  //cosi lo faccio partire al centro
let direction = "RIGHT";
let food = randomFood();
let score = 0;
let game = null;
let gameRunning = false;

// Aggiungi listener ai tasti
document.addEventListener("keydown", changeDirection);

// Aggiungi listener al pulsante start
document.getElementById("startBtn").addEventListener("click", startGamePlay);

function startGamePlay() {
  if (!gameRunning) {
    gameRunning = true;
    document.getElementById("startBtn").textContent = "PAUSA"; //cambia testo del bottone 
    game = setInterval(draw, 150); //il gioco è avviato quindi ogni 150 ms chiamo la funzione draw che ridisegna tutto
                                   //game è una variabile globale che mi serve per fermare il gioco quando voglio, ha dentro l'id del timer 
  } else {
    gameRunning = false;
    document.getElementById("startBtn").textContent = "RIPRENDI";
    clearInterval(game); //ferma la chiamata continua della funzione draw
  }
}

function changeDirection(e) {
  if (e.key === "w" && direction !== "DOWN") direction = "UP";
  else if (e.key === "s" && direction !== "UP") direction = "DOWN";
  else if (e.key === "a" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "d" && direction !== "LEFT") direction = "RIGHT";
}

function randomFood() {
  return {
    //genero le coordinate random per la mela
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
}

function draw() {
  //pulisco tutto e ridiscegno tutto ogni 150 ms
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, 400, 400); //ridipingo tutto il canvas ogni volta (ogni 150 ms) per pulirlo

  // bordo mortale
  ctx.strokeStyle = "#ff00ff";
  ctx.lineWidth = 8;
  ctx.strokeRect(0, 0, 400, 400); //disegno il bordo esterno, gli passo x y larghezza e altezza (400 px *400 px), anche questo ogni 150 ms

  // cibo
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box); //dopo che ho generato le coordinate random della mela la disegno in coordinate x y , sempre 20 px *20 px

  // serpente
  ctx.fillStyle = "lime";
  snake.forEach(part => ctx.fillRect(part.x, part.y, box, box));  //fillrect(x,y,larghezza,altezza), disegno ogni parte del serprente leggendo la x e la y
                                                                  //dell'array snake, quindi testa [0] , corpo e coda e poi gli passo la grandezza che dovr avere
                                                                  //ogni quadrato quindi 20 px*20 px

  // movimento
  let head = { ...snake[0] };    //creo la nuova testa copiando tutte le proprieta della testa attuale


  //lo (0;0) è in alto a sinistra quindi per salire diminuisco y e per scendere aumento y, x a sinistra diminuisce  e a destra aumenta
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;

  // controllo se la nuova testa collide con i bordi
  if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
    return gameOver();
  }

  // controllo se la nuova testa collide con il resto del corpo
  if (snake.some(part => part.x === head.x && part.y === head.y)) //head.x e head.y sono le coordinate della nuova testa, controlla se collide con parti dell'array quindi 
                                                                  //testa corpo o coda 
    {
    return gameOver();
  }

  //aggiungo la nuova testa all'inizio dell'array che è il serpente
  snake.unshift(head);  

  // se la testa si posiziona sulla casella con la mela, aumento lo score e genero una nuova mela con coordinate random
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("currentScore").textContent = score;
    food = randomFood();
  } else {
    //se non mangia niente rimuove l'ultima parte del serpente per simulare il movimento dato che ce una nuova testa con nuove coordinate
    snake.pop();
  }
}

function gameOver() {
  clearInterval(game);
  alert("Game Over!");

  // aggiorna best score
  if (score > currentUser.bestScore) {
    currentUser.bestScore = score;

    let users = JSON.parse(localStorage.getItem("users")); //prendo tutti gli utenti salvati nel localstorage,users è un array di oggetti
    let index = users.findIndex(u => u.email === currentUser.email);//trova nell'array degli utenti l'indice dell'utente attuale confrontando le email
    users[index] = currentUser;

    //setItem(key,value) salva un dato con un nome e il valore, lo rendo stringa e lo salvo

    //imposto i valori di currentUser a User e poi lo salvo nell'array users
    localStorage.setItem("users", JSON.stringify(users));

    //salvo l'utente attuale loggato nel localstorage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  window.location.reload();
}