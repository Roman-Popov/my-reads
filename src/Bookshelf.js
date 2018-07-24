import React, { Component } from 'react'

import Book from './Book'

class Bookshelf extends Component {
    render() {
        const { section, shelf, books } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{section}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books
                            .filter(book => {
                                if (book.shelf && shelf) {
                                    return book.shelf === shelf
                                } else {
                                    return book
                                }
                            })
                            .map(book => (
                                <li key={book.id}>
                                    <Book
                                        book={book}
                                    />
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf