const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

exports.authRegister = async (req, res) => {
  //TODO: Register func.
  // req.body.firstName

  // console.log(req)
  const { firstName, lastName, email, password } = req.body;
  // expres.json middleware sayesinde

  // todo1: validate the fields
  // todo2: check already registered
  // todo3: crpyt password
  // todo4: save the user DB

  // ---------  // todo1: validate the fields----------

  // console.log(check1)
  const validationError =validationResult(req);
  if (validationError.errors.length >0) {
    return res
    .status(400)
    .json({ error: validationError.array() })

  }
  console.log(validationError)

  // ------------

  // ------ todo3: crpyt password-------Password Kriptoloma yapıldı
  const salt = await bcrypt.genSalt(10);
  // sonuç promise olduğu için await ekliyoruz
  // bcrypt.hash(password, bcrypt.genSalt(10))
  const newPassword = await bcrypt.hash(password, salt);
  // console.log(newPassword);
  // console.log(salt);
  // -----------------------------------------------------
  // -------------todo2: check already registered----------
  const userData = await User.findOne({ email }); // aynı olan emaili bul tüm bilgileri getir.email:email şeklinde olanı kısaltarak email yazdık
  console.log(userData);
  if (userData) {
    return res.status(400).json({ error: [{ message: "user already exist" }] }); // error formatında atmak gerek. json formatında
    // return res.json("user already exist")
    // response u bitirdik
  }

  // -------------------------------------------------------


  const user = new User({
    firstName,
    lastName,
    email: email,
    password: newPassword, // crypted password
  });
  // user.save();
  await user.save();

  // TODO:ERROR HANDLING FOR SAVING
  res.send("Register Completed.");
};

exports.authLogin = (req, res) => {
  // TODO: Auth.
  // TODO: Login func.
  res.send("Login Completed");
};

//   {
//     "firstName": "John",
//     "lastName": "Doe",
//     "password": "123412341234",
//     "email": "a@a.com"
// }
