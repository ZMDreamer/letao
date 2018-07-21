$(function () {
    //定义全局的page和pageSize来
    var page = 1;
    var pageSize = 6;
    var totalPage = null;
    getProductData();
    function getProductData() {
        //发送ajax来渲染页面
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                var product_html = template('productTpl', res);
                totalPage = Math.ceil(res.total/pageSize);
                $('#productData').html(product_html);
            }
        });
    }
    //2.添加商品功能
    //1>图片上传功能
    //定义一个空的数组记录图片数据
    var picData = [];
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            picData.push(data.result);
            var pic_html = template('addPicTpl', {
                data: picData
            });
            $('#previewPic').html(pic_html);
        }
    });
    //发送ajax请求来获取品牌信息
    $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (res) {
            console.log(res);
            var brand_html = template('productNameTpl', res);
            $('#productName').html(brand_html);
        }
    });
    //点击添加按钮发送ajax请求
    $('#addProduct').on('click', function () {
        //获取文本框内的信息
        var productName = $.trim($('[name = brandName]').val());

        var prodcutDescrible = $.trim($('[name = prodcutDescrible]').val());
        var  totalNumber = $.trim($('[name =totalNumber]').val());

        var size = $.trim($('[name = size]').val());
        var oldPrice = $.trim($('[name = oldPrice]').val());
        var discountPrice = $.trim($('[name = discountPrice]').val());
        var brandName = $.trim($('[name = brandName]').val());
        if (brandName==-1) {
            alert('请选择品牌 ');
            return;
        }
        if (!productName) {
            alert('请输入产品名称');
            return;
        }
        if (!prodcutDescrible) {
            alert('请输入产品描述');
            return;
        }
        if (!totalNumber) {
            alert('请输入产品数量');
            return;
        }
        if (!size) {
            alert('请输入产品尺码,如29-39');
            return;
        }
        if (!oldPrice) {
            alert('请输入商品原价');
            return;
        }
        if (!discountPrice) {
            alert('请输入商品折扣');
            return;
        }
        if (!prodcutDescrible) {
            alert('请输入商品描述');
            return;
        }
        $.ajax({
            type: "POST",
            url: "/product/addProduct",
            data: {
                proName: productName,
                oldPrice: oldPrice,
                price: discountPrice,
                proDesc: prodcutDescrible,
                size: size,
                statu: 1,
                num: totalNumber,
                brandId: brandName,
                pic: picData
            },
            success: function (res) {
                if (res.success) {
                     location.reload();
                }else{
                    alert(res.error);
                }
            }
        });



    })
    //3.实现分页功能
    //1.上一页的功能
    $('#previous').on('click',function(){
        page--;
        if (page < 1) {
            page = 1;
        }
        getProductData();


    })
    $('#next').on('click',function(){
        page++;
        if (page > totalPage) {
            page = totalPage;
        }
        getProductData();


    })











})