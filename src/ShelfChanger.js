import React, { Component } from 'react'

class ShelfChanger extends Component {

    getCurrShelfName(shelves, shelfId) {
        const shelfObj = shelves.filter(obj => obj.shelf === shelfId)[0]
        return shelfObj ? shelfObj.name : 'None'
    }

    render() {
        const { book, currentShelf, changeShelf } = this.props;

        const shelves = [
            { shelf: 'currentlyReading', name: 'Currently Reading' },
            { shelf: 'wantToRead', name: 'Want to Read' },
            { shelf: 'read', name: 'Read' },
            { shelf: 'none', name: 'None' }
        ]
        const currShelfName = this.getCurrShelfName(shelves, currentShelf)

        return (
            <div className="book-shelf-changer">
                <select onChange={(e) => changeShelf(book, e.target.value)} defaultValue={currentShelf || 'none'} >
                    <option value="move" disabled>Now on: {currShelfName}</option>
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
