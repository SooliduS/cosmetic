const express = require('express');
const router = express.Router();
const {handleRefreshToken} = require('../../controllers/users/refreshTokenController');

/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Refresh access token
 *     tags:
 *       - /
 *     description: Refreshes the access token using a valid refresh token.1111
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *             username:
 *               type: string
 *             _id:
 *               type: string
 *             roles:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/',handleRefreshToken);

module.exports = router;