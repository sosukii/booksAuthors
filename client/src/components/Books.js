import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";

import {GET_ALL_BOOKS} from "../query/book";
import './books.css'

function Books() {
    const [bookRequestedID, setBookRequestedID] = useState(null)
    const [books, setBooks] = useState([])
    const [limit, setLimit] = useState(4)
    const [shouldResetValue, setShouldResetValue] = useState(false)

    const {data:booksData, loading:booksLoading, refetch:booksRefetch, fetchMore:booksFetchMore} = useQuery(GET_ALL_BOOKS, {
        variables: {
            limitValue: limit,
            shouldReset: shouldResetValue
        }
    })

    useEffect( () => {
        if(!booksLoading && !shouldResetValue) setBooks(booksData.getAllBooks)
    }, [booksData])

    const refreshAllBooks = async () => {
        await booksRefetch()
        setShouldResetValue(false)
    }
    const getMoreContent = async () =>{
        await booksFetchMore({variables:{offset:books.length}})
    }

    const inputHandler = (e) => {
        setLimit(Number(e.target.value))
    }

    if(booksLoading) {
        return <h1>Loading books...</h1>
    }
    return (
        <div>
            <h1 className="main-title">Books catalog</h1>
            <button onClick={() => console.log(books, limit, typeof  limit, shouldResetValue)}>log books</button>

            <div className="countItemPerPageByUser">
            <p>how much books per page should be (current value: {limit} books per page): </p>
            <p>1. press approve button, 2. enter you're number, 3. press refresh button</p>
            <button onClick={() => setShouldResetValue(true)}>approve</button>
            <input type="number" onInput={(e) => inputHandler(e)}/>
            <button title="refresh list and get new books" onClick={(e) => refreshAllBooks(e)} className="btn btn-success">refresh</button>
            </div>

            <section className="section">
                <div className="container">
                    <div className="section-header">

                    </div>
                    <div className="products-wrapper">
                        {books.map(book =>
                            {
                                if(book.title) {
                                    return(
                                        <div className="product">
                                            <p title="title of the book" className="title-book">{book.title}</p>
                                            <img className="some-image" src="https://www.meme-arsenal.com/memes/a2be492e6101f6a9d745be2b731c9305.jpg" alt="example portrait of book author (it is not a real author of this book. Person at photo - Alan Rickman, an English actor)"/>
                                            <p className="author-name" title="name of author who write this book">{book.author.name}</p>
                                            <p title="description of the book" className="book-description">"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</p>
                                        </div>
                                    )

                                }
                            }

                        )}
                    </div>
                    <div className="btn-loadMore">
                        <button className="btn btn-success" onClick={() => getMoreContent()}>load more...</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Books