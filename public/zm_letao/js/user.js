$(function(){
//1.首先判断用户是否已经登录,如果没有就直接跳转到登录界面

//此处的ajax请求必须是同步的,才不会同时执行后面的代码
$.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    async:false,
    success: function (res) {
        if (res.id) {
            $('#userPhone').html(res.mobile);
            $('#userAccount').html('账号:'+res.username);

        }else{
            mui.toast(res.message);
            location.href = "login.html" ; 
        }
    }
   
});

 //点击退出登录,清除登录状态
 $('#logout').on('tap',function(){
    $.ajax({
        type: "get",
        url: "/user/logout",
        success: function (res) {
            if (res.success) {
                location.href = "index.html";
            }else{
                mui.toast(res.error);
            }
        }
    });



 })











})