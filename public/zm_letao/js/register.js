$(function(){
    
    /* 点击获取验证码,发送请求得到验证码 */
    $('.getCode').on('tap',function(){
        $.ajax({
            type: "get",
            url: "/user/vCode",
            success: function (res) {
                console.log(res)
                if (res) {
                    $('[name = vfCode]').val(res.vCode);
                }else{
                    mui.toast(res.error);
                }
            }
        });
    })




    $('#verify').on('tap',function(){

    //获取表单里面的值
    var username =$.trim($('[name=username]').val());
    var telephone = $.trim($('[name = telephone]').val());
    var password = $.trim($('[name = password]').val());
    var againPw = $.trim($('[name = againPw]').val());
    var vfCode = $.trim($('[name = vfCode]').val());
    /* 使用正则表达式一一验证 */
    //1.验证用户名
    var user_reg = /^[\u4E00-\u9FA5A-Za-z0-9]/;
    if (!user_reg.test(username)) {
        mui.toast('由字母,数字或者汉字组成');
        return;
    }
    //2.验证手机
    var tele_reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    if (!tele_reg.test(telephone)) {
        mui.toast('请输入正确的电话号码')
        return;
    }
    //3.验证密码
    var pw_reg = /^\w{3,20}$/;
    if (!pw_reg.test(password)) {
        mui.toast('字母开头,6~18位')
        return;
    }
    //4.判断两次输入的密码是否相同
    if (password != againPw) {
        mui.toast('两次输入的密码不同');
        return;
    }
    //5.如果没有填入密码
    if (!vfCode) {
        mui.toast('请获取验证码');
        return;
    }
    $.ajax({
        type: "post",
        url: "/user/register",
        data: {username:username,password:password,mobile:telephone,vCode:vfCode},
        beforeSend:function(){
            mui.toast('正在登录---')
        },
        success: function (res) {
            if (res.success) {
                mui.toast('注册成功');
                setTimeout(() => {
                   location.href = 'login.html' 
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