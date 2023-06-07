const Post = require('../../models/postModel');

const addPost = async (req, res) => {
    const { title, content, tags, keyWords , level } = req.body;

    if (!title || !content)
        return res
            .status(400)
            .json({ message: 'Content and title are required.' });

    try {
        const post = await Post.create({
            title,
            content,
            tags,
            keyWords,
            level,
            authorId:req._id
        });

        res.status(201).json(post);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = { addPost };
