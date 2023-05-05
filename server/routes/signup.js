var express = require("express");
var router = express.Router();

// module.exports.
let users = [];

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send("Welcome to our users page!");
  res.json(users);
});

/* POST new users. */
router.post("/", function (req, res) {
  const userInput = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type
  };

  console.log(userInput);
  const user = users.find(
    (user) =>
      user.email === userInput.email && user.password === userInput.password
  );
  if (!user) {
    users.push(userInput);
    return res
      .status(201)
      .json({ status: "Created", message: "User created." }); //201-Created
  } else {
    return res
      .status(403)
      .json({ status: "Already exists", message: "User already exists." }); //403-Already Exists
  }
});

module.exports = router;
