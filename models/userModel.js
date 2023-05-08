const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique:true
        },
        firstname: { type: String, lowercase: true },
        lastname: { type: String, lowercase: true },
        roles: {
            User: {
                type: Number,
                default: 1111,
            },
            Editor: Number,
            Admin: Number,
            Salesman: Number,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        isEmailConfirmed: {
            type: Boolean,
            required: true,
            default: false,
        },
        phoneNumber: String,
        isPhoneNummberConfirmed:{
            type:Boolean,
            required:true,
            default:false
        },
        address: {
            city: String,
            postalCode: String,
            details: String,
            phoneNumber: String,
        },
        refreshToken: String,
        favCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
        favProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        verified: { type: Boolean, default: false },
		active:{type:Boolean , default:true },
        suppliersAndPercentages: [
            {
                supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
                percentage: Number,
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
