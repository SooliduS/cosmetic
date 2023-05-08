const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema(
    {
      name:{
        type:String,
        trim:true,
        unique:true,
      },
      categories:[{type:Schema.Types.ObjectId , ref:'Category'}],
      verified:{
        type:Boolean,
        default:false
      }
    }
);

module.exports = mongoose.model('Brand', brandSchema);