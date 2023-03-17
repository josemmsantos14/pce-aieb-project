var express = require("express");
var router = express.Router();
var userCreds = require("./signup");
var users = userCreds.users;

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.json({
  //   name: "Try",
  //   user: users,
  // });
  res.send("Hello Admin!");
});

module.exports = router;
