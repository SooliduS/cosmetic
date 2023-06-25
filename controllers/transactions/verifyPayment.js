const axios = require('axios');
const ORDER_STATUSES = require('../../config/orderStatuses');
const PAYMENT_STATUSES = require('../../config/paymentStatuses');
const Order = require('../../models/orderModel');
const mongoose = require('mongoose');
const Wallet = require('../../models/walletModel');
const Transaction = require('../../models/transactionModel');

const verifyPayment = async (req, res) => {
  if (!req.body.order_id || !req.body.track_id || !req.body.id)
    return res.status(400).json({ message: 'order_id, id, and track_id needed' });

  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
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

      console.log(response.data);
      if (!response || !response.data || response.status !== 200) {
        throw new Error('Invalid response from IDPay API');
      }

      const message = PAYMENT_STATUSES[response.data.status];
      const status = response.data.status;
      const card_no = response.data.payment.card_no;
      const hashed_card_no = response.data.payment.hashed_card_no;
      const date = response.data.payment.date;
      const track_id = response.data.payment.track_id;

      //order and transaction actions
      const foundOrder = await Order.findById(req.body.order_id)
        .populate('transaction')
        .session(session);
      const foundTransaction = await Transaction.findOne({
        order: foundOrder._id,
      }).session(session);

      //transaction actions
      foundTransaction.status = status;
      foundTransaction.card_no = card_no;
      foundTransaction.hashed_card_no = hashed_card_no;
      foundTransaction.data = date;
      foundTransaction.track_id = track_id;
      foundTransaction.message = message;

      //order actions
      if (status === 100 || status === 101) {
        foundOrder.status = 2;
        foundOrder.message = ORDER_STATUSES.find((x) => x.status === 2).message;
        foundOrder.transaction = foundTransaction._id;
      }

      await foundOrder.save();
      await foundTransaction.save();

      //add funds to salesman wallets
      const updatedWallets = {};

      await Promise.all(
        foundOrder.items.map(async (item) => {
          if (item.affId) {
            let foundWallet = updatedWallets[item.affId];

            if (!foundWallet) {
              foundWallet = await Wallet.findOne({ owner: item.affId }).session(session);
              updatedWallets[item.affId] = foundWallet;
            }

            foundWallet.balance += item.commission;
            foundWallet.transactions.push({
              order: foundOrder._id,
              transactionType: 'commission',
              createdAt: Date.now(),
              amount: item.commission,
            });

            if (item.superiorId) {
              let superiorWallet = updatedWallets[item.superiorId];

              if (!superiorWallet) {
                superiorWallet = await Wallet.findOne({ owner: item.superiorId }).session(session);
                updatedWallets[item.superiorId] = superiorWallet;
              }

              superiorWallet.balance += item.superiorCommission;
              superiorWallet.transactions.push({
                order: foundOrder._id,
                transactionType: 'commission',
                createdAt: Date.now(),
                amount: item.superiorCommission,
              });
            }
          }
        })
      );

      const updatedWalletPromises = Object.values(updatedWallets).map((wallet) => wallet.save());
      await Promise.all(updatedWalletPromises);

      res.status(201).json({ ...response.data, message });
    }, { session });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  } finally {
    await session.endSession();
  }
};

module.exports = { verifyPayment };
