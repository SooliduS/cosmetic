const router = require('express').Router()
const {addPost} = require('../../controllers/posts/addPostController')

/**
 * @swagger
 * /post/create:
 *   post:
 *     summary: Create a new post (admin only)
 *     tags:
 *       - Post
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Post data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post.
 *               content:
 *                 type: string
 *                 description: The content of the post.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The tags associated with the post.
 *               keyWords:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The keywords associated with the post.
 *               level:
 *                 type: number
 *                 description: level of post that can be visible by salesman
 *             example:
 *               title: New Post
 *               content: This is a new post.
 *               tags:
 *                 - tag1
 *                 - tag2
 *               keyWords:
 *                 - keyword1
 *                 - keyword2
 *               level: 0
 *     responses:
 *       '201':
 *         description: The post was created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Content and title are required.
 *         content:
 *           application/json:
 *             example:
 *               message: Content and title are required.
 *       '500':
 *         description: An error occurred while creating the post.
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while creating the post.
 */
router.post('/create' , addPost)

module.exports = addPost