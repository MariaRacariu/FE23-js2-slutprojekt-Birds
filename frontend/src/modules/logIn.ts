import { generateCategories } from "./generate.categories";
import { generateProfil } from "./generate.profile";



const databaseLinkLogIn = "http://localhost:3000/auth/login";

const userNameElement = document.querySelector(
  "#loginFormUsername"
) as HTMLInputElement;
const passwordElement = document.querySelector(
  "#logInFormPassword"
) as HTMLInputElement;

const loginForm = document.querySelector("#loginForm") as HTMLElement;
const errorMessageElement = document.createElement("p");
loginForm.append(errorMessageElement);

export interface UserData {
  username: string;
  profile_pic: string;
}

export let userData: UserData = JSON.parse(
  window.localStorage.getItem("forum_userdata") || "null"
);

export function logInUser() {
  const userNameInput = userNameElement.value;
  const passwordInput = passwordElement.value;

  // console.log(passwordInput, userNameInput);
  interface User {
    username: string;
    password: string;
  }

  function checkUserExists(user: User): Promise<void> {
    const requestData: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    };

    return fetch(databaseLinkLogIn, requestData).then((response) => {
      response.json().then((data) => {
        console.log(data);
        if (
          data.error === "Wrong Password" ||
          data.error === "User not found"
        ) {
          errorMessageElement.innerText = "";
          const errorMessage = "Wrong Username or Password";
          errorMessageElement.innerText = errorMessage;
          errorMessageElement.style.color = "red";
        } else {
          const logOutButton = document.querySelector("#logOutButton") as HTMLButtonElement;
          logOutButton.style.visibility = "visible";

          const logInButton = document.querySelector("#idBu") as HTMLButtonElement;
          logInButton.style.visibility = "hidden";

          const SignUpButton = document.querySelector("#signupButton") as HTMLButtonElement;
          SignUpButton.style.visibility = "hidden";


          const profileDeleteButton = document.querySelector("#deleteAccountButtonContainer") as HTMLButtonElement;
          profileDeleteButton.value = "";
          profileDeleteButton.value = data.username;
          userData = data;
          window.localStorage.setItem("forum_userdata", JSON.stringify(data));
          generateProfil(data);
          generateCategories();
        }
      });
    });
  }

  checkUserExists({ username: userNameInput, password: passwordInput });
}
