import { PostListResponse } from "../types/res.types";
import { userData } from "./logIn.ts";
import {
  deletePost,
  getLatestPosts,
  getPostsByCategory,
  getUser,
} from "./databaseFetch";

import like from "../img/like.png";
import { showPosts } from "./displayRecentPosts.ts";
import { generateProfil } from "./generate.profile.ts";
import { displayProfileImage } from "./display.ts";
import { generateUserList } from "./generate.userList.ts";
import { generateComments } from "./generate.comments.ts";
import { addComment, likeOrDislikePost, updateProfile } from "./eventListener.post.ts";

export function generatePosts(
  postListResponse: Promise<PostListResponse>
): void {
  clearPosts();
  const ulEl = document.getElementById("post-ul") as HTMLUListElement;
  postListResponse.then((res) => {
    const { posts } = res;
    if (posts.length) {
      //sort posts by latest first
      posts
        .sort((a, b) => b.created_at - a.created_at)
        .forEach((post) => {
          const userResult = getUser(post.author);
          userResult.then((res) => {
            const { profile_pic } = res;
            const postContainer = document.createElement(
              "div"
            ) as HTMLDivElement;
            const profileImage = document.createElement(
              "img"
            ) as HTMLImageElement;
            const postWrapper = document.createElement("div") as HTMLDivElement;
            const liEl = document.createElement("li") as HTMLLIElement;
            const likeButton = document.createElement("img");
            likeButton.classList.add("like-button");
            likeButton.setAttribute("src", like);
            const numberOfLikes = document.createElement("p") as HTMLParagraphElement;
            numberOfLikes.innerText = post.likes? `${post.likes.length}` : "";
            const dislikeButton = document.createElement("img");
            dislikeButton.classList.add("dislike-button");
            dislikeButton.classList.add("like-button");
            dislikeButton.setAttribute("src", like);
            likeButton.setAttribute("src", like);
            numberOfLikes.innerText = post.likes? `${post.likes.length}` : "";
            const authorP = document.createElement(
              "button"
            ) as HTMLButtonElement;
            const titleP = document.createElement("p") as HTMLParagraphElement;
            const bodyP = document.createElement("p") as HTMLParagraphElement;
            const commentButton = document.createElement(
              "button"
            ) as HTMLButtonElement;
            ulEl.appendChild(liEl);
            commentButton.classList.add("buttonComment");
            postContainer.appendChild(profileImage);
            postContainer.appendChild(postWrapper);
            postWrapper.appendChild(authorP);
            postWrapper.appendChild(titleP);
            postWrapper.appendChild(bodyP);
            postWrapper.appendChild(likeButton);
            postWrapper.appendChild(dislikeButton);
            postWrapper.appendChild(numberOfLikes);

            liEl.appendChild(postContainer);
            postWrapper.classList.add("postWrapper");
            postContainer.classList.add("allWrapper");
            liEl.classList.add("li-post");

            ulEl.classList.add("ul-post");
            displayProfileImage(profile_pic, profileImage)

            authorP.innerText = post.author;
            titleP.innerText = post.title;
            bodyP.innerText = post.body;
            authorP.classList.add("p-author");
            authorP.setAttribute("value", post.author);
            authorP.setAttribute("id", "postProfile");
            postWrapper.appendChild(commentButton);
            commentButton.innerText = "Comments";

            if (post.author === userData?.username) {
              const deleteButton = document.createElement(
                "button"
              ) as HTMLButtonElement;
              postWrapper.prepend(deleteButton);
              deleteButton.innerText = "X";
              deleteButton.classList.add("delete-button");
              deleteButton.addEventListener("click", () => {
                liEl.remove();
                deletePost(post.id);
                alert("Your post has been deleted");
              });
            }
            const commentContainer = document.createElement(
              "div"
            ) as HTMLDivElement;
            liEl.appendChild(commentContainer);

            likeButton.addEventListener('click', () => likeOrDislikePost(post.id,numberOfLikes, 'like'));
            dislikeButton.addEventListener('click', () => likeOrDislikePost(post.id,numberOfLikes, 'dislike'));
            commentButton.addEventListener("click", () => addComment(commentContainer, post.id));
            authorP.addEventListener("click", () => updateProfile(res.username));

          });
        });
    } else {
      const liEl = document.createElement("li") as HTMLLIElement;
      liEl.innerText = "This category has no posts";
      ulEl.appendChild(liEl);
      liEl.classList.add("li-post");
      ulEl.classList.add("ul-post");
    }
  });
}

//Generat all latest post
export function generateLatestPost(): void {
  const resultFromDatabase = getLatestPosts();
  const postHeader = document.getElementById(
    "post-header"
  ) as HTMLHeadingElement;
  const postDescription = document.getElementById(
    "post-description"
  ) as HTMLParagraphElement;
  postHeader.innerText = "Latest posts";
  postDescription.innerText = "";
  generatePosts(resultFromDatabase);
  generateUserList();
}

//Generar post by categories
export function generatePostsByCategory(id: string): void {
  const resultFromDatabase = getPostsByCategory(id);
  generatePosts(resultFromDatabase);
}

function clearPosts() {
  const div = document.getElementById("post-ul") as HTMLUListElement;
  div.innerHTML = "";
}
