const Product = require('../../models/productModel')

const addToAmaizingOffer = async (req , res) => {
    const { slugs , expirationDate } = req.body

    try{
        await Promise.all(slugs.map(async slug =>{
            const foundProduct = await Product.findOne({slug})
            if(!foundProduct) return
            foundProduct.isAmazingOffer = true
            foundProduct.expirationDate = expirationDate
            await foundProduct.save()
        }))
        return res.sendStatus(200)    
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

module.exports = {addToAmaizingOffer}