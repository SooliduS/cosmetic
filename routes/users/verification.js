const router = require('express').Router()
const {sendVerificationEmail , verifyVerificationEmail} = require('../../controllers/verification/verifyEmail')

/**
 * @swagger
 * /verification/sendemail:
 *   get:
 *     summary: Send verification email
 *     description: Send a verification email to the user.
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating that the email has been sent successfully.
 *       204:
 *         description: Email already verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating that the email has already been verified.
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating that the user is not authenticated.
 *     security:
 *       - bearerAuth: []
 */
router.get('/sendemail' , sendVerificationEmail )

/**
 * @swagger
 * /verification/verifyemail:
 *   post:
 *     summary: Verify email
 *     description: Verify the user's email based on the verification code.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailVerificationNum:
 *                 type: string
 *                 description: The verification code received by the user via email.
 *     responses:
 *       200:
 *         description: Email successfully verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating that the email has been successfully verified.
 *       400:
 *         description: Email already verified or wrong verification code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating that the email has already been verified or the provided verification code is incorrect.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 *     security:
 *       - bearerAuth: []
 */
router.post('/verifyemail' , verifyVerificationEmail)

module.exports = router