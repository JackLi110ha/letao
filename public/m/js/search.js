//搜索页面js
$(function () {
    //封装函数
    function getHtml() {
        //判断是否存在
        var arr = localStorage.getItem('hostory');
        var newArr = arr = JSON.parse(arr) || [];
        //导入模板
        var html = template('tpl', {
            list: newArr
        });
        console.log(newArr);
        $(".searchBottom .hostory").html(html);
    }
    //页面一打开就加载
    getHtml();

    $(".searchTo").on('tap', function () {
        console.log(123);
        

        //1.点击获取搜索框中的值 注意:去掉空格
        var result = $(".searchResult").val().trim();
        //2.判断是否为空
        if (result == "") {
            mui.alert('你输入的内容为空', '温馨提示');
            $(".searchResult").val("");
            //阻止往下走
            return;
        }
        //判断是否存在
        var arr = localStorage.getItem('hostory');
        var newArr = arr = JSON.parse(arr) || [];

        if (newArr.indexOf(result) != -1) {
            //说明有重复的
            newArr.splice(newArr.indexOf(result), 1);
        }
        

        newArr.unshift(result);
        //将获取的数组添加到localStorage中
        var jsonDate = JSON.stringify(newArr);
        localStorage.setItem('hostory', jsonDate);

        //将输入框清空
        $(".searchResult").val("");
        getHtml();

        //跳转到商品页面
        location='productList.html?key='+result+'&time='+new Date().getTime();
    });
    //清空历史记录
    $(".clearHostory").on('tap',function(){
        localStorage.removeItem('hostory');
        getHtml();
    });

    //使用事件代理给每一个小叉叉点击事件
    $(".hostory").on('tap','li span',function(){
        //console.log($(this).parent().data('index'));
        var index11=$(this).parent().data('index');
        var arr = localStorage.getItem('hostory');
        var newArr = JSON.parse(arr) || [];
        newArr.splice(index11,1);

         //将获取的数组添加到localStorage中
         var jsonDate = JSON.stringify(newArr);
         localStorage.setItem('hostory', jsonDate);
         getHtml();
    });
})