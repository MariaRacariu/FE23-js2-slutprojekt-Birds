import { PostListResponse } from "../types/res.types";
import { content, profile } from "./constants";
import { hideAllContentBoxes, displayInput } from "./display";
import { getCategories, getCategory, getLatestPosts, getPostsByCategory } from "./databaseFetch";
import image1 from "../img/image1.png";
import image2 from "../img/image2.png";
import image3 from "../img/image3.png";
//mockup user, TODO: use real login user
// const user = {
//   name: "Pia",
//   posts: [
//     {
//       message: "test test",
//     },
//     {
//       message: "message 2",
//     },
//   ],
// };

// Data has all the info for the current user logged in
export function generateProfil(data): void {
  // console.log(data);

  hideAllContentBoxes();
  generateCategories();
  displayInput();
  //TODO: Fetch user
  //user = login user
  const div = document.getElementById(profile.id) as HTMLDivElement;
  const h5El = document.getElementById(profile.name) as HTMLHeadingElement;
  const imgEl = document.getElementById(profile.image) as HTMLImageElement;
  const ulEl = document.getElementById(profile.posts) as HTMLUListElement;

  // Showing the current user logged in name
  h5El.innerText = `Profile: ${data.username}`;
  //imgEl.setAttribute("src", `../img/${data.profile_pic}.png`);
  // Paths to images do not work because of parcel pathing, need to fix/ask clara
  if (data.profile_pic === "image1") {
    imgEl.setAttribute("src", image1);
  } else if (data.profile_pic === "image2") {
    imgEl.setAttribute("src", image2);
  } else if (data.profile_pic === "image3") {
    imgEl.setAttribute("src", image3);
  }

  // Log out button, hides the profile page and clears data info
  const logOutButton = document.querySelector("#logOutButton") as HTMLButtonElement;
  logOutButton.addEventListener("click", () => {
    hideAllContentBoxes();
    data = "";
  })

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
  const categoryList = document.getElementById("forum-ul") as HTMLUListElement;
  categoryList.innerHTML = '';
  const resultFromDatabase = getCategories();
  resultFromDatabase.then((res) => {
    const categoriesContainer = document.getElementById("forum-container") as HTMLDivElement;
    categoriesContainer.classList.add(content.isActive);
    res.categories.forEach((category) => {
      const categoryListItem = document.createElement("li") as HTMLLIElement;
      const categoryButton = document.createElement("button") as HTMLButtonElement;
      categoryButton.innerText = category.name;
      categoryList.appendChild(categoryListItem);
      categoryListItem.appendChild(categoryButton);
      categoryButton.addEventListener("click", () => generateCategory(category.id));
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
