const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");
const Category = require("../models/category.model");
const ApiError = require("../utils/apiError");
/*-----------------------------------------------------------------*/
const getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];
/*-----------------------------------------------------------------*/
const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name")
    .custom(async (value, { req }) => {
      // Check if a category with the same name already exists
      const existingCategory = await Category.findOne({ name: value });
      if (existingCategory) {
        throw new ApiError("Category name must be unique", 400);
      }
      req.body.slug = slugify(value);
      return true;
    }),
  check("image").notEmpty().withMessage("Category image is required(v)"),
  validatorMiddleware,
];
/*-----------------------------------------------------------------*/
const updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];
/*-----------------------------------------------------------------*/
const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];
/*-----------------------------------------------------------------*/
module.exports = {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};
/*-----------------------------------------------------------------*/
