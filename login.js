const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const error = document.getElementById("error");

loginBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passInput.value.trim();

  if (!email || !password) {
    error.textContent = "Inserisci email e password";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // cerca utente
  let user = users.find(u => u.email === email);

  if (!user) {
    // crea nuovo utente
    user = { email, password, bestScore: 0 };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    // controlla password
    if (user.password !== password) {
      error.textContent = "Password errata";
      return;
    }
  }

  // salva utente corrente
  localStorage.setItem("currentUser", JSON.stringify(user));

  // vai al gioco
  window.location.href = "game.html";
});