import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from './Bookshelf';

class SearchPage extends Component {

    state = {
        query: this.getCurrentURL(),
        timer: '',
        lastURL: '',
    }

    getCurrentURL() {
        return document.URL.substr(document.URL.indexOf('search') + 7).replace('%20', ' ')
    }

    componentDidUpdate(prevProps, prevState) {
        // Need in case of navigation back and forth by browser buttons
        if (this.getCurrentURL() !== this.state.lastURL) {
            this.setState({ lastURL: this.getCurrentURL() })
            return
        }
        if (this.state.lastURL !== prevState.lastURL) {
            this.props.searchBooks(this.state.lastURL)
            this.setState({ query: this.state.lastURL })
        }
    }

    updateQuery = (query) => {
        clearTimeout(this.state.timer);
        const timer = setTimeout(() => {
            this.props.changeUrl(this.state.query);
        }, 1000);
        this.setState({ query: query, timer: timer, })
    }

    render() {
        const { query } = this.state;
        const { myBooks, searchResults } = this.props;

        const filteredMyBooks = query ? myBooks.filter(book => book.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                                                               book.authors.join(' ').toLowerCase().indexOf(query.toLowerCase()) !== -1) : [];
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {(filteredMyBooks.length > 0) &&
                        <Bookshelf
                            section="My Books"
                            books={filteredMyBooks}
                        />}
                    </ol>

                    <ol className="books-grid">
                        {(searchResults.length > 0) &&
                        <Bookshelf
                            section="Search Results"
                            shelf="searchResults"
                            books={searchResults}
                        />}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage
