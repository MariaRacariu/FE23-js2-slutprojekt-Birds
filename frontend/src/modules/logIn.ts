import { generateProfil } from "./generat.ts";

const databaseLinkLogIn = "http://localhost:3000/login";

const userNameElement = document.querySelector("#loginFormUsername") as HTMLInputElement;
const passwordElement = document.querySelector("#logInFormPassword") as HTMLInputElement;

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
                // console.log(response.json());
                response.json().then((data) => {
                    // console.log(data);

                    // Send log in response data to generate a users profile information
                    generateProfil(data);
                })
            })
    }

    checkUserExists({ username: userNameInput, password: passwordInput });
}