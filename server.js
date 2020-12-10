const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("./models/connectDB.js")
const router = require("./routes/router");
connectDB();
app.use("/api", router);

app.listen(5000, () => {
  console.log("I'm listening on port 5000");
});