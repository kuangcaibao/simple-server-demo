var express = require("express");
var router = express.Router();

var user = require("../controller/user");

router.post("/login", user.login);

module.exports = router;