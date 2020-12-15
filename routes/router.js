const express = require("express");

const router = express.Router();
const AuthRouter = require("./AuthRouter");
const BookRouter = require("./BookRouter");
const ProfileRouter =require("./ProfileRouter");
// router.get("/", (req,res)=>{
//     console.log("home page")
//     res.send("home page")
// })
// ONLY /api ENDPOINT  
// sadece /api ile başlayan kısımlara routing hizmeti verecek. / home kısmı statik
// http://localhost:5000/ ulaşım sağlamıyor şu hali ile
/**
 * @route /api/auth
 * @desc Route for Auth
 */

// router.get("/api", (req,res)=>{
// router.get("/auth", (req,res)=>{
//     console.log("API page")
//     res.send("API page")
// })


router.use("/auth", AuthRouter);

/**
 * @route /api/profile
 * @desc Route for Profile
 */
// router.use("/profile", ProfileRouter);


/**
 * @route /api/book
 * @desc Route for Book
 */
// router.use("/book", BookRouter);

module.exports = router;