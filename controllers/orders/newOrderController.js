const Order = require('../../models/orderModel');
const User = require('../../models/userModel');
const Product = require('../../models/productModel');
const mongoose = require('mongoose');
const sendPaymentRequest = require('../../lib/paymentRequest');

const newOrder = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const { items, address, paymentMethod } = req.body;
        const buyer = req._id; // Set the buyer value

        if (!items.length || !paymentMethod || !address)
            return res.status(400).json({ message: 'Required fields needed' });
        if (!address.phoneNumber)
            return res.status(400).json({ message: 'Phone number of address needed' });
        if (!address.details)
            return res.status(400).json({ message: 'Detail of address needed' });
        if (!address.city)
            return res.status(400).json({ message: 'City of address needed' });
        if (!address.postalCode)
            return res.status(400).json({ message: 'Postal code of address needed' });

        let totalPrice = 0;
        let totalCommission = 0;
        const itemsArr = [];

        for (const item of items) {
            const foundProduct = await Product.findById(item.product).session(session);
            if (!foundProduct) {
                throw new Error('Item not found');
            }

            const itemPrice = foundProduct.price * item.quantity;
            if (foundProduct.inventory !== null && foundProduct.inventory < item.quantity) {
                throw new Error('Product is out of stock');
            }
            totalPrice += itemPrice;

            if (foundProduct.inventory) {
                foundProduct.inventory -= item.quantity;
                foundProduct.ordersCount -= 1;
                await foundProduct.save();
            }

            if (item.salesmanNumber) {
                const affUser = await User.findOne({ accountNumber: item.salesmanNumber }).session(session);
                const affLevel = affUser?.level;
                if (affUser && (foundProduct.level <= affLevel || !foundProduct.level)) {
                    const onePercent = itemPrice / 100;
                    const commission = onePercent * affUser.commissionPercentage;

                    totalCommission += commission;
                    itemsArr.push({
                        product: item.product,
                        quantity: item.quantity,
                        price: itemPrice,
                        commission,
                        affId: affUser._id,
                        affPercent: affUser.commissionPercentage,
                    });
                }
            } else {
                itemsArr.push({
                    product: item.product,
                    quantity: item.quantity,
                    price: itemPrice,
                });
            }
        }

        const deliveryNum = Math.floor(100000 + Math.random() * 900000);
        const orderNum = Math.floor(10000000 + Math.random() * 90000000);

        const payablePrice = totalPrice;
        const newOrder = new Order({
            buyer,
            items: itemsArr,
            shippingAddress: address,
            paymentMethod: 'idpay',
            deliveryNum,
            orderNum,
            totalPrice,
            payablePrice,
            totalCommission,
        });

        const response = await sendPaymentRequest(newOrder._id, newOrder.buyer, newOrder.payablePrice);

        if (response.status === 201) {
            await newOrder.save({ session });
            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({ order: newOrder, paymentDetails: response.data });
        } else {
            throw new Error(response.data.message);
        }
    } catch (e) {
        await session.abortTransaction();
        session.endSession();

        if (e.message === 'Item not found') {
            return res.status(404).json({ message: e.message });
        }
        if (e.message === 'Product is out of stock') {
            return res.status(400).json({ message: e.message });
        }
        return res.status(500).json({ message: e.message });
    }
};

module.exports = { newOrder };
