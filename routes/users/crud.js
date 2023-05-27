const router = require('express').Router()
const { getAllUsers , getUser , updateUser , changePassword , deleteUser} = require('../../controllers/users/usersController')
const verifyAdmin = require('../../middlewares/verifyAdmin')

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *       - Admin
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '204':
 *         description: No users found
 *         content:
 *           application/json:
 *             example:
 *               message: No users found
 *       '500':
 *         description: Internal server error
 */
router.get('/all' , verifyAdmin , getAllUsers )

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Admin
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The user information was successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '204':
 *         description: The user with the provided ID was not found.
 *         content:
 *           application/json:
 *             example:
 *               message: User ID not found
 *       '400':
 *         description: User ID parameter is required.
 *         content:
 *           application/json:
 *             example:
 *               message: User ID required
 */
router.get('/:id' , verifyAdmin , getUser)

/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Update user information
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User information to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The new username.
 *               address:
 *                 type: string
 *                 description: The new address.
 *               instagram:
 *                 type: string
 *                 description: The new Instagram handle.
 *               socialMedias:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The new social media handles.
 *               firstname:
 *                 type: string
 *                 description: The new first name (only applicable if the user is not verified).
 *               lastname:
 *                 type: string
 *                 description: The new last name (only applicable if the user is not verified).
 *               melliCode:
 *                 type: string
 *                 description: The new national identification number (only applicable if the user is not verified).
 *             example:
 *               username: johnsmith
 *               address: New York City
 *               instagram: johnsmith23
 *               socialMedias:
 *                 - twitter: johnsmith
 *                 - facebook: johnsmith
 *               firstname: John
 *               lastname: Smith
 *               melliCode: 1234567890
 *     responses:
 *       '200':
 *         description: The user information was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The response message.
 *       '404':
 *         description: The user with the current user ID was not found.
 *         content:
 *           application/json:
 *             example:
 *               message: User not found
 *       '409':
 *         description: Username already used.
 *         content:
 *           application/json:
 *             example:
 *               message: Username used
 */
router.put('/update' , updateUser)

/**
 * @swagger
 * /users/changepassword:
 *   post:
 *     summary: Change user password
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User old and new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The current password.
 *               newPassword:
 *                 type: string
 *                 description: The new password.
 *             example:
 *               oldPassword: password123
 *               newPassword: newpassword123
 *     responses:
 *       '200':
 *         description: The password was successfully changed.
 *       '403':
 *         description: The old password provided is incorrect.
 *         content:
 *           application/json:
 *             example:
 *               message: Old password is incorrect
 *       '500':
 *         description: An error occurred while changing the password.
 */
router.put('/changepassword' , changePassword)

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete.
 *     responses:
 *       '200':
 *         description: The user was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: number
 *                   description: Indicates if the deletion was successful (1) or not (0).
 *                 n:
 *                   type: number
 *                   description: The number of deleted documents.
 *                 deletedCount:
 *                   type: number
 *                   description: The number of deleted documents.
 *       '204':
 *         description: The user with the specified ID was not found.
 *         content:
 *           application/json:
 *             example:
 *               message: User ID {id} not found
 *       '400':
 *         description: User ID required.
 *         content:
 *           application/json:
 *             example:
 *               message: User ID required
 */
router.delete('/:id' , deleteUser)

module.exports = router