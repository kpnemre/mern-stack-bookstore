// mongodb+srv://dbUser:<password>@cluster0.1u7ik.mongodb.net/test


const mongoose = require('mongoose');
const connectDB = async()=>{

    try {
        // console.log(process.env.MONGODB_URI);
   await mongoose.connect(process.env.MONGODB_URI, {
       useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
   console.log("db connection success")   
    } catch (error) {
        console.log("error connecting DB", error)
    }


}
module.exports= connectDB;