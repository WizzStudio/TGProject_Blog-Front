    //根据设备屏幕尺寸大小定制导航栏

    window.onload = function () {
        if(document.body.clientWidth < 992){
            document.getElementById('minNav').style.display = 'block';
            document.getElementById('maxNav').style.display = 'none';
            document.getElementById('body').classList.remove('col-md-8');
            document.getElementById('body').classList.add('col-md-12');
        } else{
            document.getElementById('minNav').style.display = 'none';
            document.getElementById('maxNav').style.display = 'block';
            document.getElementById('body').classList.remove('col-md-12');
            document.getElementById('body').classList.add('col-md-8');

        }
    }
    window.onresize = function () {
        if(document.body.clientWidth < 992){
            document.getElementById('minNav').style.display = 'block';
            document.getElementById('maxNav').style.display = 'none';
            document.getElementById('body').classList.remove('col-md-8');
            document.getElementById('body').classList.add('col-md-12');
        } else{
            document.getElementById('minNav').style.display = 'none';
            document.getElementById('maxNav').style.display = 'block';
            document.getElementById('body').classList.remove('col-md-12');
            document.getElementById('body').classList.add('col-md-8');
        }
    }