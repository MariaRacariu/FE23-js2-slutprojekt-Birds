import { content, profile } from "./constants";
import image1 from "../img/image1.png";
import image2 from "../img/image2.png";
import image3 from "../img/image3.png";

//Hide all content boxes
export function hideAllContentBoxes(): void {
  document.querySelectorAll(`.${content.name}`).forEach(contentBox => {
    contentBox.classList.remove(content.isActive);
  })
}


//Display and hidded containers

export function displayLogin(): void {
  hideAllContentBoxes()
  const loginContainer= document.getElementById('show-logInn') as HTMLDivElement;
  loginContainer.classList.add(content.isActive);

}


export function displaySignup(): void {
  hideAllContentBoxes()
  const signupContainer = document.getElementById('signup') as HTMLDivElement;
  signupContainer.classList.add(content.isActive);

}


// export function displayInput(): void {
//   // hideAllContentBoxes();
//   const divEl = document.getElementById('input-field') as HTMLDivElement;
//   divEl.classList.add(content.isActive);
// }
export function displayProfileImage(profile_pic: string, profileImageNode: HTMLImageElement) :void {
  if (profile_pic === "image1") {
      profileImageNode.setAttribute("src", image1);
  } else if (profile_pic === "image2") {
      profileImageNode.setAttribute("src", image2);
  } else if (profile_pic === "image3") {
      profileImageNode.setAttribute("src", image3);
  }
}