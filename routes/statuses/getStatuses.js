const router = require('expess').Router()
const {getOrderStatuses} = require('../../controllers/statuses/getOrderStatusesController')
const {getWithdrawStatuses} = require('../../controllers/statuses/getWithdrawRequestStatuses')



router.get('/withdraw' , getWithdrawStatuses)
router.get('oreder' , getOrderStatuses)

module.exports = router