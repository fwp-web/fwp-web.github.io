window.onload=function(){
	var box=document.getElementById('divselect'),
	    title=box.getElementsByTagName('cite')[0],
	    menu=box.getElementsByTagName('ul')[0],
	    as=box.getElementsByTagName('a'),
      index=-1;
   
    // 点击三角时
    title.onclick=function(event){
      // 执行脚本
      event = event || window.event;
      menu.style.display = "block";
      if(event.stopPropagation) {
          event.stopPropagation();
      }
      else {
          event.cancelBubble = true;
      }
    };  
    
   // 滑过滑过、离开、点击每个选项时
      // 执行脚本
    for(var i=0; i<as.length; i++) {
        as[i].onmouseover = function() {
          for(var j=0; j<as.length; j++) {
              as[j].style.background = "#fff";
          }
          this.style.background = "#999";
        };
        as[i].onclick = function() {
            title.innerHTML = this.innerHTML;
            menu.style.display = "none";
            index = -1;
        };
    }
    //键盘事件
    document.onkeyup = function(event) {
        if(menu.style.display == "none") {
           document.onkeyup = null;
        }
        else {
            event = event || window.event;
            for(var i=0; i<as.length; i++) {
                 as[i].style.background = "#fff";
            }
            //按下↓键
            if(event.keyCode == 40) {
                index++;
                if(index >= as.length) {
                    index = 0;
                }
                as[index].style.background = "#999";
            }   
            //按下↑键
            if(event.keyCode == 38) {
                if(index <= 0) {
                    index = as.length;
                }
                index--;
                as[index].style.background = "#999";
            }
            //按下回车键
            if(event.keyCode == 13 && index != -1) {
                title.innerHTML = as[index].innerHTML;
                menu.style.display = "none";
                index = -1;
            }
        }
    };
   // 点击页面空白处时
       // 执行脚本
    document.onclick = function() {
        menu.style.display = "none";
    };
 }