$(function(){
// 修改密码



$('#verify').on('tap',function(){
//1.获取文本框里面的值
var originPass = $.trim($('[name = originPass]').val());
var newPass = $.trim($('[name = newPass]').val());
var confirmNewPass = $.trim($('[name = confirmNewPass]').val());
var vCode = $.trim($('[name = vCode]').val());
//3.验证用户输入信息
if (!originPass) {
    mui.toast('请输入密码');
    return;
}
if (originPass == newPass) {
    mui.toast('新密码和老密码一样');
    return;
}
if (newPass !=confirmNewPass) {
    mui.toast('两次输入新密码不一致');
    return;
}
//4.发送请求来修改密码
$.ajax({
    type: "post",
    url: "/user/updatePassword",
    data: {oldPassword:originPass,newPassword:newPass,vCode:vCode},
    success: function (res) {
        if (res.success) {
            mui.toast('修改成功');
            setTimeout(() => {
                location.href = "user.html";
            }, 1000);
        }else{
            mui.toast(res.message);
        }
        
    }
});




})

//2.获取验证码
$('.getCode').on('tap',function(){
    $.ajax({
        type: "get",
        url: "/user/vCodeForUpdatePassword",
        success: function (res) {
            $('[name = vCode]').val(res.vCode);
            
        }
    });




})








})