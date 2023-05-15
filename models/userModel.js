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
        melliCode: String,
        melliCardImg:String,
        verified: { type: Boolean, default: false },
		active:{type:Boolean , default:true },
        socialMedias:{
            instagram:{
                type:String,
                required:true
            },
            telegram:String,
            website:String,
            twitter:String,
        },
        level:{
            type:Number,
            default:0
        },
        productsForSale:[{type:Schema.Types.ObjectId , ref:'Product'}],
        wallet:{type:Schema.Types.ObjectId , ref:'Wallet'}
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
