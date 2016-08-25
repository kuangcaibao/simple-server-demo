var mongoose = require("mongoose");
var { mongdb } = require("../config");

mongoose.connect(`mongodb://${mongdb.host}:${mongdb.port}/${mongdb.db}`);
var db = mongoose.connection;

db.on("error", function() {
	console.log("connect mongdb: error.");
})

db.on("open", function() {
	console.log("connect mongdb: success.");
})