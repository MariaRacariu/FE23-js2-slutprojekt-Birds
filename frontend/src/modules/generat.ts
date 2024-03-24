import { content, profile } from "./constants";
import { hideAllContentBoxes, displayInput } from "./display";


//mockup user, TODO: use real login user
const user = {
    name: 'Pia',
    posts:[
      {
        message:'test test'
      },
      {
        message:'message 2'
      },
  ]
  } 
  


export function generateProfil ():void {
    hideAllContentBoxes();
    generateCategory();
    displayInput();
    //TODO: Fetch user
    //user = login user
    const div = document.getElementById(profile.id)as HTMLDivElement;
    const h5El = document.getElementById(profile.name)as HTMLHeadingElement;
    const imgEl = document.getElementById(profile.image)as HTMLImageElement;
    const ulEl = document.getElementById(profile.posts)as HTMLUListElement;
  
    h5El.innerText = `Profile: ${user.name}`;
    imgEl.setAttribute('src','#');
    generatePosts (ulEl, user.posts)
    div.classList.add(content.isActive);
  }

  
  export function generatePosts(ulEl:HTMLUListElement, posts:any[]):void{
    posts.forEach(post => {
      const liEl = document.createElement('li') as HTMLLIElement;
      liEl.innerText = post.message;
      ulEl.appendChild(liEl);
    })
  }


  export function generateCategory ():void{
    hideAllContentBoxes();
    //fetch categories
    const div = document.getElementById('forum-container');
    div?.classList.add(content.isActive);
    }

