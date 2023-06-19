const router = require('express').Router();
const {
    getSalesmanRequests,
    handleSalesmanRequest,
    getSingleSalesmanRequest
} = require('../../controllers/admin/salesmanRequestConroller');
const verifyAdmin = require('../../middlewares/verifyAdmin');


/**
 * @swagger
 * /admin/salesmanrequests/handle:
 *   post:
 *     summary: Handle salesman request
 *     tags:
 *       - Admin
 *     description: Handle a salesman request by providing a message, request ID, confirmed status, and products.
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/SalesmanRequestHandleInput'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/SalesmanRequest'
 *       '400':
 *         description: Invalid request parameters
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '403':
 *         description: Forbidden - Only admin and editor have permission
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '404':
 *         description: Request not found or user not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '500':
 *         description: Internal server error
 *
 * definitions:
 *   SalesmanRequestHandleInput:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *       requestId:
 *         type: string
 *       confirmed:
 *         type: boolean
 *   SalesmanRequest:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *       confirmed:
 *         type: boolean
 *       user:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 */
router.post('/handle', verifyAdmin, handleSalesmanRequest);

/**
 * @swagger
 * /admin/salesmanrequests/single/{requestId}:
 *   get:
 *     summary: Get a single salesman request
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: requestId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the salesman request
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SalesmanRequestResponse'
 *       '400':
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Request not found or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while retrieving the salesman request.
 *
 * components:
 *   schemas:
 *     SalesmanRequestResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         message:
 *           type: string
 *         confirmed:
 *           type: boolean
 *         user:
 *           type: string
 *         username:
 *           type: string
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         email:
 *           type: string
 *         bankShabaNumber:
 *           type: string
 *         bankCardNumber:
 *           type: string
 *         isEmailConfirmed:
 *           type: boolean
 *         isMobileConfirmed:
 *           type: boolean
 *         isMellicardConfirmed:
 *           type: boolean
 *         melliCode:
 *           type: string
 *         melliCardImg:
 *           type: string
 *         verified:
 *           type: boolean
 */
router.get('/single/:requestId' , verifyAdmin , getSingleSalesmanRequest)

/**
 * @swagger
 * /admin/salesmanrequests:
 *   get:
 *     summary: Get salesman requests
 *     tags:
 *       - Admin
 *     description: Retrieve a list of salesman requests.
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/SalesmanRequest'
 *       '403':
 *         description: Forbidden - Only admin and editor have permission
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '500':
 *         description: Internal server error
 *
 * definitions:
 *   SalesmanRequest:
 *     type: object
 *     properties:
 *       confirmed:
 *         type: boolean
 *       adminUpdateDate:
 *         type: string
 *       updatedAt:
 *         type: string
 */
router.get('/', verifyAdmin, getSalesmanRequests);



module.exports = router;
