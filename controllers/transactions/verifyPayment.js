const axios = require('axios');
const Transaction = require('../../models/transactionModel');
const paymentStatuses = require('../../config/paymentStatuses');
const Order = require('../../models/orderModel');
const mongoose = require('mongoose');
const Wallet = require('../../models/walletModel');
const WalletTransactoion = require('../../models/walletTransactionsModel');

const verifyPayment = async (req, res) => {
    if (!req.body.order_id || !req.body.track_id || !req.body.id)
        //values given from idpay (order_id === transactionId)
        return res
            .status(400)
            .json({ message: 'order_id ; id and track_id needed' });

    const session = await mongoose.startSession();

    try {
        await session.withTransaction(
            async () => {
                const foundTransaction = await Transaction.findById(
                    req.body.order_id
                ).session(session);

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

                if (!response || !response.data) {
                    throw new Error('Invalid response from IDPay API');
                }

                let message = paymentStatuses[response.data.status];
                if (response.data.status === 101) message = null;
                const status = response.data.status;
                const card_no = response.data.payment.card_no;
                const hashed_card_no = response.data.payment.hashed_card_no;
                const date = response.data.payment.date;
                const track_id = response.data.payment.track_id;

                foundTransaction.status = status;
                foundTransaction.card_no = card_no;
                foundTransaction.hashed_card_no = hashed_card_no;
                foundTransaction.data = date;
                foundTransaction.track_id = track_id;
                foundTransaction.message = message || foundTransaction.message;

                // each order actions
                await Promise.all(
                    foundTransaction.orders.map(async (order) => {
                        const foundOrder = await Order.findById(order).session(
                            session
                        );

                        foundOrder.message = message || foundOrder.message; //change status of order
                        foundOrder.transaction = foundTransaction._id; //add id of transaction
                        foundOrder.status = status

                        // supplier's wallet
                        let supplierWallet = await Wallet.findOne({
                            ownerModel: 'Supplier',
                            owner: foundOrder.supplier,
                        }).session(session);
                        if (!supplierWallet)
                            supplierWallet = await Wallet.create({
                                ownerModel: 'Supplier',
                                owner: foundOrder.supplier,
                            });

                        //customer's wallet

                        let costumerWallet = await Wallet.findOne({
                            owner: foundOrder.buyer,
                        }).session(session);
                        if (!costumerWallet)
                            costumerWallet = await Wallet.create({
                                ownerModel: foundOrder.buyerModel,
                                owner: foundOrder.buyer,
                            });

                        if (foundOrder.aff_id && foundOrder.aff_percent) { //if it't affiliated
                            //find or creat affliator wallet
                            let affWallet = await Wallet.findOne({
                                owner: aff_id,
                            }).session(session);
                            if (!affWallet)
                                affWallet = await Wallet.create({
                                    owner: aff_id,
                                    ownerModel: 'User',
                                });

                            //add wallet transactions
                            const affShare =
                                (foundOrder.aff_percent / 100) *
                                foundOrder.payablePrice;
                            const supplierShare =
                                foundOrder.payablePrice - affShare;

                            //affliator wallet transaction
                            await WalletTransactoion.create({
                                sender: costumerWallet._id,
                                reciever: affWallet._id,
                                amount: affShare,
                                order: foundOrder._id,
                                transaction: foundTransaction._id,
                                message:'payment from buyer to affiliator'
                            });
                            //supplier wallet transaction
                            await WalletTransactoion.create({
                                sender: costumerWallet._id,
                                reciever: supplierWallet._id,
                                amount: supplierShare,
                                order: foundOrder._id,
                                transaction: foundTransaction._id,
                                message:'payment from buyer to seller'
                            });
                        } else {
                            //create a new wallet transaction
                            await WalletTransactoion.create({
                                sender: costumerWallet._id,
                                reciever: supplierWallet._id,
                                amount: foundOrder.payablePrice,
                                order: foundOrder._id,
                                transaction: foundTransaction._id,
                                message:'payment from buyer to seller'
                            });
                        }

                        await foundOrder.save();
                    })
                );

                await foundTransaction.save();

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

module.exports = verifyPayment;
