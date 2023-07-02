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
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    views: {
        type: Number,
        default: 0,
    },
    tags: [String],
    keyWords: [String],
    level: Number,
    slug: String,
});

// Add pre-save middleware to set the slug field
postSchema.pre('save', function (next) {
    // Only set the slug if it hasn't been set before
    if (!this.slug) {
        this.slug = this._id.toString();
    }
    next();
});

module.exports = mongoose.model('Post', postSchema);
