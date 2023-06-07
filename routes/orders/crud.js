const router = require('express').Router()
const {newOrder} = require('../../controllers/orders/newOrderController')
const {getOrders} = require('../../controllers/orders/getOrdersController')
const verifyAdmin = require('../../middlewares/verifyAdmin')

/**
 * @swagger
 * /order/create:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     salesmanNumber: 
 *                       type: number
 *               address:
 *                 type: object
 *                 properties:
 *                   postalCode:
 *                     type: string
 *                   detail:
 *                     type: string
 *                   city:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *               paymentMethod:
 *                 type: string
 *             example:
 *               items:
 *                 - product: 5fec4fe20321b31e6cd99eaa
 *                   quantity: 2
 *                   salesmanNumber: 5126526
 *               address:
 *                 postalCode: 12345
 *                 detail: Example Street, 123
 *                 city: Example City
 *                 phoneNumber: 9876543210
 *               paymentMethod: idpay
 *     responses:
 *       '201':
 *         description: New order created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Bad request, missing required fields
 *         content:
 *           application/json:
 *             example:
 *               message: Required fields are missing
 *       '500':
 *         description: Internal server error
 */
router.post('/create' , newOrder)

/**
 * @swagger
 * /order/all:
 *   get:
 *     summary: Get a single product by ID
 *     tags:
 *       - getOrders
 *     description: Get all orders by admin
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: String
 *       - name: offset
 *         in: query
 *         schema:
 *           type: String
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get('/all', verifyAdmin, getOrders) // admin only



module.exports = router