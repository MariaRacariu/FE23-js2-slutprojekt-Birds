import { content, profile } from "./modules/constant.ts";
import { generateLoginContainer } from "./modules/login.ts";

// Display log in form
const buttonLogIn = document.querySelector("#logInButtonTriggerContainer") as HTMLButtonElement;
buttonLogIn.addEventListener('click', (event) => {
  event.preventDefault();
  generateLoginContainer();
});

// This will need to be in a module
const buttonSignUp = document.getElementById('signup-button') as HTMLButtonElement;
// buttonSignUp.addEventListener('click', generateProfil);

//mockup user, 
const user = {
  name: 'Pia',
  posts: [
    {
      message: 'test test'
    },
    {
      message: 'message 2'
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
// Void? why you are not taking anything in
export function hideAllContentBoxes(): void {
  document.querySelectorAll(`.${content.name}`).forEach(contentBox => {
    contentBox.classList.remove(content.isActive);
  })
}

// This whole function needs to be in a module
// Better variable names
// Void? why you are not taking anything in
function generateProfil(): void {
  hideAllContentBoxes();
  generateCategory();
  generateInput();
  //TODO: Fetch user
  //user = fetchUser
  const div = document.getElementById(profile.id) as HTMLDivElement;
  const h5El = document.getElementById(profile.name) as HTMLHeadingElement;
  const imgEl = document.getElementById(profile.image) as HTMLImageElement;
  const ulEl = document.getElementById(profile.posts) as HTMLUListElement;

  h5El.innerText = `Profile: ${user.name}`;
  imgEl.setAttribute('src', '#');
  generatePosts(ulEl, user.posts)
  div.classList.add(content.isActive);
}

// This function needs to be in a module
// Void? why you are not taking anything in
function generatePosts(ulEl: HTMLUListElement, posts: any[]): void {
  posts.forEach(post => {
    const liEl = document.createElement('li') as HTMLLIElement;
    liEl.innerText = post.message;
    ulEl.appendChild(liEl);
  })
}





// This needs to be a module
// Void? why you are not taking anything in
function generateCategory(): void {
  hideAllContentBoxes();
  const div = document.getElementById('forum-container');
  div?.classList.add(content.isActive);
}


/*function getUserInfo (){
const ulEl = document.getElementById('member-ul');
const usersStringArr = Object.keys(users);
usersStringArr.forEach(key => {
  const user = users[key];
  user
})


}*/
//"posts":
const posts = [
  {
    "id": "2sksks",
    "author": "luna",
    "title": "How to fish in a toilet",
    "body": "You shouldn't, thats nasty!",
    "category": "anime",
    "created_at": 1710974917
  },
  {
    "id": "12334",
    "author": "Simon",
    "title": "How to learn",
    "body": "yes yes, thats nasty!",
    "category": "anime",
    "created_at": 1710974902
  }
]
// This needs to be a module
// Void? why you are not taking anything in
function getPost(): void {
  const ulEl = document.getElementById('post-ul') as HTMLUListElement;
  posts.forEach(post => {
    const liEl = document.createElement('li') as HTMLLIElement;
    const authorP = document.createElement('p') as HTMLParagraphElement;
    const titleP = document.createElement('p') as HTMLParagraphElement;
    const bodyP = document.createElement('p') as HTMLParagraphElement;
    ulEl.appendChild(liEl);
    liEl.appendChild(authorP);
    liEl.appendChild(titleP);
    liEl.appendChild(bodyP);
    authorP.innerText = post.author;
    titleP.innerText = post.title;
    bodyP.innerText = post.body;
  }

  )

}

const buttonPost = document.getElementById('post-button') as HTMLButtonElement;
buttonPost.addEventListener('click', getPost);

// Void? why you are not taking anything in
function generateInput(): void {
  //hideAllContentBoxes();
  const divEl = document.getElementById('input-field') as HTMLDivElement;
  divEl.classList.add(content.isActive);
}