const router = require('express').Router()
const {getAllPosts , getSalesmanPosts} = require('../../controllers/posts/getPostsController')
const verifyAdmin = require('../../middlewares/verifyAdmin')

/**
 * @swagger
 * /getposts/all:
 *   get:
 *     summary: get all posts
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
 * /getposts/all:
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

module.exports = router