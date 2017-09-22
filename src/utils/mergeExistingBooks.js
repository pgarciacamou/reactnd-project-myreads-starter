import find from "lodash/find";

function mergeExistingBooks(dest, src) {
  return dest.map((book) =>
    Object.assign({}, book, find(src, (b) => b.id === book.id))
  );
}

export default mergeExistingBooks;
