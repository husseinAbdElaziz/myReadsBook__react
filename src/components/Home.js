import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BookCard from './BookCard';

class Home extends Component {
  render() {
    const { books, updateShelf } = this.props;

    console.log(books);

    // to filter bokks based on shelf
    const filterBooks = (shelf) =>
      books?.filter((book) => book.shelf === shelf);

    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            {/** Want to Read */}
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Currently Reading</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  {filterBooks('currentlyReading')?.map((book) => (
                    <li key={book.id}>
                      <BookCard book={book} updateShelf={updateShelf} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            {/** / Want to Read */}

            {/** Want to Read */}
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Want to Read</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  {filterBooks('wantToRead')?.map((book) => (
                    <li key={book.id}>
                      <BookCard book={book} updateShelf={updateShelf} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            {/** / Want to Read */}

            {/** read */}
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Read</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  {filterBooks('read')?.map((book) => (
                    <li key={book.id}>
                      <BookCard book={book} updateShelf={updateShelf} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            {/** / read */}
          </div>
        </div>
        <div className='open-search'>
          <Link to='/search'>
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
