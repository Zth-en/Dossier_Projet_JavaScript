let title = document.querySelector("#TAF1");
let expand_Colour = document.querySelector("body");
let form = document.querySelector('form');
let pseudo = document.querySelector('#pseudo');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let passwordRepeat = document.querySelector('#password2');
let successContainer = document.querySelector('.message-success');

function afficherErreur(champ, message) {
    let errorList = champ.nextElementSibling.querySelector('ul');
    champ.classList.remove('success');
    errorList.innerHTML = '';
    let err = document.createElement('li');
    err.innerText = message;
    errorList.appendChild(err);
}

function validerChamp(champ, validation, messageErreur) {
    if (!validation(champ.value)) {
        afficherErreur(champ, messageErreur);
        return false;
    } else {
        champ.classList.add('success');
        return true;
    }
}

function validerPseudo(pseudo) {
    return pseudo.length >= 6;
}

function validerEmail(email) {
    return email.includes("@") && email.includes(".");
}

function validerPassword(password) {
    return password.length >= 10 && 
           password.toLowerCase() !== password && 
           /\d/.test(password);
}

function validerPassword2(password, password2) {
    return password === password2;
}

title.addEventListener("click", function() {
    expand_Colour.classList.toggle('red');
});

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let pseudoValide = validerChamp(pseudo, validerPseudo, "Le champ pseudo doit contenir au moins 6 caractères");
    let emailValide = validerChamp(email, validerEmail, "Le champ email doit être valide");
    let passwordValide = validerChamp(password, validerPassword, "Le mot de passe doit faire 10 caractères minimum, contenir une minuscule, une majuscule et un chiffre");
    let password2Valide = validerChamp(passwordRepeat, (p) => validerPassword2(password.value, p), "Les mots de passe ne correspondent pas");

    if (pseudoValide && emailValide && passwordValide && password2Valide) {
        successContainer.classList.add('visible');
    } else {
        successContainer.classList.remove('visible');
    }
});

const champs = [pseudo, email, password, passwordRepeat];
const validations = [validerPseudo, validerEmail, validerPassword, (p) => validerPassword2(password.value, p)];
const messagesErreur = [
    "Le champ pseudo doit contenir au moins 6 caractères",
    "Le champ email doit être valide",
    "Le mot de passe doit faire 10 caractères minimum, contenir une minuscule, une majuscule et un chiffre",
    "Les mots de passe ne correspondent pas"
];

champs.forEach((champ, index) => {
    champ.addEventListener('input', () => validerChamp(champ, validations[index], messagesErreur[index]));
});

const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('tab-active'));

    const contents = document.querySelectorAll('.content');
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('tab-active');

    if (tab.classList.contains('tab-menu1')) {
      document.querySelector('.menu1').classList.add('active');
    } else if (tab.classList.contains('tab-menu2')) {
      document.querySelector('.menu2').classList.add('active');
    } else if (tab.classList.contains('tab-menu3')) {
      document.querySelector('.menu3').classList.add('active');
    }
  });
});