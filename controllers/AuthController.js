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
  // console.log(validationError);

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
  // console.log(userData);
  if (userData) {
    return res
      .status(400)
      .json({ errors: [{ message: "user already exist" }] }); // error formatında atmak gerek. json formatında
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
  // console.log(validationError);
  res.send("Login Completed");

  // ------------------TODO  2:user exist?-----------------

  const userData = await User.findOne({ email });
  // console.log(userData);
  if (!userData) {
    return res
      .status(400)
      .json({ errors: [{ message: "user does not exist" }] }); // error formatında atmak gerek.
  }
  // ------------------------- TODO  3: password compare----------------

  // console.log(userData);

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
      // my token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJfaWQiOiI1ZmQ1MDg5NGI5ZjY0MTE1YzhkOWE0YzgiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6ImFAYS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRCTlRVZTh2b010Znp0NlhnaHJTYjEuckZ5ZWhPY3FrTUpVL3pTbXZUbVkzd0REQjROcmdNcSIsInJlZ2lzdGVyRGF0ZSI6IjIwMjAtMTItMTJUMTg6MTQ6NDQuNzIwWiIsIl9fdiI6MH0sImlhdCI6MTYwNzc5NzQwMiwiZXhwIjoxNjA3ODAxMDAyfQ.xe5wqsq-87IekK7qo-fXdZo8OnfnBjTs0eMD8X0_g78
      res.send(token);
    }
  );
};

//   {
//     "firstName": "John",
//     "lastName": "Doe",
//     "password": "123412341234",
//     "email": "a@a.com"
// }
