const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BANK_LIST = require('../config/bankList')
const WITHDRAW_STATUSES = require('../config/withdrawRequestStatuses')

const statuses = WITHDRAW_STATUSES.map(x => {return x.status})
const messages = WITHDRAW_STATUSES.map(x => {return x.message})

const withdrawRequestSchema = new Schema({
    user:{type:Schema.Types.ObjectId , ref:'User' , required:true},
    wallet:{type:Schema.Types.ObjectId , ref:'Wallet'},
	amount:{type:Number , required:true},
    operator:{type:Schema.Types.ObjectId , ref:'User'},
    bankName:{type:String , enum:BANK_LIST},
    status:{type:Number , default:1 , enum:statuses },
    message: {String , default: messages[0] , enum:messages},
    adminMessage:String,
    trackId : String,
	bankCardNumber:String,
	bankShabaNumber:String
});

module.exports = mongoose.model('WithdrawRequest', withdrawRequestSchema);