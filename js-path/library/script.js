"use strict";

class Library {
  static #myLibrary = [];
  static addBook(book) {
    this.#myLibrary.push(book);
    this.updateLocalStorage();
  }
  static clear() {
    this.#myLibrary.splice(0, this.#myLibrary.length);
    this.updateLocalStorage();
  }
  static getList(filter = undefined) {
    return this.#myLibrary;
  }
  static updateLocalStorage() {
    if (localStorage.getItem("books")) {
      localStorage.clear();
    }
    const data = JSON.stringify(this.#myLibrary);
    localStorage.setItem("books", data);
  }
  static init() {
      let data = JSON.parse(localStorage.getItem("books"));
      data = data.map(book);
      this.#myLibrary = data;
      Display();

      function book(bookData) {
        return new Book(bookData.title, bookData.author, bookData.pages, bookData.read);
      }
  } 
}

class Book {
  constructor(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function MakeBookDiv(book) {
  const bookTitle = document.createElement("h3");
  bookTitle.textContent = book.title;
  bookTitle.classList.add("card-title");
  const bookAuthor = document.createElement("span");
  bookAuthor.textContent = book.author;
  bookAuthor.classList.add("card-author");
  const bookPages = document.createElement("span");
  bookPages.textContent = `pages: ${book.pages}`;
  bookPages.classList.add("card-pages");

  const bookDiv = document.createElement("div");
  bookDiv.classList.add("card");
  bookDiv.appendChild(bookTitle);
  bookDiv.append(bookAuthor);
  bookDiv.appendChild(bookPages);
  if (book.read) {
    cardReadUpdate(bookDiv, true);
  }
  bookDiv.addEventListener("click", BookStatus);
  return bookDiv;
}

function Display() {
  const contentCards = document.querySelector(".cards");
  contentCards.textContent = "";

  const bookList = Library.getList();

  if (bookList.length !== 0) {
    bookList.forEach(AddContent);
  } else if (bookList.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent =
      "Looks empty. Try adding new books with Add button.";
    emptyMessage.classList.add("cards-empty");
    contentCards.appendChild(emptyMessage);
  }

  function AddContent(book) {
    const bookDiv = MakeBookDiv(book);
    contentCards.appendChild(bookDiv);
  }
}

function DummyData() {
  fetch("./books.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      Library.clear();
      data.forEach((book) => {
        const newBook = new Book(
          book.title,
          book.author,
          book.pages,
          book.read
        );
        Library.addBook(newBook);
      });
      Display();
    });
}

function DisplayAddUI(value) {
  const addUI = document.querySelector(".add-ui");
  addUI.style.visibility = value ? "visible" : "hidden";
}

function UIHandlers() {
  const removeButton = document.querySelector(".btn-del");
  removeButton.addEventListener("click", removeHandler);

  const addButton = document.querySelector(".btn-add");
  addButton.addEventListener("click", addHandler);

  const backdrop = document.querySelector(".add-ui");
  backdrop.addEventListener("click", backdropHandler);

  const addUI = document.querySelector(".add-box");
  addUI.addEventListener("click", addUIHandler);

  const form = document.querySelector("#add-book-form");
  form.addEventListener("submit", submitHandler);

  function removeHandler() {
    Library.clear();
    Display();
  }

  function addHandler() {
    DisplayAddUI(true);
  }

  function backdropHandler() {
    DisplayAddUI(false);
  }

  function addUIHandler(event) {
    event.stopPropagation();
  }

  function submitHandler(event) {
    event.preventDefault();
    const formElements = event.target.elements;
    const bookTitle = formElements["Book Title"].value;
    const bookAuthor = formElements["Book Author"].value;
    let pages = formElements["Book Pages"].value;
    const read = formElements["Book Read"].checked;
    validate(bookTitle, bookAuthor);
    pages = Math.round(pages) < 0 ? 0 : Math.round(pages);
    const book = new Book(bookTitle, bookAuthor, pages, read);
    Library.addBook(book);
    DisplayAddUI(false);
    Display();
  }

  function validate(title, author) {
    if (title.length === 0) throw "Book Title empty";
    else if (author.length === 0) throw "Book Author empty";
  }
}

function cardReadUpdate(card, value) {
  if (value) card.classList.add("card-read");
  else card.classList.remove("card-read");
}

function BookStatus(event) {
  const currBook = event.currentTarget;
  const currBookData = currBook.children;
  const bookList = Library.getList();
  const book = bookList.find(getBook);
  book.read = !book.read;
  Library.updateLocalStorage();
  cardReadUpdate(currBook, book.read);

  function getBook(book) {
    const title = currBookData[0].textContent;
    const author = currBookData[1].textContent;
    const pages = Number(currBookData[2].textContent.split(" ")[1]);
    return book.title == title && book.author == author && book.pages == pages;
  }
}

// DummyData();
UIHandlers();
Library.init();