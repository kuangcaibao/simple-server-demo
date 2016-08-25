exports.index = function(req, res) {
	
	res.render("index", { title: "首页", user: req.session });
	// res.send("hello " + name);

}