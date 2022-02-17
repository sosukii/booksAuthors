const User = require('./models/User')
const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const mongoose = require('mongoose')
const c = require('config')

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

const dbPOUCH = new PouchDB(`http://${c.get('couchLogIn')}:${c.get('couchPassword')}@localhost:5984/db_proj`)
const dbPOUCHtest = new PouchDB('http://localhost:5984/creatableByServer')

const NodeCouchDb = require('node-couchdb')

const nano = require('nano')(`http://${c.get('couchLogIn')}:${c.get('couchPassword')}@localhost:5984`)
const db_proj = nano.use('db_proj')

const couch = new NodeCouchDb()
const couchAuth = new NodeCouchDb({
    auth: {
        user: 'sosukii',
        password: 'password'
    }
})
const dbName = 'db_proj'

//get document by id
// couchAuth.get(dbName, 'e5921c51a5506b061dab6d0f370032f0')
//     .then(({data, headers, status}) => {
//         console.log('data: ', data)
//         console.log('headers: ', headers)
//         console.log('status: ', status)
//     }, err => {
//         console.log(err)
//     })

// insert docs (authors and books) at couch database
async function add201DocsAtDb() {
    const text = `Лев Толстой «Война и мир» NARUTO Джордж Оруэлл «1984» NARUTO Джеймс Джойс «Улисс» NARUTO
Владимир Набоков «Лолита» NARUTO
Уильям Фолкнер «Звук и ярость» NARUTO
Ральф Эллисон «Человек-невидимка» NARUTO
Вирджиния Вулф «На маяк» NARUTO
Гомер «Илиада» NARUTO
Гомер «Одиссея» NARUTO
Джейн Остен «Гордость и предубеждение» NARUTO

Данте Алигьери «Божественная комедия» NARUTO

Джеффри Чосер «Кентерберийские рассказы» NARUTO

Джонатан Свифт «Путешествия Гулливера» NARUTO

Джордж Элиот «Мидлмарч» NARUTO

Чинуа Ачебе «Распад» NARUTO

Дж. Д. Сэлинджер «Над пропастью во ржи» NARUTO

Маргарет Митчелл «Унесенные ветром» NARUTO

Габриель Гарсиа Маркес «Сто лет одиночества» NARUTO

Фрэнсис Скотт Фицджеральд «Великий Гэтсби» NARUTO

Джозеф Хеллер «Уловка-22» NARUTO

Тони Моррисон «Возлюбленная» NARUTO

Джон Стейнбек «Гроздья гнева» NARUTO

Салман Рушди «Дети полуночи» NARUTO

Олдос Хаксли «О дивный новый мир» NARUTO

Вирджиния Вулф «Миссис Дэллоуэй» NARUTO

Ричард Райт «Родной сын» NARUTO

Алексис Де Токвиль «Демократия в Америке» NARUTO

Чарльз Дарвин «О происхождении видов» NARUTO

Геродот «История» NARUTO

Жан-Жак Руссо «Об общественном договоре» NARUTO

Карл Маркс «Капитал» NARUTO

Николо Макиавелли «Государь» NARUTO

Блаженный Августин «Исповедь» NARUTO

Томас Гоббс «Левиафан» NARUTO

Фукидид «История» NARUTO

Джон Толкин «Властелин колец» NARUTO

Алан Милн «Винни-Пух» NARUTO

Клайв Стейплз Льюис «Лев, колдунья и платяной шкаф» NARUTO

Эдвард Морган Форстер «Путешествие в Индию» NARUTO

Джек Керуак «В дороге» NARUTO

Харпер Ли «Убить пересмешника» NARUTO

Энтони Берджесс «Заводной апельсин» NARUTO

Уильям Фолкнер «Свет в августе» NARUTO

Уильям Дюбуа «Души черного народа» NARUTO

Джин Рис «Широкое Саргассово море» NARUTO

Гюстав Флобер «Госпожа Бовари» NARUTO

Джон Мильтон «Потерянный рай» NARUTO

Лев Толстой «Анна Каренина» NARUTO

Уильям Шекспир «Гамлет» NARUTO

Уильям Шекспир «Король Лир» NARUTO

Уильям Шекспир «Отелло» NARUTO

Уильям Шекспир «Сонеты» NARUTO

Уолт Уитмен «Листья травы» NARUTO

Марк Твен «Приключения Гекльберри Финна» NARUTO

Редьярд Киплинг «Ким» NARUTO

Мэри Шелли «Франкенштейн» NARUTO

Тони Моррисон «Песнь Соломона» NARUTO

Кен Кизи «Над кукушкиным гнездом» NARUTO

Эрнест Хемингуэй «По ком звонит колокол» NARUTO

Курт Воннегут «Бойня номер пять» NARUTO

Джордж Оруэлл «Скотный двор» NARUTO

Уильям Голдинг «Повелитель мух» NARUTO

Трумен Капоте «Хладнокровное убийство» NARUTO

Дорис Лессинг «Золотая тетрадь» NARUTO

Марсель Пруст «В поисках утраченного времени» NARUTO

Реймонд Чандлер «Вечный сон» NARUTO

Уильям Фолкнер «Когда я умирала» NARUTO

Эрнест Хемингуэй «Фиеста» NARUTO

Роберт Грейвс «Я, Клавдий» NARUTO

Карсон Маккалерс «Сердце — одинокий охотник» NARUTO

Дэвид Герберт Лоуренс «Сыновья и любовники» NARUTO

Роберт Пенн Уоррен «Вся королевская рать» NARUTO

Джеймс Болдуин «Иди, вещай с горы» NARUTO

Элвин Брукс Уайт «Паутина Шарлотты» NARUTO

Джозеф Конрад «Сердце тьмы» NARUTO

Эли Визель «Ночь» NARUTO

Джон Апдайк «Кролик, беги» NARUTO

Эдит Уортон «Эпоха невинности» NARUTO

Филип Рот «Случай Портного» NARUTO

Теодор Драйзер «Американская трагедия» NARUTO

Натанаэл Уэст «День саранчи» NARUTO

Генри Миллер «Тропик Рака» NARUTO

Дэшил Хэммет «Мальтийский сокол» NARUTO

Филип Пулман «Темные начала» NARUTO

Уилла Кэсер «Смерть приходит за архиепископом» NARUTO

Зигмунд Фрейд «Толкование сновидений» NARUTO

Генри Адамс «Воспитание Генри Адамса» NARUTO

Мао Цзэдун «Красная книжица» NARUTO

Уильям Джеймс «Многообразие религиозного опыта» NARUTO

Ивлин Во «Пригоршня праха» NARUTO

Рэйчел Карсон «Безмолвная весна» NARUTO

Джон Мейнард Кейнс «Общая теория занятости, процента и денег» NARUTO

Джозеф Конрад «Лорд Джим» NARUTO

Роберт Грейвс «Со всем этим покончено» NARUTO

Джон Кеннет Гэлбрейт «Общество изобилия» NARUTO

Кеннет Грэм «Ветер в ивах» NARUTO Алекс Хейли и Малкольм Икс «Автобиография Малкольма Икс» NARUTO Литтон Стрейчи «Знаменитые викторианцы» NARUTO Элис Уокер «Цвет пурпурный» NARUTO Уинстон Черчилль «Вторая мировая война» NARUTO`
    const delay = ms => {
        return new Promise(resolve => setTimeout(() => resolve(), ms))
    }
console.log('creating and adding example doc at db STARTED')
    const arr = (text.replace(/(\r\n|\n|\r)/gm, ""))
        .replaceAll('«', 'STOP «')
        .split('NARUTO')

    const authors = []
    const books = []
    for(let el of arr) {
        const splittest = el.split('STOP')

        const author = splittest[0]
        const book = splittest[1]

        if(author.length > 0 && book) {
            await delay(2000)
            const objAuthor = {
                currentID: Date.now(),
                type: 'Author',
                name: author.trim(),
                books: [  ]
            }
            await delay(2000)
            const objBook = {
                currentID: Date.now(),
                type: 'Book',
                title: book.trim(),
                author: {
                    currentID: objAuthor.currentID,
                    name: objAuthor.name
                }
            }
            authors.push(objAuthor)
            books.push(objBook)
        }
    }

    for(let objAuthor of authors) {
        for(let bookObj of books) {
            if(bookObj.author.name === objAuthor.name) {
                objAuthor.books.push(bookObj)
            }
        }
    }

    const resultArr = []
    for(let oneA of authors){
        resultArr.push(oneA)
    }
    for(let oneB of books){
        resultArr.push(oneB)
    }
    for(let e of resultArr) {
        couchAuth.insert('db_proj', {
            ...e
        }).then(({data, headers, status}) => {
            console.log('insert data now: ', data)
            console.log('insert headers now: ', headers)
            console.log('insert status now: ', status)
        }, err => {
            console.log(err)
        })
    }

}
//add201DocsAtDb()

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

