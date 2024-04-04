import { content } from "./constants";
import {
  getCategories,
  getCategory,
} from "./databaseFetch";
import { generatePostInputForm } from "./generate.form";
import { generatePostsByCategory } from "./generate.post";
export function generateCategories(): void {
    //hideAllContentBoxes();
    const categoryList = document.getElementById("forum-ul") as HTMLUListElement;
    categoryList.innerHTML = "";
    const resultFromDatabase = getCategories();
    resultFromDatabase.then((res) => {
      const categoriesContainer = document.getElementById(
        "forum-container"
      ) as HTMLDivElement;
      categoriesContainer.classList.add(content.isActive);
      res.categories.forEach((category) => {
        const categoryListItem = document.createElement("li") as HTMLLIElement;
        const categoryButton = document.createElement(
          "button"
        ) as HTMLButtonElement;
        categoryButton.innerText = category.name;
        categoryButton.value = category.id;
        categoryButton.setAttribute("id", "categoryButton");
        categoryList.appendChild(categoryListItem);
        categoryListItem.appendChild(categoryButton);
        categoryButton.addEventListener("click", () =>
          generateCategory(category.id)
        );
      });
    });
  }
  
  //Generat category on heading and forum description
  export function generateCategory(id: string) {
    
    const resultFromDatabase = getCategory(id);
    resultFromDatabase.then((res) => {
      const postHeader = document.getElementById(
        "post-header"
      ) as HTMLHeadingElement;
      const postDescription = document.getElementById(
        "post-description"
      ) as HTMLParagraphElement;
      postHeader.innerText = res.name;
      postDescription.innerText = res.description;
      generatePostsByCategory(id);
/*       const formContainer = document.getElementById(
        "forum-container"
      ) as HTMLDivElement;
      formContainer.innerHTML = ""; */
      generatePostInputForm();
    });
  }