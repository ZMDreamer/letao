$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005
    });
    /* 通过接口文档获取当前页面需要的数据 */
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        success: function (response) {
            /*调用模板引擎渲染左侧页面数据 */
            var lf_html = template('ct_left', {
                data: response.rows
            })
            $('#lf_html').html(lf_html);
            $('#lf_html').find('li').eq(0).addClass('active')
            var categoryId = response.rows[0].id;
            getRightData(categoryId);
        }
    });
    /* 右边的数据是通过点击左侧的分类导航来获取的 */
    $('#lf_html').on('tap', 'a', function () {
        var categoryId = $(this).data('id');
        /* 给选中的添加一个active类 */
        $(this).parent().addClass('active').siblings().removeClass('active');
        /* 发送ajax请求根据id来获取数据 */
      getRightData(categoryId);
    })
})
/* 因为页面加载需要第一个被选中而且需要有数据所以需要封装第二个ajax函数 */
function getRightData(categoryId){
    $.ajax({
        type: "get",
        url: "/category/querySecondCategory",
        data: {
            id: categoryId
        },
        dataType: "json",
        success: function (response) {
            var rt_html = template('ct_right',{result:response.rows});
            $('.rt_html').html(rt_html);

        }
    });
}