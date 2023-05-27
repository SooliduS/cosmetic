const Order = require('../../models/orderModel');
const User = require('../../models/userModel');
const Product = require('../../models/productModel');

const newOrder = async (req, res) => {
    const { items, address, paymentMethod, aff_id } = req.body; //shippingClass
    // items:array of products
    //address: {postalCode , detail , city , phoneNumber}
    //paymentMethod: enum:['idpay']
    //aff_id: id of user

    if (!items.length || paymentMethod || address)
        return res.status(400).json({ message: 'required fields needed' });
    if (!address.phoneNumber)
        return res
            .status(400)
            .json({ message: 'phone number of address needed' });
    if (!address.detail)
        return res.status(400).json({ message: 'detail of address needed' });
    if (!address.city)
        return res.status(400).json({ message: 'city of address needed' });
    if (!address.postalCode)
        return res
            .status(400)
            .json({ message: 'postalCode of address needed' });
    const buyer = req._id;

    try {
        // get aff user
        let affUser;
        if (aff_id) {
            affUser = await User.findOne({
                _id: aff_id || req._id,
                'roles.Salesman': 1373,
                active: true,
            });
        }
        //get price and add commission
        let totalPrice = 0;
        let affCommission = 0;

        const itemsArr = await Promise.all(
            items.map(async (item) => {
                const foundProduct = await Product.findById(item.Product);
                const itemPrice = foundProduct.price * item.quantity;
                totalPrice += itemPrice;

                // check if it's in the affliators special products or not
                const checked = affUser.productsForSale.includes(item._id);
                let commission;
                if (checked) {
                    const onePercent = itemPrice / 100;
                    commission = onePercent * affUser.commissionPercentage;
                    affCommission += commission;
                }
                return {
                    product: item.product,
                    quantity: item.quantity,
                    price: itemPrice,
                    commission,
                };
            })
        );

        //generate delivery number and order number
        const deliveryNum = Math.floor(100000 + Math.random() * 900000);
        const orderNum = Math.floor(10000000 + Math.random() * 90000000);

        //computing prices
        const payablePrice = totalPrice; // +shippingPrice + ...
        const newOrder = await Order.create({
            buyer,
            items: itemsArr,
            shippingAddress: address,
            paymentMethod: 'idpay',
            deliveryNum,
            orderNum,
            //shippingClass,
            //shippingPrice, //has to develop
            totalPrice,
            payablePrice,
            affId: affUser._id,
            totalComission: affCommission,
        });

        res.status(201).json(newOrder);
    } catch (e) {
        res.sendStatus(500);
    }
};

module.exports = {newOrder}