const router = require('express').Router();
const verifyAdmin = require('../../middlewares/verifyAdmin')
const verifyJWT = require('../../middlewares/verifyJWT')
const {
    addBodyBanner,
    editBodyBanner,
    deleteBodyBanners,
    getAllBodyBanners,
    getRandomBodyBanners,
} = require('../../controllers/banners/bodyBannersController');

/**
 * @swagger
 * paths:
 *   /bodybanners/addbanner:
 *     post:
 *       summary: Add Body Banner
 *       description: Add a new body banner with the specified items and expiration date.
 *       tags: [BodyBanners]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         description: The URL associated with the body banner item.
 *                       image:
 *                         type: string
 *                         description: The image URL of the body banner item.
 *                       title:
 *                         type: string
 *                         description: The title of the body banner item.
 *                 expirationDate:
 *                   type: string
 *                   format: date
 *                   description: The expiration date of the body banner.
 *       responses:
 *         '200':
 *           description: OK
 *         '400':
 *           description: Bad Request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: The error message for missing required fields.
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/addbanner' ,verifyJWT , verifyAdmin , addBodyBanner )

/**
 * @swagger
 * paths:
 *   /bodybanners/editbanner:
 *     put:
 *       summary: Edit Body Banner
 *       description: Update the specified body banner with new items and expiration date.
 *       tags:
 *         - BodyBanners
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the body banner to edit.
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         description: The updated URL associated with the body banner item.
 *                       image:
 *                         type: string
 *                         description: The updated image URL of the body banner item.
 *                       title:
 *                         type: string
 *                         description: The updated title of the body banner item.
 *                 expirationDate:
 *                   type: string
 *                   format: date
 *                   description: The updated expiration date of the body banner.
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/BodyBanner'
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/editbanner' , verifyJWT , verifyAdmin , editBodyBanner)

/**
 * @swagger
 * paths:
 *   /bodybanners/deletebanners:
 *     delete:
 *       summary: Delete Body Banners
 *       description: Delete multiple body banners based on their IDs.
 *       tags:
 *         - BodyBanners
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ids:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: An array of body banner IDs to delete.
 *       responses:
 *         '200':
 *           description: OK
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/deletebanners' , verifyJWT , verifyAdmin , deleteBodyBanners)

/**
 * @swagger
 * paths:
 *   /bodybanners/getall:
 *     get:
 *       summary: Get All Body Banners
 *       description: Retrieve all body banners with pagination support.
 *       tags:
 *         - BodyBanners
 *       parameters:
 *         - in: query
 *           name: limit
 *           schema:
 *             type: integer
 *           description: The maximum number of banners to retrieve.
 *         - in: query
 *           name: offset
 *           schema:
 *             type: integer
 *           description: The number of banners to skip.
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   banners:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/BodyBanner'
 *                     description: The list of body banners.
 *                   total:
 *                     type: integer
 *                     description: The total number of body banners.
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/getall' , verifyJWT , verifyAdmin , getAllBodyBanners)

/**
 * @swagger
 * paths:
 *   /bodybanners/getrandom:
 *     get:
 *       summary: Get Random Body Banners
 *       description: Retrieve a random selection of body banners.
 *       tags:
 *         - BodyBanners
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/BodyBanner'
 *                     description: The list of random body banners.
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/getrandom' , getRandomBodyBanners)

module.exports = router