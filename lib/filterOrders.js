const filterOrders = (req) => {
    const {status, product, sort, page, limit, category } = req.query;

    // set page
    let p = 1;
    if (page) p = page;

    // set filters
    const filter = {};
    if (status) filter.status = status
    if(product) {
        filter['items.product'] = product
    }
    if (category) filter.category = category 
    //set sort
    let s;
    if (!sort || sort === 'newest') s = { createdAt:-1 };
    if (sort === 'mostExpensive') s = { payablePrice: -1 };
    if (sort === 'cheapest') s = { payablePrice: 1 };

    //set limit
    let l;
    if (limit) l = limit;
    else l = 30;

    return { page: p, sort: s, filter, limit: l };
};

module.exports = filterOrders;
