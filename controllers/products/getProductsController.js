const Product = require('../../models/productModel');
const filterProducts = require('../../lib/filterProducts');

const getAllProducts = async (req, res) => {
    let { offset, limit } = req.query;
    const params = filterProducts(req);

    if (!offset) offset = 0;

    try {
        const result = await Product.aggregate([
            { $match: params.filter }, // Apply the filter
            {
                $group: {
                    _id: null,
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                },
            },
            {
                $project: {
                    _id: 0,
                    minPrice: 1,
                    maxPrice: 1,
                },
            },
        ])
            .sort(params.sort)
            .skip(offset)
            .limit(limit);

        const colors = await Product.distinct('colors.name', params.filter);
        const brands = await Product.distinct('brand', params.filter);

        if (result.length > 0) {
            const { minPrice, maxPrice } = result[0];
            console.log('Price Range:');
            console.log('Minimum Price:', minPrice);
            console.log('Maximum Price:', maxPrice);
        } else {
            console.log('No products found for the given filter.');
        }
        const products = await Product.find(params.filter)
            .sort(params.sort)
            .skip(offset)
            .limit(limit);

        const total = await Product.countDocuments(params.filter);

        return res
            .status(200)
            .json({ products, total, priceRange: result, colors, brands });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getAmazingOfferProducts = async (req, res) => {
    const { offset, limit } = req.query;
    const params = filterProducts(req);

    try {
        const products = await Product.find({
            isAmazingOffer: true,
            discount: { $gte: 1 },
            ...params.filter,
        })
            .sort(params.sort)
            .skip(offset)
            .limit(limit);

        const total = await Product.countDocuments({
            isAmazingOffer: true,
            discount: { $gte: 1 },
            ...params.filter,
        });

        return res.status(200).json({ products, total });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getNewestProducts = async (req, res) => {
    const { offset, limit } = req.query;
    const params = filterProducts(req);

    try {
        const products = await Product.find(params.filter)
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit);

        const total = await Product.find(params.filter);

        return res.status(200).json({ products, total });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getMostSalesProducts = async (req, res) => {
    const { offset, limit } = req.query;
    const params = filterProducts(req);

    try {
        const products = await Product.find({ ordersCount: { $gt: 1 } })
            .sort({ ordersCount: -1 })
            .skip(offset)
            .limit(limit);

        const total = await Product.countDocuments({ ordersCount: { $gt: 1 } });

        return res.status(200).json({ products, total });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getProduct = async (req, res) => {
    const slug = req.params.slug;

    if (!slug) return res.status(400).json({ message: 'produc slug needed' });

    try {
        const product = await Product.findOne({ slug });

        return res.status(200).json(product);
    } catch (e) {
        return res.sendStatus(500);
    }
};

module.exports = {
    getAllProducts,
    getAmazingOfferProducts,
    getNewestProducts,
    getMostSalesProducts,
    getProduct,
};
