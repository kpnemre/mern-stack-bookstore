const express = require("express");
const router = express.Router();
const auth =require("../middleware/authMiddleware");
const ProfileController = require("../controllers/ProfileController");
// base URL: /api/profile

/**
 * @route   GET /api/profile
 * @desc    Profile endpoint
 * @access  Private
 */
router.get("/", auth, ProfileController.getProfileInfo);

/**
 * @route   PUT /api/profile/update
 * @desc    Update Profile endpoint
 * @access  Private
 */
router.get("/update", auth, ProfileController.updateProfileInfo);

module.exports =router;