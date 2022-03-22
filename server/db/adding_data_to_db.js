const db_i = require('./db_instance')
const dataForDB = require('./dbData.json')

const currentData = []

for(let item of dataForDB){
    let {_rev, ...other} = item.doc
    currentData.push(other)
}

async function addDataToDB () {
    console.log('adding data to database...')
    await db_i.bulkDocs(currentData)
        .catch(reject => {
            if(reject.reason === 'Name or password is incorrect.') {
                throw new Error(`Database failed authorization: ${reject.reason} 
                
                Solve: You should provide correct CouchDB credentials:
                1. being in booksAuthors folder start 'npm run auth' in the console;
                2. write you're correct login and password in console
                `)
            }
        })
    console.log('♡ success added data at db')
}

module.exports = {addDataToDB}