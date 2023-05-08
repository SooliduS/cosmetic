const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailSchema = new Schema({
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
    values: [{ type: String, required: true, trim: true, unique: true }],
});

module.exports = mongoose.model('Detail', detailSchema);
