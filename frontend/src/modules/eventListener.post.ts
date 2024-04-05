import { getUser, postLikeOrDisLike } from "./databaseFetch";
import { showPosts } from "./displayRecentPosts";
import { generateComments } from "./generate.comments";
import { generateProfil } from "./generate.profile";
import { userData } from "./logIn";

export function likeOrDislikePost(postId: string, numberOfLikes: HTMLParagraphElement, method: string): void{
    const res = postLikeOrDisLike(postId, userData.username, method);
    res.then(databaseResult => {
        if(!databaseResult.error){
            numberOfLikes.innerText = `${databaseResult.like_count}`
        }
        else{
            alert(`Something went wrong with your ${method}`)
        }
    })
}

export function addComment(commentContainer:HTMLDivElement, postId: string): void{
    generateComments(commentContainer, postId);
}

// Generate new Profile based on which post is selected to view
export function updateProfile(userId:string): void{
    const getUserInfo = getUser(userId);
    getUserInfo.then((res) => {
      generateProfil(res);
    });
    showPosts(userId);
}