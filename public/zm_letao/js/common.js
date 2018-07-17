$(function () {
            // mui框架会默认阻止a链接的跳转,所以必须解除跳转
            // $('body').on('tap','a',function(){

            //     // location.href = $(this).attr('href');
            //     mui.openWindow({
            //         url: $(this).attr('href')
            //     })
            // })
            // 页面滚动区域
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005
            });

            // 跳转页面
            mui('body').on('tap', 'a', function () {

                mui.openWindow({
                    url: this.href
                })

            });
            mui("body").on("click", "a", function () {
                mui.openWindow({
                    url: this.href
                })
            })



        })
        
/* 因为我们ajax需要传递一个keyword的id地址给数据库,所以封装一个函数来获取url地址里面的参数*/

function getKeyword(URL, name) {
    /* 传进来的是一个字符串,所以需要进行转换获取值*/
    // 1.利用查找?所在的位置来截取
    var index = URL.indexOf('?') + 1;
    var targetArr = URL.substr(index).split('&');
    //3.循环遍历数组中的每一项来跟需要得到的name进行对比
    for (var i = 0; i < targetArr.length; i++) {
        // 2.通过'='号来将截取的字符串生成数组
        var target = targetArr[i].split('=');
        if (target[0] == name) {
            return target[1];
        }
    }
    return null;
}