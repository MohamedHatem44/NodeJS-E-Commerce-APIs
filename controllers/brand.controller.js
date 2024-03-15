const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const factory = require("../factory/factory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const Brand = require("../models/brand.model");
/*-----------------------------------------------------------------*/
// Upload single image
const uploadBrandImage = uploadSingleImage("image");

// Image processing
const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${filename}`);

  // Save image into our db
  req.body.image = filename;

  next();
});
/*-----------------------------------------------------------------*/
// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
const getBrands = factory.getAll(Brand);
/*-----------------------------------------------------------------*/
// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
const getBrand = factory.getOne(Brand);
/*-----------------------------------------------------------------*/
// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
const createBrand = factory.createOne(Brand);
/*-----------------------------------------------------------------*/
// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
const updateBrand = factory.updateOne(Brand);
/*-----------------------------------------------------------------*/
// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
const deleteBrand = factory.deleteOne(Brand);
/*-----------------------------------------------------------------*/
module.exports = {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
};
/*-----------------------------------------------------------------*/
