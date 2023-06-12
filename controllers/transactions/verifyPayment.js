const axios = require('axios');
const ORDER_STATUSES = require('../../config/orderStatuses');
const PAYMENT_STATUSES = require('../../config/paymentStatuses');
const Order = require('../../models/orderModel');
const mongoose = require('mongoose');
const Wallet = require('../../models/walletModel');

const verifyPayment = async (req, res) => {
    if (!req.body.order_id || !req.body.track_id || !req.body.id)
        return res
            .status(400)
            .json({ message: 'order_id ; id and track_id needed' });

    const session = await mongoose.startSession();

    try {
        await session.withTransaction(
            async () => {
                const response = await axios.post(
                    'https://api.idpay.ir/v1.1/payment/verify',
                    { id: req.body.id, order_id: req.body.order_id },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-API-Key': '09942283-f417-4e42-a814-82c05cdeb324',
                            'X-SANDBOX': true,
                        },
                    }
                );

                if (!response || !response.data || response.status !== 200) {
                    throw new Error('Invalid response from IDPay API');
                }

                let message = PAYMENT_STATUSES[response.data.status];
                if (response.data.status === 101) message = null;
                const status = response.data.status;
                const card_no = response.data.payment.card_no;
                const hashed_card_no = response.data.payment.hashed_card_no;
                const date = response.data.payment.date;
                const track_id = response.data.payment.track_id;

                //order and transaction actions
                const foundOrder = await Order.findById(req.body.order_id)
                    .populate('Transaction')
                    .session(session);
                const foundTransaction = foundOrder.transaction;

                //transaction actions
                foundTransaction.status = status;
                foundTransaction.card_no = card_no;
                foundTransaction.hashed_card_no = hashed_card_no;
                foundTransaction.data = date;
                foundTransaction.track_id = track_id;
                foundTransaction.message = message || foundTransaction.message;

                //order actions
                if (status === 100) {
                    foundOrder.status = 2;
                    foundOrder.message = ORDER_STATUSES.find(
                        (x) => x.status === 2
                    ).message;
                    foundOrder.transaction = foundTransaction._id;
                }

                await foundOrder.save();
                await foundTransaction.save();

                //add founds to salesman wallets
                await Promise.all(
                    foundOrder.items.map(async (item) => {
                        if (affId) {
                            const foundWallet = await Wallet.findOne({
                                owner: item.affId,
                            });
                            foundWallet.balance += item.commission;
                            foundWallet.transaction.push({
                                order: foundOrder._id,
                                transactionType: 'commission',
                                createdAt: new Date.now(),
                                amount: item.commission,
                            });
                            await foundWallet.save();
                        }
                    })
                );

                res.status(201).json(response.data);
            },
            { session }
        );
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    } finally {
        await session.endSession();
    }
};

module.exports = { verifyPayment };
