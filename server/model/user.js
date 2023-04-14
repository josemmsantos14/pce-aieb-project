var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  UserID: { type: Number, unique: true },
  UserName: { type: String },
  UserEmail: { type: String },
  UserPassword: { type: String },
  UserType: { type: Boolean },
});

module.exports = mongoose.model("user", UserSchema);
