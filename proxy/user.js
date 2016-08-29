var { User } = require("../models");

// Promise
// 用户的增删改查
exports.Query = function(conditions) {

	return User.find(conditions);

}

exports.Save = function(query) {
	var user = new User();
	user.signuptime = new Date();
	Object.assign(user, query);
	return user.save();
}

exports.Update = function(conditions, doc) {
	return User.update(conditions, doc);
}

// callback
// 通过用户名和密码查询用户，登录使用
exports.getUserByNameAndPwd = function(query, callback) {

	User.find(query, callback);
}

// 通过用户名查询用户
exports.getUserByName = function(query, callback) {
	User.find(query, callback);
}

// 用户注册，保存用户到Mongodb中
exports.saveUser = function(query, callback) {
	var user = new User();
	user.name = query.name;
	user.pwd = query.pwd;
	user.save(callback);
}