const Order = require('../../models/orderModel');
const filterOrders = require('../../lib/filterOrders');

const getOrders = async (req, res) => {

    const { offset, limit } = req.query;
    const { sort, filter } = filterOrders(req);

    try {
        const total = await Order.countDocuments(filter)
        const orders = await Order.find(filter)
            .sort(sort)
            .skip(Number(offset))
            .limit(Number(limit));

            return res.status(200).json({orders , total})
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getOrdersByUser = async(req ,res) => {
    const {offset , limit} = req.query
    const {sort , filter} = filterOrders(req)
}

module.exports = {getOrders}