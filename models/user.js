var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	name: String,
	pwd: String,
	signtime: Date
});

var User = mongoose.model("User", userSchema);

module.exports = User;