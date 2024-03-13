const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const Review = require("../models/review.model");
/*-----------------------------------------------------------------*/
const getReviewValidator = [
    check("id").isMongoId().withMessage("Invalid review id format"),
    validatorMiddleware,
];
/*-----------------------------------------------------------------*/
const createReviewValidator = [
    check("title").optional(),
    check("ratings").notEmpty()
        .withMessage("rating is required")
        .isFloat({ min: 1, max: 5 })
        .withMessage("Ratings value must be between 1 and 5"),
    check("user").isMongoId().withMessage("Invalid user format"),
    check("product").isMongoId().withMessage("Invalid product format")
        .custom((val, { req }) =>
            //Check if the logged user has a previous review
            Review.findOne({ user: req.user._id, product: req.body.product }).then((review) => {
                if (review) {
                    return Promise.reject(
                        new Error("You have already reviewed this product")
                    );
                }
            })
        ),
    validatorMiddleware,
];
/*-----------------------------------------------------------------*/
const updateReviewValidator = [
    check("id").isMongoId().withMessage("Invalid review id format")
        .custom((val, { req }) =>
            //Check the review's ownership before updating
            Review.findById(val).then((review) => {
                if (!review) {
                    return Promise.reject(
                        new Error(`There is no review with this id ${val}`)
                    );
                }
                if (review.user._id.toString() !== req.user._id.toString()) {
                    return Promise.reject(
                        new Error(`You are not allowed to perform this action`)
                    );
                }

            })
        ),
    validatorMiddleware,
];
/*-----------------------------------------------------------------*/
const deleteReviewValidator = [
    check("id").isMongoId().withMessage("Invalid review id format")
        .custom((val, { req }) => {
            if (req.user.role === 'user') {
                //Check the review's ownership before updating
                return Review.findById(val).then((review) => {
                    if (!review) {
                        return Promise.reject(
                            new Error(`There is no review with this id ${val}`)
                        );
                    }
                    if (review.user._id.toString() !== req.user._id.toString()) {
                        return Promise.reject(
                            new Error(`You are not allowed to perform this action`)
                        );
                    }
                })
            }
            return true;
        }),

    validatorMiddleware,
];
/*-----------------------------------------------------------------*/
module.exports = {
    getReviewValidator,
    createReviewValidator,
    updateReviewValidator,
    deleteReviewValidator,
};
/*-----------------------------------------------------------------*/
