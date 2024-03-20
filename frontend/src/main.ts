function generateHeader (a) {
  const ulEl = document.createElement('ul')as HTMLUListElement;
  const liEl = document.createElement('li')as HTMLLIElement;
  const liEl2 = document.createElement('li')as HTMLLIElement;
  const liEl3 = document.createElement('li')as HTMLLIElement;
  const divHead = document.getElementById('ul-header')as HTMLDivElement;

  divHead.appendChild(ulEl);
  ulEl.appendChild(liEl);
  ulEl.appendChild(liEl2);
  ulEl.appendChild(liEl3);
  liEl.innerText = 'home';
  liEl.innerText = 'profile';
  liEl.innerText = 'users';

}