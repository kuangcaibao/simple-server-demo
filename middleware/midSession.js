var midSession = function(req, res, next) {

	if(!req.session) {
		return next(new Error("no session"));
	}

	res.locals.user = null;

	next();
}

module.exports = midSession;