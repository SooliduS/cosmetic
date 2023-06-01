const router = require('express').Router()
const {getAllPosts} = require('../../controllers/posts/getPostsController')

/**
 * @swagger
 * /getposts/all:
 *   get:
 *     summary: get all posts
 *     tags: [getPosts]
 */
router.get('/all' , getAllPosts)

module.exports = router