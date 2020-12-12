const express = require("express");
const router = express.Router();
// base URL: /api/profile

/**
 * @route   GET /api/profile
 * @desc    Profile endpoint
 * @access  Private
 */
router.post("/",(req,res)=>{
    res.send("PRIVATE PROFILE PAGE")
    
})

module.exports =router;