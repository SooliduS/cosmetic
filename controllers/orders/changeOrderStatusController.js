const Order = require('../../models/orderModel');
const ORDER_STATUSES = require('../../config/orderStatuses');

const changeOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
    if (!orderId) return res.status(400).json({ message: 'orderId needed' });

    try {
        const foundOrder = await Order.findById(orderId);

        if (status === 3) {
            foundOrder.status = 3;
            foundOrder.message = ORDER_STATUSES[3];
        }
        else if (status === 4) {
            foundOrder.status = 4;
            foundOrder.message = ORDER_STATUSES[4];
        }
        else if (status === 5) {
            foundOrder.status = 5;
            foundOrder.message = ORDER_STATUSES[5];
        }
        if (status === 6) {
            foundOrder.status = 6;
            foundOrder.message = ORDER_STATUSES[6];
        }
        else if (status === 7) {
            foundOrder.status = 7;
            foundOrder.message = ORDER_STATUSES[7];
        }
        else if (status === 8) {
            foundOrder.status = 8;
            foundOrder.message = ORDER_STATUSES[8];
        }
        else return res.status(406).json('this status is not acceptable')
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = { changeOrderStatus };
