const Post = require('../../models/postModel');

const addPost = async (req, res) => {
    const { title, content, tags, keyWords } = req.body;

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
        });

        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = { addPost };
