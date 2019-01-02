window.addEventListener('load',function(){
    //屏幕拉伸效果
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //点击事件
    for(var i=0;i<$(".topUl>li").length;i++){
        $(".topUl>li")[i].setAttribute('index',i);

        $($(".topUl>li")[i]).on('click',function(){
            var index=this.getAttribute('index');

            var isOk=true;
            for(var i=0;i<$(".right ul").length;i++){
                if(index==i){
                    isOk=false;
                    console.log('一样了'+i+","+index);
                    $($(".right ul")[i]).addClass('active').siblings('ul').removeClass('active');
                }
            }
            console.log(isOk);
            if(isOk==true){
                $("#main .right").html("找不到相应的信息,请重新查找");
            }

        });
    }

    
});