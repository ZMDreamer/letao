$(function () {
     //定义全局变量, page和pageSize来实现分页功能
     var page = 1;
     var pageSize = 10;
     var totalPage = null;
     
    //1.页面加载发送ajax请求渲染数据
    getData();
    function getData(){
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                totalPage = res.total;
                var secondCategoryHtml = template('secondCategoryTpl', res);
                $('#category-second').html(secondCategoryHtml);
            }
        });
    }

    //2.实现页面分页功能
    $('#nextBtn').click(function(){
        page++;
        if (page > Math.ceil(totalPage/10)) {
            page = Math.ceil(totalPage/10);
        }
        getData();

    })
    $('#prevBtn').click(function(){
        page--;
        if (page < 1) {
            page = 1;
        }
        getData();

    })




    //3.添加品牌项目
    //添加商品分类数据
    $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (res) {
            var addCategoryHtml = template('addCategoryTpl', res);
            $('#addCategory').html(addCategoryHtml);
        }
    });
    //jquery图片上传插件的使用
    //定义一个变量记录图片的地址
    var picAddress = null;
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            $('#addPic').attr('src', data.result.picAddr);
            picAddress = data.result.picAddr;
        }
    });
    //点击保存按钮发送ajax请求来获取数据
    $('#save').on('click', function () {
        //获取文本框的值
        var productName = $.trim($('#productName').val());
        var categoryId = $.trim($('[name ="categoryId"]').val());
        if (categoryId == -1) {
            alert('请选择商品分类');
            return;
        }
        if (!productName) {
            alert('请输入商品名');
            return;
        }
        //发送ajax请求
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: {
                brandName: productName,
                categoryId: categoryId,
                brandLogo: picAddress,
                hot: 1
            },
            success: function (res) {
                if (res.success) {
                    location.reload();
                }
            }
        });


    })







})