const Product = require('../../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getAmazingOfferProducts = async (req, res) => {
    try {
        const products = await Product.find({
            isAmazingOffer: true,
            discount: { $gt: 5 },
        });

        return res.status(200).json(products);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getNewestProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).limit(20);

        return res.status(200).json(products);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getMostSalesProducts = async (req, res) => {
    try {
        const products = await Product.find({ ordersCount: { $gt: 1 } })
            .sort({ ordersCount: -1 })
            .limit(20);

        return res.status(200).json(products);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getProduct = async (req, res) => {
    const productId =
        req.params.productId || req.params.product_id || req.params.id;

    if (!productId)
        return res.status(400).json({ message: 'product id needed' });

    try {
        const product = await Product.findById(productId);

        return res.status(200).json(product);
    } catch (e) {
        return res.sendStatus(500)
    }
};

module.exports = {
    getAllProducts,
    getAmazingOfferProducts,
    getNewestProducts,
    getMostSalesProducts,
    getProduct,
};
