var express = require("express");
var router = express.Router();
var UserController = require("../controller/user.js");


/* POST new users. */
router.post("/", async function (req, res) {
  const userInput = {
    UserName: req.body.name,
    UserEmail: req.body.email,
    UserPassword: req.body.password,
    UserType: req.body.type
  };

  const existingUser = await UserController.findUserByEmail(userInput.UserEmail);
  // console.log(existingUser);
  if (!existingUser.exists) {
    const user = await UserController.newUser(userInput.UserName, userInput.UserEmail, userInput.UserPassword, userInput.UserType);
    return res
      .status(201)
      .json({ status: "Created", message: "User created.", user }); //201-Created
  } else {
    return res
      .status(403)
      .json({ status: "Already exists", message: "User already exists." }); //403-Already Exists
  }
});


module.exports = router;
