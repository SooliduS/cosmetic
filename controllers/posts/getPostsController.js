const Post = require('../../models/postModel');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createAt: -1 }).limit(10);

        return res.status(200).json(posts);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {getAllPosts}