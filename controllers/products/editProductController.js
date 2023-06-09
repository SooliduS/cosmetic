const Product = require('../../models/productModel');

const editProduct = async (req, res) => {
    if (!req.params.slug)
        return res.status(400).json({ message: 'slug needed' });
    console.log(req.body);
    try {
        const foundProduct = await Product.findOne({slug:req.params.slug});
        if (!foundProduct)
            return res.status(404).json({ message: 'product not found' });

        const editableProperties = [
            'name',
            'slug',
            'category',
            'price',
            'discount',
            'isSuggested',
            'brand',
            'colors',
            'images',
            'shippingClasses',
            'tags',
            'details',
            'description',
            'inventory',
            'englishNmae',
            'brief'
        ];

        Object.keys
        Object.keys(req.body).map(async (key) => {
            if (!editableProperties.includes(key)) return;
            foundProduct[key] = req.body[key];
        });
        await foundProduct.save();

        return res.status(200).json(foundProduct)
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {editProduct}
