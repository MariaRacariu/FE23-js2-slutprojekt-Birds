import { Category } from "../types/db.types";
import { userData } from "./logIn";
import { generateLatestPost } from "./generat";

const databaseLinkCreatePosts = "http://localhost:3000/posts";



export function createPost(categoryId) {
    const userInputTitle = document.querySelector("#title") as HTMLInputElement;
    const userInputMessage = document.querySelector("#message") as HTMLInputElement;

    const userInputTitleValue = userInputTitle.value;
    const userInputMessageValue = userInputMessage.value;
    const chosenCategoryValue = categoryId;

    interface Post {
        author: string,
        title: string,
        body: string,
        category: string,
    }

    function sendPost(post: Post): Promise<void> {
        console.log(post);
        const sendData: RequestInit = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(post)
        }

        return fetch(databaseLinkCreatePosts, sendData)
            .then(response => {
                response.json().then((data) => {
                    generateLatestPost();
                    alert("Your post has been submitted");
                })
            })
    }

    console.log(userData.username, userInputTitleValue, userInputMessageValue, chosenCategoryValue);

    sendPost({ author: userData.username, title: userInputTitleValue, body: userInputMessageValue, category: chosenCategoryValue });
}   