var eventproxy = require("eventproxy");
var User = require("../proxy/user");
var { errInfoLogin, succInfoLogin } = require("../models/info");

exports.login = function(req, res, next) {

	var retInfo = Object.assign({}, errInfoLogin);
	var ep = new eventproxy();
	ep.fail(next);
	ep.on("login_error", function() {
		res.json(retInfo);
	});
	ep.on("login_success", function() {
		res.json(retInfo);
	})

	// res.json(req.body);
	var name = req.body.name;
	var pwd = req.body.pwd;

	if(typeof name === "undefined" || name == "" || typeof pwd === "undefined" || pwd == "") {
		return ep.emit("login_error");
	}

	name = name.toLowerCase();

	User.Query({name: name, pwd: pwd})
	.then(docs => {
		if(docs.length <= 0) {
			return ep.emit("login_error");
		}

		// 登录成功
		// 将用户信息存放在 redis 中
		req.session.user = docs[0];
		retInfo = Object.assign({}, succInfoLogin, {rows: [docs[0]]});
		return ep.emit("login_success");
	})
	.catch(err => {
		next(err);
	});

}