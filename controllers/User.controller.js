const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');
const factory = require("../factory/factory");
const User = require("../models/UserModel");
const ApiError = require('../utils/apiError')
const createToken = require('../utils/createToken');
/*-----------------------------------------------------------------*/
//profileimage upload ===>

/*-----------------------------------------------------------------*/
// @desc    Get list of User
// @route   GET /api/v1/users
// @access  private /admmin
const getUsers = factory.getAll(User);
/*-----------------------------------------------------------------*/
// @desc    Get specific User by id
// @route   GET /api/v1/users/:id
// @access  private /admin
const getUser = factory.getOne(User);
/*-----------------------------------------------------------------*/
// @desc    Create User
// @route   POST  /api/v1/users
// @access  Private  /admin
const createUser = factory.createOne(User);
/*-----------------------------------------------------------------*/
// @desc    Update specific users
// @route   PUT /api/v1/users/:id
// @access  Private   /admin

//update all data without password
const updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name:req.body.name,
      email : req.body.email,
      slug : req.body.slug,
      phone : req.body.phone,
      role : req.body.role,
    },
    {
      new :true,
    }
    );
    
    if (!document) {
      return next(new ApiError(`No document for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
  });
/*-----------------------------------------------------------------*/
//update the password only 
const ChangeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
      req.params.id,
      {
      password:await bcrypt.hash(req.body.password,12),
      passwordChangedAt:Date.now(),
  },
  {
    new :true,
  }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
/*-----------------------------------------------------------------*/
// @desc    Delete specific User
// @route   DELETE /api/v1/users/:id
// @access  Private   /admin
const deleteUser = factory.deleteOne(User);
/*-----------------------------------------------------------------*/
const getLoggedUserData = asyncHandler(async(req,res,next)=>{
  req.params.id = req.user.user._id;
  next();
});
/*-----------------------------------------------------------------*/
const updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  // 1) Update user password based user payload (req.user._id)
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  // 2) Generate token
  const token = createToken(user._id);

  res.status(200).json({ data: user, token });
});
/*-----------------------------------------------------------------*/
const updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  );

  res.status(200).json({ data: updatedUser });
});

// @desc    Deactivate logged user
// @route   DELETE /api/v1/users/deleteMe
// @access  Private/Protect
const deleteLoggedUserData = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ status: 'Success' });
});

/*-----------------------------------------------------------------*/
module.exports = {
  getUsers,
  getUser,
  createUser,
  ChangeUserPassword,
  updateUser,
  deleteUser,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
};
/*-----------------------------------------------------------------*/
