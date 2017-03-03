var data = ["谢谢参与", "谢谢参与", "iphone6s玫瑰金", "200元购物券", "cannon相机", "谢谢参与", "100元购物券", "卡通抱枕", "韩国济州岛双人游"],   
    timer = null, 
    flag = 0;

window.onload = init;

function init() {
    //鼠标点击事件
    var play = document.getElementById("play"),  
        stop = document.getElementById("stop");
    play.onclick = playFun;
    stop.onclick = stopFun;
    //键盘事件
    document.onkeyup = function(event) {
        event = event || window.event;
        if(event.keyCode == 32) {  //按下空格键
            if(flag == 0) {
                playFun();
            }
            else {
                stopFun();
            }
        }
    };
}

//开始抽奖
function playFun() {
    var title = document.getElementById("title"), 
        play = document.getElementById("play");
	clearInterval(timer);
	timer = setInterval(function() {
        var random = Math.floor(Math.random()*9);
        title.innerHTML = data[random];
	}, 50);
    play.style.background = "#999";
    flag = 1;
}
//停止抽奖
function stopFun() {
    clearInterval(timer);
    var play = document.getElementById("play");
    play.style.background = "#036";
    flag = 0;
}