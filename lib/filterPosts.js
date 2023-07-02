const filterPosts = (req) => {
    const {searchTitle , sort } = req?.query;

    // set filters
    const filter = {};
    if (searchTitle) filter.title = {$regex:{searchTitle}}

    //set Sort
    let s
    if (!sort || sort === 'newest') s = { createdAt: -1 };
    if (sort === 'mostViews') s = { views: -1 };
    return {  filter , sort: s };
};

module.exports = filterPosts;
