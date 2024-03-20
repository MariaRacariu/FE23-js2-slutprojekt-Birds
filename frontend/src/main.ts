import { content, profile } from "./modules/constant";

//mockup user, 
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

//Hide all content boxes
function hideAllContentBoxes():void {
  document.querySelectorAll(`.${content.name}`).forEach(contentBox => {
    contentBox.classList.remove(content.isActive);
  })
}

function generateLogin ():void {
  hideAllContentBoxes()
  const div = document.getElementById('show-logInn')as HTMLDivElement;
  div.classList.add(content.isActive);
  
}

function generateProfil ():void {
  hideAllContentBoxes();
  //TODO: Fetch user
  //user = fetchUser
  const div = document.getElementById(profile.id)as HTMLDivElement;
  const h5El = document.getElementById(profile.name)as HTMLHeadingElement;
  const imgEl = document.getElementById(profile.image)as HTMLImageElement;
  const ulEl = document.getElementById(profile.posts)as HTMLUListElement;

  h5El.innerText = `Profile: ${user.name}`;
  imgEl.setAttribute('src','#');
  generatePosts (ulEl, user.posts)
  div.classList.add(content.isActive);
}

function generatePosts(ulEl:HTMLUListElement, posts:any[]):void{
  posts.forEach(post => {
    const liEl = document.createElement('li') as HTMLLIElement;
    liEl.innerText = post.message;
    ulEl.appendChild(liEl);
  })
}

const buttonLog = document.getElementById('idBu')as HTMLButtonElement;
buttonLog.addEventListener('click', generateLogin);

const buttonSignUp = document.getElementById('signup-button')as HTMLButtonElement;
buttonSignUp.addEventListener('click', generateProfil);
