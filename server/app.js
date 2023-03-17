var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var signupRouter = require("./routes/signup");
var loginRouter = require("./routes/login");
var userPageRouter = require("./routes/user_page");
var adminPageRouter = require("./routes/admin_page");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/userpage", userPageRouter);
app.use("/adminpage", adminPageRouter);

module.exports = app;
