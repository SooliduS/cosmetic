const Product = require('../../models/productModel');

const deleteProduct = async (req, res) => {
    if (!req.params.slug)
        return res.status(400).json({ message: 'slug needed' });

    try {
        const foundProduct = await Product.findOneAndDelete(req.params.slug);
        if(!foundProduct) return res.status(404).json({message:'product not found'})

        return res.status(202).json({message:'successfully deleted'})
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {deleteProduct}