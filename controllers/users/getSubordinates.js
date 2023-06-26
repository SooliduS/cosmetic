const User = require('../../models/userModel');
const filterUsers = require('../../lib/filterUsers');
const {getPastMonthSalesSum ,getAllTimeSalesSum ,getLastMonthSalesSum , getThisMonthSalesSum} = require('../../lib/getSalesmanDetails')

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
                active:true,
                ...filter,
            }
        )
            .sort(sort)
            .skip(Number(offset))
            .limit(Number(limit))
            .select('username firstname lastname accountNumber instagram socialMedias level')
            ;

            const subordinates =await Promise.all(users.map(async user => {
                const allTimeSalesSum = await getAllTimeSalesSum(user._id)
                const lastMonthSalesSum = await getLastMonthSalesSum(user._id)
                const thisMonthSalesSum = await getThisMonthSalesSum(user._id)
                return {...user._doc , allTimeSalesSum , lastMonthSalesSum , thisMonthSalesSum}
            }))

        res.status(200).json({subordinates , total});
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = {getAllSubordinates}