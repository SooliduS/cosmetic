const express = require('express');
const router = express.Router();
const authController = require('../../controllers/users/authController');

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Logs in a user and returns an access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The username of the user to log in
 *                 example: johndoe
 *               pwd:
 *                 type: string
 *                 description: The password of the user to log in
 *                 example: secret
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: A JWT access token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2MjIzMDgwMjIsImV4cCI6MTYyMjMwODAzMn0.JRdLtwjI1G9L3qHfQNRdxIKwYGBPeQgKj5hscCJ8D0I
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 */
router.post('/', authController.handleLogin);

module.exports = router;
