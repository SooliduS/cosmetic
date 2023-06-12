const WITHDRAW_STATUSES = require('../../config/withdrawRequestStatuses')

const getWithdrawStatuses = async(req ,res) => {
        return res.status(200).json(WITHDRAW_STATUSES)
}

module.exports = {getWithdrawStatuses}