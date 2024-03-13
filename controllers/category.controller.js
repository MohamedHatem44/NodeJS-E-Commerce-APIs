const factory = require("../factory/factory");
const Category = require("../models/category.model");
/*-----------------------------------------------------------------*/
// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
const getCategories = factory.getAll(Category);
/*-----------------------------------------------------------------*/
// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
const getCategory = factory.getOne(Category);
/*-----------------------------------------------------------------*/
// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
const createCategory = factory.createOne(Category);
/*-----------------------------------------------------------------*/
// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
const updateCategory = factory.updateOne(Category);
/*-----------------------------------------------------------------*/
// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
const deleteCategory = factory.deleteOne(Category);
/*-----------------------------------------------------------------*/
module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
/*-----------------------------------------------------------------*/
