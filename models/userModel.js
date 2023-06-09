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
		accountNumber : {type:Number , unique:true},
        bankShabaNumber : {type:String , unique:true},
        bankCardNumber : {type:String , unique:true},
        isEmailConfirmed: {
            type: Boolean,
            required: true,
            default: false,
        },
        phoneNumber: String,
		mobileNumber: String,
        isMobileNumberConfirmed:{
            type:Boolean,
            required:true,
            default:false
        },
        address: {
            city: String,
            state: String,
            postalCode: String,
            details: String,
            phoneNumber: String,
        },
        refreshToken: String,
        melliCode: String,
        melliCardImg:String,
        isMelliCardConfirmed:{
            type:Boolean,
            default:false
        },
        verified: { type: Boolean, default: false },
		active:{type:Boolean , default:true },
		instagram:String,
        socialMedias:{
            telegram:String,
            website:String,
            twitter:String,
        },
        level:{
            type:Number,
            default:0
        },
		superior:{type:Schema.Types.ObjectId , ref:'User'},
        wallet:{type:Schema.Types.ObjectId , ref:'Wallet'},
		commissionPercentage:Number,
        emailVerificationNum:{type:String , sparse: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
