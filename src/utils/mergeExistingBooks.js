import _ from "lodash";

function mergeExistingBooks(dest, src) {
  return _.map(dest, (book) =>
    _.assign({}, book, _.find(src, (b) => b.id === book.id))
  )
}

export default mergeExistingBooks;
