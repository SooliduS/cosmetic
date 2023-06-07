const router = require('express').Router();
const {
    getSalesmanRequests,
    handleSalesmanRequest,
} = require('../../controllers/admin/salesmanRequestConroller');
const verifyAdmin = require('../../middlewares/verifyAdmin');

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
 *       products:
 *         type: array
 *         items:
 *           type: string
 *
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

module.exports = router;
