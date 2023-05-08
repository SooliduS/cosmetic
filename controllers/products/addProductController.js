const Product = require('../../models/productModel');

const addProduct = async (req, res) => {
    const product = req.body;

    if (!product.name)
        return res.status(400).json({ message: 'product name requires' });
    // if(!product.categories) return res.status(400).json({message:'category requires'})

    try {
        const newProduct = await Product.create({
            ...req.body,
            comments: [],
            rating: 3.5,
            ordersCount: 0,
        });
        return res.status(201).json(newProduct);
    } catch (e) {
        return res.status(500).json(e.message);
    }
};

module.exports = { addProduct };
