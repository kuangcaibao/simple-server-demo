var eventproxy = require("eventproxy");
var User = require("../proxy/user");

exports.showLogin = function(req, res) {
	console.log(req.session);
	res.render("sign/login", { title: "登录" } );
}

exports.login = function(req, res, next) {

	// debugger;
	var name = req.body.name.toLowerCase();
	var pwd = req.body.pwd;
	var ep = new eventproxy();	

	ep.fail(next);

	ep.on("login_error", function() {
		res.status(403);
		res.render("sign/login", { error: "用户名或者密码错误", title: "登录" });
	})

	User.getUserByNameAndPwd({ name: name, pwd: pwd }, function(err, doc) {
		if(err) {
			return next(err);
		}

		if(!doc || doc.length == 0) {
			return ep.emit("login_error");
		}

		// 登录成功
		req.session.name = name;
		res.redirect("/");
	});
}

exports.showSignup = function(req, res) {
	res.render("sign/signup");
}

exports.signup = function(req, res, next) {
	var name = req.body.name.toLowerCase();
	var pwd = req.body.pwd;
	var ep = new eventproxy();
	
	ep.fail(next);
	ep.on("sign_error", function() {
		res.status(403);
		res.render("sign/signup", { error: "该用户已被注册" });
	})

	User.getUserByName({name: name}, function(err, users) {
		if(err) {
			return next(err);
		}

		if(users.length !== 0) {
			return ep.emit("sign_error");
		}	

		User.saveUser({name: name, pwd: pwd, signtime: new Date() }, function(err, user) {
			if(err) {
				return next(err);
			}

			res.redirect("/login");
		})
	})
}

exports.loginout = function(req, res, next) {
	req.session.destroy();
	res.redirect("/");
}