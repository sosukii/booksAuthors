const db = require('../db/db_instance')

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
        const authors = await db.find(optionsAuthor)

        const resultAuthors = []
        for(let author of authors.docs){
            const booksOfCurrentAuthor = []
            for (const bookID of author.books) {
                const currentBook = await db.find({selector:{type:'Book', _id:bookID}})
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

        const books = await db.find(optionsBooks)
        const resultBooks = []
        for(let book of books.docs) {
            book.author = (await db.find({selector: {_id: book.author}})).docs[0]
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
        const result = await db.find({selector: {type: 'Book', _id:id}})
        result.docs[0].author = (await db.find({selector: {_id: result.docs[0].author}})).docs[0]
        return result.docs[0]
    },
    getAuthor: async( {id} ) => {
        const result = await db.find({selector: {type: 'Author', _id:id}})

        const booksOfCurrentAuthor = []
        for (const bookID of result.docs[0].books) {
            const currentBook = await db.find({selector:{type:'Book', _id:bookID}})
            booksOfCurrentAuthor.push(currentBook.docs[0])
        }
        result.docs[0].books = [...booksOfCurrentAuthor]

        return result.docs[0]
    }
}

module.exports = root