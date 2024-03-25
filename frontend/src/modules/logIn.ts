// localhost:3000/login
const databaseLinkLogIn = "http://localhost:3000/login";

export async function fetchData() {
    const response = await fetch(databaseLinkLogIn);
    const data = await response.json();
    console.log(data);
    return data;
}

export function logInUser() {
    const userNameElement = document.querySelector("#loginFormUsername") as HTMLInputElement;
    const passwordElement = document.querySelector("#logInFormPassword") as HTMLInputElement;

    const userNameInput = userNameElement.value;
    const passwordInput = passwordElement.value;

    console.log(passwordInput, userNameInput);

    
}