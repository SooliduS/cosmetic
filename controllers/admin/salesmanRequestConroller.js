const SalesmanRequest = require('../../models/salesmanRequest');
const User = require('../../models/userModel');

const getSalesmanRequests = async (req, res) => {
    try {
        const total = await SalesmanRequest.countDocuments({
            confirmed: false,
            message: 'منتظر بررسی توسط ادمین',
        });
        const requests = await SalesmanRequest.find({
            confirmed: false,
            message: 'منتظر بررسی توسط ادمین',
        }).populate('user' , 'melliCode username firstname lastname').sort('updatedAt').limit;

        return res.status(200).json({ requests, total });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const handleSalesmanRequest = async (req, res) => {
    // if(req.roles !== 'Admin' && req.roles !== 'Editor') return res.status(403).json({message:'only admin and editor have permission'})
    const { message, requestId, confirmed } = req.body; //confirmed:boolean  products:array of product ids

    if (!requestId)
        return res.status(400).json({ message: 'request id needed' });
    if (!message) return res.status(400).josn({ message: 'message needed' });

    try {
        const foundReq = await SalesmanRequest.findById(requestId);
        if (!foundReq)
            return res.status(404).json({ message: 'request not found' });

        foundReq.message = message;
        foundReq.confirmed = confirmed;
        await foundReq.save();

        if (confirmed) {
            const foundUser = await User.findById(foundReq.user);
            if (!foundUser)
                return res.status(404).json({ message: 'user not found' });

            foundUser.roles.Salesman = 1373;
            foundUser.isMellicardConfirmed = true;
            foundUser.verified = true;
            foundUser.commissionPercentage = 40;

            await foundUser.save();
        }

        return res.status(200).json(foundReq);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getSingleSalesmanRequest = async (req, res) => {
    const {requestId} = req.params;

    if (!requestId)
        return res.status(400).json({ message: 'request id needed' });

    try {
        const foundReq = await SalesmanRequest.findById(requestId);
        if (!foundReq)
            return res.status(404).json({ message: 'request not found' });

        const foundUser = await User.findById(foundReq.user);
        if (!foundUser)
            return res.status(404).json({ message: 'user not found' });

        const obj = {
            ...foundReq._doc,
            username: foundUser.username,
            firstname:foundUser.firstname,
            lastname: foundUser.lastname,
            email: foundUser.email,
            bankShabaNumber:foundUser.bankShabaNumber,
            bankCardNumber: foundUser.bankCardNumber,
            isEmailConfirmed:foundUser.isEmailConfirmed,
            isMobileConfirmed: foundUser.isMobileConfirmed,
            isMellicardConfirmed : foundUser.isMellicardConfirmed,
            melliCode: foundUser.melliCode,
            melliCardImg: foundUser.melliCardImg,
            verified:foundUser.verified
        };

        return res.status(200).json(obj)
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};
module.exports = { getSalesmanRequests, handleSalesmanRequest , getSingleSalesmanRequest };
