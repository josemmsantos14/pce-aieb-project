var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

// require do mongoose e definição do caminho para a base de dados
const mongoose = require("mongoose");
const uri = "mongodb://localhost:9000/projeto_aieb_pce";

// definição dos routers
var indexRouter = require("./routes/index");
var signupRouter = require("./routes/signup");
var loginRouter = require("./routes/login");
var userPageRouter = require("./routes/user_page");
var adminPageRouter = require("./routes/admin_page");
var sendEmailRouter = require("./routes/sendemail");

var app = express();

// conexão com a base de dados
mongoose.set("strictQuery", true);
mongoose
  .connect(uri)
  .then(() => console.log("Connected."))
  .catch(() => console.log("Error connecting to MongoDB."));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// definição dos caminhos para os respetivos routers
app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/userpage", userPageRouter);
app.use("/adminpage", adminPageRouter);
app.use("/sendemail", sendEmailRouter);

module.exports = app;
