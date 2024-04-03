const express = require("express");
const AuthService = require("../controllers/Auth.controller");

const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../validators/brand.validator");

const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require("../controllers/brand.controller");

const router = express.Router();

/*-----------------------------------------------------------------*/
// Get All Brands
// Create new Brand
router
  .route("/")
  .get(getBrands)
  .post(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    createBrandValidator,
    createBrand
);
router
  .route("/")
  .get(getBrands)
  .post(uploadBrandImage, resizeImage, createBrandValidator, createBrand);

/*-----------------------------------------------------------------*/
//get barnd bu Id
// Update Brand
// Delete Brand by Id
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .patch(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    updateBrandValidator,
    updateBrand
)
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .patch(uploadBrandImage, resizeImage, updateBrandValidator, updateBrand)
  .delete(
    AuthService.protect,
    AuthService.allowedTo("admin"),
    deleteBrandValidator,
    deleteBrand
  );

/*-----------------------------------------------------------------*/
module.exports = router;
/*-----------------------------------------------------------------*/
