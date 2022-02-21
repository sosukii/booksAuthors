import {gql} from '@apollo/client'

export const GET_ALL_BOOKS = gql(`
    query getAllBooks($itemPerPage: Int, $offset: Int, $limitValue: Int, $shouldReset: Boolean) {
        getAllBooks(itemPerPage: $itemPerPage, offset: $offset, limitValue: $limitValue, shouldReset: $shouldReset) {
            title, author{name}
        }
    }
`)

export const GET_ONE_BOOK = gql(`
    query getBook($id: ID) {
        getBook(id: $id) {
            title, author{name}
        }
    }
`)