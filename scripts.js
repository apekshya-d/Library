const container = document.querySelector("#container");
const mainButton = document.querySelector("#mainButton");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const formClose = document.querySelector("#formClose");

if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

const myLibrary = [
  {
    title: "example1",
    author: "example1",
    pages: "example1",
    ifRead: "example1",
  },

  {
    title: "example2",
    author: "example2",
    pages: "example2",
    ifRead: "example2",
  },
];

function Book(title, author, pages, ifRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.ifRead = ifRead;
}

Book.prototype.changeRead = function () {
  this.ifRead = !this.ifRead;
};

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
    pages.textContent = currentBook.pages;
    ifRead.textContent = currentBook.ifRead ? "Read" : "Not read";
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
}

mainButton.addEventListener("click", () => {
  dialog.showModal();
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
});

displayLibrary();
