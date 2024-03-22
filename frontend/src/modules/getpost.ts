async function getPost(){
    const res = await fetch("http://localhost:3000/", {
      method: "GET",
      headers: {
        "Content-type": "application/json"
    }
      // Set the FormData instance as the request body
    })
    let post = await res.json();
    //createBoards(tasks);
}




