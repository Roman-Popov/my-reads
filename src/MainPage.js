import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from './Bookshelf';

class MainPage extends Component {
    render() {
        const { books } = this.props

        return (
            <div className="list-books">
                <div className="list-books-content">
                    <div>
                        <Bookshelf
                            section="Currently Reading"
                            shelf="currentlyReading"
                            books={books}
                        />
                        <Bookshelf
                            section="Want to Read"
                            shelf="wantToRead"
                            books={books}
                        />
                        <Bookshelf
                            section="Read"
                            shelf="read"
                            books={books}
                        />
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default MainPage