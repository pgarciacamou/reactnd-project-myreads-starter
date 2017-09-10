import React from "react";
import BooksGrid from "./BooksGrid";
import "../stylesheets/Bookshelf.css";

function Bookshelf({ name, books, onShelfChange }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <BooksGrid
          books={books}
          onShelfChange={onShelfChange}
        />
      </div>
    </div>
  );
}

export default Bookshelf;
