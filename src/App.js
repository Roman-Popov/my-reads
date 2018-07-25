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
        BooksAPI.getAll().then((books) => {
            this.setState({ myBooks: books })
        })
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

    render() {
        const { myBooks, searchResults } = this.state;


        return (
            <div className="app">
                <Header />

                <Route exact path="/" render={() => (
                    <MainPage
                        books={myBooks}
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
                    />
                )} />


            </div>
        )
    }
}

export default BooksApp
