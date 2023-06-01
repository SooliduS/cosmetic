const express = require('express');
const router = express.Router();
const {handleLogout} = require('../../controllers/users/logoutController');

/**
 * @swagger
 * /logout:
 *   delete:
 *     tags: 
 *       - /
 *     summary: Logout a user by deleting the refresh token from database and clearing cookies
 *     security:
 *       - bearerAuth: []
 */
router.delete('/', handleLogout);

module.exports = router;