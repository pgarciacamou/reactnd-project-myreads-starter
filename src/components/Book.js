import React from "react";
import "../stylesheets/Book.css";
import BookshelvesInfo from '../constants/BookshelvesInfo';
import coverNotAvailable from '../assets/cover-not-available.jpg';
import classNames from "classnames";

function Book(book) {
  const { imageLinks, title, authors, onShelfChange, shelf } = book;
  const noCoverImage = !imageLinks;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className={classNames("book-cover", { "no-cover": noCoverImage })}
          style={{ backgroundImage: `url("${noCoverImage ? coverNotAvailable : imageLinks.thumbnail}")` }}
        />
        <div className="book-shelf-changer">
          <select defaultValue={shelf || "none"} onChange={event => onShelfChange(book, event)}>
            <option value="none" disabled>Move to...</option>
            {BookshelvesInfo.map(({ id, key, name }) => (
              <option key={id} value={key}>{name}</option>
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
