const Product = require('../../models/productModel');
const filterProducts = require('../../lib/filterProducts');
const User = require('../../models/userModel');

const getAllProducts = async (req, res) => {
    let { offset, limit } = req.query;
    const params = filterProducts(req);

    if (!offset) offset = 0;

    try {

        const colors = await Product.distinct('colors.name', params.filter);
        const brands = await Product.distinct('brand', params.filter);


        const products = await Product.find(params.filter)
            .sort(params.sort)
            .skip(offset)
            .limit(limit);

            if(products.length < 1) return res.sendStatus(204)

            const sortedProducts = products.sort((a , b)=> a.price - b.price)
            const minPrice = sortedProducts[0].price
            const maxPrice = sortedProducts[sortedProducts.length-1].price
            const priceRange = [minPrice , maxPrice]

            if (sortedProducts.length > 0) {
                console.log('Price Range:');
                console.log('Minimum Price:', minPrice);
                console.log('Maximum Price:', maxPrice);
            } else {
                console.log('No products found for the given filter.');
            }
        const total = await Product.countDocuments(params.filter);

        return res
            .status(200)
            .json({ products, total, priceRange, colors, brands });
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
        })
            .sort(params.sort)
            .skip(offset)
            .limit(limit);

        const total = await Product.countDocuments({
            isAmazingOffer: true,
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

const getListOfProducts = async (req, res) => {
    const items = req.body.items;

    try {
        const total = items.length;
        const foundItems = await Promise.all(
            items.map(async (item) => {
                const foundProduct = await Product.findOne({ slug: item.slug });
                if (!foundProduct) throw new Error('product not found');
                const price = foundProduct.price * item.quantity;
                const discountedPrice =
                    price -
                    (foundProduct.discount / 100) * price * item.quantity;
                const discount =
                    (foundProduct.discount / 100) * price * item.quantity;
                return {
                    product: foundProduct,
                    price,
                    discountedPrice,
                    discount,
                };
            })
        );

        let priceSum = 0;
        let discountedPriceSum = 0;
        let discountSum = 0;

        foundItems.map((item) => {
            priceSum += item.price;
            discountSum += item.discount;
            discountedPriceSum += item.discountedPrice;
        });

        return res
            .status(200)
            .json({
                items: foundItems,
                priceSum,
                discountSum,
                discountedPriceSum,
                total,
            });
    } catch (e) {
        if (e.message === 'product not found')
            return res.status(404).json({ message: e.message });
        return res.status(500).json({ message: e.message });
    }
};

const getSalesmanProducts = async (req, res) => {
    let { offset, limit } = req.query;
    const params = filterProducts(req);

    try {
        const foundUser = await User.findById(req._id);

        const total = await Product.countDocuments({
            level: { $lte: foundUser.level },
            ...params.filter,
        });
        const products = await Product.find({
            level: { $lte: foundUser.level },
            ...params.filter,
        })
            .skip(Number(offset))
            .limit(Number(limit));

        res.status(200).json({products , total});
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getSimilarProducts = async (req, res) => {
    let { offset, limit } = req.query;
    const params = filterProducts(req);
    const { slug } = req.params;

    try {
        const foundProduct = await Product.findOne({ slug });
        if (!foundProduct)
            return res.status(404).json({ message: 'product not found' });
        if (!foundProduct.tags) return res.status(204).json([]);
        const products = await Product.find({
            tags: { $in: foundProduct.tags },
            _id: { $ne: foundProduct._id },
            ...params.filter,
        })
            .skip(Number(offset))
            .limit(Number(limit));

        res.status(200).json(products);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {
    getAllProducts,
    getAmazingOfferProducts,
    getNewestProducts,
    getMostSalesProducts,
    getProduct,
    getListOfProducts,
    getSalesmanProducts,
    getSimilarProducts,
};
