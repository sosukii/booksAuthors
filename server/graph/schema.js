const {buildSchema} = require('graphql')

const schema = buildSchema(`

    type Author {
        id: ID
        type: String
        name: String
        books: [Book]
    }
    
    type Book {
        id: ID
        type: String
        title: String
        author: Author
    }
    
    input AuthorInput {
        id: ID
        name: String!
        books: [BookInput] 
    }
    
    input BookInput {
        id: ID
        title: String!
        author: AuthorInput
    }
     
    type Query {
        getAllAuthors(itemPerPage: Int, offset: Int, limitValue: Int, shouldReset: Boolean): [Author]
        getAuthor(id: ID): Author
        getAllBooks(itemPerPage: Int, offset: Int, limitValue: Int, shouldReset: Boolean): [Book]
        getBook(id: ID): Book
    }
   
   type Mutation {
        createAuthor(input: AuthorInput): Author
        createBook(input: BookInput): Book
   } 
`)
module.exports = schema