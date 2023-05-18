const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            required: true
        },
        categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
        price: { type: Number, default: 0 },
        isAmazingOffer: {
            type: Boolean,
            default: false,
        },
        discount: Number,
        isSuggested:{
            type:Boolean,
            default:false
        },
        brand: String,
        colors: [
            {
                rgb: String,
                hex: String,
                name:String,
            },
        ],
        images: [String],
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        shippingClasses: [
            { type: Schema.Types.ObjectId, ref: 'ShippingClass' },
        ],
        rating: {
            type: Number,
            required: true,
            default: 3.5,
        },
        tags: [String],
        details: [{ key: String, value: String }],
        description: String,
        inventory: Number,
        views: {
            type: Number,
            default: 0,
            required: true,
        },
        ordersCount: {
            type: Number,
            default: 0,
            required: true,
        },
    },
    { timestamps: true }
);

// Add pre-save middleware to set the slug field
productSchema.pre('save', function (next) {
    // Only set the slug if it hasn't been set before
    if (!this.slug) {
        this.slug = this._id.toString();
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);
