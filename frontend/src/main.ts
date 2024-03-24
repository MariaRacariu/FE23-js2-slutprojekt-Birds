import { displayLogin, displaySignup } from "./modules/display";
import { generateProfil } from "./modules/generat";
/* import { getPost } from "./modules/fetch"; */


const buttonLog = document.getElementById('idBu')as HTMLButtonElement;
buttonLog.addEventListener('click', displayLogin);

const buttonSignUp = document.getElementById('signup-button')as HTMLButtonElement;
buttonSignUp.addEventListener('click', generateProfil);

/* const buttonPost = document.getElementById('post-button')as HTMLButtonElement;
buttonPost.addEventListener('click', submitPost); */

const sigupButton = document.getElementById('signupButton')as HTMLButtonElement;
sigupButton.addEventListener('click', displaySignup);