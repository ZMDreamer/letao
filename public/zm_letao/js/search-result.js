var keyword = getKeyword(location.href, 'keyword');
var This = null;
var page = 1;
var price = 1;
var search_html = "";
$(function () {
    /* 通过搜索页面传递过来的参数来发送ajax请求, 获取数据渲染页面结构 */
    /* 获取当前页面完整的地址栏为字符串 */


    //当向下滑动的时候应该加载更多的数据,利用mui自带向下刷新的功能来实现
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：i.class等
            up: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: true, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    })

    //点击价格进行排序
    $('#priceSort').on('tap', function () {
        //1.根据接口文档可以知道可以按照1升序,2降序来排行
        price = price == 1 ? 2 : 1;
        //2.清除页面里面的类容重新加载数据
        search_html = "";
        page = 1;
        
        // 若部分业务中，有重新触发上拉加载的需求（比如当前类别已无更多数据，但切换到另外一个类别后，应支持继续上拉加载），此时调用.refresh(true)方法，可重置上拉加载控件，如下代码：

        //pullup-container为在mui.init方法中配置的pullRefresh节点中的container参数；
        //注意：refresh()中需传入true
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();

    })




})

//封装ajax获取数据
function getData() {
    if (!This) {
        This = this;
    }
    //发送ajax请求获取数据
    $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: {
            page: page++,
            pageSize: 3,
            proName: keyword,
            price: price,
        },
        success: function (response) {
            console.log(response);
            search_html += template('searchResult', response);
            //将模板获取的数据渲染到界面
            $('#search_result').html(search_html);
            if (response.data.length > 0) {
                This.endPullupToRefresh(false);

            } else {
                This.endPullupToRefresh(true);
            }

        }
    });
}




