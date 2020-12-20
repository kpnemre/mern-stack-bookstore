const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.authRegister = async (req, res) => {
  // req.body
  // console.log(req.body)
  const { firstName, lastName, email, password } = req.body;

  // todo1: validate the fields
//   npm i express-validator
const validationError = validationResult(req);
if (validationError.errors.length > 0) {
    return res.status(400).json({ error: validationError.array() }); // req body içine yazıyor
  }

console.log(validationError );

  // todo2: check already registered----------------------
const UserData= await User.findOne( {email}); 
// console.log(UserData)
if (UserData) {
    return res.status(400).json({ error: [{ message: "user already exist" }] }); // error formatında atmak gerek. json formatında
    // return res.json("user already exist")
    // response u bitirdik 
}
  // todo3: crpyt password-------------------------
  const salt = await bcrypt.genSalt(10);
  // sonuç promise olduğu için await ekliyoruz
  // bcrypt.hash(password, bcrypt.genSalt(10))
  const newPassword = await bcrypt.hash(password, salt);
//   console.log(newPassword);
//   console.log(salt);
  // -------------------------------

  // todo4: save the user DB
  const user = new User({
    firstName,
    lastName,
    email,
    password: newPassword, // crypted password
  });
  // Usermodel deki User şemasından yeni bir obje oluşturuyoruz.
  // user.save();
  await user.save();
  res.send("register completed");
};

exports.authLogin = (req, res) => {
  //  TODO : Auth.
  // TODO : lOGİN FUNC
  res.send("login completed");
};

//   {
//     "firstName": "John",
//     "lastName": "Doe",
//     "password": "123412341234",
//     "email": "a@a.com"
// }
