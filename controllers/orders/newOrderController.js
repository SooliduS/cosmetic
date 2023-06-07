const Order = require('../../models/orderModel');
const User = require('../../models/userModel');
const Product = require('../../models/productModel');

const newOrder = async (req, res) => {
    const { items, address, paymentMethod } = req.body; //shippingClass
    // items:array of products
    //address: {postalCode , detail , city , phoneNumber}
    //paymentMethod: enum:['idpay']
    //affId: id of user

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
        //get price and add commission
        let totalPrice = 0;
        let totalComission = 0

        const itemsArr = await Promise.all(
            items.map(async (item) => {
                const foundProduct = await Product.findById(item.Product);
                if(!foundProduct) return res.status(404).json({message:'product not found'})
                const itemPrice = foundProduct.price * item.quantity;
                totalPrice += itemPrice;

                //affiliate
                if (item.affId) {
                    const affUser = await User.findOne({accountNumber:item.salesmanNumber});
                    const affLevel = affUser?.level;
                    if (affUser && foundProduct.level <= affLevel) {
                        const onePercent = itemPrice / 100;
                        const commission = onePercent * affUser.commissionPercentage;

                            totalComission += commission // add commission to the total

                        return {
                            product: item.product,
                            quantity: item.quantity,
                            price: itemPrice,
                            commission,
                            affId:affUser._id,
                            affPercent:affUser.commissionPercentage
                        };
                    }
                }
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
            totalComission
        });

        res.status(201).json(newOrder);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = { newOrder };
