const Product = require('../../models/productModel');

const editProduct = async (req, res) => {
    if (!req.body.productId)
        return res.status(400).json({ message: 'productId needed' });

    try {
        const foundProduct = Product.findById(req.body.productId);
        if (!foundProduct)
            return res.status(404).json({ message: 'product not found' });

        const editableProperties = [
            'name',
            'slug',
            'categories',
            'price',
            'isAmazingOffer',
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
        ];

        Object(req.body).keys.map(async (key) => {
            if (!editableProperties.includes(key)) return;
            foundProduct[key] = req.body[key];
        });
        await foundProduct.save();

        return res.status(200).json(foundProduct)
    } catch (e) {
        return res.sendStatus(500)
    }
};

module.exports = {editProduct}
