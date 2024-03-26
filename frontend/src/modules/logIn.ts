import { append } from "domutils";
import { generateProfil } from "./generat.ts";

const databaseLinkLogIn = "http://localhost:3000/login";

const userNameElement = document.querySelector("#loginFormUsername") as HTMLInputElement;
const passwordElement = document.querySelector("#logInFormPassword") as HTMLInputElement;

const loginForm = document.querySelector("#loginForm") as HTMLElement;
const errorMessageElement = document.createElement("p");
loginForm.append(errorMessageElement);

export function logInUser() {
    const userNameInput = userNameElement.value;
    const passwordInput = passwordElement.value;

    // console.log(passwordInput, userNameInput);

    interface User {
        username: string,
        password: string
    }

    function checkUserExists(user: User): Promise<void> {
        const requestData: RequestInit = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        }

        return fetch(databaseLinkLogIn, requestData)
            .then(response => {
                response.json().then((data) => {
                    console.log(data);
                    if (data.error === "Wrong Password" || data.error === "User not found") {
                        errorMessageElement.innerText = "";
                        const errorMessage = "Wrong Username or Password";
                        errorMessageElement.innerText = errorMessage;
                        errorMessageElement.style.color = "red";
                    } else {
                        // Send log in response data to generate a users profile information
                        generateProfil(data);
                    }

                })
            })
    }

    checkUserExists({ username: userNameInput, password: passwordInput });
}