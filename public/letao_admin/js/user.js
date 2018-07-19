$(function(){
//1.发送ajax来获取用户信息
    $.ajax({
        type: "get",
        url: "/user/queryUser",
        data: {page:1,pageSize:10},
        success: function (res) {
            if (res) {
                var user_html = template('userTpl',res)
                $('#user-list').html(user_html);
            }
        }
    });


//2.给操作按钮添加事件来进行用户启用和禁用
$('#user-list').on('click','#btn-edit',function(){
    var user_id = $(this).data('userId');
    var user_status = $(this).data('userStatus');
//获取用户id和isDelete值来发送ajax请求
$.ajax({
    type: "post",
    url: "/user/updateUser",
    data: {
        id: user_id,
        isDelete: user_status?0:1
    },
    success: function (res) {
        if (res.success) {
            location.reload();
        }
    }
});






})



})