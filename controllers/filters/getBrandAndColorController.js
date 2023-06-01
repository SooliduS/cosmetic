const Product = require('../../models/productModel')
const filterProducts = require('../../lib/filterProducts')

const getBrandsAndColors = async (req ,res) => {

    const { filter } = filterProducts(req)

    try{
        const colors = await Product.distinct('colors.name' , filter)
        const brands = await Product.distinct('brand' , filter)

        return res.status(200).json({colors , brands})
    }catch(e){
        return res.status(500).json({ message: e.message });
    }

}

module.exports = {getBrandsAndColors}