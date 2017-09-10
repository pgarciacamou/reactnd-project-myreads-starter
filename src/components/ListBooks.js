import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/ListBooks.css";
import Bookshelf from "./Bookshelf.js"
import _ from "lodash";
import BookshelvesNames from '../constants/BookshelvesNames';

function ListBooks({ books, children, onShelfChange }) {
  const booksByShelf = _.groupBy(books, "shelf");

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {_.keys(booksByShelf).map((shelfKey) => (
          shelfKey !== "none" && <Bookshelf
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
