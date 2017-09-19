import find from "lodash/find";

function mergeExistingBooks(dest, src) {
  return Object.map(dest, (book) =>
    Object.assign({}, book, find(src, (b) => b.id === book.id))
  )
}

export default mergeExistingBooks;
