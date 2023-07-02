const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postCommentSchema = new Schema(
    {
        comment: String,
        post: { type: Schema.Types.ObjectId, ref: 'Post' },
        author: {
            id: { type: Schema.Types.ObjectId, ref: 'User' },
            name: String,
			role:{type:String , enum:['user' , 'admin']},
        },
        parentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        isConfirmed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('PostComment', postCommentSchema);
