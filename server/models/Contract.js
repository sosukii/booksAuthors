const {Schema, model} = require('mongoose')
User = require('./User')

const schema = new Schema({
    company:{
        type:String,
        required:false
    },
    contactFace:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    totalSum:{
        type:String,
        required:false
    },
    phone:{
        type:String,
        required:true
    },
    additional:{
        type:String,
        required:false
    },
    start:{
        type: Date,
    },
    workers:[
        {type: Schema.Types.ObjectId,
         ref:'User'}
    ]
})
module.exports = model('Contract', schema)