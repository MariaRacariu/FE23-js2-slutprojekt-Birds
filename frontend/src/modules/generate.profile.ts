import { UserData } from "./logIn.ts";
import { content, profile } from "./constants";
import { displayProfileImage, hideAllContentBoxes } from "./display";
import {
  deleteAccount,
} from "./databaseFetch";

import { showPosts } from "./displayRecentPosts.ts";
import { generateLatestPost } from "./generate.post.ts";

export function generateProfil(userData: UserData): void {
    hideAllContentBoxes();
    const profileContainer = document.getElementById(
      profile.id
    ) as HTMLDivElement;
    const profileHeading = document.getElementById(
      profile.name
    ) as HTMLHeadingElement;
    const profileImage = document.getElementById(
      profile.image
    ) as HTMLImageElement;
    const profileDeleteButton = document.querySelector(
      "#deleteAccountButtonContainer"
    ) as HTMLButtonElement;
    // Showing the current user logged in name
    profileHeading.innerText = `Profile: ${userData.username}`;
  
    displayProfileImage(userData.profile_pic, profileImage)
  
    // Log out button, hides the profile page and clears data info
    const logOutButton = document.querySelector(
      "#logOutButton"
    ) as HTMLButtonElement;
    logOutButton.addEventListener("click", () => {
      window.localStorage.removeItem("forum_userdata");
      window.location.reload();
      // hideAllContentBoxes();
    });
  
    // Maria
    showPosts(userData.username);
  
    //Change html class to "active" from css style .content-box display none
    profileContainer.classList.add(content.isActive);
    generateLatestPost();
  
    // Delete Account Button
  
    if (userData.username === profileDeleteButton.value) {
      profileDeleteButton.style.visibility = "visible";
      profileDeleteButton.addEventListener("click", () => {
        deleteAccount(profileDeleteButton.value);
        alert("Account Deleted");
      });
    } else {
      profileDeleteButton.style.visibility = "hidden";
    }
  }