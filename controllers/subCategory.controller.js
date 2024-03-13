const factory = require("../factory/factory");
const SubCategory = require("../models/subCategory.model");
/*-----------------------------------------------------------------*/
const setCategoryIdToBody = (req, res, next) => {
  // Nested route (Create)
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
/*-----------------------------------------------------------------*/
// Nested route
// GET /api/v1/categories/:categoryId/subcategories
const createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};
/*-----------------------------------------------------------------*/
// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
const getSubCategories = factory.getAll(SubCategory);
/*-----------------------------------------------------------------*/
// @desc    Get specific subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
const getSubCategory = factory.getOne(SubCategory);
/*-----------------------------------------------------------------*/
// @desc    Create subCategory
// @route   POST  /api/v1/subcategories
// @access  Private
const createSubCategory = factory.createOne(SubCategory);
/*-----------------------------------------------------------------*/
// @desc    Update specific subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
const updateSubCategory = factory.updateOne(SubCategory);
/*-----------------------------------------------------------------*/
// @desc    Delete specific subCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
const deleteSubCategory = factory.deleteOne(SubCategory);
/*-----------------------------------------------------------------*/
module.exports = {
  setCategoryIdToBody,
  createSubCategory,
  createFilterObj,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
/*-----------------------------------------------------------------*/
