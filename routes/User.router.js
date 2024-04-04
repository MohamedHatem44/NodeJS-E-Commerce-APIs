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
  changeUserPassword,
  updateUser,
  deleteUser,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
  uploadUserImage,
  resizeImage,
} = require("../controllers/User.controller");

const router = express.Router();
/*-----------------------------------------------------------------*/

/*-----------------------------------------------------------------*/
// Hatem
router
  .route("/")
  .get(getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);

// router.route("/:id").get(getUserValidator, getUser);
// router.route("/:id").put(updateUserValidator, updateUser);

/*-----------------------------------------------------------------*/
// router.use(AuthService.protect);

router.get("/getMe", getLoggedUserData, getUser);
router.put("/changeMyPassword", updateLoggedUserPassword);
router.put("/updateMe", updateLoggedUserValidator, updateLoggedUserData);
router.delete("/deleteMe", deleteLoggedUserData);

// Admin
// router.use(AuthService.allowedTo("admin", "manager"));
router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);

router
  .route("/")
  .get(getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
