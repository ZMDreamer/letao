$(function () {
    var id = getKeyword(location.href, 'id');
    //1.根据id通过ajax请求获取页面的数据
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            id: id
        },
        success: function (res) {
            var detail_html = template('detailTpl', res);
            $('.pr-content').html(detail_html);
            //初始化mui控件
            mui(".mui-numbox").numbox()
        }


    });



    //2.给尺码下的每个span添加tap事件
    //定义一个全局变量来记录尺码信息
    var chosenSize = null;
    $('.pr-content').on('tap','.pr-size span',function(){
        //在加入购物车按钮上记录当前添加的尺码
        $(this).addClass('mui-btn-danger').siblings('span').removeClass('mui-btn-danger');
        chosenSize = $.trim($(this).text());
    })
    //3.添加购物车点击事件完成购物功能
    $('#addCart').on('click',function(){
    //.获取数量和尺码
    var numPro = mui('.mui-numbox').numbox().getValue();
    //验证尺码是否选择
    if (!chosenSize) {
        mui.toast('请选择尺码');
        return;
    }
    //发送添加到购物车ajax;
    $.ajax({
        type: "post",
        url: "/cart/addCart",
        data: {
            productId:id,
            num:numPro,
            size:chosenSize
        },
        success: function (res) {
            if (res.success) {
                mui.confirm('是否进入购物车页面',function(){
                    location.href = "cart.html";
                })
            }
        }
    });








    })













})