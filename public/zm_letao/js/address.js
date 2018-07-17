$(function () {
    //存储数据以便编辑时候跳转根据浏览器在编辑页面使用
    var edit_data = null;
    //将以登录用户的地址信息渲染到界面上
    $.ajax({
        type: "get",
        url: "/address/queryAddress",
        success: function (res) {
            edit_data = res;
            if (res.length > 0) {
                var address_html = template('addressTpl', {
                    result: res
                });
                $('#user-address').html(address_html);
            } else {
                mui.toast('无法获取当前数据');
            }
        }
    });
    //给删除按钮添加触摸事件,删除数据
    $('#user-address').on('tap', '#delete-btn', function () {
        //1.获取需要删除数据的id根据id发送ajax请求
        var id = $(this).data('id');
        $.ajax({
            type: "post",
            url: " /address/deleteAddress",
            data: {
                id: id
            },
            success: function (res) {
                if (res.success) {
                    mui.confirm('确定删除吗?','你真的',function(){
                        mui.toast('删除成功');
                        setTimeout(() => {
                            location.reload();
                        }, 1000);

                    })
                   
                } else {
                    mui.toast(res.message);
                }
            }
        });
    })

    //2.编辑用户收货地址信息
    $('#user-address').on('tap', "#edit", function () {
        //1.获取点击事件的该条数据
        var id = $(this).data('id');
        //2.判断该数据在edit_data的位置,拿到数据存储在浏览器
        for (var i = 0; i < edit_data.length; i++) {
            if (id == edit_data[i].id) {
                localStorage.setItem('edit_data',JSON.stringify(edit_data[i]));
                break;
            }
        }
        location.href = "add-address.html?isEdit=1";

    })




})