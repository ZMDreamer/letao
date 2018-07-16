$(function () {
    $('#search-lk').on('focus',function(){
        
        $(this).val('')
    })
    //失去焦点事件
    $('#search-lk').on('blur',function(){
        $(this).val('搜索你喜欢的商品')
    })
    var keyArr = JSON.parse(localStorage.getItem('key')) || [];
    getHistory()
    $('#search_btn').on('tap', function () {
        var keyword = $(this).siblings().val();
        /* 判断用户是否输入值 */

        if (!keyword) {
            alert('请输入关键字');
            return;
        }

        // location.href = 'search-list.html?keyword = '+keyword;
        /* 定义一个空的数组来接受每次用户输入的localstorage的值 */
        /* 在给数组添加项目的时候要先取出浏览器里面的localstorage数据,并且需要判断数组中是否有跟你当前传入相同的数据,如果有则不需要push */
        if (keyArr.indexOf(keyword) !== -1) {
            keyword = encodeURI(keyword);
            location.href = "search-result.html?keyword="+keyword;
            return;
        }
        keyArr.push(keyword);
        /* 因为localstorage传参需要传入字符串所以需要转换利用JSON.stringfy() */
        localStorage.setItem('key', JSON.stringify(keyArr))
        getHistory()
        keyword = encodeURI(keyword);
        location.href = "search-result.html?keyword="+keyword;
    })

    /* 当没有数据显示无数据 */
    $('#clearHistory').on('click', function () {
        if (keyArr.length) {
            $('#history_data').html('');
            localStorage.removeItem('key');
            return;
        }
            
    })

    /* 利用模板动态将数据渲染在浏览历史列表 */

    function getHistory() {
        var history_html = template('history-data', {
            data: keyArr
        });
        $('#history_data').html(history_html);
    }
})