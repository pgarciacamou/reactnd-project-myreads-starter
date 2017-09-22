import React from "react";
import "../stylesheets/ListBooks.css";
import Bookshelf from "./Bookshelf.js"
import groupBy from "lodash/groupBy";
import BookshelvesInfo from '../constants/BookshelvesInfo';

function ListBooks({ books, children, onShelfChange }) {
  const booksByShelf = groupBy(books, "shelf");

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {BookshelvesInfo.map(({ id, key, name }) => (
          <Bookshelf
            key={id}
            name={name}
            books={booksByShelf[key]}
            onShelfChange={onShelfChange}
          />
        ))}
      </div>
    </div>
  );
}

export default ListBooks;
