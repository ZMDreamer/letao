$(function () {
    //因为编辑和添加的页面大体结构相同只是内容不同,只需要讲根据isEdit来进行不同的页面渲染就ok

    /* 因为添加省市区的时候是三级联动,所以学要运用mui里面提供的picker组件 */
    //1.根据mui文档要求引入必要的文件以及城市信息数据文件
    //2.初始化popPicker组件,设置数据
    var picker = new mui.PopPicker({
        layer: 3
    });
    picker.setData(cityData);
    //3.给省市文本框添加点击事件 
    $('#form-content').on('tap', '[name=city]', function () {
        picker.show(function (data) {
            $('[name = city]').val(data[0].text + " " + data[1].text + " " + data[2].text);
        })
    })
    /* 页面加载调用封装的函数,来获取当前页面的url里面isEdit的值 */
    var isEdit = Number(getKeyword(location.href, 'isEdit'));
    if (isEdit == 1) {
        //那么此处的页面应该完成编辑功能,获取浏览器存储的值
        var data = JSON.parse(localStorage.getItem('edit_data'));
        var id = data.id;

    } else if (isEdit == 0) {
        var data = {};
    }
    //根据模板来渲染页面内容
    var form_html = template('editTpl', data);
    $('#form-content').html(form_html);


    //4.添加点击事件,获取用户输入的新添加的地址信息
    $('#verify').on('tap', function () {

        var username = $.trim($('[name=username]').val());
        var postCode = $.trim($('[name=postCode]').val());
        var city = $.trim($('[name=city]').val());
        var addressDetail = $.trim($('[name=addressDetail]').val());
        //5.简单验证用户输入的信息
        if (!username) {
            mui.toast('请输入用户名');
            return;
        }
        if (!postCode) {
            mui.toast('请输入邮编');
            return;
        }
        if (!city) {
            mui.toast('请输入省市');
            return;
        }
        if (!addressDetail) {
            mui.toast('请输入详细地址');
            return;
        }
        var data = {
            address: city,
            addressDetail: addressDetail,
            recipients: username,
            postcode: postCode
        }
        if (isEdit == 1) {
            var url = "/address/updateAddress";
            data.id = id;
        } else if (isEdit == 0) {
            var url = "/address/addAddress";
        }

        //6.发送ajax请求来添加数据
        $.ajax({
            type: "post",
            url: url,
            data: data,
            success: function (res) {
                if (isEdit == 1) {
                    //修改成功跳转页面
                    mui.toast('修改成功');
                } else if (isEdit == 0) {
                    mui.toast('添加成功');
                }
                if (res.success) {
                    
                    setTimeout(() => {
                        location.href = "address.html";
                    }, 1000);
                } else {
                    mui.toast(res.message);
                }
            }

        });
    })


})