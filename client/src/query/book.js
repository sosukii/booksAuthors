import {gql} from '@apollo/client'

export const GET_ALL_BOOKS = gql(`
    query getAllBooks($itemPerPage: Int, $offset: Int, $limitValue: Int, $shouldReset: Boolean) {
        getAllBooks(itemPerPage: $itemPerPage, offset: $offset, limitValue: $limitValue, shouldReset: $shouldReset) {
            currentID, title, author{currentID, name}
        }
    }
`) // в видосе нет скобочек

export const GET_ONE_BOOK = gql(`
    query getBook($currentID: String) {
        getBook(currentID: $currentID) {
            currentID, title, author
        }
    }
`) // в видосе нет скобочек