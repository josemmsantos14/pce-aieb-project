var nodeMailer = require("nodemailer");
var express = require("express");
var router = express.Router();
var UserController = require("../controller/user.js");

/* POST. */
router.post("/", async function (req, res) {

  let { email } = req.body;
  global.email = email.trim();

  if (email !== "") {
      const html = `
        <h3>Hello User</h3>
        <p>To recover the password click the following <a href="http://localhost:3000/recoverpass">link</a></p>
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

    const existingUser = await UserController.findUserByEmail(email);
    //console.log(existingUser);
    if (existingUser.exists) {
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
    }
    else {
      console.log("Email isn't registered!")
      return res.status(401).json({ message: "Email isn't registered." });
    }

  } else {
    console.log("Invalid input!");
    return res.status(401).json({ message: "Invalid credentials." });
  }
});


//-------------------- Update da palavra-passe na base de dados

router.post("/recover", async function (req, res) {
  let { password, passwordverify } = req.body;

  console.log("email: ", email)
  console.log("req.body: ", req.body)
  console.log("password: ", password)
  console.log("password verify: ", passwordverify)

  if (password === passwordverify) {
    try {
      const updatePass = await UserController.updateUserPass(email, password);
      console.log("Password updated");
      return res.status(204).json({ status: "Password updated!" });
    }
    catch (error) {
      console.log("error changing password: ", error);
      return res.status(401).json({ message: error });
    }
  }
  else {
    console.log("Passwords diferentes!");
    return res.status(401).json({ message: "Passwords should match" });
  }

  


});

module.exports = router;
