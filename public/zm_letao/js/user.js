
var data = null;
//此处的ajax请求必须是同步的,才不会同时执行后面的代码
$.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    async:false,
    success: function (res) {
        if (res.id) {
            data = res;

        }else{
            // mui.toast(res.message);
            location.href = "login.html" ; 
        }
    }
   
});



$(function(){
//1.首先判断用户是否已经登录,如果没有就直接跳转到登录界面


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


//使用模板引擎渲染用户数据
var user_html = template('userPlt',data);

$('#userInf').html(user_html);


})