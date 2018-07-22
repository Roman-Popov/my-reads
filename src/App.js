import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import Header from './Header';
import MainPage from './MainPage';
import SearchPage from './SearchPage';

import './App.css'

class BooksApp extends Component {
    state = {
        myBooks: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ myBooks: books })
        })
    }

    render() {
        const { myBooks } = this.state;


        return (
            <div className="app">
                <Header />

                <Route exact path="/" render={() => (
                    <MainPage
                        books={myBooks}
                    />
                )} />

                <Route path="/search" render={() => (
                    <SearchPage />
                )} />


            </div>
        )
    }
}

export default BooksApp