const app = express()
app.use(cors())

const createUser = input => {
    const id = Date.now()
    return {
        id, ...input
    }
}

let options = {
    selector: {type: 'Book'},
    limit: 50,
    skip: 0
}
let optionsAuthor = {
    selector: {type: 'Author'},
    limit: 50,
    skip: 0
}

const root = {
    getAllUsers: async () => { // здесь вытаскивание всех юзеров из бд
        return await User.find({})
    },
    getUser: ({id}) => { // здесь вытаскивание юзера из бд
        console.log(id)
        console.log('inside getUser')
        console.log(User.findById(id))
        return User.findById(id)
    },
    createUser: async ({input}) => {
        const userInstance = new User()
        const user = createUser(input)
        // userInstance.id = user.id
        userInstance.name = user.name
        userInstance.email = user.email
        userInstance.password = user.password
        if(user.posts) userInstance.posts = user.posts
        return userInstance.save()
    },

    getAllAuthors: async ({limitValue, shouldReset}) => {
        console.log(shouldReset)
        // await dbPOUCH.createIndex({
        //     index: {fields: ['type', 'author', 'name', 'book', 'title']}
        // })
        //
        // const params = {
        //     selector: {
        //         type: 'Author'
        //     },
        //     fields: ["currentID", "type", "name", "books"],
        //     // "sort": [{"year": "asc"}],
        //     limit: 2,
        //     skip: 0,
        //     execution_stats: true
        // }
        // const data = await dbPOUCH.find(params, (err, res) => {
        //     const docs = res.docs
        //     docs.forEach(doc => {
        //         console.log(doc)
        //     })
        // })
        // console.log('docs count: ' ,data.docs.length)
        // return data.docs
        // const result = await dbPOUCH.allDocs(options, (err, res) => {
        //     console.log(res)
        //     if(res && res.rows.length > 0){
        //         options.startkey = res.rows[res.rows.length - 1].id
        //         options.skip = 1
        //     }
        // })
        // let resultArr = []
        // result.rows.forEach(row => {
        //     if(row.doc.name) resultArr.push(row.doc)
        // })
        // return resultArr
        //console.log('request has worked!')
        if(limitValue !== undefined) optionsAuthor.limit = limitValue
        if(shouldReset) options.skip = 0
        const dataFromServer = await dbPOUCH.find(optionsAuthor)

        if(dataFromServer.docs && dataFromServer.docs.length > 0){
            limitValue
                ? optionsAuthor.skip = optionsAuthor.skip + limitValue
                : optionsAuthor.skip = optionsAuthor.skip + 50
        }
        return dataFromServer.docs
    },
    getAllBooks: async({limitValue, shouldReset}) => {
        if(limitValue !== undefined) options.limit = limitValue
        if(shouldReset){
            options.skip = 0
            // const dataFromServer = await dbPOUCH.find(options)
            // console.log(dataFromServer.docs)
        }

        const dataFromServer = await dbPOUCH.find(options)
        if(dataFromServer.docs && dataFromServer.docs.length > 0){
            limitValue
                ? options.skip = options.skip + limitValue
                : options.skip = options.skip + 50
        }
        return dataFromServer.docs
    }
}
app.use('/graphql', graphqlHTTP({
    graphiql:true,
    schema,
    rootValue:root
}))

