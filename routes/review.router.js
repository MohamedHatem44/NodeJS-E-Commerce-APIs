const express = require("express");
const {
    getReviewValidator,
    createReviewValidator,
    updateReviewValidator,
    deleteReviewValidator,
} = require("../validators/review.validator");

const {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview,
    createFilterObj,
    setProductIdAndUserIdToBody
} = require("../controllers/review.controller");

const authService = require('../controllers/Auth.controller');

const router = express.Router({ mergeParams: true });

router.route('/').get(createFilterObj, getReviews)
    .post(authService.protect, authService.allowedTo('user'),setProductIdAndUserIdToBody, createReviewValidator, createReview);

router.route('/:id').get(getReviewValidator, getReview)
    .put(authService.protect, authService.allowedTo('user'), updateReviewValidator, updateReview)
    .delete(authService.protect, authService.allowedTo('user', 'admin'), deleteReviewValidator, deleteReview);

module.exports = router;