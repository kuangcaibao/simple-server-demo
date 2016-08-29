var eventproxy = require("eventproxy");
var User = require("../proxy/user");

var { succInfoWithData } = require("../models/info");

// 获取列表
exports.getList = function(req, res, next) {

	// next();
	return res.json([{hello: "world"}]);
}

exports.touch = function(req, res, next) {
	// console.log(succInfoWithData);
	let retInfo = Object.assign({}, succInfoWithData);
	retInfo.rows[0] = req.session.user;
	return res.json(retInfo);
}