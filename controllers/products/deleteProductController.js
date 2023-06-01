const Product = require('../../models/productModel');

const deleteProduct = async (req, res) => {
    if (!req.body.productId)
        return res.status(400).json({ message: 'product id needed' });

    try {
        const foundProduct = await Product.findByIdAndDelete(req.body.productId);
        if(!foundProduct) return res.status(404).json({message:'product not found'})

        return res.status(202).json({message:'successfully deleted'})
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {deleteProduct}