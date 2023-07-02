const router = require('express').Router()
const {getAllComments , getPostComments , getProductComments} = require('../../controllers/comments/getComments')
const verifyAdmin = require('../../middlewares/verifyAdmin')

router.get('/all' , verifyAdmin , getAllComments)

router.get('/post/:postId' , getPostComments)

router.get('/product/:productId' , getProductComments)

module.exports = router