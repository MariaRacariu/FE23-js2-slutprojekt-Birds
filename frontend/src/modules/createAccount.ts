const databaseLinkCreateAccount = "localhost:3000/users";

export function createAccount() {
    const userNameElement = document.querySelector("#createAccountUsername") as HTMLInputElement;
    const passwordElement = document.querySelector("#createAccountPassword") as HTMLInputElement;
    const selectedProfilePicture = document.querySelector('input[name="option"]:checked') as HTMLInputElement;

    const userNameInput = userNameElement.value;
    const passwordInput = passwordElement.value;
    const chosenProfilePicture = selectedProfilePicture?.value;



    console.log(passwordInput, userNameInput, chosenProfilePicture);
}