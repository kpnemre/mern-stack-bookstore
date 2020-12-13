


const jwt = require("jsonwebtoken");
const authMiddleware = (req,res,next)=>{
// TODO1: GET token-------------
const token = req.header("token")

// TODO2:return error if token does not exist----------------
if (!token) {
    return res.status(400).json({message: "ınvalid token"})
}
// TODO 3 : Verify token

// console.log(token)
jwt. verify(token, process.env.JWT_SECRET_KEY, (err,decodedtoken)=>{
   
if(err){
    return res.status(401).json({message: "ınvalid token"}) 
}else {
    req.decodedUser=decodedtoken.userData;
    next();// geçiş izni
}
})

}

module.exports =authMiddleware;