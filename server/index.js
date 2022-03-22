const server = require('./server_instanse')

async function start(){
    const data = require('./db/adding_data_to_db')
    await data.addDataToDB() //ok
    await server.startServer()
}
start()