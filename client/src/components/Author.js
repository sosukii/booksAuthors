import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_ONE_AUTHOR} from "../query/author";
import './author.css'

function Author() {
    const [authorRequestedID, setAuthorRequestedID] = useState('')
    const [author, setAuthor] = useState([])
    const [messageAttention, setMessageAttention] = useState('')

    const {data:authorData} = useQuery(GET_ONE_AUTHOR, {
        variables:{
            id: authorRequestedID
        }
    })

    // useEffect( () => {
    //     if(!loading && !shouldResetValue){
    //         console.log('data from server: ', authorsData.getAllAuthors)
    //         setAuthors(authorsData.getAllAuthors)
    //     }
    // }, [authorsData])

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

    const findAuthor = () => {
        authorRequestedID.length < 1
            ? setMessageAttention('you should write correct id')
            : setAuthor(authorData.getAuthor)
    }

    const inputHandler = (e) => {
        if((e.target.value).length > 0) setMessageAttention('')
        setAuthorRequestedID(e.target.value)
    }

    return (
        <div>
            <h1 className="main-title-author">Find author by id</h1>

            <div className="block-find-author">
                <p className="title-input-findAuthorById">write interested id:</p>
                <input type="text" onInput={(e) => inputHandler(e)} className="input-findById"/>
                <button onClick={() => findAuthor()} className="btn btn-success btn-findAuthor">find author</button>
                {<p>{messageAttention}</p>}
            </div>

            <div className="result-of-searching">
                {
                    !author.name
                        ? ''
                        : <div className="product">
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
                            <p title="description of the book" className="book-description">"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</p>
                        </div>
                }
            </div>
        </div>
    )
}

export default Author