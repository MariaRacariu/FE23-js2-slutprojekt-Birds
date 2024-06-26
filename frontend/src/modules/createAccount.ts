// Author: Maria Racariu

import { generateCategories } from "./generate.categories.ts";
import { generateProfil } from "./generate.profile.ts";

// This file is used when a User wants to create an account
// We get the input value from the form that the user inputs their data
// Using the user input values we send a fetch request to the API
// Lastly we call the generateProfil function which will display the users profile


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
    const chosenProfilePicture = selectedProfilePicture.value;

    console.log(userNameInput, passwordInput, chosenProfilePicture);

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
                    generateProfil(data);
                    generateCategories();
                    const logOutButton = document.querySelector("#logOutButton") as HTMLButtonElement;
                    logOutButton.style.visibility = "visible";
          
                    const logInButton = document.querySelector("#idBu") as HTMLButtonElement;
                    logInButton.style.visibility = "hidden";
          
                    const SignUpButton = document.querySelector("#signupButton") as HTMLButtonElement;
                    SignUpButton.style.visibility = "hidden";
                })
            })
    }

    createUser({ username: userNameInput, password: passwordInput, profile_pic: chosenProfilePicture });
}