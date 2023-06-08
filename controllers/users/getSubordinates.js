const User = require('../../models/userModel');
const filterUsers = require('../../lib/filterUsers');
const {getPastMonthSalesSum ,getAllTimeSalesSum ,getLastMonthSalesSum } = require('../../lib/getSalesmanDetails')

const getAllSubordinates = async (req ,res) => {
    const { sort, filter } = filterUsers(req);
    const { limit, offset } = req.params;

    try {
        const total = await User.countDocuments({
            superior: req._id,
            verified: true,
            'roles.Salesman': 1373,
            ...filter,
        });
        const users = await User.find(
            {
                superior: req._id,
                verified: true,
                'roles.Salesman': 1373,
                ...filter,
            },
            {
                roles: 0,
                password: 0,
                bankShabaNumber: 0,
                bankCardNumber: 0,
                isEmailConfirmed: 0,
                isEmailConfirmed: 0,
                refreshToken: 0,
                melliCardImg: 0,
                verified: 0,
                wallet: 0,
            }
        )
            .sort(sort)
            .skip(Number(offset))
            .limit(Number(limit));

            const subordinates =await Promise.all(users.map(async user => {
                const pastMonthSalesSum = await getPastMonthSalesSum(user._id)
                const allTimeSalesSum = await getAllTimeSalesSum(user._id)
                const lastMonthSalesSum = await getLastMonthSalesSum(user._id)
                return {...user._doc , pastMonthSalesSum , allTimeSalesSum , lastMonthSalesSum}
            }))

        res.status(200).json({subordinates , total});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = {getAllSubordinates}