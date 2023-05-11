var express = require("express");
var router = express.Router();
var UserController = require("../controller/user.js");

/* POST credentials to login. */
router.post("/", async function (req, res) {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.status(204).json({ status: "Failed", message: "Empty credentials" });
  } else {
    try {
      const user = await UserController.getUserByEmailAndPassword(
        email,
        password
      );
      // console.log(user);

      if (user.exists) {
        console.log("User logged in!");
        return res.status(200).json({ status: "Accepted", body: user });
      }

      return res.status(401).json({ message: "Invalid credentials." });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error occurred!");
    }
  }
});

module.exports = router;
