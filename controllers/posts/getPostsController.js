const Post = require('../../models/postModel');

const getAllPosts = async (req, res) => {

    const {limit , offset} = req.query
    try {
        const posts = await Post.find().sort({ createAt: -1 }).skip(Number(offset)).limit(Number(limit));

        return res.status(200).json(posts);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {getAllPosts}