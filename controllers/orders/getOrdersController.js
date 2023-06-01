const Order = require('../../models/orderModel');
const filterOrders = require('../../lib/filterOrders');

const getOrders = async (req, res) => {

    if (!req.roles.includes('Admin') || !req.roles.includes('Editor'))
        return res.status(403).json({ message: 'admin route' });

    const { offset, limit } = req.query;
    const { sort, filter } = filterOrders(req);

    try {
        const orders = await Order.find(filter)
            .sort(sort)
            .skip(Number(offset))
            .limit(Number(limit));

            return res.status(200).json(orders)
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {getOrders}