const express = require("express");
const AuthService = require("../controllers/Auth.controller");
const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  changeUserPasswordValidator,
  deleteUserValidator,
  updateLoggedUserValidator,
} = require("../validators/User.validator");

const {
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
} = require("../controllers/User.controller");

const router = express.Router();
/*-----------------------------------------------------------------*/
router.use(AuthService.protect);

router.get('/getMe', getLoggedUserData, getUser);
router.put('/changeMyPassword', updateLoggedUserPassword);
router.put('/updateMe', updateLoggedUserValidator, updateLoggedUserData);
router.delete('/deleteMe', deleteLoggedUserData);

// Admin
router.use(AuthService.allowedTo('admin', 'manager'));

router.put(
  '/changePassword/:id',
  changeUserPasswordValidator,
  ChangeUserPassword
);
router
  .route('/')
  .get(getUsers)
  .post(createUserValidator, createUser);
router
  .route('/:id')
  .get(getUserValidator, getUser)
  .put( updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;