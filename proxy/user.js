var { User } = require("../models");

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