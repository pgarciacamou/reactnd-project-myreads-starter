import uniqueId from "lodash/uniqueId";

// in order of appearance
const BookshelvesInfo = [
  { id: uniqueId("shelves_"), key: "currentlyReading", name: "Currently Reading" },
  { id: uniqueId("shelves_"), key: "wantToRead", name: "Want To Read" },
  { id: uniqueId("shelves_"), key: "read", name: "Read" }
];

export default BookshelvesInfo;
