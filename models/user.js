var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
var SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
  username: { type: String, required: true },
  turns: { type: Number, required: true },
  ups: { type: Number, required: true },
  downs: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

var User = mongoose.model("User", userSchema);
module.exports = User;