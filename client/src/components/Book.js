import React, {useState} from "react";
import {useQuery} from "@apollo/client";

import {GET_ONE_BOOK} from "../query/book";
import './book.css'

function Book() {
    const [book, setBook] = useState('')
    const [bookRequestedID, setBookRequestedID] = useState('')
    const [messageAttention, setMessageAttention] = useState('')

    const {data:bookData} = useQuery(GET_ONE_BOOK, {
        variables:{
            id: bookRequestedID
        }
    })

    const findBook = () => {
        bookRequestedID.length < 1
            ? setMessageAttention('you should write correct id')
            : setBook(bookData.getBook)
    }

    const inputHandler = (e) => {
        if((e.target.value).length > 0) setMessageAttention('')
        setBookRequestedID(e.target.value)
    }

    return (
        <div>
            <h1 className="main-title-book">Find book by id</h1>

            <div className="block-find-book">
                <p className="title-input-findBookById" >write interested id:</p>
                <input type="text" onInput={(e) => inputHandler(e)} className="input-findById"/>
                <button onClick={() => findBook()} className="btn btn-success btn-findBook">find book</button>
                {<p>{messageAttention}</p>}
            </div>

            <div className="result-of-searching">
                {
                    !book.title
                        ? ''
                        : <div className="product">
                            <span className="author-name">{book.title}</span>
                            <img className="some-image" src="https://www.meme-arsenal.com/memes/a2be492e6101f6a9d745be2b731c9305.jpg" alt="example portrait of book author (it is not a real author of this book. Person at photo - Alan Rickman, an English actor)"/>
                            <p className="author-name" title="name of author who write this book">{book.author.name}</p>
                            <p title="description of the book" className="book-description">"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</p>
                        </div>
                }
            </div>
        </div>
    )
}

export default Book