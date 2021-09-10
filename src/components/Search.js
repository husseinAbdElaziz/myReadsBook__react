import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import * as BooksAPI from '../BooksAPI';

import BookCard from './BookCard';

class Search extends Component {
  state = {
    filterdBooks: [],
  };

  handleInputChange = async (event) => {
    const text = event.target.value.trim();

    if (!text?.length) return this.setState({ filterdBooks: [] });

    try {
      const filterdBooks = await BooksAPI.search(text);

      if (filterdBooks && !filterdBooks?.error) {
        this.setState({ filterdBooks: this.getBookShelf(filterdBooks) });
      } else {
        this.setState({ filterdBooks: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getBookShelf = (books) => {
    return books.map((book) => {
      for (const userBook of this.props.books) {
        if (userBook.id === book.id) {
          book.shelf = userBook.shelf;
        }
      }
      return book;
    });
  };

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>
            Close
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              onChange={(event) => this.handleInputChange(event)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.filterdBooks?.map((book) => (
              <li key={book.id}>
                <BookCard book={book} updateShelf={this.props.updateShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  books: PropTypes.array,
  updateShelf: PropTypes.func,
};

export default Search;
