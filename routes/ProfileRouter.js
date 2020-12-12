const express = require("express");
const router = express.Router();
const auth =require("../middleware/authMiddleware");
// base URL: /api/profile

/**
 * @route   GET /api/profile
 * @desc    Profile endpoint
 * @access  Private
 */
router.post("/", auth,(req,res)=>{
    // res.send("PRIVATE PROFILE PAGE")
    res.send(req.decodedUser);
    
})

module.exports =router;