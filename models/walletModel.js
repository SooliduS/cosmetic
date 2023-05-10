const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref:'User',
            unique: true,
        },
        isActive: { type: Boolean, default: true },
        stock: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Wallet', walletSchema);