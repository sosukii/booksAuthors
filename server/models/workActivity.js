const {Schema, model} = require('mongoose')

const schema = new Schema({
    dogovor_id:{type:Schema.Types.ObjectId, ref:'Contract'},
    dogovor_date:{type: Date},
    worker_id:{type:Schema.Types.ObjectId},
    worker_name:{type:String},
    hours:{type:Number},
    tips:{type:Number},

})

module.exports = model('workActivity', schema)
