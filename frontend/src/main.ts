import { displayLogin, displaySignup } from "./modules/display";
import { generateProfil } from "./modules/generat";
/* import { getPost } from "./modules/fetch"; */
import { logInUser } from "./modules/logIn.ts";
import { createAccount } from "./modules/createAccount.ts";


const buttonLog = document.getElementById('idBu') as HTMLButtonElement;
buttonLog.addEventListener('click', displayLogin);


/* const buttonPost = document.getElementById('post-button')as HTMLButtonElement;
buttonPost.addEventListener('click', submitPost); */

const sigupButton = document.getElementById('signupButton') as HTMLButtonElement;
sigupButton.addEventListener('click', displaySignup);

// Event listener for Log in Form
const loginFormButton = document.querySelector("#logInButton") as HTMLButtonElement;
loginFormButton.addEventListener("click", (event) => {
    event.preventDefault();
    logInUser();
})
// Event Listener for create account form
const createAccountFormButton = document.querySelector("#createAccountButton") as HTMLButtonElement;
createAccountFormButton.addEventListener("click", (event) => {
    event.preventDefault();
    createAccount();
})