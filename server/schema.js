const {buildSchema} = require('graphql')

const schema = buildSchema(`

    type Author {
        id: ID
        currentID: String
        name: String
        books: [Book]
    }
    
    type Book {
        id: ID
        currentID: String
        title: String
        author: Author
    }
    
    input AuthorInput {
        id: ID
        currentID: String
        name: String!
        books: [BookInput] 
    }
    
    input BookInput {
        id: ID
        currentID: String
        title: String!
        author: AuthorInput!
    }

    type User {
        id: ID
        name: String
        age: Int
        posts: [Post]
        email: String
        password: String
    }
    
    type Post {
        id: ID
        title: String
        content: String
    }
    
    input UserInput {
        id: ID
        name: String
        age: Int
        posts: [PostInput]
        email: String!
        password: String!
    }
    
    input PostInput {
        id: ID
        title: String!
        content: String!
    }
     
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
        getAllAuthors(itemPerPage: Int, offset: Int, limitValue: Int, shouldReset: Boolean): [Author]
        getAuthor(id: ID): Author
        getAllBooks(itemPerPage: Int, offset: Int, limitValue: Int, shouldReset: Boolean): [Book]
        getBook(id: ID): Book
    }
   
   type Mutation {
        createUser(input: UserInput): User
        createAuthor(input: AuthorInput): Author
        createBook(input: BookInput): Book
   } 
`)
module.exports = schema