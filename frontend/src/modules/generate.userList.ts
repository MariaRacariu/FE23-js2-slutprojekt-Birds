import { content } from "./constants";
import {
  getUsers,
} from "./databaseFetch";
import { generateProfil } from "./generate.profile";

export function generateUserList() {
    const userHeadingContainer = document.getElementById(
      "userHeadingContainer"
    ) as HTMLDivElement;
  
    // ADDED FORUM-CONTAINER WHICH WAS GETTING LOST
    const formContainer = document.getElementById(
      "forum-container"
    ) as HTMLDivElement;
  
    const userList = document.getElementById("users-ul") as HTMLUListElement;
    userList.innerHTML = "";
  
    // GAVE THE ACTIVE CLASS
    userHeadingContainer.classList.add(content.isActive);
  
    formContainer.classList.add(content.isActive);
    const responseFromDatabase = getUsers();
    responseFromDatabase.then((res) => {
      const { users } = res;
      users.forEach((user) => {
        const userDisplay = document.createElement("li") as HTMLLIElement;
        const userSelect = document.createElement("button") as HTMLButtonElement;
        userSelect.innerText = user.username;
        userList.appendChild(userDisplay);
        userDisplay.appendChild(userSelect);
        userSelect.addEventListener("click", () => {
          console.log(user);
          generateProfil(user);
        });
      });
    });
  }