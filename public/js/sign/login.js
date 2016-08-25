!function($) {

	if(!$) {
		alert("需要jquery支持");
		return;
	}

	var login = function() {

 		var name = $("#name").val().trim();
 		var pwd = $("#pwd").val().trim();

 		if(name == "" || pwd == "") {
 			alert("请输入用户名或者密码");
 			return false; 
 		}

 		return true;
	}

	window["login"] = login;

}(jQuery)