const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

function returnCredentials(){
    let credentials
    try{
        credentials = require('./credentials.json')
    } catch {
        credentials = require('../credentials.json')
    }
    return credentials
}
const credentials = returnCredentials()

module.exports = new PouchDB(`http://${credentials.dbLOGIN}:${credentials.dbPASSWORD}@localhost:5984/${credentials.dbNAME}`)