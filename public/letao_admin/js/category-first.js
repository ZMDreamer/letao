$(function () {
    //1.进入页面发送ajax请求来获取
    //记录总共多少页后面判断用
    var page = 1;
    var pageSize = 10;
    var totalPage = 0;
    getData();
    //2.实现页面的翻页功能

    //下一页功能
    $('#next').click(function () {
        page++
        if (page > totalPage) {
            page = totalPage;
        }
        getData();
    })
    //上一页功能
    $('#previous').click(function () {
        page--
        if (page < 1) {
            page = 1;
        }
        getData();
    })
   //因为需要加载更多数据,封装一级列表数据ajax
   function getData() {
    $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
            page: page,
            pageSize: pageSize
        },
        success: function (res) {
            //获取数据计算一共有多少页
            totalPage = Math.ceil(res.total / pageSize);
            var firstCategory_html = template('firstCategoryTpl', res);
            $('#firstCategory').html(firstCategory_html);
        }
    });

}

//3.实现给页面添加分类数据功能
$('#btn-save').on('click',function(){
//获取要增加的内容,验证内容
var categoryName = $.trim($('#addCategory').val());
if (!categoryName) {
    alert('请输入要增加的内容')
}
//发送ajax增加内容
$.ajax({
    type: "post",
    url: "/category/addTopCategory",
    data: {categoryName:categoryName},
    success: function (res) {
        if (res.success) {
            location.reload();
        }else{
            alert(res.error);
        }
    }
});
})



 

})