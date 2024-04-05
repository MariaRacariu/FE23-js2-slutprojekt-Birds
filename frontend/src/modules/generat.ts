import { PostListResponse } from "../types/res.types";
import { UserData, userData } from "./logIn.ts";
import { content, profile } from "./constants";
import { hideAllContentBoxes } from "./display";
import {
  deletePost,
  getAllCommentsByPost,
  getCategories,
  getCategory,
  getLatestPosts,
  getPostsByCategory,
  getUser,
  getUsers,
  postComment,
  getUsersPosts,
  deleteAccount,
  deleteComment,
} from "./databaseFetch";
import image1 from "../img/image1.png";
import image2 from "../img/image2.png";
import image3 from "../img/image3.png";
import { wrap } from "module";
import { createPost } from "./createPosts.ts";
import { showPosts } from "./displayRecentPosts.ts";

// Data has all the info for the current user logged in
export function generateProfil(userData: UserData): void {
  hideAllContentBoxes();
  // displayInput();
  //TODO: Fetch user
  //user = login user
  const profileContainer = document.getElementById(
    profile.id
  ) as HTMLDivElement;
  const profileHeading = document.getElementById(
    profile.name
  ) as HTMLHeadingElement;
  const profileImage = document.getElementById(
    profile.image
  ) as HTMLImageElement;
  const profileDeleteButton = document.querySelector(
    "#deleteAccountButtonContainer"
  ) as HTMLButtonElement;
  // Showing the current user logged in name
  profileHeading.innerText = `Profile: ${userData.username}`;

  if (userData.profile_pic === "image1") {
    profileImage.setAttribute("src", image1);
  } else if (userData.profile_pic === "image2") {
    profileImage.setAttribute("src", image2);
  } else if (userData.profile_pic === "image3") {
    profileImage.setAttribute("src", image3);
  }

  // Log out button, hides the profile page and clears data info
  const logOutButton = document.querySelector(
    "#logOutButton"
  ) as HTMLButtonElement;
  logOutButton.addEventListener("click", () => {
    window.localStorage.removeItem("forum_userdata");
    window.location.reload();
    // hideAllContentBoxes();
  });

  showPosts(userData.username);

  //Change html class to "active" from css style .content-box display none
  profileContainer.classList.add(content.isActive);
  generateLatestPost();

  // Delete Account Button
  if (userData.username === profileDeleteButton.value) {
    profileDeleteButton.style.visibility = "visible";

    profileDeleteButton.addEventListener("click", () => {
      deleteAccount(profileDeleteButton.value);
      alert("Account Deleted");
    });

  } else {
    profileDeleteButton.style.visibility = "hidden";
  }

}
//Generat post
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
            const authorP = document.createElement(
              "button"
            ) as HTMLButtonElement;
            const titleP = document.createElement("p") as HTMLParagraphElement;
            const bodyP = document.createElement("p") as HTMLParagraphElement;
            const commentButton = document.createElement(
              "button"
            ) as HTMLButtonElement;
            ulEl.appendChild(liEl);
            /*           liEl.appendChild(profileImage);
          liEl.appendChild(wrapContainer) */
            commentButton.classList.add("buttonComment");
            postContainer.appendChild(profileImage);
            postContainer.appendChild(postWrapper);
            postWrapper.appendChild(authorP);
            postWrapper.appendChild(titleP);
            postWrapper.appendChild(bodyP);
            liEl.appendChild(postContainer);
            postWrapper.classList.add("postWrapper");
            postContainer.classList.add("allWrapper");
            liEl.classList.add("li-post");

            ulEl.classList.add("ul-post");
            if (profile_pic === "image1") {
              profileImage.setAttribute("src", image1);
            } else if (profile_pic === "image2") {
              profileImage.setAttribute("src", image2);
            } else if (profile_pic === "image3") {
              profileImage.setAttribute("src", image3);
            }
            //profileImage.setAttribute('src', profile_pic)
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
            commentButton.addEventListener("click", () => {
              //if()
              generateComments(commentContainer, post.id);
              //else deleteComments(commentContainer, post.id)
            });
            // Generate new Profile based on which post is selected to view
            authorP.addEventListener("click", () => {
              const getUserInfo = getUser(authorP.value);
              getUserInfo.then((res) => {
                generateProfil(res);
              });
              showPosts(authorP.value);
            });
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

