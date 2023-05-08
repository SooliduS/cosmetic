const Post = require('../../models/postsModel');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createAt: -1 }).limit(10);

        return res.status(200).json({ message: e.message });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {getAllPosts}