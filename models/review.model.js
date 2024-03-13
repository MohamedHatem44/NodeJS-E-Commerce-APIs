const mongoose = require('mongoose');
const ProductModel = require('./product.model');

const reviewSchema = new mongoose.Schema({
    title: {
        type: String
    },
    ratings: {
        type: Number,
        min: [1, 'Min ratings value is 1.0'],
        max: [5, 'Max ratings value is 5.0'],
        required: [true, 'Review rating is required']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user.']
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to a product']
    }
}, { timestamps: true });

reviewSchema.pre(/^find/, function (next) {
    this.populate({ path: 'user', select: 'name' });
    next();
});

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (productId) {
    const result = await this.aggregate([
        //Stage 1: Get all reviews for a specific product
        { $match: { product: productId } },
        //Stage 2: Calculate avg and quantity
        {
            $group: {
                _id: 'product',
                avgRatings: { $avg: '$ratings' },
                ratingsQuantity: { $sum: 1 }
            }
        }
    ]);
    if (result.length > 0) {
        await ProductModel.findByIdAndUpdate(productId, {
            ratingsAverage: result[0].avgRatings,
            ratingsQuantity: result[0].ratingsQuantity
        });
    }
    else {
        await ProductModel.findByIdAndUpdate(productId, {
            ratingsAverage: 0,
            ratingsQuantity: 0
        });
    }
};

reviewSchema.post('save', async function () {
    await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

reviewSchema.post('remove', async function () {
    await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

module.exports = mongoose.model('Review', reviewSchema);