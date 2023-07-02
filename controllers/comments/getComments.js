const PostComment = require('../../models/postCommentModelcommentModel')
const ProductComment = require('../../models/productCommentModel')
const filterComments = require('../../lib/filterComments')

const getAllComments = async (req ,res) => {
    const {filter} = filterComments(req)
    try{
        const allComments = await Comment.find(filter).sort({createdAt:-1})

        return res.status(200).json(allComments)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const getPostComments = async ( req ,res) => {
    const {postId} = req.params
    try{
        const comments = await Comment.find({post:postId , isConfirmed:true})

        res.status(200).json(comments)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const getProductComments = async(req ,res) => {
    const {productId} = req.params
    try{
        const comments = await Comment.find({product:productId ,isConfirmed:true})

        res.status(200).json(comments)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}


module.exports = {getAllComments , getPostComments , getProductComments}