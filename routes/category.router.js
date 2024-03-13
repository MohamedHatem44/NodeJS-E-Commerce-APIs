const express = require("express");
const AuthService =require('../controllers/Auth.controller')
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../validators/category.validator");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const subcategoriesRoute = require("./subCategory.router");

const router = express.Router();
/*-----------------------------------------------------------------*/
// Nested route
// GET /api/v1/categories/:categoryId/subcategories
// Get Subcategories for a category
router.use("/:categoryId/subcategories", subcategoriesRoute);
/*-----------------------------------------------------------------*/
// Get All Categories
router.get("/", getCategories);
/*-----------------------------------------------------------------*/
// Get Category by Id
router.get("/:id", getCategoryValidator, getCategory);
/*-----------------------------------------------------------------*/
// Create new Category
router.route("/")
.post(
   AuthService.protect,
   AuthService.allowedTo("admin","manager"),
   createCategoryValidator, 
   createCategory);
/*-----------------------------------------------------------------*/
// Update Category
router.patch("/:id", updateCategoryValidator, updateCategory);
/*-----------------------------------------------------------------*/
// Delete Category by Id
router.delete("/:id", deleteCategoryValidator, deleteCategory);
/*-----------------------------------------------------------------*/
module.exports = router;
/*-----------------------------------------------------------------*/
