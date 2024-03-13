const express = require('express');
const {
  signupValidator,
  loginValidator,
} = require('../validators/Auth.validator');

const {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} = require('../controllers/Auth.controller');

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login)
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetCode', verifyPassResetCode);
router.put('/resetPassword', resetPassword);

module.exports = router;