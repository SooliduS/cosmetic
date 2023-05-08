const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
    },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    verified: {
        type: Boolean,
        default: false,
    },
    values: [{ name: {type:String , required:true , trim:true , unique:true}, verified: { type: Boolean, default: false } }],
});

module.exports = mongoose.model('Option', optionSchema);
