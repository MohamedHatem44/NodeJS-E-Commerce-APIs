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

/*-----------------------------------------------------------------*/
//get barnd bu Id
// Update Brand
// Delete Brand by Id
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    updateBrandValidator,
    updateBrand
  )
  .delete(
    AuthService.protect,
    AuthService.allowedTo("admin"),
    deleteBrandValidator,
    deleteBrand
  );

/*-----------------------------------------------------------------*/
module.exports = router;
/*-----------------------------------------------------------------*/
