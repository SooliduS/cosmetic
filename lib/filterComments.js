const filterComments = (req) => {
    const {product, isConfirmed , post } = req.query;

    // set filters
    const filter = {};
    if (product) filter.product = product
    if(post) filter.post = post
    if(isConfirmed) filter.isConfirmed = isConfirmed
   
    return {  filter };
};

module.exports = filterComments;
