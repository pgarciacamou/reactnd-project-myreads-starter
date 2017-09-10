function findAndReplaceBook(arr, match, replacement) {
  return arr.map(elem => elem.id === match.id ? replacement : elem);
}

export default findAndReplaceBook;
