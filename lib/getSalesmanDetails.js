const Order = require('../models/orderModel');
const User = require('../models/userModel');

const getPastMonthSalesSum = async (userId) => {
    try {
        const currentDate = new Date();
        const pastMonthDate = new Date();
        pastMonthDate.setMonth(currentDate.getMonth() - 1);

        const orders = await Order.find({
            'items.affId': userId,
            createdAt: { $gte: pastMonthDate, $lte: currentDate },
        });

        let totalPrice = 0;

        orders.forEach((order) => {
            order.items.forEach((item) => {
                if (item.affId.toString() === userId.toString()) {
                    totalPrice += item.price;
                }
            });
        });

        return totalPrice;
    } catch (error) {
        console.error('Error calculating total price:', error);
        throw error;
    }
};

const getAllTimeSalesSum = async (userId) => {
    try {
        const orders = await Order.find({ 'items.affId': userId });
        let totalPrice = 0;

        orders.forEach((order) => {
            order.items.forEach((item) => {
                if (item.affId.toString() === userId.toString()) {
                    totalPrice += item.price;
                }
            });
        });

        return totalPrice;
    } catch (error) {
        console.error('Error calculating total price:', error);
        throw error;
    }
};

const getThisMonthSalesSum = async (userId) => {
    try {
        const currentDate = new Date();
        const currentMonthStart = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );
        const currentMonthEnd = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        );

        const orders = await Order.find({
            'items.affId': userId,
            createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd },
        });

        let totalPrice = 0;

        orders.forEach((order) => {
            order.items.forEach((item) => {
                if (item.affId.toString() === userId.toString()) {
                    totalPrice += item.price;
                }
            });
        });

        return totalPrice;
    } catch (error) {
        console.error('Error calculating total price:', error);
        throw error;
    }
};

const getLastMonthSalesSum = async (userId) => {
    try {
        const currentDate = new Date();
        const lastMonthStart = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
        );
        const lastMonthEnd = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
        );

        const orders = await Order.find({
            'items.affId': userId,
            createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd },
        });

        let totalPrice = 0;

        orders.forEach((order) => {
            order.items.forEach((item) => {
                if (item.affId.toString() === userId.toString()) {
                    totalPrice += item.price;
                }
            });
        });

        return totalPrice;
    } catch (error) {
        console.error('Error calculating total price:', error);
        throw error;
    }
};

const getThisMonthCommission = async (userId, thisMonthSalesSum) => {
    try {
        const foundUser = await User.findById(userId);
        if (!foundUser || !foundUser.verified) return 0;

        const commissionPercentage = foundUser.commissionPercentage;

        const commission = (commissionPercentage * thisMonthSalesSum)/100;

        return commission;
    } catch (e) {
        throw error;
    }
};

const getLastMonthCommission = async (userId, lastMonthSalesSum) => {
    try {
        const foundUser = await User.findById(userId);
        if (!foundUser || !foundUser.verified) return 0;

        const commissionPercentage = foundUser.commissionPercentage;

        const commission = (commissionPercentage * lastMonthSalesSum)/100;

        return commission;
    } catch (e) {
        throw error;
    }
};

// const getAllTimeCommission = async (userId, allTimeSalesSum) => {
//     try {
//         const foundUser = await User.findById(userId);
//         if (!foundUser || !foundUser.verified) return 0;

//         const commissionPercentage = foundUser.commissionPercentage;

//         const commission = commissionPercentage * allTimeSalesSum;

//         return commission;
//     } catch (e) {
//         throw error;
//     }
// };


module.exports = {
    getPastMonthSalesSum,
    getAllTimeSalesSum,
    getLastMonthSalesSum,
    getThisMonthCommission,
    getThisMonthSalesSum,
    getLastMonthCommission
};
