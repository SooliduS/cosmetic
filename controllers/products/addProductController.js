const Product = require('../../models/productModel');

const addProduct = async (req, res) => {
    console.log(req.body);
    if (!req.body.name)
        return res.status(400).json({ message: 'product name requires' });
    // if(!product.categories) return res.status(400).json({message:'category requires'})

    const {
        name,
        slug,
        categories,
        price,
        brand,
        colors,
        images,
        tags,
        description,
        inventory,
        level,
        details
    } = req.body;
    // categories:array colors:{rgb:string , hex:string , name:string} , images:array of string , tags:array of string, inventory:number

    try {
        const newProduct = await Product.create({
            name,
            slug,
            categories: categories || [],
            price,
            brand,
            colors: colors || [],
            images: images || [],
            tags: tags || [],
            description,
            inventory,
            level:level || 1000,
            comments: [],
            rating: 3.5,
            ordersCount: 0,
            details: details || []
        });
        return res.status(201).json(newProduct);
    } catch (e) {
        return res.status(500).json(e.message);
    }
};

module.exports = { addProduct };
