import { displayLogin, displaySignup, displayInput } from "./modules/display";
import { generateProfil, generateLatestPost, generateCategories } from "./modules/generat";
/* import { getPost } from "./modules/fetch"; */
import { fetchData, logInUser } from "./modules/logIn.ts";
import { createAccount } from "./modules/createAccount.ts";



const buttonLog = document.getElementById('idBu') as HTMLButtonElement;
buttonLog.addEventListener('click', displayLogin);

// !
// const buttonSignUp = document.getElementById('logInButton') as HTMLButtonElement;
// buttonSignUp.addEventListener('click', generateProfil);

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

const createAccountFormButton = document.querySelector("#createAccountButton") as HTMLButtonElement;
createAccountFormButton.addEventListener("click", (event) => {
    event.preventDefault();
    createAccount();
})


const iconHome = document.getElementById('iconHeader')as HTMLImageElement;
iconHome.addEventListener('click', () => {
    generateCategories();
    generateLatestPost();
    displayInput();

} );
