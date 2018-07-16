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