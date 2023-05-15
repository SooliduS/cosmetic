const Product = require('../../models/productModel');
const filterProducts = require('../../lib/filterProducts')

const getAllProducts = async (req, res) => {

    let {offset , limit} = req.query
    const params = filterProducts(req)

    if (!offset) offset = 0

    try {
        const products = await Product.find(params.filter).sort(params.sort).skip((offset)).limit(limit)
        return res.status(200).json(products);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getAmazingOfferProducts = async (req, res) => {

    const {offset , limit} = req.query
    const params = filterProducts(req)

    try {
        const products = await Product.find({
            isAmazingOffer: true,
            discount: { $gte: 1 },
            ...params.filter
        }).sort(params.sort).skip(offset).limit(limit)

        return res.status(200).json(products);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getNewestProducts = async (req, res) => {

    const {offset , limit} = req.query
    const params = filterProducts(req)

    try {
        const products = await Product.find(params.filter).sort({ createdAt: -1 }).skip(offset).limit(limit);

        return res.status(200).json(products);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getMostSalesProducts = async (req, res) => {

    const {offset , limit} = req.query
    const params = filterProducts(req)

    try {
        const products = await Product.find({ ordersCount: { $gt: 1 } })
            .sort({ ordersCount: -1 })
            .skip(offset)
            .limit(limit);

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
