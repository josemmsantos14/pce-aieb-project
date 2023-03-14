var express = require("express");
var router = express.Router();

const users = [];

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send("Welcome to our users page!");
  res.json(users);
});

/* POST new users. */
router.post("/", function (req, res) {
  const userInput = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const user = users.find(
    (user) =>
      user.email === userInput.email && user.password === userInput.password
  );
  if (!user) {
    users.push(userInput);
    return res.status(201).send("Created"); //201-Created
  } else {
    return res.status(403).send("Already exists"); //403-Already Exists
  }
});

module.exports = router;
