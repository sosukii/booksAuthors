import {gql} from '@apollo/client'

export const GET_ALL_USERS = gql(`
    query {
        getAllUsers {
            id, name, books
        }
    }
`) // в видосе нет скобочек

export const GET_ONE_USER = gql(`
    query getUser($id: ID) {
        getUser(id: $id) {
            id, name, books
        }
    }
`) // в видосе нет скобочек