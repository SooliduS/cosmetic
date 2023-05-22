const express = require('express');
const router = express.Router();
const {handleNewUser} = require('../../controllers/users/registerController');

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Handle new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *     responses:
 *       '201':
 *         description: New user created
 *       '400':
 *         description: Invalid request parameters
 *       '409':
 *         description: Duplicate username or email
 *       '500':
 *         description: Internal server error
 */
router.post('/', handleNewUser);

module.exports = router;