const {Schema, model} = require('mongoose')

const schema = new Schema({
    model:{
         type:String
    },
    km:{
        type:Number
    }
})

module.exports = model('Car', schema)

