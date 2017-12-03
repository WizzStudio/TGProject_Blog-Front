    //根据设备屏幕尺寸大小定制导航栏

    window.onload = function () {
        if(document.body.clientWidth < 992){
            document.getElementById('minNav').style.display = 'block';
            document.getElementById('maxNav').style.display = 'none';
        } else{
            document.getElementById('minNav').style.display = 'none';
            document.getElementById('maxNav').style.display = 'block';
        }
    }
    window.onresize = function () {
        if(document.body.clientWidth < 992){
            document.getElementById('minNav').style.display = 'block';
            document.getElementById('maxNav').style.display = 'none';
        } else{
            document.getElementById('minNav').style.display = 'none';
            document.getElementById('maxNav').style.display = 'block';
        }
    }