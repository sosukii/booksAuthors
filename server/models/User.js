const {Schema, model} = require('mongoose')

const schema = new Schema({
    car:[{type:String, ref: 'Car'}],
    roles:{type: String, ref: 'Role'},
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:false
    },
    name:{
        type:String,
        required:false,
        unique:false
    },
    phone:{
        type:String,
        required:false,
        unique:false
    },
    job:{
        type:String,
        required:false,
        unique:false
    },
    paymentPerHour: { type: Number },
    workTime:{ type: Array, "default":[] },
    equipments:{
        type:String,
        required:false
    },
    avatar:{
        type:String
    }
})

module.exports = model('User', schema)

