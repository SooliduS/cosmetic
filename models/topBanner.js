const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topBannerSchema = new Schema({
    sortOrder: {
        type: Number,
        unique: true,
    },
    url: String,
    image: String,
    expirationDate: {
        type: Date,
    },
});

topBannerSchema.statics.checkAndDeleteExpiredBanners = async function () {
    const expiredBanner = await this.deleteMany({
      expirationDate: { $lte: new Date() },
    }); 
}

module.exports = mongoose.model('TopBanner', topBannerSchema);
