const ProductComment = require('../../models/productCommentModel');
const PostComment = require('../../models/postCommentModel')
const Product = require('../../models/productModel');
const Order = require('../../models/orderModel');

const addProductComment = async (req, res) => {
    const { comment, rate, product, parentId } = req.body;

    try {
        let role = 'user';
        const roles = req.roles;
        if (roles.includes(1344) || roles.includes(1346)) role = 'admin';

        const isBought = await Order.countDocuments({
            buyer: req._id,
            product,
        });
        if (isBought) role = 'buyer';

        const newComment = await ProductComment.create({
            comment,
            product,
            author: {
                id: req._id,
                name: req.username,
                role,
            },
            parentId,
            rate,
            isConfirmed:role === 'admin' ? true : false
        });
        res.status(201).json(newComment);

        const foundProduct = await Product.findById(product);
        const allRates = await Comment.distinct('rate', {
            product,
            rate: { $exists: true, $ne: null },
        });
        const length = allRates.length;
        foundProduct.rating = length
            ? ((foundProduct.rating * (length - 1)) + rate) / length
            : rate;
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const addPostComment = async (req ,res) => {
    const { comment, rate, post, parentId } = req.body;

    try{
        let role = 'user';
        const roles = req.roles;
        if (roles.includes(1344) || roles.includes(1346)) role = 'admin';
        
        const newComment = await PostComment.create({
            comment,
            post,
            author: {
                id: req._id,
                name: req.username,
                role,
            },
            parentId,
            rate,
            isConfirmed:role === 'admin' ? true : false
        });
        res.status(201).json(newComment);
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}



module.exports = {addProductComment , addPostComment}