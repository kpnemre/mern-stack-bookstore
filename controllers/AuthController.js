
const User = require("../models/UserModel");

exports.authRegister = async (req, res) => {
    //TODO: Register func.
    // req.body.firstName

// console.log(req)
    const {firstName, lastName, email, password} = req.body;
    // expres.json middleware sayesinde 
    // console.log(
    //     "Fields:",
    //     firstName,
    //     lastName,
    //     email,
    //     password
    //   );
    // todo1: validate the fields
    // todo2: check already registered
    // todo3: crpyt password
    // todo4: save the user DB

    const user= new User ({
      firstName,
      lastName,
      email,
      password // crypted password
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