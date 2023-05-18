const axios = require('axios');
const Transaction = require('../../models/transactionModel');
const Order = require('../../models/orderModel');

const sendPaymentRequest = async (req, res) => {
    if (!req.body.order) return res.sendStatus(400);

    try {
        let payablePrice = 0;
        await Promise.all(
            req.body.orders.map(async (order) => {
                const foundOrder = await Order.findById(order);
                payablePrice += foundOrder.payablePrice;
            })
        );
        const transaction = await Transaction.create({
            sender: req._id,
            amount: payablePrice,
            order: req.body.order,
        });

        const response = await axios.post(
            'https://api.idpay.ir/v1.1/payment',
            {
                order_id: transaction._id,
                amount: transaction.amount,
                callback: 'http://localhost:3000/checkout/checkout',
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': '09942283-f417-4e42-a814-82c05cdeb324',
                    'X-SANDBOX': true,
                },
            }
        );

        if (response.status === 201) {
            transaction.id = response.data.id;
            await transaction.save();
            return res.status(200).json(response.data);
        } else {
            return res.status(response.status).json(response.data);
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

module.exports = sendPaymentRequest;
