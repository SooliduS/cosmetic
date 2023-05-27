const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ORDER_STATUSES = require('../config/orderStatuses');

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
				commission:Number
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
        },
        message: {
            type: String,
            default: 'در انتظار پرداخت',
            required: true,
            enum: ORDER_STATUSES,
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
        aff_id: { type: Schema.Types.ObjectId, ref: 'User' },
        aff_percent: Number,
        seen: { type: Boolean, default: false },

    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
