const express = require("express");
const AuthService = require("../controllers/Auth.controller");
const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../validators/product.validator");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const reviewsRoute = require('./review.router');

const router = express.Router();
/*-----------------------------------------------------------------*/
// Get All Brands
// Create new Brand
router
  .route("/")
  .get(getProducts)
  .post(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    createProductValidator,
    createProduct
  );

/*-----------------------------------------------------------------*/
//get product by Id
// Update product
// Delete product by Id
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    updateProductValidator,
    updateProduct
  )
  .delete(
    AuthService.protect,
    AuthService.allowedTo("admin"),
    deleteProductValidator,
    deleteProduct
  );
/*-----------------------------------------------------------------*/
module.exports = router;
/*-----------------------------------------------------------------*/

//Nested routes

//POST /products/productId/reviews
//GET  /products/productId/reviews
//GET  /products/productId/reviews/reviewId
router.use("/:productId/reviews", reviewsRoute);