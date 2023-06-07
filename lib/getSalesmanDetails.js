const Order = require('../models/orderModel');


const getPastMonthSalesSum = (userId) => {
    const affId = userId;

    const currentDate = new Date();
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

    Order.aggregate([
        {
            $match: {
                aff_id: affId,
                createdAt: {
                    $gte: lastMonthDate,
                    $lt: currentDate,
                },
            },
        },
        {
            $group: {
                _id: null,
                totalPrice: { $sum: '$totalPrice' },
            },
        },
    ])
        .then((result) => {
            if (result.length > 0) {
                const total = result[0].totalPrice;
                console.log(
                    'Sum of total prices for aff_id:',
                    affId,
                    'within the last month:',
                    total
                );
                return total;
            } else {
                console.log(
                    'No orders found for aff_id:',
                    affId,
                    'within the last month'
                );
                return 0
            }
            
        })
        .catch((error) => {
            console.error('Error calculating sum:', error);
        });
};

const getAllTimeSalesSum = (userId) => {
    const affId = userId

    Order.aggregate([
        {
            $match: {
                aff_id: affId,
            },
        },
        {
            $group: {
                _id: null,
                totalPrice: { $sum: '$totalPrice' },
            },
        },
    ])
        .then((result) => {
            if (result.length > 0) {
                const total = result[0].totalPrice;
                console.log(
                    'Sum of total prices for aff_id:',
                    affId,
                    total
                );
                return total
            } else {
                console.log('No orders found for aff_id:', affId);
                return 0
            }

        })
        .catch((error) => {
            console.error('Error calculating sum:', error);
        });
};



module.exports = { getPastMonthSalesSum , getAllTimeSalesSum ,  };
