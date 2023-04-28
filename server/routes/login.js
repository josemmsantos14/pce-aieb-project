var express = require("express");
var router = express.Router();
// var userCreds = require("./users.js");
// var users = userCreds.users;


// ---------DEPOIS TENTAR ALTERAR PARA IR BUSCAR OS USERS À BASE DE DADOS---------
const users = [
  {
    id: 1,
    name: "user1",
    email: "user1@gmail.com",
    password: "12345",
    isAdmin: true,
  },
  {
    id: 2,
    name: "user2",
    email: "user2@gmail.com",
    password: "12345",
    isAdmin: false,
  },
];


/* POST credentials to login. */
router.post("/", function (req, res) {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.status(204).json({ status: "Failed", message: "Empty credentials" });
  } else {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      console.log("User logged in!");
      if (user.isAdmin) {
        return res.status(200).json({ status: "Accepted", body: user });
      } else if (!user.isAdmin) {
        return res.status(200).json({ status: "Accepted", body: user });
      } else {
        return res.status(500).send("Error occurred!");
      }
      // return res.status(200).json(user);
    }
    return res.status(401).json({ message: "Invalid credentials." });
  }
});

module.exports = router;
