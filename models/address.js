const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    city:{
        type:String,
        required:true
    },
    county:{
        type:String,
        required: true
    },
    street:{
        type: String,
        required:true
    },
    apt:{
        type: String,
        required:true
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
})

module.exports = mongoose.model('Address', addressSchema)
