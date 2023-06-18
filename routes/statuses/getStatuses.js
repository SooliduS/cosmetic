const router = require('express').Router()
const {getOrderStatuses} = require('../../controllers/statuses/getOrderStatusesController')
const {getWithdrawStatuses} = require('../../controllers/statuses/getWithdrawRequestStatuses')


/**
 * @swagger
 * /getstatuses/withdraw:
 *   get:
 *     summary: Get withdraw request statuses
 *     tags:
 *       - getStatuses
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     description: The status of the withdraw request
 *                   message:
 *                     type: string
 *                     description: The corresponding message for the status
 *       '500':
 *         description: Internal server error
 */
router.get('/withdraw' , getWithdrawStatuses)

/**
 * @swagger
 * /getstatuses/order:
 *   get:
 *     summary: Get order statuses
 *     tags:
 *      - getStatuses
 *     description: Retrieve the list of order statuses.
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: integer
 *                     description: The status code of the order.
 *                   message:
 *                     type: string
 *                     description: The message associated with the order status.
 */
router.get('/order' , getOrderStatuses)

module.exports = router