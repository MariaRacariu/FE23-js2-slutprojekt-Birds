import {  userData } from "./logIn.ts";
import { content } from "./constants";
import {
    postComment
} from "./databaseFetch";

import { createPost } from "./createPosts.ts";
import { generateComments } from "./generate.comments.ts";


const formContainer = document.createElement("div");

export function generatePostInputForm() {
    const formContainerParent = document.querySelector(
      "#post-container"
    ) as HTMLDivElement;
  
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
      createPost();
    });
  }
  
  export function generateCommentInputForm(
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
    });
}