async function run(){
    try{
        await mongoose.connect(
            c.get('db'),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },()=>{
                console.log('db has been connected')
            }
        )
        app.listen(c.get('port'),()=>console.log('server started', c.get('port')))
    }catch(e){
        console.log(e)
    }
}
run()

// app.post('/newcontract', async(req,res)=>{
//     console.log('req.body: ',req.body)
//     const contractInstance = new Contract()
//     const {workers, ...data} = req.body
//     contractInstance.company = req.body.company
//     contractInstance.contactFace = req.body.contactFace
//     contractInstance.address = req.body.address
//     contractInstance.totalSum = req.body.totalSum
//     contractInstance.phone = req.body.phone
//     contractInstance.additional = req.body.additional
//     contractInstance.start = req.body.dogovor_date
//     // for(let [key, value] of Object.entries(data)){
//     //     contractInstance[key] = value
//     // }
//
//     workers.map(async e=>{
//         contractInstance.workers.push(e.id)
//     })
//     console.log('экземпляр договора, который мы сохраняем в бд (он корректный!): ',contractInstance)
//     await contractInstance.save(async (err, currentDogovor) => {
//         console.log('че такое currentDogovor : ', currentDogovor)
//         for (let e of workers) {
//             const user = await User.findOne({_id: e.id})
//             if (!user.paymentPerHour) {
//                 res.json({message: `Отказ. Установите зарплату в час для сотрудника: ${user.name}, и попробуйте снова.`})
//             } else {
//                 const workActivityInstance = new workActivity()
//
//                 workActivityInstance.dogovor_id = currentDogovor._id
//                 workActivityInstance.dogovor_date = req.body.dogovor_date
//                 workActivityInstance.worker_id = e.id
//                 workActivityInstance.hours = 8
//                 workActivityInstance.tips = 8 * user.paymentPerHour
//                 console.log('типс текущего воркера: ',workActivityInstance.tips)
//                 console.log('wa instance получился такой (такой создаем): ',workActivityInstance)
//                 await workActivityInstance.save(async (err, currentWAInstance) => {
//                     console.log('-----------currentWAInstance: ', currentWAInstance)
//                     const result = await User.updateOne(
//                         {_id: e.id},
//                         {$push: {workTime: currentWAInstance._id}}
//                     )
//                     console.log('результат добавления ObjectId в массив workTime конкретного работника: ', result)
//                 })
//
//             }
//         }
//     })
//
//
//     //res.status(201).json({message:'Договор успешно сохранен!'})
// })

