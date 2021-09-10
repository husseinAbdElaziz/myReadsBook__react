import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import Search from './components/Search';
import Home from './components/Home';

import * as BooksApi from './BooksAPI';

import './App.css';

class BooksApp extends Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    try {
      const books = await BooksApi.getAll();

      this.setState({ books });
    } catch (error) {
      console.log(error);
    }
  }

  // update shelf handler
  handleUpdateShelf = async (event, book) => {
    const { value } = event.target;

    if (value) {
      try {
        await BooksApi.update(book, value);
        const updatedBook = { ...book, shelf: value };

        const books = this.state.books
          .filter((book) => book.id !== updatedBook.id)
          .concat(updatedBook);

        this.setState({ books });
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    return (
      <div className='app'>
        <Route
          path='/search'
          render={() => (
            <Search
              books={this.state.books}
              updateShelf={this.handleUpdateShelf}
            />
          )}
        />
        <Route
          exact
          path='/'
          component={() => (
            <Home
              books={this.state.books}
              updateShelf={this.handleUpdateShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
