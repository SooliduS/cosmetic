const PostComment = require('../../models/postCommentModel');
const ProductComment = require('../../models/productCommentModel');
const filterComments = require('../../lib/filterComments');

const getPostComments = async (req, res) => {
    const { postId } = req.params;
    const { limit, offset } = req.query;
    try {
        const comments = await PostComment.find({
            post: postId,
            isConfirmed: true,
        })
            .skip(Number(offset))
            .limit(Number(limit));

        res.status(200).json(comments);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getProductComments = async (req, res) => {
    const { productId } = req.params;
    const { limit, offset } = req.query;

    try {
        const total = await ProductComment.countDocuments({
            product: productId,
            isConfirmed: true,
        });
        const comments = await ProductComment.find({
            product: productId,
            isConfirmed: true,
        })
            .skip(Number(offset))
            .limit(Number(limit));

        res.status(200).json({ comments, total });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getAllPostComments = async(req ,res) =>{
    const { limit, offset } = req.query;
    const {filter} = filterComments(req)

    try{
        const total = await PostComment.countDocuments(filter)
        const comments = await PostComment.find(filter).skip(Number(offset)).limit(Number(limit))
    
        return res.status(200).json({comments , total})
    }catch(e){
        return res.status(500).json({message:e.message})
    }

}

const getAllProductComments = async(req ,res) =>{
    const { limit, offset } = req.query;
    const {filter} = filterComments(req)

    try{
        const total = await ProductComment.countDocuments(filter)
        const comments = await ProductComment.find(filter).skip(Number(offset)).limit(Number(limit))
    
        return res.status(200).json({comments , total})
    }catch(e){
        return res.status(500).json({message:e.message})
    }

}

module.exports = { getAllPostComments, getAllProductComments , getPostComments, getProductComments };
