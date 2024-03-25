const databaseLinkLogIn = "http://localhost:3000/login";

const userNameElement = document.querySelector("#loginFormUsername") as HTMLInputElement;
const passwordElement = document.querySelector("#logInFormPassword") as HTMLInputElement;

export async function fetchData() {
    const response = await fetch(databaseLinkLogIn);
    const data = await response.json();
    console.log(data);
    return data;
}

export function logInUser() {
    const userNameInput = userNameElement.value;
    const passwordInput = passwordElement.value;

    console.log(passwordInput, userNameInput);

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
                console.log(response.json());
            })
    }

    checkUserExists({ username: userNameInput, password: passwordInput });
}