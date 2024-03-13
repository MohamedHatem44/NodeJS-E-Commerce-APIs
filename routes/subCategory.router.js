const express = require("express");
const AuthService = require("../controllers/Auth.controller");
const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require("../controllers/subCategory.controller");

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../validators/subCategory.validator");

// mergeParams: Allow us to access parameters on other routers
// We need to access categoryId from category route
const router = express.Router({ mergeParams: true });
/*-----------------------------------------------------------------*/
// Create new SubCategory
// Get All SubCategories
router
  .route("/")
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(createFilterObj, getSubCategories);
/*-----------------------------------------------------------------*/
// Get SubCategory by Id
// Update SubCategory
// Delete SubCategory by Id
router
  .route("/:id")
  .get(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    getSubCategoryValidator, 
    getSubCategory)
  .patch(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    updateSubCategoryValidator, 
    updateSubCategory)
  .delete(
    AuthService.protect,
    AuthService.allowedTo("admin"),
    deleteSubCategoryValidator,
    deleteSubCategory);
/*-----------------------------------------------------------------*/
module.exports = router;
/*-----------------------------------------------------------------*/
