const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("./models/connectDB.js");
const router = require("./routes/router");
connectDB();

app.use(express.json());
app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// const port = process.env.PORT || 5000;


app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
