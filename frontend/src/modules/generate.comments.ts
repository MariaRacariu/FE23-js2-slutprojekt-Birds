import {  userData } from "./logIn.ts";
import {
  getAllCommentsByPost,
  getUser,
  postComment,
  deleteComment,
} from "./databaseFetch";
import { displayProfileImage } from "./display.ts";
import { generateCommentInputForm } from "./generate.form.ts";


export function generateComments(container: HTMLDivElement, id: string) {
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
                displayProfileImage(res.profile_pic, profileImage)
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
  