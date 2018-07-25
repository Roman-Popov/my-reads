import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import Header from './Header';
import MainPage from './MainPage';
import SearchPage from './SearchPage';

import './App.css'

class BooksApp extends Component {
    state = {
        myBooks: [],
        searchResults: []
    }

    componentDidMount() {
        this.loadMyBooks();
    }

    searchBooks = (query) => {
        if (query) {
            BooksAPI.search(query).then((books) => {
                if (books.error) {
                    this.setState({ searchResults: [] })
                } else {
                    this.setState({ searchResults: books })
                }
            }).catch(() => this.setState({ searchResults: [] }))
        } else {
            this.setState({ searchResults: [] })
        }
    }

    loadMyBooks() {
        BooksAPI.getAll().then((books) => {
            this.setState({ myBooks: books })
        })
    }

    changeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(()=> this.loadMyBooks())
    }

    render() {
        const { myBooks, searchResults } = this.state;

        return (
            <div className="app">
                <Header />

                <Route exact path="/" render={() => (
                    <MainPage
                        books={myBooks}
                        changeShelf={this.changeShelf}
                    />
                )} />

                <Route path="/search" render={( { history } ) => (
                    <SearchPage
                        changeUrl={(input) => {
                            history.push(`/search/${input}`)
                        }}
                        searchBooks={this.searchBooks}
                        myBooks={myBooks}
                        searchResults={searchResults}
                        changeShelf={this.changeShelf}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp
