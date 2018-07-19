$(function(){
    var id = getKeyword(location.href,'id');
//1.根据id通过ajax请求获取页面的数据

$.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {id:id},
    success: function (res) {
        if (res.id) {
            console.log(res);
            var detail_html = template('detailTpl',res)
            console.log(detail_html)
        }else{
            mui.toast('当前无法获取数据');
        }
    }
});














})