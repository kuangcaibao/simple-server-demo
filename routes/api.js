var express = require("express");
var router = express.Router();

var api = require("../controller/api");

router.post("/list", api.getList);

module.exports = router;