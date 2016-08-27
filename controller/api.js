var eventproxy = require("eventproxy");
var User = require("../proxy/user");

// 获取列表
exports.getList = function(req, res, next) {

	// next();
	res.json([{hello: "world"}]);
}

exports.touch = function(req, res, next) {


}