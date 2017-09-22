function updateOrAddBook(books, book, updates) {
  // create copy to avoid side effects
  const updatedBooks = books.slice();
  const replacement = Object.assign({}, book, updates);

  // update if exists
  for(let i = 0, l = updatedBooks.length; i < l; i++) {
    if(updatedBooks[i].id === book.id) {
      updatedBooks[i] = replacement;
      return updatedBooks;
    }
  }

  // if the book was not found, add it.
  updatedBooks.push(replacement);

  return updatedBooks;
}

export default updateOrAddBook;
