import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/ListBooks.css";
import _ from "lodash";
import BookshelvesNames from '../constants/BookshelvesNames';

class ListBooks extends Component {
  state = {
    books: []
  }
  render() {
    const { books } = this.props;
    const booksByShelf = _.groupBy(books, "shelf");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {_.keys(booksByShelf).map((shelfKey) =>
            this.renderBookShelf(BookshelvesNames[shelfKey], booksByShelf[shelfKey])
          )}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
  renderBookShelf(name, books) {
    return (
      <div className="bookshelf" key={name}>
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>{this.renderBook(book)}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
  renderBook({imageLinks, title, authors}) {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageLinks.thumbnail})`
          }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(", ")}</div>
      </div>
    );
  }
}

export default ListBooks;
