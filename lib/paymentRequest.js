const axios = require('axios');
const Transaction = require('../models/transactionModel');

const sendPaymentRequest = async (orderId , sender , payablePrice) => {

    try {
        await Transaction.updateMany({}, { $unset: { track_id: "" } });
        const transaction = await Transaction.create({
            sender,
            amount: payablePrice,
            order: orderId,
        });

        const response = await axios.post(
            'https://api.idpay.ir/v1.1/payment',
            {
                order_id: orderId,
                amount: transaction.amount,
                callback: `${process.env.BASE_URL}/app/checkout/${orderId}`,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': '09942283-f417-4e42-a814-82c05cdeb324',
                    'X-SANDBOX': true,
                },
            }
        );

        if(response.status === 201){
            transaction.id = response.data.id
            await transaction.save()
        }

        return  {status:response.status , data:response.data}

    } catch (e) {
        console.log(e);
    }
};

module.exports =  sendPaymentRequest ;
