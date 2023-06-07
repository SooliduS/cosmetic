const SalesmanRequest = require('../../models/salesmanRequest');
const User = require('../../models/userModel');

const getSalesmanRequests = async (req, res) => {
   
    try {
        const total = await SalesmanRequest.countDocuments({
            confirmed: false,
            adminUpdateDate: { $lt: '$updatedAt' },
        });
        const requests = await SalesmanRequest.find({
            confirmed: false,
            adminUpdateDate: { $lt: '$updatedAt' },
        }).sort('updatedAt');

        return res.status(200).json({requests , total});
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const handleSalesmanRequest = async (req, res) => {
    // if(req.roles !== 'Admin' && req.roles !== 'Editor') return res.status(403).json({message:'only admin and editor have permission'})
    const { message, requstId, confirmed } = req.body; //confirmed:boolean  products:array of product ids

    if (!requstId)
        return res.status(400).json({ message: 'request id needed' });
    if (!message) return res.status(400).josn({ message: 'message needed' });

    try {
        const foundReq = await SalesmanRequest.findById(requstId);
        if (!foundReq)
            return res.status(404).json({ message: 'request not found' });

        foundReq.message = message;
        foundReq.confirmed = confirmed;
        foundReq.adminUpdateDate = new Date();
        await foundReq.save();

        if (confirmed) {
            const foundUser = await User.findById(foundReq.user);
            if (!foundUser)
                return res.status(404).json({ message: 'user not found' });

            foundUser.roles.Salesman = 1373;
            foundUser.isMellicardConfirmed = true
            foundUser.verified = true
            foundUser.commissionPercentage = 40

            await foundUser.save();
        }

        return res.status(200).json(foundReq);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};
module.exports = { getSalesmanRequests, handleSalesmanRequest };
