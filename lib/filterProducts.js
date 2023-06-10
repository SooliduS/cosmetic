const filterProducts = (req) => {
    const { colors, price, sort, brands,limit, categories, searchName , page } =
        req.query;

    // set page
    let p = 1;
    if (page) p = page;

    // set filters
    const filter = {};
    if (colors) {
        const arr = colors.split('-');
        filter['colors.name'] = { $in: arr };
    }
    if (price) {
        const [min, max] = price.split('-');
        const minPrice = parseInt(min);
        const maxPrice = parseInt(max);
        filter.price = {
            $and: [{ price: { $gte: minPrice } }, { age: { $lte: maxPrice } }],
        };
    }
    if (brands) {
        const arr = brands.split('-');
        filter.brand = { $in: arr };
    }
    if (categories) {
        const arr = categories.split('-');
        filter.categories = { $in: arr };
    }
    if (searchName) filter.name = { $regex: searchName };
    //set sort
    let s;
    if (!sort || sort === 'mostViews') s = { views: -1 };
    if (sort === 'newest') s = { createdAt: -1 };
    if (sort === 'mostSales') s = { orderCount: -1 };
    if (sort === 'mostExpensive') s = { price: -1 };
    if (sort === 'cheapest') s = { price: 1 };

    //set limit
    let l;
    if (limit) l = limit;
    else l = 30;

    return { page: p, sort: s, filter, limit: l };
};

module.exports = filterProducts;
