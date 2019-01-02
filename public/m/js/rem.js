window.addEventListener('load',function(){
    //设置html文字大小
    var deSign = 750;
    var fontSize = 200;
    window.addEventListener('resize', setSize);
    function setSize() {
        var size = document.documentElement.offsetWidth || document.body.offsetWidth;
        var getSize = size * fontSize / deSign;
        document.documentElement.style.fontSize = getSize + 'px';
    }
    setSize();
});