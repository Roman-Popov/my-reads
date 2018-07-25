import React, { Component } from 'react'

import ShelfChanger from './ShelfChanger'

class Book extends Component {
    render() {
        const { book, changeShelf } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div
                        className={`book-cover ${!book.imageLinks && 'no-thumbnail'}`}
                        style={{ width: 128, height: 193, backgroundImage: book.imageLinks && `url("${( book.imageLinks.thumbnail) }")` }}>
                    </div>
                    <ShelfChanger
                        book={book}
                        currentShelf={book.shelf}
                        changeShelf={changeShelf}
                    />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
            </div>
        )
    }
}

export default Book
