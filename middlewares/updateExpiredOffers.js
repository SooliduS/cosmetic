// amazingOfferMiddleware.js
const Product = require('../models/productModel');

// Middleware function to update expired amazing offers
const updateExpiredOffers = async (req, res, next) => {
  try {
    await Product.checkAndUpdateAmazingOffers();
    next();
  } catch (error) {
    console.error('Error updating expired offers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  updateExpiredOffers,
};
