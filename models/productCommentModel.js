const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        comment: String,
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        author: {
            id: { type: Schema.Types.ObjectId, ref: 'User' },
            name: String,
			role:{type:String , enum:['buyer' , 'user' , 'admin']},
        },
        parentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        rate: Number,
        isConfirmed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