//Generat forum categories list on nav
export function generateCategories(): void {
  //hideAllContentBoxes();
  const categoryList = document.getElementById("forum-ul") as HTMLUListElement;
  categoryList.innerHTML = "";
  const resultFromDatabase = getCategories();
  resultFromDatabase.then((res) => {
    const categoriesContainer = document.getElementById("forum-container") as HTMLDivElement;
    categoriesContainer.classList.add(content.isActive);
    res.categories.forEach((category) => {
      const categoryListItem = document.createElement("li") as HTMLLIElement;
      const categoryButton = document.createElement("button") as HTMLButtonElement;
      categoryButton.innerText = category.name;
      categoryButton.value = category.id;
      categoryButton.setAttribute("id", "categoryButton");
      categoryList.appendChild(categoryListItem);
      categoryListItem.appendChild(categoryButton);

      categoryButton.addEventListener("click", () => {
        console.log(category.id);
        generateCategory(category.id);
      });
    });
  });
}

//Generat category on heading and forum description
export function generateCategory(id: string) {
  const resultFromDatabase = getCategory(id);
  resultFromDatabase.then((res) => {
    const postHeader = document.getElementById("post-header") as HTMLHeadingElement;
    const postDescription = document.getElementById("post-description") as HTMLParagraphElement;
    postHeader.innerText = res.name;
    postDescription.innerText = res.description;
    generatePostsByCategory(id);
    formContainer.innerHTML = "";
    generatePostInputForm(id);
  });
}

function clearPosts() {
  const div = document.getElementById("post-ul") as HTMLUListElement;
  div.innerHTML = "";
}

//Generat comments section list.
function generateComments(container: HTMLDivElement, id: string) {
  //toggle comments with generate or remove
  if (container.innerHTML) {
    container.innerHTML = "";
  } else {
    const commentsGeneratList = document.createElement(
      "ul"
    ) as HTMLUListElement;
    const resultFromDatabase = getAllCommentsByPost(id);
    resultFromDatabase
      .then((res) => {
        const { comments } = res;
        comments.forEach((comment) => {
          console.log(comment);
          const commentPost = document.createElement("li") as HTMLLIElement;
          const commentContainer = document.createElement(
            "div"
          ) as HTMLDivElement;
          const profileImage = document.createElement(
            "img"
          ) as HTMLImageElement;
          const commentWrapper = document.createElement(
            "div"
          ) as HTMLDivElement;
          const author = document.createElement("p") as HTMLParagraphElement;
          const commentsText = document.createElement("p");
          commentWrapper.appendChild(author);
          commentWrapper.appendChild(commentsText);
          author.innerText = comment.author;
          commentsText.innerText = comment.body;
          commentsGeneratList.appendChild(commentPost);
          commentPost.appendChild(commentContainer);
          commentContainer.appendChild(profileImage);
          commentContainer.appendChild(commentWrapper);
          container.appendChild(commentsGeneratList);
          commentWrapper.classList.add("postWrapper");
          commentContainer.classList.add("allWrapper");
          commentPost.classList.add("li-post");

          // Display Comments User Profile Picture
          const resultFromDatabase = getUser(comment.author);
          resultFromDatabase.then((res) => {
            if (res.profile_pic === "image1") {
              profileImage.setAttribute("src", image1);
            } else if (res.profile_pic === "image2") {
              profileImage.setAttribute("src", image2);
            } else if (res.profile_pic === "image3") {
              profileImage.setAttribute("src", image3);
            }
          });
          if (comment.author === userData?.username) {
            const deleteButton = document.createElement(
              "button"
            ) as HTMLButtonElement;
            commentPost.prepend(deleteButton);
            deleteButton.innerText = "X";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", () => {
              commentPost.remove();
              deleteComment(id, comment.id);
            });
          }
        });
      })
      .finally(() => {
        //check if user is login and then create comment input form
        if (userData) {
          generateCommentInputForm(container, id);
        }
      });
  }
}

