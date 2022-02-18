import {gql} from '@apollo/client'

export const GET_ALL_AUTHORS = gql(`
    query getAllAuthors($itemPerPage: Int, $offset: Int, $limitValue: Int, $shouldReset: Boolean) {
        getAllAuthors(itemPerPage: $itemPerPage, offset: $offset, limitValue: $limitValue, shouldReset: $shouldReset) {
            currentID, name, books{currentID, title}
        }
    }
`)

export const GET_ONE_AUTHOR = gql(`
    query getAuthor($id: ID) {
        getAuthor(id: $id) {
            currentID, name, books{currentID, title}
        }
    }
`)