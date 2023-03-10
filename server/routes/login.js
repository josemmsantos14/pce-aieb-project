var express = require("express");
var router = express.Router();

const users = [
  {
    id: 1,
    name: "Geremias",
    email: "geremias@gmail.com",
    password: "1234",
  },
];

router.post("/", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    return res.status(200).json(user);
  }

  return res.status(401).json({ message: "Invalid credentials." });
});

module.exports = router;
