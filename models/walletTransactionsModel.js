const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletTransactionSchema = new Schema(
    {
        sender: { type: Schema.Types.ObjectId, ref: 'Wallet' },
        reciever: { type: Schema.Types.ObjectId, ref: 'Wallet' },
        amount: Number,
        transaction: {
            type: Schema.Types.ObjectId,
            ref: 'Transaction',
        },
        order: { type: Schema.Types.ObjectId, ref: 'Order' },
        status: {
            type: String,
            enum: ['done', 'waiting', 'canceled'],
            default: 'waiting',
        },
        message:{
            type:String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('WalletTransaction', walletTransactionSchema);
