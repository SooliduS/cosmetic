const Post = require('../../models/postModel');

const addPost = async (req, res) => {
    const { title, content, tags, keyWords, level, slug } = req.body;

    if (!title || !content)
        return res
            .status(400)
            .json({ message: 'Content and title are required.' });

    try {
        const post = await Post.create({
            ...req.body,
            authorId: req._id,
            views:0,
            comments:[]
        });

        res.status(201).json(post);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const editPost = async(req ,res) => {
    const s = req.params.slug
    if(!s) return res.status(400).json({message:'slug needed'})

    const {title , content ,  tags , keywords , level , slug} = req.body
    try{
        const foundPost = await Post.findOne({s})
        if(!foundPost) return res.sendStatus(404)

        if(title) foundPost.title = title
        if(content) foundPost.content = content
        if(tags) foundPost.tags = tags
        if(keywords) foundPost.keyWords = keywords
        if(level) foundPost.level= level
        if(slug) foundPost.slug = slug

        await foundPost.save()

        return res.status(200).json(foundPost)

    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const deletePost = async (req , res) => {
    const {slug} = req.params
    if(!slug) return res.status(400).json({message:'slug needed'})

    try{
        const foundPost = await Post.findOneAndDelete({slug})
        if(!foundPost) return res.sendStatus(404)

        return res.sendStatus(200)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

module.exports = { addPost , editPost , deletePost};
