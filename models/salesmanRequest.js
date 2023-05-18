const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesmanRequestsSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        confirmed: { type: Boolean, default: false },
        message:{type:String , default:'منتظر بررسی توسط ادمین'},
        adminUpdateDate: Date
    },
    { timestamps: true }
);

module.exports = mongoose.model('SalesmanRequest', salesmanRequestsSchema);
