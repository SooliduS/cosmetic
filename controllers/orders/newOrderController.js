const Order = require('../../models/orderModel');
const User = require('../../models/userModel');
const Product = require('../../models/productModel');
const mongoose = require('mongoose');

const newOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { items, address, paymentMethod } = req.body;

        if (!items.length || !paymentMethod || !address)
            return res.status(400).json({ message: 'required fields needed' });
        if (!address.phoneNumber)
            return res
                .status(400)
                .json({ message: 'phone number of address needed' });
        if (!address.details)
            return res
                .status(400)
                .json({ message: 'detail of address needed' });
        if (!address.city)
            return res.status(400).json({ message: 'city of address needed' });
        if (!address.postalCode)
            return res
                .status(400)
                .json({ message: 'postalCode of address needed' });
        const buyer = req._id;

        //get price and add commission
        let totalPrice = 0;
        let totalComission = 0;

        const itemsArr = [];
        await Promise.all(
            items.map(async (item) => {
                const foundProduct = await Product.findById(item.product);
                if (!foundProduct) throw new Error('item not found');
                const itemPrice = foundProduct.price * item.quantity;
                if (
                    foundProduct.inventory !== null &&
                    foundProduct.inventory < item.quantity
                )
                    throw new Error('product is out of stock');
                totalPrice += itemPrice;

                //find product changes
                if (foundProduct.inventory)
                    foundProduct.inventory =
                        foundProduct.inventory - item.quantity;
                foundProduct.ordersCount -= 1;

                await foundProduct.save();

                //affiliate
                if (item.salesmanNumber) {
                    console.log(item.salesmanNumber);
                    const affUser = await User.findOne({
                        accountNumber: item.salesmanNumber,
                    });
                    const affLevel = affUser?.level;
                    if (
                        affUser &&
                        (foundProduct.level <= affLevel || !foundProduct.level)
                    ) {
                        const onePercent = itemPrice / 100;
                        const commission =
                            onePercent * affUser.commissionPercentage;

                        totalComission += commission; // add commission to the total

                        return itemsArr.push({
                            product: item.product,
                            quantity: item.quantity,
                            price: itemPrice,
                            commission,
                            affId: affUser._id,
                            affPercent: affUser.commissionPercentage,
                        });
                    }
                }
                return itemsArr.push({
                    product: item.product,
                    quantity: item.quantity,
                    price: itemPrice,
                });
            })
        );

        //generate delivery number and order number
        const deliveryNum = Math.floor(100000 + Math.random() * 900000);
        const orderNum = Math.floor(10000000 + Math.random() * 90000000);

        //computing prices
        const payablePrice = totalPrice; // +shippingPrice + ...
        const newOrder = await Order.create(
            [
                {
                    buyer,
                    items: itemsArr,
                    shippingAddress: address,
                    paymentMethod: 'idpay',
                    deliveryNum,
                    orderNum,
                    totalPrice,
                    payablePrice,
                    totalComission,
                },
            ],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json(newOrder);
    } catch (e) {
        await session.abortTransaction();
        session.endSession();

        if (e.message == 'item not found')
            return res.status(404).json({ message: e.message });
        if (e.message == 'product is out of stock')
            return res.status(400).json({ message: e.message });
        res.status(500).json({ message: e.message });
    }
};

module.exports = { newOrder };
