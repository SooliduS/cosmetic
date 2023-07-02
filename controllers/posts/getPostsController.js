const Post = require('../../models/postModel');
const User = require('../../models/userModel');
const filterPosts = require('../../lib/filterPosts');

const getAllPosts = async (req, res) => {
    const { limit, offset } = req.query;
    const { sort, filter } = filterPosts(req);
    try {
        const total = await Post.countDocuments();
        const posts = await Post.find(filter)
            .sort(sort)
            .skip(Number(offset))
            .limit(Number(limit));

        return res.status(200).json({ posts, total });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getSalesmanPosts = async (req, res) => {
    const { limit, offset } = req.query;
    const { sort, filter } = filterPosts(req);
    try {
        const foundUser = await User.findById(req._id);
        const userLevel = foundUser.level;

        const posts = await Post.find({
            ...filter,
            $or: [{ level: { $lt: userLevel } }, { level: { $exists: false } }],
        })
            .sort(sort)
            .skip(Number(offset))
            .limit(Number(limit));
        const total = await Post.find({
            $or: [{ level: { $lt: userLevel } }, { level: { $exists: false } }],
        });

        return res.status(200).json({ posts, total });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getSinglePost = async (req, res) => {
    const { slug } = req.params;

    try {
        const foundPost = await Post.findOne({ slug });
        if (!foundPost) return res.sendStatus(404);

        foundPost.views += 1;
        await foundPost.save();

        return res.status(200).json(foundPost);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};
module.exports = { getAllPosts, getSalesmanPosts, getSinglePost };
