const router = require('express').Router()
const { getAllUsers , getUser , updateUser , changePassword , deleteUser} = require('../../controllers/users/usersController')
const {becomeSalesman} = require ('../../controllers/users/salesmanRequst')
const {getProfile} = require('../../controllers/users/getProfile')
const verifyAdmin = require('../../middlewares/verifyAdmin')

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get all users (admin only)
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
router.get('/all' ,  getAllUsers )//verifyAdmin

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID (admin only)
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
router.get('/:id' , getUser)//verifyAdmin

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
 *                 type: object
 *                 description: The new address.
 *                 properties:
 *                   city: string
 *                   state: string
 *                   postalCode: string
 *                   details: string
 *                   phoneNumber: string
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
 *               bankShabaNumber:
 *                 type: string
 *                 description: shomare hesabe banki
 *               bankCardNumber:
 *                 type: string
 *                 description: shomare karte banki
 *             example:
 *               username: johnsmith
 *               address: {city: 'tehren' , state: 'tehran' , phoneNumber: '09124083425' , details: 'tehranpars khiabane rashid' , postalCode: '1651955487'}
 *               instagram: johnsmith23
 *               socialMedias:
 *                 - twitter: johnsmith
 *                 - facebook: johnsmith
 *               firstname: John
 *               lastname: Smith
 *               melliCode: '1234567890'
 *               bankShabaNumber: 'IR570170000000201761599000'
 *               bankCardNumber: '6037997398091877'
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

//deleteuser
// /**
//  * @swagger
//  * /users/{id}:
//  *   delete:
//  *     summary: Delete a user
//  *     tags:
//  *       - Users
//  *       - Admin
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The ID of the user to delete.
//  *     responses:
//  *       '200':
//  *         description: The user was successfully deleted.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 ok:
//  *                   type: number
//  *                   description: Indicates if the deletion was successful (1) or not (0).
//  *                 n:
//  *                   type: number
//  *                   description: The number of deleted documents.
//  *                 deletedCount:
//  *                   type: number
//  *                   description: The number of deleted documents.
//  *       '204':
//  *         description: The user with the specified ID was not found.
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: User ID {id} not found
//  *       '400':
//  *         description: User ID required.
//  *         content:
//  *           application/json:
//  *             example:
//  *               message: User ID required
//  */
// router.delete('/:id' , deleteUser)//verifyAdmin

/**
 * @swagger
 * /users/salesmanrequest:
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
 *                   state: 
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *               mobileNumber:
 *                 type: string
 *               melliCardImg:
 *                 type: string
 *               bankCardNumber:
 *                 type: string
 *               bankShabaNumber:
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
router.post('/salesmanrequest' , becomeSalesman)

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: The username of the user.
 *                 firstname:
 *                   type: string
 *                   description: The first name of the user.
 *                 lastname:
 *                   type: string
 *                   description: The last name of the user.
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The roles assigned to the user.
 *                 email:
 *                   type: string
 *                   description: The email address of the user.
 *                 accounNumber:
 *                   type: string
 *                   description: The account number of the user.
 *                 isEmailConfirmed:
 *                   type: boolean
 *                   description: Indicates if the user's email is confirmed.
 *                 phoneNumber:
 *                   type: string
 *                   description: The phone number of the user.
 *                 mobileNumber:
 *                   type: string
 *                   description: The mobile number of the user.
 *                 isMobileNumberConfirmed:
 *                   type: boolean
 *                   description: Indicates if the user's mobile number is confirmed.
 *                 address:
 *                   type: object
 *                   description: The address of the user.
 *                 melliCode:
 *                   type: string
 *                   description: The national identification number of the user.
 *                 isMelliCardConfimed:
 *                   type: boolean
 *                   description: Indicates if the user's national identification card is confirmed.
 *                 verified:
 *                   type: boolean
 *                   description: Indicates if the user is verified.
 *                 active:
 *                   type: boolean
 *                   description: Indicates if the user is active.
 *                 instagram:
 *                   type: string
 *                   description: The Instagram handle of the user.
 *                 socialMedias:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The social media handles of the user.
 *                 level:
 *                   type: number
 *                   description: The level of the user.
 *                 superior:
 *                   type: string
 *                   description: The account number of the user's superior.
 *                 productsForSale:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The products for sale by the user.
 *                 commissionPercentage:
 *                   type: number
 *                   description: The commission percentage of the user.
 *                 wallet:
 *                   $ref: '#/components/schemas/Wallet'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               message: User not found.
 *       '500':
 *         description: An error occurred while retrieving the user profile.
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while retrieving the user profile.
 */
router.get('/profile' , getProfile)

module.exports = router