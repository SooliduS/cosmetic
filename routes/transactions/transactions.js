const router = require('express').Router()
const {sendPaymentRequest} = require('../../controllers/transactions/paymentRequest')
const {verifyPayment} = require('../../controllers/transactions/verifyPayment')

/**
 * @swagger
 * /payment/request:
 *   post:
 *     summary: Send payment request
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: The ID of the order to make the payment for
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the payment transaction
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/request' , sendPaymentRequest)

/**
 * @swagger
 * /payment/verify:
 *   post:
 *     summary: Verify payment
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *                 description: The ID of the order to verify the payment for
 *               track_id:
 *                 type: string
 *                 description: The track ID of the payment transaction
 *               id:
 *                 type: string
 *                 description: The ID of the payment transaction
 *     responses:
 *       '201':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/verify' , verifyPayment)

module.exports = router