const router = require('express').Router();
const {
    getAllWithdrawRequsts,
    getWithdrawRequestsByUser,
    handleChangeStatus,
    newWithdrawRequest,
} = require('../../controllers/withdrawRequsts/crud');

/**
 * @swagger
 * /withdrawrequests/all:
 *   get:
 *     summary: Get all withdraw requests
 *     tags:
 *       - WithdrawRequests
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of items to skip (optional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of items to return (optional)
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: The total number of withdraw requests
 *                 withdrawRequests:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WithdrawRequest'
 *       '500':
 *         description: Internal server error
 */
router.get('/all' , getAllWithdrawRequsts)

/**
 * @swagger
 * /withdrawrequests/getbyuser:
 *   get:
 *     summary: Get withdraw requests by user
 *     tags:
 *       - WithdrawRequests
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of items to skip (optional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of items to return (optional)
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 withdrawRequests:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WithdrawRequest'
 *                 total:
 *                   type: integer
 *                   description: The total number of withdraw requests
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.get('/getbyuser' , getWithdrawRequestsByUser)

/**
 * @swagger
 * /withdrawrequests/user/:/{id}:
 *   get:
 *     summary: Get withdraw users withdraw request (admin only)
 *     tags:
 *       - WithdrawRequests
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of items to skip (optional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of items to return (optional)
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 withdrawRequests:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/WithdrawRequest'
 *                 total:
 *                   type: integer
 *                   description: The total number of withdraw requests
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.get('/user/:id' , getWithdrawRequestsByUser)

/**
 * @swagger
 * /withdrawrequests/handleChangeStatus/{id}:
 *   put:
 *     summary: Update withdraw request status (admin only)
 *     tags:
 *       - WithdrawRequests
 *     parameters:
 *       - in: path
 *         name: withdrawRequstId
 *         schema:
 *           type: string
 *         description: The ID of the withdraw request
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the withdraw request
 *                 example: completed
 *               bankName:
 *                 type: string
 *                 description: The bank name (optional)
 *                 enum: [ملی, صادرات, مسکن, کشاورزی]
 *                 example: ملی
 *               adminMessage:
 *                 type: string
 *                 description: Message from the admin (optional)
 *                 example: Your request has been processed successfully.
 *               trackId:
 *                 type: string
 *                 description: The ID from the bank to track the transaction (optional)
 *                 example: 1234567890
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WithdrawRequest'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Withdraw request not found
 *       '500':
 *         description: Internal server error
 */
router.put('/handleChangeStatus/:id' , handleChangeStatus)

/**
 * @swagger
 * /withdrawrequests/addrequest:
 *   post:
 *     summary: Create a new withdraw request
 *     tags:
 *       - WithdrawRequests
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount to withdraw
 *                 example: 100
 *     responses:
 *       '201':
 *         description: Successful response, new withdraw request created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WithdrawRequest'
 *       '400':
 *         description: Bad request, amount parameter is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Amount needed
 *       '404':
 *         description: Not found, user or wallet not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error occurred
 */
router.post('addrequest' , newWithdrawRequest)

module.exports = router