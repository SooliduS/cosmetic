const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: false },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    tags: [String],
    keyWords:[String],
});

module.exports = mongoose.model('Post', postSchema);
