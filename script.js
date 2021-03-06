const myLibrary = [];

function Book(title, author, pageCount, haveRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.haveRead = haveRead;
}

Book.prototype.createHTMLElement = function (key) {
  const element = document.createElement('p');
  switch (key) {
    case 'title':
      element.innerHTML = `<p><strong>${this.title}</strong></p>`;
      break;
    case 'author':
      element.innerHTML = `<p>${this.author}</p>`;
      break;
    case 'pageCount':
      element.innerHTML = `<p>${this.pageCount} Pages</p>`;
      break;
  }
  return element;
};

Book.prototype.toggleReadStatus = function () {
  if (this.haveRead) {
    this.haveRead = false;
  } else {
    this.haveRead = true;
  }
};

function addBookToLibrary(title, author, pageCount, haveRead) {
  const newBook = new Book(title, author, pageCount, haveRead);
  myLibrary.push(newBook);
  displayNewBook(newBook);
}

function displayNewBook(book) {
  const libraryContainer = document.getElementById('library-container');
  const bookContainer = document.createElement('div');
  bookContainer.classList.add('book-container');
  bookContainer.dataset.index = myLibrary.indexOf(book);

  for (const key in book) {
    if (book.hasOwnProperty(key)) {
      if (key === 'haveRead') {
        const read = book[key] ? 'Read' : 'Unread';

        const readButton = document.createElement('button');
        readButton.classList.add('read-button');
        readButton.textContent = read;
        readButton.addEventListener('click', toggleReadStatusButton);

        bookContainer.appendChild(readButton);
      } else {
        bookContainer.appendChild(book.createHTMLElement(key));
      }
    }
  }

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-book');
  removeButton.addEventListener('click', removeBook);
  removeButton.textContent = 'Remove';
  bookContainer.appendChild(removeButton);

  libraryContainer.appendChild(bookContainer);
}

function showOverlay() {
  document.getElementById('overlay').style.display = 'block';
}

function hideOverlay() {
  document.getElementById('overlay').style.display = 'none';
}

function toggleReadStatusButton(event) {
  const bookContainer = event.target.parentNode;
  myLibrary[bookContainer.dataset.index].toggleReadStatus();
  event.target.textContent = myLibrary[bookContainer.dataset.index].haveRead
    ? 'Read'
    : 'Unread';
}

function removeBook(event) {
  const bookContainer = event.target.parentNode;
  const index = bookContainer.dataset.index;
  delete myLibrary[index];
  bookContainer.remove();
}

function initializeEventListeners() {
  // "New Book" button
  document
    .getElementById('new-book-button')
    .addEventListener('click', showOverlay);

  // "Cancel" button
  document.getElementById('cancel').addEventListener('click', hideOverlay);

  // Esc key
  window.addEventListener('keydown', (e) => {
    if (/(Escape)/.test(e.key)) {
      hideOverlay();
    }
  });

  // "Add Book" button
  document.getElementById('add-book').addEventListener('click', readInput);
}

function validateInput(title, author, pageCount) {
  const errorElement = document.getElementById('input-error');
  if (!title) {
    errorElement.textContent = 'Please enter a title!';
    errorElement.style.display = 'block';
    return false;
  } else if (!author) {
    errorElement.textContent = 'Please enter an author!';
    errorElement.style.display = 'block';
    return false;
  } else if (!pageCount) {
    errorElement.textContent = 'Please enter the number of pages!';
    errorElement.style.display = 'block';
    return false;
  }
  return true;
}

function resetForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('page-count').value = '';
  document.getElementById('unread').checked = true;
  document.getElementById('input-error').textContent = '';
  document.getElementById('input-error').style.display = 'none';
}

function readInput() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pageCount = parseInt(document.getElementById('page-count').value);
  const haveRead =
    document.querySelector('input[name="read-unread"]:checked').value ===
    'true';
  console.log(haveRead);

  if (validateInput(title, author, pageCount, haveRead)) {
    addBookToLibrary(title, author, pageCount, haveRead);
    resetForm();
  }
}

initializeEventListeners();
