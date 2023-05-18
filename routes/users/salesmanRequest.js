const router = require('express').Router()
const {becomeSalesman} = require ('../../controllers/users/salesmanRequst')

/**
 * @swagger
 * /salesmanrequest:
 *   post:
 *     summary: request to become a salesman (earn salesman role)
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               melliCode:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *                   details:
 *                     type: string
 *               mobileNumber:
 *                 type: string
 *               melliCardImg:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               instagram:
 *                 type: string
 *             required:
 *               - melliCode
 *               - email
 *               - phoneNumber
 *               - address
 *               - mobileNumber
 *               - melliCardImg
 *               - accountNumber
 *               - instagram
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad Request - Missing required fields
 *       '500':
 *         description: Internal Server Error
 */
router.post('/' , becomeSalesman)

module.exports = router