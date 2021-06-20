const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema({
  productName: {
      type: String,
      required: true
  },
    productImage:{
      type:String,
        required:true
  },
    productPrice:{
      type: Number,
        required:true,
        default:0
    },
    productDescription:{
      type:String,
        required:true
    },
    creator:{
      type:Object,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Product', productSchema);
