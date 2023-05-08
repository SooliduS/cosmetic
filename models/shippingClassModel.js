const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shippingClassSchema = new Schema({
    className: {
        type: String,
        trim: true,
    },
    classDescription: String,
    cities: [{ name: String, price: Number }],
    isActive:Boolean
});

module.exports = mongoose.model('ShippingClass', shippingClassSchema);
