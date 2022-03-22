const express = require('express')
const cors = require('cors')
const {graphqlHTTP} = require("express-graphql")
const schema = require("./graph/schema")
const root = require('./graph/graphQL_routes')

const app = express()
app.use(cors())
app.use('/graphql', graphqlHTTP({
    graphiql:true,
    schema,
    rootValue:root
}))

async function startServer(){
    try{
        app.listen(5000,() => console.log(`♡ server started 5000`))
    }catch(e){
        console.log(e)
    }
}

module.exports = {startServer}