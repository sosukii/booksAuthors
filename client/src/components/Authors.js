import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_ALL_AUTHORS, GET_ONE_AUTHOR} from "../query/author";
import {GET_ALL_BOOKS, GET_ONE_BOOK} from "../query/book";

function Authors() {
    const [authorRequestedID, setAuthorRequestedID] = useState(null)
    const [bookRequestedID, setBookRequestedID] = useState(null)

    const [authors, setAuthors] = useState([])

    const {data:authorsData, loading, refetch, fetchMore} = useQuery(GET_ALL_AUTHORS)
    const {data:authorData, loading:authorLoading, refetch:authorRefetch} = useQuery(GET_ONE_AUTHOR, {
        variables:{
            currentId: authorRequestedID
        }
    })
    const {data:booksData, loading:booksLoading, refetch:booksRefetch} = useQuery(GET_ALL_BOOKS)
    const {data:bookData, loading:bookLoading, refetch:bookRefetch} = useQuery(GET_ONE_BOOK, {
        variables:{
            currentId: bookRequestedID
        }
    })

    useEffect( () => {
        if(!loading){
            console.log('data from server: ', authorsData.getAllAuthors)
            setAuthors(authorsData.getAllAuthors)
        }
    }, [authorsData])

    const getAllAuthors = e => {
        e.preventDefault()
        refetch()
        console.log(authors)
    }
    const getMoreContent = async () =>{
        await fetchMore({variables:{offset:authors.length}})
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
    if(loading) {
        return <h1>Loading authors...</h1>
    }

    return (
        <div>
            <h1 className="main-title">Authors catalog</h1>
            <button onClick={() => console.log(authors)}>log authors</button>
            <button onClick={() => getMoreContent()}>load more...</button>
            <button title="fckng refresh list and get new authors" onClick={(e) => getAllAuthors(e)} className="btn btn-success">fckng refresh</button>
            <section className="section">
                <div className="container">
                    <div className="section-header">

                    </div>
                    <div className="products-wrapper">
                        {authors.map(author =>
                            {
                                if(author.name) {
                                    return(
                                        <div className="product">
                                            <span className="author-name">{author.name}</span>
                                            <img className="some-image" src="https://avatars.mds.yandex.net/get-zen_doc/3947075/pub_5f6ceb42730d4120c2905e79_5f6df39afde6297ce38dda35/scale_1200" alt="teacher who reading the book"/>
                                            <ul className="books-list">
                                                {
                                                    author.books.map(book =>
                                                        <li className="one-book">
                                                            {book.title}
                                                        </li>
                                                    )
                                                }
                                            </ul>
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

export default Authors