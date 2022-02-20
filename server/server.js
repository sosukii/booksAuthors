const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const c = require('config')

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

//const dbPOUCH = new PouchDB(`http://${c.get('couchLogIn')}:${c.get('couchPassword')}@localhost:5984/db_proj`)
const dbPOUCHtest = new PouchDB(`http://${c.get('couchLogIn')}:${c.get('couchPassword')}@localhost:5984/test`)

const app = express()
app.use(cors())

let optionsBooks = {
    selector: {type: 'Book'},
    limit: 50,
    skip: 0
}
let optionsAuthor = {
    selector: {type: 'Author'},
    limit: 50,
    skip: 0
}

const root = {
    getAllAuthors: async ({limitValue, shouldReset}) => {
        if(limitValue !== undefined) optionsAuthor.limit = limitValue
        if(shouldReset) optionsAuthor.skip = 0
        const authors = await dbPOUCHtest.find(optionsAuthor)

        const resultAuthors = []
        for(let author of authors.docs){
            const booksOfCurrentAuthor = []
            for (const bookID of author.books) {
                const currentBook = await dbPOUCHtest.find({selector:{type:'Book', _id:bookID}})
                booksOfCurrentAuthor.push(currentBook.docs[0])
            }
            author.books = [...booksOfCurrentAuthor]
            resultAuthors.push(author)
        }

        if(authors.docs && authors.docs.length > 0){
            limitValue
                ? optionsAuthor.skip = optionsAuthor.skip + limitValue
                : optionsAuthor.skip = optionsAuthor.skip + 50
        }
        return resultAuthors

        // await dbPOUCH.createIndex({
        //     index: {fields: ['type', 'author', 'name', 'book', 'title']}
        // })
    },
    getAllBooks: async({limitValue, shouldReset}) => {
        if(limitValue !== undefined) optionsBooks.limit = limitValue
        if(shouldReset) optionsBooks.skip = 0

        const books = await dbPOUCHtest.find(optionsBooks)
        const resultBooks = []
        for(let book of books.docs) {
            book.author = (await dbPOUCHtest.find({selector: {_id: book.author}})).docs[0]
            resultBooks.push(book)
        }

        if(books.docs && books.docs.length > 0){
            limitValue
                ? optionsBooks.skip = optionsBooks.skip + limitValue
                : optionsBooks.skip = optionsBooks.skip + 50
        }
        return resultBooks
    },
    getBook: async( {id} ) => {
        const result = await dbPOUCHtest.find({selector: {type: 'Book', _id:id}})
        result.docs[0].author = (await dbPOUCHtest.find({selector: {_id: result.docs[0].author}})).docs[0]
        return result.docs[0]
    },
    getAuthor: async( {id} ) => {
        const result = await dbPOUCHtest.find({selector: {type: 'Author', _id:id}})

        const booksOfCurrentAuthor = []
        for (const bookID of result.docs[0].books) {
            const currentBook = await dbPOUCHtest.find({selector:{type:'Book', _id:bookID}})
            booksOfCurrentAuthor.push(currentBook.docs[0])
        }
        result.docs[0].books = [...booksOfCurrentAuthor]

        return result.docs[0]
    }
}
app.use('/graphql', graphqlHTTP({
    graphiql:true,
    schema,
    rootValue:root
}))

async function startServer(){
    try{
        app.listen(c.get('port'),()=>console.log('server started', c.get('port')))
    }catch(e){
        console.log(e)
    }
}
startServer()