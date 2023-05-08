const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
    {
        id: String,
        sender: { type: Schema.Types.ObjectId, ref: 'User' },
        reciever: { type: Schema.Types.ObjectId, ref: 'User' },
        amount: Number,
        status: { type: Number, default: 1, required: true },
        message: {
            type: String,
            required: true,
            default: 'پرداخت انجام نشده است',
        },
        order :{type:Schema.Types.ObjectId , ref:'Order'},
        card_no: String,
        hashed_card_no: String,
        date: Date,
        track_id: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
