const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

// BAĞLANIP bağlanmadığının kontrolü
const connectDB = async()=>{
// promise dönecek.
try {
    // console.log(process.env.MONGODB_URI)
       await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true}) 
       console.log("succesfully connect to DB")
   } catch (error) {
       console.log("error connecting DB", error)
   }
}

module.exports= connectDB;
