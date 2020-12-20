const express = require("express");
// express().listen(5000);
require("dotenv").config();
const app =express();

const connectDB = require("./models/connectDB.js");
connectDB();
const router = require ("./routes/router")
// app.use("/",router)
app.use(express.json());
// client tarafta json tipinde veri varsa bizim req.body içine yerleştiriyor
app.use("/api",router)

const port = process.env.PORT || 5000;
app.listen((port), ()=>{
    console.log(`I am listening on port ${port}`)
});

// app.listen((5000),()=>{
//     console.log("listening port")
// })

