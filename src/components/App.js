import React from 'react';
import { Route, Link } from "react-router-dom";
import * as BooksAPI from '../utils/BooksAPI';
import SearchBooks from "./SearchBooks.js";
import ListBooks from "./ListBooks.js";
import '../stylesheets/App.css';
import updateBook from "../utils/updateBook";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleBookshelfUpdate = this.handleBookshelfUpdate.bind(this);
  }
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }
  handleBookshelfUpdate(book, { target }) {
    const shelf = target.value;

    BooksAPI.update(book, shelf).then(() => {
      this.setState(({ books }) => ({
        books: updateBook(books, book, { shelf })
      }));
    });
  }
  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks
            books={books}
            handleBookshelfUpdate={this.handleBookshelfUpdate}
            handleSearchQueryUpdate={this.handleSearchQueryUpdate}
          />
        )} />
        <Route exact path="/" render={() => (
          <div>
            <ListBooks books={books} onShelfChange={this.handleBookshelfUpdate} />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp;
