import { content, profile } from "./constants";


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
