import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from './Bookshelf';

class SearchPage extends Component {

    state = {
        query: this.getCurrentURL(),
        timer: '',
        lastURL: '',
    }


    componentDidUpdate() {
        const { query, lastURL } = this.state;
        const currentURL = this.getCurrentURL()
        // If search URL has been changed
        if (currentURL !== lastURL) {
            // Search for new books
            this.props.searchBooks(currentURL);

            const searchInput = (query.trim() !== lastURL) ? query : currentURL;
            this.setState({ lastURL: currentURL, query: searchInput })
        }
    }

    getCurrentURL() {
        return decodeURI(document.URL.substr(document.URL.indexOf('search') + 7))
    }

    updateQuery = (query) => {
        clearTimeout(this.state.timer);
        const timer = setTimeout(() => {
            this.props.changeUrl(this.state.query.trim());
        }, 500);
        this.setState({ query: query, timer: timer })
    }

    filterBooks(query, books) {
        return query ? books.filter(book =>
                            book.title
                                .toLowerCase()
                                .indexOf(query.toLowerCase().trim()) !== -1 ||
                            book.authors
                                .join(' ')
                                .toLowerCase()
                                .indexOf(query.toLowerCase().trim()) !== -1
                        ) : [];
    }

    render() {
        const { query } = this.state;
        const { myBooks, searchBooks, searchResults, changeShelf } = this.props;

        const relatedMyBooks = this.filterBooks(query.trim(), myBooks);

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" onClick={() => searchBooks()}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results list-books">
                    <div>
                        {(relatedMyBooks.length > 0) &&
                        <Bookshelf
                            section="My Books"
                            books={relatedMyBooks}
                            changeShelf={changeShelf}
                        />}
                    </div>

                    <ol className="books-grid">
                        {(searchResults.length > 0) &&
                        <Bookshelf
                            section="Search Results"
                            shelf="searchResults"
                            books={searchResults}
                            changeShelf={changeShelf}
                        />}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage
