const databaseLinkCreateAccount = "http://localhost:3000/users";

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
                console.log(response.json());
            })
    }

    createUser({ username: userNameInput, password: passwordInput, profile_pic: chosenProfilePicture });
}