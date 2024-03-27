import { generateProfil } from "./generat.ts";

const databaseLinkCreateAccount = "http://localhost:3000/users";

interface User {
    username: string,
    password: string,
    profile_pic: string
}

export let userData: User[] = [];

export function createAccount() {
    const userNameElement = document.querySelector("#createAccountUsername") as HTMLInputElement;
    const passwordElement = document.querySelector("#createAccountPassword") as HTMLInputElement;
    const selectedProfilePicture = document.querySelector('input[name="option"]:checked') as HTMLInputElement;

    const userNameInput = userNameElement.value;
    const passwordInput = passwordElement.value;
    const chosenProfilePicture = selectedProfilePicture?.value;

    console.log(userNameInput, passwordInput, chosenProfilePicture);

    interface User {
        username: string,
        password: string,
        profile_pic: string
    }

    function createUser(user: User): Promise<void> {
        const requestData: RequestInit = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        }

        return fetch(databaseLinkCreateAccount, requestData)
            .then(response => {
                // console.log(response.json());
                response.json().then((data) => {
                    // console.log(data);
                    userData = data;
                    // Send create account response data to generate a users profile information
                    generateProfil();
                })
            })
    }

    createUser({ username: userNameInput, password: passwordInput, profile_pic: chosenProfilePicture });
}