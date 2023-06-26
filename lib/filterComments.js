const filterComments = (req) => {
    const {product, isConfirmed } = req.query;

    // set filters
    const filter = {};
    if (product) filter.product = product
    if(isConfirmed) filter.isConfirmed = isConfirmed
   
    return {  filter };
};

module.exports = filterComments;
