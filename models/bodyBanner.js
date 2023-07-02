const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bodyBannerSchema = new Schema(
    {
      items:[{
            url:String,
            image:String,
            title:String
        }],
      expirationDate: {
        type: Date,
      },
    }
);

module.exports = mongoose.model('BodyBanner', bodyBannerSchema);