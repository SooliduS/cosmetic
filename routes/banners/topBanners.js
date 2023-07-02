const router = require('express').Router();
const verifyAdmin = require('../../middlewares/verifyAdmin')
const verifyJWT = require('../../middlewares/verifyJWT')
const {
    addTopBanner,
    deleteTopBanners,
    editTopBanners,
    getTopBanners,
} = require('../../controllers/banners/topBannerController');

/**
 * @swagger
 * /topbanners/addbanner:
 *   post:
 *     summary: Add a top banner
 *     description: Add a new top banner to the website.
 *     tags: [TopBanners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: The image URL for the banner.
 *               url:
 *                 type: string
 *                 description: The URL associated with the banner.
 *               sortOrder:
 *                 type: integer
 *                 description: The sort order of the banner.
 *               expirationDate:
 *                 type: string
 *                 format: date
 *                 description: The expiration date of the banner.
 *             required:
 *               - image
 *               - url
 *               - expirationDate
 *     responses:
 *       201:
 *         description: Successfully added the top banner
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for the invalid request.
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
router.post('/addbanner' , verifyJWT , verifyAdmin , addTopBanner)

/**
 * @swagger
 * /topbanners/deletebanners:
 *   delete:
 *     summary: Delete top banners
 *     description: Delete existing top banners from the website.
 *     tags: [TopBanners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *               description: The ID of the top banner to be deleted.
 *     responses:
 *       200:
 *         description: Successfully deleted the top banners
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
router.delete('/deletebanners' ,verifyJWT , verifyAdmin , deleteTopBanners)

/**
 * @swagger
 * /topbanners/editbanner:
 *   put:
 *     summary: Edit top banners
 *     description: Edit existing top banners on the website.
 *     tags: [TopBanners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the top banner to be edited.
 *                 image:
 *                   type: string
 *                   description: The updated image URL for the banner.
 *                 url:
 *                   type: string
 *                   description: The updated URL associated with the banner.
 *                 sortOrder:
 *                   type: integer
 *                   description: The updated sort order of the banner.
 *                 expirationDate:
 *                   type: string
 *                   format: date
 *                   description: The updated expiration date of the banner.
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Successfully edited the top banners
 *       404:
 *         description: Top banner not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the top banner was not found.
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
router.put('/editbanners' , verifyJWT , verifyAdmin , editTopBanners)

/**
 * @swagger
 * paths:
 *   /topbanners/getall:
 *     get:
 *       summary: Get Top Banners
 *       description: Retrieve the top banners in descending order of their sortOrder
 *       tags: [TopBanners]
 *       parameters:
 *         - in: query
 *           name: offset
 *           schema:
 *             type: integer
 *           description: The number of records to skip (for pagination)
 *         - in: query
 *           name: limit
 *           schema:
 *             type: integer
 *           description: The maximum number of records to return (for pagination)
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/TopBanner'
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *
 * components:
 *   schemas:
 *     TopBanner:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the top banner.
 *         image:
 *           type: string
 *           description: The image URL of the top banner.
 *         url:
 *           type: string
 *           description: The URL associated with the top banner.
 *         sortOrder:
 *           type: number
 *           description: The sort order of the top banner.
 *         expirationDate:
 *           type: string
 *           format: date
 *           description: The expiration date of the top banner.
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: The error message.
 */
router.get('/getall' , getTopBanners)

module.exports = router