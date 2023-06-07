const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesmanRequestsSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        confirmed: { type: Boolean, default: false },
        message: { type: String, default: 'منتظر بررسی توسط ادمین' },
        melliCode: String,
        email: String,
        phoneNumber: String,
        address: {
            city: String,
            postalCode: String,
            details: String,
            state: String,
            phoneNumber: String,
        },
        mobileNumber: String,
        melliCardImg: String,
        bankCardNumber: String,
        bankShabaNumber: String,
        instagram: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model('SalesmanRequest', salesmanRequestsSchema);
