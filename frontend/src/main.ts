import { displayLogin, displaySignup } from "./modules/display";
import {
  generateProfil,
  generateLatestPost,
  generateCategories,
} from "./modules/generat";
/* import { getPost } from "./modules/fetch"; */
import { logInUser, userData } from "./modules/logIn.ts";
import { createAccount } from "./modules/createAccount.ts";
import { createPost } from "./modules/createPosts.ts";

const buttonLog = document.getElementById("idBu") as HTMLButtonElement;
buttonLog.addEventListener("click", displayLogin);

const sigupButton = document.getElementById(
  "signupButton"
) as HTMLButtonElement;
sigupButton.addEventListener("click", displaySignup);

// Event listener for Log in Form
const loginFormButton = document.querySelector(
  "#logInButton"
) as HTMLButtonElement;
loginFormButton.addEventListener("click", (event) => {
  event.preventDefault();
  logInUser();
});
// Event Listener for create account form
const createAccountFormButton = document.querySelector(
  "#createAccountButton"
) as HTMLButtonElement;
createAccountFormButton.addEventListener("click", (event) => {
  event.preventDefault();
  createAccount();
});

// const iconHome = document.getElementById("iconHeader") as HTMLImageElement;
// iconHome.addEventListener("click", () => {
//   if (userData) {
//     //generateCategories();
//     generateProfil(userData);
//   } else {
//     generateLatestPost();
//   }
// });

if (userData) {
  //generateCategories();
  generateProfil(userData);
} else {
  generateLatestPost();
}

// For not logged in users to be able to view posts
generateLatestPost();
generateCategories();
