const Product = require('../../models/productModel')

const getBrandsAndColors = async (req ,res) => {

    if(!req.params.categoryId) return res.status(400).json({message:'category id needed'})

    try{
        const brands = await Product.find({}).distinct('color.name')
    }catch(e){
        return res.sendStatus(500)
    }

}