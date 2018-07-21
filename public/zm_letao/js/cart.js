//判断用户是否登录
$.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    async:false,
    success: function (res) {
       if (res.error) {
           location.href = "login.html";
       }
    }
   
});



$(function(){
//进入页面发送ajax,获取购物车数据
$.ajax({
    type: "get",
    url: "/cart/queryCart",
    success: function (res) {
        //根据数据利用模板渲染页面结构
        var cart_html = template('cartTpl',{data:res});
        $('#cartList').html(cart_html);
    }
});







})