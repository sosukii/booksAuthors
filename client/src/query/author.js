import {gql} from '@apollo/client'

export const GET_ALL_AUTHORS = gql(`
    query getAllAuthors($itemPerPage: Int, $offset: Int) {
        getAllAuthors(itemPerPage: $itemPerPage, offset: $offset) {
            currentID, name, books{currentID, title}
        }
    }
`)

export const GET_ONE_AUTHOR = gql(`
    query getAuthor($currentID: String) {
        getAuthor(currentID: $currentID) {
            currentID, name, books
        }
    }
`)