import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from './Bookshelf';

class MainPage extends Component {
    render() {
        const { books, changeShelf } = this.props

        return (
            <div className="list-books">
                <div className="list-books-content">
                        <Bookshelf
                            section="Currently Reading"
                            shelf="currentlyReading"
                            changeShelf={changeShelf}
                            books={books}
                        />
                        <Bookshelf
                            section="Want to Read"
                            shelf="wantToRead"
                            changeShelf={changeShelf}
                            books={books}
                        />
                        <Bookshelf
                            section="Read"
                            shelf="read"
                            changeShelf={changeShelf}
                            books={books}
                        />
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default MainPage
