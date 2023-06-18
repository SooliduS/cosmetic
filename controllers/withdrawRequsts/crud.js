const Wallet = require('../../models/walletModel');
const User = require('../../models/userModel');
const WithdrawRequest = require('../../models/withdrawRequestModel');
const WITHDRAW_STATUSES = require('../../config/withdrawRequestStatuses');
const mongoose = require('mongoose');

const newWithdrawRequest = async (req, res) => {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ message: 'amount needed' });
    try {
        const foundUser = await User.findById(req._id);
        if (!foundUser)
            return res.status(404).json({ message: 'user not found' });
        const foundWallet = await Wallet.findOne({ owner: req._id });
        if (!foundWallet)
            return res.status(404).json({ message: 'wallet not found' });

        if (foundWallet.balance < amount)
            return res.status(400).json({
                message: 'wallet balance is less than the requested amount',
            });

        const withdrawRequest = await WithdrawRequest.create({
            user: req._id,
            wallet: foundWallet._id,
            amount,
            bankCardNumber: foundUser.bankCardNumber,
            bankShabaNumber: foundUser.bankShabaMumber,
        });

        return res.status(200).json(withdrawRequest);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const getWithdrawRequestsByUser = async (req, res) => {
    const { offset, limit } = req.query;
    const user = req.params.id || req._id;

    try {
        const total = await WithdrawRequest.countDocuments({ user });
        const withdrawRequests = await WithdrawRequest.find({ user })
            .sort({
                createdAt: -1,
            })
            .skip(Number(offset))
            .limit(Number(limit));
        return res.status(200).json({ withdrawRequests, total });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getAllWithdrawRequsts = async (req, res) => {
    const { offset, limit } = req.query;
    try {
        const total = await WithdrawRequest.countDocuments();
        const withdrawRequests = await WithdrawRequest.find()
            .sort({ createdAt: -1 })
            .skip(Number(offset))
            .limit(Number(limit));

        return res.status(200).json({ total, withdrawRequests });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const handleChangeStatus = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const id = req.params.id;
        const { status, bankName, adminMessage, trackId } = req.body;

        if (!id || !status) return res.sendStatus(400);

        const foundReq = await WithdrawRequest.findById(id).session(session);
        if (!foundReq) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Request not found' });
        }

        const message = WITHDRAW_STATUSES.find(
            (x) => x.status === status
        ).message;

        if (foundReq.status === 1 && req.body.status === 2) {
            const foundWallet = await Wallet.findOne({ owner: foundReq.user });
            if (foundWallet.balance < foundReq.amount) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    message: 'Wallet balance is less than the requested amount',
                });
            }
            foundWallet.balance -= foundReq.amount;
            foundWallet.transactions.push({
                transactionType: 'withdraw',
                createdAt: Date.now(),
                amount: foundReq.amount,
            });
            await foundWallet.save();
        }

        foundReq.status = status;
        foundReq.message = message;
        if (bankName) foundReq.bankName = bankName;
        if (adminMessage) foundReq.adminMessage = adminMessage;
        if (trackId) foundReq.trackId = trackId;

        await foundReq.save();

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json(foundReq);
    } catch (e) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {
    newWithdrawRequest,
    getWithdrawRequestsByUser,
    getAllWithdrawRequsts,
    handleChangeStatus,
};
