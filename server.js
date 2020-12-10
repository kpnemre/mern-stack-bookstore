const express = require("express");
// express().listen(5000);


const app =express();
const router = require ("./routes/router")
// app.use("/",router)
app.use("/api",router)

app.listen((5000), ()=>{
    console.log("I am listening on port")
});