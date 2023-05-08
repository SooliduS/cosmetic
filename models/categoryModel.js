const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase:true
        },
        hsCode:{
            type:String,
            unique:true
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId ,
            ref:'Category',
            default: null,
        },
        description: {
            type: String,
            default: null,
        },
        image: String,
        },
    { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
