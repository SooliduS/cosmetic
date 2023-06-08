const {
    getPastMonthSalesSum,
    getAllTimeSalesSum,
    getThisMonthSalesSum,
    getLastMonthCommission,
    getLastMonthSalesSum,
    getThisMonthCommission,
} = require('../../lib/getSalesmanDetails');

const getSalesmanDetails = async (req, res) => {
    try {
        const pastMonthSalesSum = await getPastMonthSalesSum(req._id);
        const allTimeSalesSum = await getAllTimeSalesSum(req._id);
        const thisMonthSalesSum = await getThisMonthSalesSum(req._id);
        const lastMonthSalesSum = await getLastMonthSalesSum(req._id);
        const lastMonthCommission = await getLastMonthCommission(
            req._id,
            lastMonthSalesSum
        );
        const thisMonthCommission = await getThisMonthCommission(
            req._id,
            thisMonthSalesSum
        );

        console.log(
            pastMonthSalesSum,
            allTimeSalesSum,
            thisMonthSalesSum,
            lastMonthSalesSum,
            lastMonthCommission,
            thisMonthCommission
        );
        return res.status(200).json({
            pastMonthSalesSum,
            allTimeSalesSum,
            thisMonthSalesSum,
            lastMonthSalesSum,
            lastMonthCommission,
            thisMonthCommission,
        });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = { getSalesmanDetails };
