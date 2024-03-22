import { content, profile } from "./modules/constant";
import { fetchFromDatabase } from "./modules/getpost";
import { PostListResponse } from "./res.types";

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
const users = {
    "luna": {
      "name": "Luna Berg",
      "password": "123",
      "profile_pic": "image1"
    },
    "testson": {
      "name": "Test Testson",
      "password": "test",
      "profile_pic": "image1"
    }
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


function generateSignup ():void {
  hideAllContentBoxes()
  const div = document.getElementById('signup')as HTMLDivElement;
  div.classList.add(content.isActive);
  
}

const sigupButton = document.getElementById('signupButton')as HTMLButtonElement;
sigupButton.addEventListener('click', generateSignup);

function generateProfil ():void {
  hideAllContentBoxes();
  generateCategory();
  generateInput();
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


function generateCategory ():void{
hideAllContentBoxes();
const div = document.getElementById('forum-container');
div?.classList.add(content.isActive);
}

function getPost():void{
  const ulEl = document.getElementById('post-ul')as HTMLUListElement;
  const resultFromDatabase = fetchFromDatabase('posts', 'get') as Promise<PostListResponse>;
  resultFromDatabase.then(res => {
    res.posts.forEach(post => {
      const liEl = document.createElement('li')as HTMLLIElement;
      const authorP = document.createElement('p')as HTMLParagraphElement;
      const titleP = document.createElement('p')as HTMLParagraphElement;
      const bodyP = document.createElement('p')as HTMLParagraphElement;
      ulEl.appendChild(liEl);
      liEl.appendChild(authorP);
      liEl.appendChild(titleP);
      liEl.appendChild(bodyP);
      authorP.innerText = post.author;
      titleP.innerText = post.title;
      bodyP.innerText = post.body;
    }) 

  })
}

const buttonPost = document.getElementById('post-button')as HTMLButtonElement;
buttonPost.addEventListener('click', getPost);

function generateInput ():void{
  //hideAllContentBoxes();
  const divEl = document.getElementById('input-field')as HTMLDivElement;
  divEl.classList.add(content.isActive);
  }


