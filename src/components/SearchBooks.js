import React from 'react';
import { Link } from "react-router-dom";
import '../stylesheets/SearchBooks.css';
import mergeExistingBooks from "../utils/mergeExistingBooks";
import BooksGrid from "./BooksGrid.js";
import * as BooksAPI from '../utils/BooksAPI';
import isEmpty from "lodash/isEmpty";

class SearchBooks extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchQueryUpdate = this.handleSearchQueryUpdate.bind(this);
  }
  cache = {}
  state = {
    query: "",
    searchResult: []
  }
  handleSearchQueryUpdate({ target }) {
    const query = target.value;
    this.setState({ query });

    if(isEmpty(query)) {
      return this.setState({ searchResult: [] });
    }

    /**
     * used cached searches to optimize speed and prevent
     * sending request to the API very often.
     */
    const previousSearch = this.cache[query];
    if(previousSearch && Date.now() < previousSearch.expiration) {
      return this.setState({ searchResult: this.cache[query] });
    }

    BooksAPI.search(query, 100)
    .then((searchResult) => {
      if(target.value !== query) {
        /**
         * DO NOT UPDATE BOOKS WHEN THE TARGET VALUE HAS CHANGED
         *
         * searching is async, thus the results can be async
         * we need to make sure that the query we searched for
         * is still valid.
         */
        return;
      }

      if(searchResult.error) {
        throw searchResult.error;
      }

      this.cache[query] = searchResult;
      this.cache[query].expiration = Date.now() + 60000; // cache result for 1 minute
      this.setState({ searchResult: this.cache[query] })
    })
    .catch(err => {
      this.setState({ searchResult: [] })
    });
  }
  render() {
    const { books, handleBookshelfUpdate } = this.props;
    const { query, searchResult } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleSearchQueryUpdate}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={mergeExistingBooks(searchResult, books)}
            onShelfChange={handleBookshelfUpdate}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks;
