const readLineSync = require('readline-sync')
const fs = require('fs')

    if(fs.existsSync('./credentials.json')) {
        console.log('credentials.json already exist. the old file be deleted.')
        fs.unlinkSync('./credentials.json', (err) => {
            if (err) throw err;
        })
    }

    const login = readLineSync.question(`you're couchDB Login: `)
    const password = readLineSync.question(`you're couchDB Password: `)

    if(login && password) {
        const authData = {
            "dbLOGIN":login,
            "dbPASSWORD": password,
            "dbNAME": "myprettydb"
        }

        fs.writeFileSync('./credentials.json', JSON.stringify(authData), err => {
            console.log('creating credentials.json error: ', err)
        })
        console.log('credentials.json successfully created!')
    }