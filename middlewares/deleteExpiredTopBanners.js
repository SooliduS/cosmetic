const TopBanner = require('../models/topBanner');


const deleteExpiredTopBanners = async (req, res, next) => {
  try {
    await TopBanner.checkAndDeleteExpiredBanners();
    next();
  } catch (error) {
    console.error('Error deleting expired banners:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  deleteExpiredTopBanners,
};
