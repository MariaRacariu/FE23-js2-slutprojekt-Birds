import { getUser, getUsersPosts } from "./databaseFetch.ts";
import { generateProfil } from "./generat.ts";

// export function getUserInfoPerPost(buttonValue) {
//     // console.log(buttonValue);

//     const databaseLinkGetUserPosts = `http://localhost:3000/users/${buttonValue}/posts`;

//     type Post = {
//         id: number,
//         title: string,
//         body: string,
//         category: string,
//         created_at: number
//     };

//     function getPosts(): Promise<void> {
//         const requestPosts: RequestInit = {
//             method: "GET",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//         }
//         return fetch(databaseLinkGetUserPosts, requestPosts)
//             .then(response => {
//                 response.json().then((data) => {

//                     const userDataResponse = getUser(buttonValue);
//                     userDataResponse.then(res => {
//                         generateProfil(res);
//                     })

//                     // console.log(data);
//                     // console.log(data.posts);


//                 })
//             })
//     }
//     getPosts();
// }

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