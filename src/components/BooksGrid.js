import React from "react";
import Book from "./Book";
import "../stylesheets/BooksGrid.css";

function BooksGrid({ books }) {
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
          <Book {...book} />
        </li>
      ))}
    </ol>
  );
}

export default BooksGrid;
