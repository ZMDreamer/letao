//判断用户是否登录
$.ajax({
	type: "get",
	url: "/employee/checkRootLogin",
	success: function (res) {
		if (res.success) {
			location.href = "user.html";
		}
	}
});
$(function () {

    $('#btn-login').click(function () {
        //获取用户文本的信息
        var username = $.trim($('[name = username]').val());
        var password = $.trim($('[name = password]').val());
        //验证用户输入的账号密码
        if (!username) {
            alert('请输入用户名');
            return;
        }
        if (!password) {
            alert('请输入密码');
            return;
        }
        //发送ajax请求
        $.ajax({
            type: "post",
            url: " /employee/employeeLogin",
            data: {
                username: username,
                password: password
            },
            success: function (res) {
                if (res.success) {
                    location.href = "user.html";
                } else {
                    alert(res.message);
                }
            }
        });



    })














})