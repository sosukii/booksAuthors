import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_ALL_BOOKS, GET_ONE_BOOK} from "../query/book";
import './books.css'

function Books() {
    const [bookRequestedID, setBookRequestedID] = useState(null)
    const [books, setBooks] = useState([])

    const {data:booksData, loading:booksLoading, refetch:booksRefetch, fetchMore:booksFetchMore} = useQuery(GET_ALL_BOOKS)
    const {data:bookData, loading:bookLoading, refetch:bookRefetch} = useQuery(GET_ONE_BOOK, {
        variables:{
            currentId: bookRequestedID
        }
    })

    useEffect( () => {
        if(!booksLoading){
            console.log('data from server: ', booksData.getAllBooks)
            setBooks(booksData.getAllBooks)
        }
    }, [booksData])

    const getAllBooks = () => {
        booksRefetch()
        console.log(books)
    }
    const getMoreContent = async () =>{
        await booksFetchMore({variables:{offset:books.length}})
    }

    // const addUser = (e) => {
    //   e.preventDefault()
    //   newUser({
    //     variables: {
    //       input: {
    //         name, email, password
    //       }
    //     }
    //   }).then(({data}) => {
    //     console.log(data)
    //     setName('')
    //     setEmail('')
    //     setPassword('')
    //   })
    // }
    // const getAll = e => {
    //   e.preventDefault()
    //   refetch()
    // }
    if(booksLoading) {
        return <h1>Loading books...</h1>
    }

    return (
        <div>
            <h1 className="main-title">Books catalog</h1>
            <button onClick={() => console.log(books)}>log books</button>
            <button onClick={() => getMoreContent()}>load more...</button>
            <button title="fckng refresh list and get new books" onClick={(e) => getAllBooks(e)} className="btn btn-success">fckng refresh</button>
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
                </div>
            </section>
        </div>
    )
}

export default Books