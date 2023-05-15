const filterProducts = (req) =>{
    const { color , price , sort , brand , page , limit , categories } = req.query

    // set page
    let p = 1
    if(page) p = page 

    // set filters
    const filter = {}
    if(color) filter.color = color
    if(price) {
        const [min, max] = price.split("-");
        const minPrice = parseInt(min)
        const maxPrice = parseInt(max)
        filter.price = {
            $and: [{ price: { $gte: minPrice } }, { age: { $lte: maxPrice } }]
        }
    }
    if(brand) filter.brand = brand
    if(categories) filter.categories = {
        $in: categories
    }

    //set sort
    let s
    if(!sort || sort === 'mostViews') s = {views: -1}
    if(sort === 'newest') s = {createdAt: -1}
    if(sort === 'mostSales') s = {orderCount: -1}
    if(sort === 'mostExpensive') s = {price: -1}
    if(sort === 'cheapest') s = {price: 1}

    //set limit
    let l
    if(limit) l = limit 
    else l = 30
    
    return {page:p , sort:s , filter , limit:l , categories:c }
}

module.exports = filterProducts