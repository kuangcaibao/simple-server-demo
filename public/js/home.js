$(function() {

	$.post("/api/list", function(data) {
		// debugger;

		if(data.length == 0) {
			$("#list").html("暂无任务");
		}

	})

})