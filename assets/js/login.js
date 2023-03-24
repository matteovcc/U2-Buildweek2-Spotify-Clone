const correctUsername = "Epicode";
const correctEmail = "epicode@epicode.it";
const correctPassword = "Epicode";
const passwordInput = document.getElementById("passControl");
const showPassBtn = document.getElementById("showPass");
const rememberMe = document.getElementById("check1");
const inputEmail = document.getElementById("inputEmail");

window.onload = () => {
  if (localStorage.getItem("username") && localStorage.getItem("password")) {
    inputEmail.value = localStorage.getItem("username");
    passwordInput.value = localStorage.getItem("password");
  }
};

function showPass() {
  let input = document.getElementById("passControl");
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}
showPassBtn.addEventListener("click", showPass);

function saveCredentials(event) {
  event.preventDefault();
  const username = document.getElementById("inputEmail").value;
  const password = passwordInput.value;
  const checked = rememberMe.checked;
  if (
    checked &&
    (username === correctUsername || username === correctEmail) &&
    passwordInput.value === correctPassword
  ) {
    localStorage.setItem("password", password);
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", saveCredentials);
function checkCredentials(event) {
  event.preventDefault();
  const username = document.getElementById("inputEmail").value;
  if ((username === correctUsername || username === correctEmail) && passwordInput.value === correctPassword) {
    localStorage.setItem("username", username);
    window.location.href = "index.html";
  } else {
    alert("Nome utente o password errati!");
    window.location.href = "loginPage.html";
  }
}

document.getElementById("accedi").addEventListener("click", function (event) {
  checkCredentials(event);
  saveCredentials(event);
});
