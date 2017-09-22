import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/ListBooks.css";
import Bookshelf from "./Bookshelf.js"
import groupBy from "lodash/groupBy";
import includes from "lodash/includes";
import BookshelvesNames from '../constants/BookshelvesNames';
import getShelvesKeys from '../utils/getShelvesKeys';

const HiddenShelves = [
  "none"
];

function ListBooks({ books, children, onShelfChange }) {
  const booksByShelf = groupBy(books, "shelf");

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {getShelvesKeys(booksByShelf).map((shelfKey) => (
          !includes(HiddenShelves, shelfKey) && <Bookshelf
            key={shelfKey}
            name={BookshelvesNames[shelfKey]}
            books={booksByShelf[shelfKey]}
            onShelfChange={onShelfChange}
          />
        ))}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default ListBooks;