// Global variable to be able to clear in innerHTML of the form to prevent duplicating
const formContainer = document.createElement("div");

// Generate input form for categories
function generatePostInputForm(categoryID) {
  const categoryId = categoryID;
  const formContainerParent = document.querySelector("#post-container") as HTMLDivElement;

  formContainer.innerHTML = "";
  formContainerParent.append(formContainer);
  formContainer.setAttribute("class", "content-box");
  formContainer.setAttribute("id", "input-field");
  formContainer.classList.add(content.isActive);

  const postForm = document.createElement("form");
  formContainer.append(postForm);

  const titleInputLabel = document.createElement("label");
  titleInputLabel.setAttribute("for", "title");
  titleInputLabel.innerText = "Title";
  postForm.append(titleInputLabel);

  const titleInput = document.createElement("input");
  titleInput.setAttribute("id", "title");
  titleInput.setAttribute("name", "titleInput");
  titleInput.type = "text";
  postForm.append(titleInput);

  const messageInputLabel = document.createElement("label");
  titleInputLabel.setAttribute("for", "message");
  messageInputLabel.innerText = "Message";
  postForm.append(messageInputLabel);

  const messageInput = document.createElement("textarea");
  messageInput.setAttribute("id", "message");
  postForm.append(messageInput);

  const sendPostButton = document.createElement("button");
  sendPostButton.setAttribute("id", "post-button");
  postForm.append(sendPostButton);
  sendPostButton.innerText = "Send";
  sendPostButton.type = "submit";

  // Event Listener for logged in users sending a post
  // const sendPostButton = document.querySelector("#post-button") as HTMLButtonElement;
  sendPostButton.addEventListener("click", (event) => {
    event.preventDefault();
    createPost(categoryId);
  });
}

function generateCommentInputForm(
  commentContainer: HTMLDivElement,
  postId: string
) {
  const formContainer = document.createElement("div") as HTMLDivElement;
  commentContainer.append(formContainer);
  //formContainer.setAttribute("id", "input-field");

  const postForm = document.createElement("form");
  postForm.classList.add("comment-form");
  formContainer.append(postForm);

  const messageInput = document.createElement("textarea");
  //messageInput.setAttribute("id", "message");
  postForm.append(messageInput);

  const sendPostButton = document.createElement("button");
  //sendPostButton.setAttribute("id", "post-button");
  postForm.append(sendPostButton);
  sendPostButton.innerText = "Send";
  sendPostButton.type = "submit";

  // Event Listener for logged in users sending a post
  // const sendPostButton = document.querySelector("#post-button") as HTMLButtonElement;
  sendPostButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(messageInput.value);
    const postResult = postComment(
      postId,
      userData.username,
      messageInput.value
    );
    //Update comments after it is posted to database
    postResult.then((res) => {
      //clear comments now so it will create new comments
      commentContainer.innerHTML = "";
      generateComments(commentContainer, postId);
    });
    //createPost();
  });
}

//Generat user list on nav
function generateUserList() {
  const userHeadginContainer = document.getElementById(
    "userHeadingContainer"
  ) as HTMLDivElement;

  // ADDED FORUM-CONTAINER WHICH WAS GETTING LOST
  const formContainer = document.getElementById(
    "forum-container"
  ) as HTMLDivElement;

  const userList = document.getElementById("users-ul") as HTMLUListElement;
  userList.innerHTML = "";

  // GAVE THE ACTIVE CLASS
  userHeadginContainer.classList.add(content.isActive);

  formContainer.classList.add(content.isActive);
  const responseFromDatabase = getUsers();
  responseFromDatabase.then((res) => {
    const { users } = res;
    users.forEach((user) => {
      const userDisplay = document.createElement("li") as HTMLLIElement;
      const userSelect = document.createElement("button") as HTMLButtonElement;
      userSelect.innerText = user.username;
      userList.appendChild(userDisplay);
      userDisplay.appendChild(userSelect);
      userSelect.addEventListener("click", () => {
        console.log(user);
        generateProfil(user);
      });
    });
  });
}
