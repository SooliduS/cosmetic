const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
    {
        notifType: Number,
        visited: {
            type: Boolean,
            default: false,
        },
        buyer: { type: Schema.Types.ObjectId , ref:'User' },
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        order:{type:Schema.Types.ObjectId , ref : 'Order'},
        comment:{type:Schema.Types.ObjectId , ref : 'Comment'}
    },
    { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
