import { PostListResponse } from "../types/res.types";
import { content, profile } from "./constants";
import { hideAllContentBoxes, displayInput } from "./display";
import { getCategories, getCategory, getLatestPosts, getPostsByCategory } from "./fetch";

//mockup user, TODO: use real login user
const user = {
  name: "Pia",
  posts: [
    {
      message: "test test",
    },
    {
      message: "message 2",
    },
  ],
};

export function generateProfil(): void {
  hideAllContentBoxes();
  generateCategories();
  displayInput();
  //TODO: Fetch user
  //user = login user
  const div = document.getElementById(profile.id) as HTMLDivElement;
  const h5El = document.getElementById(profile.name) as HTMLHeadingElement;
  const imgEl = document.getElementById(profile.image) as HTMLImageElement;
  const ulEl = document.getElementById(profile.posts) as HTMLUListElement;

  h5El.innerText = `Profile: ${user.name}`;
  imgEl.setAttribute("src", "#");
  div.classList.add(content.isActive);
  generateLatestPost();
}

export function generatePosts(postListResponse: Promise<PostListResponse>): void {
  clearPosts();
  const ulEl = document.getElementById("post-ul") as HTMLUListElement;
  postListResponse.then((res) => {
    const { posts } = res;
    if (posts.length) {
      posts.forEach((post) => {
        const liEl = document.createElement("li") as HTMLLIElement;
        const authorP = document.createElement("p") as HTMLParagraphElement;
        const titleP = document.createElement("p") as HTMLParagraphElement;
        const bodyP = document.createElement("p") as HTMLParagraphElement;
        ulEl.appendChild(liEl);
        liEl.appendChild(authorP);
        liEl.appendChild(titleP);
        liEl.appendChild(bodyP);
        liEl.classList.add("li-post");
        ulEl.classList.add("ul-post");
        authorP.innerText = post.author;
        titleP.innerText = post.title;
        bodyP.innerText = post.body;
      });
    } else {
      const liEl = document.createElement("li") as HTMLLIElement;
      liEl.innerText = "This category has no posts";
      ulEl.appendChild(liEl);
      liEl.classList.add("li-post");
      ulEl.classList.add("ul-post");
    }
  })
}

export function generateLatestPost(): void {
  const resultFromDatabase = getLatestPosts();
  generatePosts(resultFromDatabase)
}

export function generatePostsByCategory(id: string): void {
  const resultFromDatabase = getPostsByCategory(id);
  generatePosts(resultFromDatabase)
}

export function generateCategories(): void {
  hideAllContentBoxes();
  const resultFromDatabase = getCategories();
  resultFromDatabase.then((res) => {
    const ulEl = document.getElementById("forum-ul") as HTMLUListElement;
    const div = document.getElementById("forum-container") as HTMLDivElement;
    div.classList.add(content.isActive);
    res.categories.forEach((category) => {
      const liEl = document.createElement("li") as HTMLLIElement;
      const buttonEl = document.createElement("button") as HTMLButtonElement;
      buttonEl.innerText = category.name;
      ulEl.appendChild(liEl);
      liEl.appendChild(buttonEl);
      buttonEl.addEventListener("click", () => generateCategory(category.id));
    });
  });
}

export function generateCategory(id: string) {
  const resultFromDatabase = getCategory(id);
  resultFromDatabase.then((res) => {
    const postHeader = document.getElementById(
      "post-header"
    ) as HTMLHeadingElement;
    const postDescription = document.getElementById(
      "post-description"
    ) as HTMLParagraphElement;
    postHeader.innerText = res.name;
    postDescription.innerText = res.description;
    generatePostsByCategory(id);
  });
}

function clearPosts() {
  const ulEl = document.getElementById("post-ul") as HTMLUListElement;
  ulEl.innerHTML = "";
}
