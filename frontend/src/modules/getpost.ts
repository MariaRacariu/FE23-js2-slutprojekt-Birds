import {PostListResponse, ResponseDataType} from '../types/res.types'

export async function fetchFromDatabase(endpoint: string, method: string): Promise<ResponseDataType> {
  const res = await fetch(`http://localhost:3000/${endpoint}`, {
    method: method,
    headers: {
      "Content-type": "application/json"
    }
  });
  let responseData = await res.json() as Promise<ResponseDataType>;
  return responseData;
}


export function getPost():void{
  const ulEl = document.getElementById('post-ul')as HTMLUListElement;
  const resultFromDatabase = fetchFromDatabase('posts', 'get') as Promise<PostListResponse>;
  resultFromDatabase.then(res => {
    res.posts.forEach(post => {
      const liEl = document.createElement('li')as HTMLLIElement;
      const authorP = document.createElement('p')as HTMLParagraphElement;
      const titleP = document.createElement('p')as HTMLParagraphElement;
      const bodyP = document.createElement('p')as HTMLParagraphElement;
      ulEl.appendChild(liEl);
      liEl.appendChild(authorP);
      liEl.appendChild(titleP);
      liEl.appendChild(bodyP);
      liEl.classList.add('li-post');
      ulEl.classList.add('ul-post');
      authorP.innerText = post.author;
      titleP.innerText = post.title;
      bodyP.innerText = post.body;
    }) 

  })
}

