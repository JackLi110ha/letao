window.addEventListener('load',function(){

    //屏幕拉伸效果
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //左侧数据请求
    $.ajax({
        url: "/category/queryTopCategory",
        success: function (res) {
            // console.log(res);
            var html=template('left-tpl',res);
            $(".topUl").html(html);
        }
    });

    //左边点击事件 使用事件代理的方式
    $(".topUl").on('tap','li a',function(){
        $(this).parent().addClass('active').siblings('li').removeClass('active');
        var id=$(this).data('id');
        //获取当前点击的Id
        doChange(id);
    });
    doChange(1);
    //封装右边获取数据的函数
      function doChange(id){
        //右侧数据请求
        $.ajax({
            url: "/category/querySecondCategory",
            data:{id:id},
            success: function (res) {
                console.log(res);
                //获取模板
                var html=template('right-tpl',res);
                console.log(html);
                //往页面添加内容
                $(".right .active .mui-row").html(html);
            }
        });
    }
});

