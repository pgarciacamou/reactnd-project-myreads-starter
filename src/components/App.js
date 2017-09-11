import React from 'react'
import { Route, Link } from "react-router-dom"
import * as BooksAPI from '../utils/BooksAPI';
import ListBooks from "./ListBooks.js"
import BooksGrid from "./BooksGrid.js"
import '../stylesheets/App.css'
import _ from "lodash";
import findAndReplaceBook from "../utils/findAndReplaceBook";
import mergeExistingBooks from "../utils/mergeExistingBooks";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleBookshelfUpdate = this.handleBookshelfUpdate.bind(this);
    this.handleSearchQueryUpdate = this.handleSearchQueryUpdate.bind(this);
  }
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    query: "",
    searchResult: []
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
        books: findAndReplaceBook(books, book, _.assign({}, book, { shelf }))
      }));
    });
  }
  handleSearchQueryUpdate({ target }) {
    const query = target.value;
    this.setState({ query });

    BooksAPI.search(query, 100)
    .then((searchResult) => {
      if(searchResult.error) {
        throw searchResult.error;
      }
      this.setState({ searchResult })
    })
    .catch(err => {
      this.setState({ searchResult: [] })
    });
  }
  render() {
    const { books, query, searchResult } = this.state;

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={this.handleSearchQueryUpdate}
                />
              </div>
            </div>
            <div className="search-books-results">
              <BooksGrid books={mergeExistingBooks(searchResult, books)} onShelfChange={this.handleBookshelfUpdate} />
            </div>
          </div>
        )} />
        <Route exact path="/" render={() => (
          <ListBooks books={books} onShelfChange={this.handleBookshelfUpdate} />
        )} />
      </div>
    )
  }
}

export default BooksApp
