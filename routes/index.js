var express = require("express");
var router = express.Router();

// 中间件
var { auth } = require("../middleware");

// controller
var sign = require("../controller/sign");
var site = require("../controller/site");

router.get("/", auth, site.index);

router.get("/login", sign.showLogin);
router.post("/login", sign.login);

router.get("/signup", sign.showSignup);
router.post("/signup", sign.signup);

router.get("/loginout", sign.loginout);
router.post("/loginout", sign.loginout);

module.exports = router;