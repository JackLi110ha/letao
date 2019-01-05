$(function () {

    var page = 1;

    var obj = {
        page: page,
        pageSize: 3,
        proName: ""
    }
    //获取key
    obj.proName = getUrl('key');

    //当前商品页面添加搜索事件
    $(".searchTo").on('tap', function () {
      
        //去除空格
        var inputVal = $(".searchResult").val().trim();
        //做非空判断
        if (inputVal == "") {
            mui.alert('输入内容为空', '温馨提示');
            return;
        }
        //使用全局变量赋值
        obj.proName = inputVal;

        getAjax();
    });



    //价格销量点击事件
    $(".title a").on('tap', function () {
    
        //获取自定义属性值
        var typeSort = $(this).data('sort-type');
        //console.log(typeSort);
        //添加类
        $(this).addClass('active').siblings().removeClass('active');

        //获取排序数据
        var sort = $(this).data('sort');
        var newSort = sort == 1 ? 2 : 1;
        //再添加到标签中
        this.dataset['sort'] = newSort;

        //更换字体图标
        if (sort == 1) {
            $(this).find('i').addClass('fa-angle-down').removeClass('fa-angle-up')
        } else {
            $(this).find('i').addClass('fa-angle-up').removeClass('fa-angle-down')
        }

        //添加之前先将之前的对象内容重置
        obj = {
            page: page,
            pageSize: 3,
            proName: obj.proName
        }
        //给对象重新添加新属性和属性值
        obj[typeSort] = newSort;
        //重新渲染
        getAjax();
    });


    getAjax();
    //根据值发起ajax请求
    function getAjax() {
        $.ajax({
            url: "/product/queryProduct",
            data: obj,
            success: function (res) {
                //console.log(res.data);
                //引用模板
                var html = template('product-tpl', {
                    list: res.data
                });
                //渲染到页面当中
                $(".content .mui-row").html(html);
                //重置下拉刷新
                mui('#refreshContainer').pullRefresh().refresh(true);
                page=1;
            }
        });
    }


    //封装一个url截取函数
    function getUrl(name) {
        //获取地址栏的内容
        //?key=%E9%9E%8B&time=1546673982175
        var str = location.search;
        //去除? 
        str = str.substr(1);
        //将浏览器默认的编码格式转成正常
        str = decodeURI(str);
        //对字符串分割
        var arr = str.split('&');
        //遍历数组
        for (var i = 0; i < arr.length; i++) {
            //console.log(arr[i]);
            var newArr = arr[i].split('=');
            if (newArr[0] == name) {
                return newArr[1];
            }
        }
    }




    //下拉刷新
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                callback: function () {
                    
                    getAjax();
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                    //重置下拉刷新
                    mui('#refreshContainer').pullRefresh().refresh(true);
                    page=1;
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                callback: function () {
                    //给页码每一次刷新都加一
                    page++;
                    $.ajax({
                        url: "/product/queryProduct",
                        data: {
                            page: page,
                            pageSize: 3,
                            proName: obj.proName
                        },
                        success: function (res) {
                            console.log(obj);
                            console.log(page);
                            if (res.data.length > 0) {
                                //引用模板
                                var html = template('product-tpl', {
                                    list: res.data
                                });
                                //渲染到页面当中 添加到页面当中
                                $(".content .mui-row").append(html);
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                
                            } else {
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                
                            }

                        }
                    });
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }

        }
    });
})