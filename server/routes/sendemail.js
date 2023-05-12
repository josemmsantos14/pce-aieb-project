var nodeMailer = require("nodemailer");
var express = require("express");
var router = express.Router();
var UserController = require("../controller/user.js");

/* POST. */
router.post("/", async function (req, res) {
  let { email } = req.body;
  email = email.trim();

  const html = `
      <h3>Hello User</h3>
      <p>To recover the password click the following <a href="http://192.168.1.80:3000/recoverpass">link</a></p>
    `;
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secureConnection: false,
    auth: {
      user: "notasdealta.geral@gmail.com",
      pass: "ljecrhrbxnspazbt",
    },
    tls: {
      ciphers: "SSLv3",
    },
  });
  const info = {
    from: "notasdealta.geral@gmail.com",
    to: email,
    subject: "Recover password",
    html: html,
  };

  if (email !== "") {
    try {
      const sendemail = await transporter.sendMail(info);
      transporter.close();
      //   return resolve(res);
      return res.status(204).json({ status: "Email sent!" });
    } catch {
      console.log("error sending email: ", error);
      transporter.close();
      //   return reject(error);
      return res.status(401).json({ message: error });
    }
  } else {
    console.log("Invalid input!");
    return res.status(401).json({ message: "Invalid credentials." });
  }
});

module.exports = router;
