var express = require("express");
var session = require("express-session");
var redisStore = require("connect-redis")(session);
var redis = require("redis");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var multer = require("multer");
var upload = multer();
var _ = require("lodash");
var path = require("path");

// mongoose
require("./models");

var app = new express();
var config = require("./config");
var client = redis.createClient();

var router = require("./routes");
var api = require("./routes/api");
var auth = require("./middleware/auth");

// 这里设置可以跨域访问
app.all("*", function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://192.168.0.53:4000');
	res.header('Access-Control-Allow-Credentials', true);
  	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
})

// 静态文件路径
app.use("/static", express.static("public"));

// 模板引擎
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs-mate"));
app.locals._layoutFile = "layout.html";
_.extend(app.locals, {
	config: config,
	// Loader: Loader
})

app.use(session({
	store: new redisStore(Object.assign({}, config.redis, {client: client})),
	secret: config.session.secret
}));

// 日志设置
// app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

// 路由设置
app.use("/", router);
// app.use("/api", auth,  api);
app.use("/api",  api);

app.listen(config.port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", config.port, config.port);
  }
})