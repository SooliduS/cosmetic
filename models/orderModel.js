const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ORDER_STATUSES = require('../config/orderStatuses');

const statuses = ORDER_STATUSES.map(x=> {return x.status})
const messages = ORDER_STATUSES.map(x=> {return x.message})

const orderSchema = new Schema(
    {
        buyer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
				commission:Number,
                superiorCommission:Number,
                superiorId : {type:Schema.Types.ObjectId , ref:'User'},
				affId:{type:Schema.Types.ObjectId , ref:'User'},
				affPercent:Number
            },
        ],
        shippingAddress: {
            city: String,
            state:String,
            postalCode: String,
            details: String,
            phoneNumber: String,
        },
        paymentMethod: { 
            type: String,
            enum:['idpay']
         },
        status: {
            type: Number,
            default: 1,
            required: true,
            enum:statuses
        },
        message: {
            type: String,
            default: messages[0],
            required: true,
            enum: messages,
        },
        orderNum: { type: Number, unique: true },
        deliveryNum: { type: Number, unique: true },
        transaction: { type: Schema.Types.ObjectId, ref: 'Transaction' },
        taxPrice: Number,
        shippingPrice: Number,
        shippingClass: {type:Schema.Types.ObjectId , ref:'ShippingClass'},
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
            //sum of all items
        },
        payablePrice: {
            type: Number,
            required: true,
            default: 0,
            //totalPrice + shipping + tax + ...
        },
        seen: { type: Boolean, default: false },

    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
