



function generatProfil (t):void {
  const div = document.getElementById('show-logInn')as HTMLDivElement;
  const h5El = document.createElement('h5')as HTMLHeadingElement;
  const imgEl = document.createElement('img')as HTMLImageElement;
  const ulEl = document.createElement('ul')as HTMLUListElement;
  const liEl = document.createElement('li')as HTMLLIElement;

  div.appendChild(h5El);
  div.appendChild(imgEl);
  div.appendChild(ulEl);
  ulEl.appendChild(liEl);

  h5El.innerText = `Profile: $`

}


const buttonLog = document.getElementById('idBu')as HTMLButtonElement;
buttonLog.addEventListener('click', generateLogin);

function generateLogin (v):void {
  const div = document.getElementById('show-logInn')as HTMLDivElement;
  div.classList.remove("show-logIn");

}