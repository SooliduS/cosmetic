const Category = require('../../models/categoryModel')

const getAllCategories = async (req , res) => {

    try{
        const categories = await Category.find()

        return res.status(200).json(categories)
    }catch(e){
        return res.sendStatus(500)
    }
}

module.exports = {getAllCategories}