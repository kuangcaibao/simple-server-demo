var { info } = require("../models");

module.exports = function(req, res, next) {

	// cookie中没有sessionid，或者是 sessionid 对应的user在 redis 中没有
	if(!req.session || !req.session.user) {
		res.json(info.noLogin);
	}

	next();
}