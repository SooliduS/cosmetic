const router = require('express').Router()
const {addPostComment , addProductComment} = require('../../controllers/comments/addCommentController')
const {confirmComments , deleteComments} = require('../../controllers/comments/commentsController')

/**
 * @swagger
 * paths:
 *   /comments/post/create:
 *     post:
 *       summary: Add Post Comment
 *       description: Add a new comment for a post.
 *       tags: [comments]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: string
 *                   description: The content of the comment.
 *                 rate:
 *                   type: number
 *                   description: The rating given to the post.
 *                 post:
 *                   type: string
 *                   description: The ID of the post the comment is associated with.
 *                 parentId:
 *                   type: string
 *                   description: The ID of the parent comment, if applicable.
 *               required:
 *                 - comment
 *                 - rate
 *                 - post
 *       responses:
 *         '201':
 *           description: Created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/PostComment'
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/post/create' , addPostComment)

/**
 * @swagger
 * paths:
 *   /comment/product/create:
 *     post:
 *       summary: Add Product Comment
 *       description: Add a new comment for a product.
 *       tags: [comments]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: string
 *                   description: The content of the comment.
 *                 rate:
 *                   type: number
 *                   description: The rating given to the product.
 *                 product:
 *                   type: string
 *                   description: The ID of the product the comment is associated with.
 *                 parentId:
 *                   type: string
 *                   description: The ID of the parent comment, if applicable.
 *               required:
 *                 - comment
 *                 - rate
 *                 - product
 *       responses:
 *         '201':
 *           description: Created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ProductComment'
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/product/create' , addProductComment)

/**
 * @swagger
 * paths:
 *   /comments/confirm:
 *     put:
 *       summary: Confirm Comments (admin only)
 *       description: Confirm multiple comments by their IDs.
 *       tags: [comments]
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
 *                   description: An array of comment IDs to be confirmed.
 *               required:
 *                 - ids
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
router.put('/confirm' , confirmComments)

/**
 * @swagger
 * paths:
 *   /comments/delete:
 *     delete:
 *       summary: Delete Comments (admin only)
 *       description: Delete multiple comments by their IDs.
 *       tags: [comments]
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
 *                   description: An array of comment IDs to be deleted.
 *               required:
 *                 - ids
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
router.delete('/delete' , deleteComments)

module.exports = router