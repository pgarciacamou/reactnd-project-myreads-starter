import React from "react";
import "../stylesheets/Book.css";
import BookshelvesNames from '../constants/BookshelvesNames';

function Book(book) {
  const { imageLinks, title, authors, onShelfChange, shelf } = book;

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: `url("${imageLinks ? imageLinks.thumbnail : ""}")`
        }}></div>
        <div className="book-shelf-changer">
          <select defaultValue={shelf || "none"} onChange={onShelfChange.bind(null, book)}>
            <option value="none" disabled>Move to...</option>
            {Object.keys(BookshelvesNames).map((key) => (
              <option key={key} value={key}>{BookshelvesNames[key]}</option>
            ))}
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors && authors.join(", ")}</div>
    </div>
  );
}

export default Book;