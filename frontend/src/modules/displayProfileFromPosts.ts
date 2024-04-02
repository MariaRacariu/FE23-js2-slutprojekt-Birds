export function getUserInfoPerPost(buttonValue) {
    // console.log(buttonValue);

    const databaseLinkGetUserPosts = `http://localhost:3000/users/${buttonValue}/posts`;

    type Post = {
        id: number,
        title: string,
        body: string,
        category: string,
        created_at: number
    };

    function getPosts(): Promise<void> {
        const requestPosts: RequestInit = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }
        return fetch(databaseLinkGetUserPosts, requestPosts)
            .then(response => {
                response.json().then((data) => {
                    // console.log(data);
                    // console.log(data.posts);

                    const listOfPosts = data.posts;
                    const listOfPostsReversed = [...listOfPosts].reverse();

                    listOfPostsReversed.slice(0, 3).forEach(post => {
                        // console.log(post);
                        generateRecentPosts(post);
                    });
                })
            })
    }
    getPosts();
}

export function generateRecentPosts(post) {
    const postsContainer = document.querySelector('#profile-latest-posts');

    const singlePostContainer = document.createElement("div");
    postsContainer?.append(singlePostContainer);

    const postsTitleElement = document.createElement("p");
    singlePostContainer?.append(postsTitleElement);
    postsTitleElement.innerText = post.title;
    console.log(post.title);

    const postsBodyElement = document.createElement("p");
    singlePostContainer?.append(postsBodyElement);
    postsBodyElement.innerText = post.body;
    console.log(post.body);
}