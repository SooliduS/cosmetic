const router = require('express').Router()
const {getAllPosts , getSalesmanPosts , getSinglePost} = require('../../controllers/posts/getPostsController')
const verifyAdmin = require('../../middlewares/verifyAdmin')

/**
 * @swagger
 * /getposts/all:
 *   get:
 *     summary: get all posts (admin only)
 *     tags: [getPosts]    
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: string
 *       - name: offset
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Internal server error
 */
router.get('/all' , verifyAdmin , getAllPosts)

/**
 * @swagger
 * /getposts/salesman:
 *   get:
 *     summary: get posts that are accessable to salesman
 *     tags: [getPosts]    
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema:
 *           type: string
 *       - name: offset
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Internal server error
 */
router.get('/salesman' , getSalesmanPosts)

/**
 * @swagger
 * /posts/single/{slug}:
 *   get:
 *     summary: Get a single post
 *     description: Get a single post by its slug.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the post to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
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
router.get('/single/:slug' , getSinglePost)



module.exports = router