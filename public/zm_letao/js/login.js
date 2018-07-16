$(function(){
/*注册点击事件 获取用户名和密码 */
$('#btn-login').on('tap',function(){
var username =$.trim($('[name=username]').val());
var password =$.trim($('[name=password]').val());
if (!username) {
    mui.toast('请输入用户名');
    return;

}
if (!password) {
    mui.toast('请输入密码')
    return;
}
$.ajax({
    type: "post",
    url: "/user/login",
    data: {username:username,password:password},
    beforeSend:function(){
        $('#btn-login').html('正在登录');

    },
    success: function (res) {
        if (res.success) {
            setTimeout(() => {
            $('#btn-login').html('登录');
            mui.toast('登录成功')
            location.href = "user.html";        
            }, 1000);
            
        }else{
            setTimeout(() => {
            mui.toast(res.message);
                
            }, 1000);

        }
    }
});



})



})