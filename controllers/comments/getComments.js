const Comment = require('../../models/commentModel')
const filterComments = require('../../lib/filterComments')

const getAllComments = async (req ,res) => {
    const {filter} = filterComments(req)
    try{
        const allComments = await Comment.find().sort({createdAt:-1})

        return res.status()
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}