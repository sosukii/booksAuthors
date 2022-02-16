import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from "react-router-dom"
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from  '@apollo/client'

const client = new ApolloClient({
    uri:'http://localhost:5000/graphql',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    getAllAuthors: {
                        keyArgs: false,
                        merge(existing = [], incoming){
                            return [...existing, ...incoming]
                        }
                    },
                    getAllBooks: {
                        keyArgs: false,
                        merge(existing = [], incoming){
                            return [...existing, ...incoming]
                        }
                    }
                }
            }
        }
    })
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
  document.getElementById('root')
);