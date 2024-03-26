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

/*-----------------------------------------------------------------*/
// Hatem
router.route("/").get(getUsers).post(createUserValidator, createUser);

/*-----------------------------------------------------------------*/
router.use(AuthService.protect);

router.get("/getMe", getLoggedUserData, getUser);
router.patch("/changeMyPassword", updateLoggedUserPassword);
router.patch("/updateMe", updateLoggedUserValidator, updateLoggedUserData);
router.delete("/deleteMe", deleteLoggedUserData);

// Admin
router.use(AuthService.allowedTo("admin", "manager"));

router.patch(
  "/changePassword/:id",
  changeUserPasswordValidator,
  ChangeUserPassword
);
router.route("/").get(getUsers).post(createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .patch(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
