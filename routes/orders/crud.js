const router = require('express').Router()
const {newOrder} = require('../../controllers/orders/newOrderController')
const {getOrders} = require('../../controllers/orders/getOrdersController')

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
 *                     affId: 
 *                       type: string
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
 *                   affId: 3eec4fe20321b31e6cd99ebb
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
router.get('/all', getOrders) // admin only

module.exports = router