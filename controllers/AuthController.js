const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
exports.authRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // ---------  // todo1: validate the fields----------

  const validationError = validationResult(req);
  if (validationError.errors.length > 0) {
    return res.status(400).json({ error: validationError.array() });
  }

  // ------------

  // ------ todo3: crpyt password-------Password Kriptoloma yapıldı
  const salt = await bcrypt.genSalt(10);

  const newPassword = await bcrypt.hash(password, salt);

  // -------------todo2: check already registered----------
  const userData = await User.findOne({ email }); 
  if (userData) {
    return res
      .status(400)
      .json({ errors: [{ message: "user already exist" }] }); 
  }

  // -------------------------------------------------------

  const user = new User({
    firstName,
    lastName,
    email: email,
    password: newPassword, // crypted password
  });

  await user.save();

  // TODO:ERROR HANDLING FOR SAVING
  res.send("Register Completed.");
};

// TODO  1: field validation
// TODO  2:user exist?
// TODO  3: password compare
// TODO  4: authentication return TOKEN=> JWT(JSON  WEB   TOKEN)

exports.authLogin = async (req, res) => {
  const { email, password } = req.body;

  // ---------TODO  1: field validation-------------
  const validationError = validationResult(req);

  if (validationError.errors.length > 0) {
    return res.status(400).json({ errors: validationError.array() });
  }

  res.send("Login Completed");

  // ------------------TODO  2:user exist?-----------------

  const userData = await User.findOne({ email });

  if (!userData) {
    return res
      .status(400)
      .json({ errors: [{ message: "user does not exist" }] }); // error formatında atmak gerek.
  }
  // ------------------------- TODO  3: password compare----------------



  const isPasswordMatch = await bcrypt.compare(password, userData.password);
  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ error: [{ message: "invalid credentials" }] }); // error formatında atmak gerek.
  }

  // ------------------TODO  4: authentication return TOKEN=> JWT(JSON  WEB   TOKEN)-------------
  jwt.sign(
    { userData },
    process.env.JWT_SECRET_KEY,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) {
        return res.status(400).json({ error: [{ message: "unknown error" }] }); // error formatında atmak gerek.
      }
      console.log(token);
      res.status(202).json({ token });
    }
  );
};

//   {
//     "firstName": "John",
//     "lastName": "Doe",
//     "password": "123412341234",
//     "email": "a@a.com"
// }
