const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const factory = require("../factory/factory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const Category = require("../models/category.model");
/*-----------------------------------------------------------------*/
// Upload single image
const uploadCategoryImage = uploadSingleImage("image");

// Image processing
const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/categories/${filename}`);

    // Save image into our db
    req.body.image = filename;
  }

  next();
});
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
  uploadCategoryImage,
  resizeImage,
};
/*-----------------------------------------------------------------*/
