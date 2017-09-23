import React from 'react';
import { Route, Link, Switch } from "react-router-dom";
import * as BooksAPI from '../utils/BooksAPI';
import SearchBooks from "./SearchBooks.js";
import ListBooks from "./ListBooks.js";
import NotFound from "./NotFound.js";
import '../stylesheets/App.css';

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
        books: books.filter(b => b.id !== book.id).concat([
          Object.assign({}, book, { shelf }) // book is read only
        ])
      }));
    });
  }
  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Switch>
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
          <Route path="*" exact component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp;
