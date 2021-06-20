const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    first_name:{
        type: String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    addresses:[
        {
            type:Schema.Types.ObjectId,
            ref: 'Address'
        }
    ],
    status:{
        type:String,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model('User', userSchema)
