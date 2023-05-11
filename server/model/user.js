var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  UserName: { type: String },
  UserEmail: { type: String, unique: true },
  UserPassword: { type: String },
  UserType: { type: String },
});

module.exports = mongoose.model("user", UserSchema);
