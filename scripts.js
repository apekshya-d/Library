const container = document.querySelector("#container");
const mainButton = document.querySelector("#mainButton");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const formClose = document.querySelector("#formClose");
const quote = document.querySelector(".quote");

if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

const myLibrary = [];

class Book {
  constructor(title, author, pages, ifRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.ifRead = ifRead;
  }
  changeRead() {
    this.ifRead = !this.ifRead;
  }
}

function addBook(title, author, pages, ifRead) {
  let nextBook = new Book(title, author, pages, ifRead);
  myLibrary.push(nextBook);
  return myLibrary;
}

function displayLibrary() {
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    const currentBook = myLibrary[i];
    const card = document.createElement("div");
    card.classList.add("card");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const ifRead = document.createElement("button");
    const removeButton = document.createElement("button");

    title.textContent = currentBook.title;
    author.textContent = currentBook.author;
    pages.textContent = currentBook.pages + " pages";

    if (currentBook.ifRead) {
      ifRead.textContent = "Read";
      ifRead.classList.add("greenButton");
    } else {
      ifRead.textContent = "Not read";
      ifRead.classList.add("redButton");
    }

    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      myLibrary.splice(i, 1);
      displayLibrary();
    });

    ifRead.addEventListener("click", () => {
      currentBook.changeRead();
      displayLibrary();
    });

    card.append(title, author, pages, ifRead, removeButton);
    container.appendChild(card);
  }

  if (container.hasChildNodes()) {
    quote.classList.add("hide");
  } else {
    quote.classList.remove("hide");
  }
}

mainButton.addEventListener("click", () => {
  dialog.showModal();
  quote.classList.add("hide");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(form);
  let title = data.get("title");
  let author = data.get("author");
  let pages = data.get("pages");
  let ifRead = Boolean(data.get("ifRead"));
  addBook(title, author, pages, ifRead);
  displayLibrary();
  dialog.close();
  form.reset();
});

formClose.addEventListener("click", () => {
  dialog.close();

  if (container.hasChildNodes()) {
    quote.classList.add("hide");
  } else {
    quote.classList.remove("hide");
  }
});

displayLibrary();
