const router = require('express').Router()
const {getAllPosts} = require('../../controllers/posts/getPosts')

/**
 * @swagger
 * /getposts/all:
 *   get:
 *     summary: get all posts
 *     tags: [Posts]
 */
router.get('/all' , getAllPosts)

module.exports = router