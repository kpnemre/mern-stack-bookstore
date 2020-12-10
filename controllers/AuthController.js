exports.authRegister = (req, res) => {
    //TODO: Register func.
    // req.body.firstName

    const {firstName, lastName, email, password} = req.body;
    console.log(
        "Fields:",
        firstName,
        lastName,
        email,
        password
      );
    // todo1: validate the fields
    // todo2: check already registered
    // todo3: crpyt password
    // todo4: save the user DB
    res.send("Register Completed.");
  };
  
  exports.authLogin = (req, res) => {
    // TODO: Auth.
    // TODO: Login func.
    res.send("Login Completed");
  };