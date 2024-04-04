import { getUser, getUsersPosts } from "./databaseFetch.ts";

export function showPosts(user) {

    // Display most recent posts
    const listOfPosts = getUsersPosts(user);
    // console.log(listOfPosts);
    listOfPosts.then(res => {
        const { posts } = res;
        const listOfPostsReversed = [...posts].reverse();

        const postsContainer = document.querySelector('#profile-latest-posts') as HTMLDivElement;
        postsContainer.innerHTML = "";

        listOfPostsReversed.slice(0, 3).forEach(post => {
            // console.log(post);

            const singlePostContainer = document.createElement("div") as HTMLDivElement;
            postsContainer?.append(singlePostContainer);

            const postsTitleElement = document.createElement("p") as HTMLParagraphElement;
            singlePostContainer?.append(postsTitleElement);
            postsTitleElement.innerText = post.title;
            // console.log(post.title);

            const postsBodyElement = document.createElement("p") as HTMLParagraphElement;
            singlePostContainer?.append(postsBodyElement);
            postsBodyElement.innerText = post.body;
            // console.log(post.body);
        });
    })



}