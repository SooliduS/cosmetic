const router = require('express').Router()
const {addPost , editPost , deletePost} = require('../../controllers/posts/addPostController')

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
 *               slug:
 *                 type: string
 *                 description: slug of the post
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
 *               slug: post-slug
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

/**
 * @swagger
 * /post/edit/{slug}:
 *   put:
 *     tags:
 *       - Post
 *       - Admin
 *     summary: Edit a post
 *     description: Edit an existing post by its slug.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the post to edit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostEditRequest'
 *     responses:
 *       200:
 *         description: Successfully edited the post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
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
 *       404:
 *         description: Post not found
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
router.put('/edit/:slug' , editPost )

/**
 * @swagger
 * /post/delete/{slug}:
 *   delete:
 *     summary: Delete a post
 *     description: Delete an existing post by its slug.
 *     tags: [Admin , Post]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the post to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted the post
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
 *       404:
 *         description: Post not found
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
router.delete('/delete/:slug' , deletePost)

module.exports = addPost