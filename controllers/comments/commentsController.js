const PostComment = require('../../models/postCommentModel')
const ProductComment = require('../../models/productCommentModel')


const confirmComments = async ( req , res ) => {

    const {ids} = req.body

    try{

        await Promise.all(ids.map(async id => {
            let foundComment = await ProductComment.findById(id)
            if(!foundComment) foundComment = await PostComment.findById(id)
            
            if(!foundComment) return
     
            foundComment.isConfirmed = true
    
            await foundComment.save()
        }))
       
        return res.sendStatus(200)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const deleteComments = async (req ,res) => {
    const {ids} = req.body

    try{
        const foundPostComments = await PostComment.deleteMany({_id:ids})
        const foundProductComments = await ProductComment.deleteMany({_id:ids})

        return res.sendStatus(200)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

module.exports = {confirmComments , deleteComments}