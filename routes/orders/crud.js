const router = require('express').Router()
const {newOrder} = require('../../controllers/orders/newOrderController')
const {getOrders , getOrdersByUser , getSingleOrder} = require('../../controllers/orders/getOrdersController')
const {changeOrderStatus} = require('../../controllers/orders/changeOrderStatusController')
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
 *                   details:
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
 *                 phoneNumber: '9876543210'
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
 * /order/user:
 *   get:
 *     summary: Get all orders by user
 *     tags:
 *       - Order
 *     description: get orders by user
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
 *         description: orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get('/user' , getOrdersByUser)

/**
 * @swagger
 * /order/user/{id}:
 *   get:
 *     summary: Get all orders of a user (admin only)
 *     tags:
 *       - Order
 *     description: Get all orders of a user by admin
 *     parameters:
 *       - name: id
 *         in: path
 *         schema: 
 *           type: string
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
 *         description: orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get('/user/:id' , getOrdersByUser)

/**
 * @swagger
 * /order/all:
 *   get:
 *     summary: Get orders
 *     tags:
 *       - Order
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of records to skip
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of records to return
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Order status to filter by
 *       - in: query
 *         name: product
 *         schema:
 *           type: string
 *         description: Product ID to filter by
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort order for the results
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category to filter by
 *       - in: query
 *         name: seen
 *         schema:
 *           type: boolean
 *         description: Order seen status to filter by
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/OrderResponse'
 *       '500':
 *         description: Internal server error
 *
 * definitions:
 *   OrderResponse:
 *     type: object
 *     properties:
 *       orders:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Order'
 *       total:
 *         type: integer
 *
 *   Order:
 *     type: object
 *     properties:
 *       // Define properties of an order here
 */
router.get('/all', verifyAdmin, getOrders) // admin only

/**
 * @swagger
 * /order/single/{orderId}:
 *   get:
 *     summary: Get a single order by ID
 *     tags:
 *       - Order
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             example:
 *               message: Order ID is required.
 *       '403':
 *         description: Forbidden - Only authorized users can access the order
 *       '404':
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               message: Order not found.
 *
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         buyer:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         totalAmount:
 *           type: number
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *
 *     OrderItem:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *         quantity:
 *           type: number
 *         price:
 *           type: number
 */
router.get('/single/:orderId' , getSingleOrder)

/**
 * @swagger
 * /order/changeStatus:
 *   put:
 *     summary: Change order status (admin only)
 *     tags:
 *       - Order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangeOrderStatusInput'
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '400':
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             example:
 *               message: Order ID is required.
 *       '500':
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     ChangeOrderStatusInput:
 *       type: object
 *       properties:
 *         orderId:
 *           type: string
 *         status:
 *           type: number
 */
router.put('/changestatus', verifyAdmin ,changeOrderStatus )



module.exports = router