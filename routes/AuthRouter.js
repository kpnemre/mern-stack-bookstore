const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
//   /api/auth ile başlıyor

/**
 * @route POST /api/auth/register
 * @desc Register endpoint
 * @access Public (herkes) register edebilecek
 */


router.post("/register",AuthController.authRegister);

/**
 * @route POST /api/auth/login
 * @desc Login endpoint
 * @access Private şifreyi girebilen girecek
 */
router.post("/login", AuthController.authLogin);

module.exports = router;