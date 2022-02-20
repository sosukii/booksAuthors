import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";

import {GET_ALL_AUTHORS} from "../query/author";
import './authors.css'

function Authors() {
    const [authors, setAuthors] = useState([])
    const [limit, setLimit] = useState(2)
    const [shouldResetValue, setShouldResetValue] = useState(false)

    const {data:authorsData, loading, refetch, fetchMore} = useQuery(GET_ALL_AUTHORS, {
        variables:{
            limitValue: limit,
            shouldReset: shouldResetValue
        }
    })

    useEffect( () => {
        if(!loading && !shouldResetValue) setAuthors(authorsData.getAllAuthors)
    }, [authorsData])

    const refreshAllAuthors = async() => {
        await refetch()
        setShouldResetValue(false)
    }
    const getMoreContent = async () =>{
        await fetchMore({variables:{offset:authors.length}})
    }

    const inputHandler = (e) => {
        setLimit(Number(e.target.value))
    }

    if(loading) {
        return <h1>Loading authors...</h1>
    }
    return (
        <div>
            <h1 className="main-title">Authors catalog</h1>
            <button onClick={() => console.log(authors)}>log authors</button>

            <div className="countItemPerPageByUser">
                <p>how much authors per page should be (current value: {limit} authors per page): </p>
                <p>1. press approve button, 2. enter you're number, 3. press refresh button</p>
                <button onClick={() => setShouldResetValue(true)}>approve</button>
                <input type="number" onInput={(e) => inputHandler(e)}/>
                <button title="refresh list" onClick={(e) => refreshAllAuthors(e)} className="btn btn-success">refresh</button>
            </div>

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
                    <div className="btn-loadMore">
                        <button className="btn btn-success" onClick={() => getMoreContent()}>load more...</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Authors