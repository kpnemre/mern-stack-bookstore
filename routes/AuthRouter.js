const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
// routes for /api/auth

/**
 * @route   POST /api/auth/register
 * @desc    Register endpoint
 * @access  Public
 */
router.post(
  "/register",
  [
    check("password", "please enter a password with 6 or chars").isLength({
      min: 6,
    }),
    check("email", "please enter a valid email").isEmail(),
  ],
  AuthController.authRegister
); //istediğimiz kadar middleware ekleyebiliriz. herbir check bir middleware



// ------------------------------------------------------
/**
 * @route   POST /api/auth/login
 * @desc    Login endpoint
 * @access  Public
 */
router.post("/login", AuthController.authLogin);

module.exports = router;
