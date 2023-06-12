const ORDER_STATUSES = require('../../config/orderStatuses')

const getOrderStatuses = async(req ,res) => {
        return res.status(200).json(ORDER_STATUSES)
}

module.exports = {getOrderStatuses}