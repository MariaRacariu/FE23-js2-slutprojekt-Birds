export function getUserInfoPerPost(buttonValue) {
    console.log(buttonValue);

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
            }
        }
        return fetch(databaseLinkGetUserPosts, requestPosts)
            .then(response => {
                response.json().then((data) => {
                    console.log(data);
                })
            })
    }
    getPosts();
}