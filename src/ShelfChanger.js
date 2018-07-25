import React, { Component } from 'react'

class ShelfChanger extends Component {

    render() {
        const { book, currentShelf, changeShelf } = this.props;

        const shelves = [
            { shelf: 'currentlyReading', name: 'Currently Reading' },
            { shelf: 'wantToRead', name: 'Want to Read' },
            { shelf: 'read', name: 'Read' },
            { shelf: 'none', name: 'None' }
        ]

        return (
            <div className="book-shelf-changer">
                <select onChange={(e) => changeShelf(book, e.target.value)} defaultValue={currentShelf || 'none'} >
                    <option value="move" disabled>Move to...</option>
                    {
                        shelves.map(shelf => (
                            <option
                                key={shelf.shelf}
                                value={shelf.shelf}
                            >
                                {shelf.name}
                            </option>)
                        )
                    }
                </select>
            </div>
        )
    }
}

export default ShelfChanger
