var mongoose = require("mongoose");

var taskSchema = mongoose.Schema({

});

var Task = mongoose.model("Task", taskSchema);

module.exports = Task;