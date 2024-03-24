import { content, profile } from "./constants";


//Hide all content boxes
export function hideAllContentBoxes():void {
    document.querySelectorAll(`.${content.name}`).forEach(contentBox => {
      contentBox.classList.remove(content.isActive);
    })
  }



export function displayLogin ():void {
    hideAllContentBoxes()
    const div = document.getElementById('show-logInn')as HTMLDivElement;
    div.classList.add(content.isActive);
    
  }


  
export function displaySignup ():void {
    hideAllContentBoxes()
    const div = document.getElementById('signup')as HTMLDivElement;
    div.classList.add(content.isActive);
    
  }


export function displayInput ():void{
  //hideAllContentBoxes();
  const divEl = document.getElementById('input-field')as HTMLDivElement;
  divEl.classList.add(content.isActive);
  }
