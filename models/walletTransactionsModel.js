const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletTransactionSchema = new Schema(
    {
        wallet:{type:Schema.Types.ObjectId , ref:'wallet'},
        amount: Number,
        transaction: {
            type: Schema.Types.ObjectId,
            ref: 'Transaction',
        },
        order: { type: Schema.Types.ObjectId, ref: 'Order' },
        type:{type:String , enum:['deposite' , 'withdraw']}
    },
    { timestamps: true }
);

module.exports = mongoose.model('WalletTransaction', walletTransactionSchema);
