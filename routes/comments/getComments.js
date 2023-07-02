const router = require('express').Router()
const {getPostComments , getProductComments , getAllPostComments , getAllProductComments } = require('../../controllers/comments/getCommentsController')
const verifyAdmin = require('../../middlewares/verifyAdmin')
const verifyJWT = require('../../middlewares/verifyJWT')

/**
 * @swagger
 * paths:
 *   /getcomments/post/all:
 *     get:
 *       summary: Get All Post Comments (admin only)
 *       description: Retrieve all comments for posts.
 *       tags: [getComments]
 *       parameters:
 *         - in: query
 *           name: limit
 *           schema:
 *             type: integer
 *           description: The maximum number of comments to retrieve.
 *         - in: query
 *           name: offset
 *           schema:
 *             type: integer
 *           description: The number of comments to skip before retrieving.
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   comments:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/PostComment'
 *                   total:
 *                     type: integer
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/post/all' , verifyJWT, verifyAdmin , getAllPostComments)

/**
 * @swagger
 * paths:
 *   /getcomments/product/all:
 *     get:
 *       summary: Get All Product Comments (admin only)
 *       description: Retrieve all comments for products.
 *       tags: [getComments]
 *       parameters:
 *         - in: query
 *           name: limit
 *           schema:
 *             type: integer
 *           description: The maximum number of comments to retrieve.
 *         - in: query
 *           name: offset
 *           schema:
 *             type: integer
 *           description: The number of comments to skip before retrieving.
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   comments:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/ProductComment'
 *                   total:
 *                     type: integer
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/product/all' , verifyJWT, verifyAdmin , getAllProductComments)

/**
 * @swagger
 * paths:
 *   /getcomments/post/{postId}:
 *     get:
 *       summary: Get Post Comments
 *       description: Retrieve comments for a specific post.
 *       tags: [getComments]
 *       parameters:
 *         - in: path
 *           name: postId
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the post to retrieve comments for.
 *         - in: query
 *           name: limit
 *           schema:
 *             type: integer
 *           description: The maximum number of comments to retrieve.
 *         - in: query
 *           name: offset
 *           schema:
 *             type: integer
 *           description: The number of comments to skip before retrieving.
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/PostComment'
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/post/:postId' , getPostComments)

/**
 * @swagger
 * paths:
 *   /getcomments/product/{productId}:
 *     get:
 *       summary: Get Product Comments
 *       description: Retrieve comments for a specific product.
 *       tags: [getComments]
 *       parameters:
 *         - in: path
 *           name: productId
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the product to retrieve comments for.
 *         - in: query
 *           name: limit
 *           schema:
 *             type: integer
 *           description: The maximum number of comments to retrieve.
 *         - in: query
 *           name: offset
 *           schema:
 *             type: integer
 *           description: The number of comments to skip before retrieving.
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   comments:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/ProductComment'
 *                   total:
 *                     type: integer
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/product/:productId' , getProductComments)

module.exports = router