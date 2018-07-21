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
    $('.pr-content').on('tap','.pr-size span',function(){
        //在加入购物车按钮上记录当前添加的尺码
        $(this).addClass('mui-btn-danger').siblings('span').removeClass('mui-btn-danger');






    })














})