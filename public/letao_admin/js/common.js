//判断用户是否登录
$.ajax({
	type: "get",
	url: "/employee/checkRootLogin",
	async: false,
	success: function (res) {
		if (res.error && res.error == 400) {
			location.href = "login.html";
		}
	}
});

$(function () {
	//让侧边可以展开
	var navLi = $('.navs li')
	navLi.on('click', function () {
		$(this).find('ul').slideToggle();
	});
	//每个页面都有一个退出页面
	$('.login_out_bot').click(function () {
		$.ajax({
			type: "get",
			url: "/employee/employeeLogout",
			success: function (res) {
				if (res.success) {
					location.href = "login.html";
				} else {

					alert(res.message);
				}
			}
		});
	})

});