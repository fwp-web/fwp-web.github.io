function init() {
    var container = $(".container")[0], 
        imgSlider = $("#img_slider")[0], 
        imgList = $("#img_slider li"), 
        prevBtn = $("#prev")[0], 
        nextBtn = $("#next")[0], 
        btnContainer = $("#buttons")[0],
        imgWidth = getStyle(imgList[0], "width"), 
        imgNumber = imgList.length-2, 
        index = 1, 
        animated = false, 
        inter = 3000, 
        timer, txt = "";

    imgSlider.style.width = (imgNumber + 2) * imgWidth + "px";
    imgSlider.style.left = -imgWidth + "px";
    txt = generateButtons(imgNumber);       //生成按钮
    btnContainer.innerHTML = txt;
    var buttons = $("#buttons span");

    // 点击箭头效果
    $.clickOne(prevBtn, clickPrev);
    function clickPrev() {
        if(animated) {
            return;
        }
        if(index == 1) {
            index = imgNumber;
        } else {
            index--;
        }
        animate(imgWidth);
        showButton();
    }
    $.clickOne(nextBtn, clickNext);
    function clickNext() {
        if(animated) {
            return;
        }
        if(index == imgNumber) {
            index = 1;
        } else {
            index++;
        }
        animate(-imgWidth);
        showButton();
    }

    // 点击buttons效果
    $.click("#buttons", function(event) {
        var e = event || window.event, 
            target = e.target || e.srcElement;
        if(animated) {
            return;
        }
        if(target.tagName.toLowerCase() == "span") {
            if(hasClass(target, "on")) {
                return;
            }
            var currentIndex = parseInt(target.getAttribute("index"));
            animate(-imgWidth * (currentIndex - index));
            index = currentIndex;
            showButton();
        }
        
    });

    //自动播放
    $.onOne(container, "mouseenter", stop);
    $.onOne(container, "mouseleave", play);

    function showButton() {    //显示当前照片对应的button
        for(var i = 0, len = buttons.length; i < len; i++) {
            if(hasClass(buttons[i], "on")) {
                removeClass(buttons[i], "on");
                break;
            }
        }
        addClass(buttons[index - 1], "on");
    }

    //图片切换效果
    function animate(offset) {
        animated = true;
        var left = parseInt(imgSlider.style.left) + offset, 
            min = -(imgNumber) * imgWidth, 
            time = 500, 
            interval = 10, 
            speed = offset / (time / interval);

        function go() {
            var currentOffset = parseInt(imgSlider.style.left);
            if((speed < 0 && currentOffset > left) || (speed > 0 && currentOffset < left)) {
                imgSlider.style.left = currentOffset + speed + "px";
                setTimeout(go, interval);
            } else {
                imgSlider.style.left = left + "px";
                if(left < min) {
                    imgSlider.style.left = -imgWidth + "px";
                } else if(left > -imgWidth) {
                    imgSlider.style.left = min + "px";
                }
                animated = false;
            }
        }
        go();
    }

    // 自动轮播效果
    function play() {
        timer = setInterval(clickNext, inter);
    }
    function stop() {
        clearInterval(timer);
    }

    play();
}

function generateButtons(num) {
    var text = "";
    text += "<span index='1' class='on'></span>";
    for(var i = 1; i < num; i++) {
        text += "<span index='" + (i+1) +"'></span>";
    }
    return text;
}

window.onload = init;