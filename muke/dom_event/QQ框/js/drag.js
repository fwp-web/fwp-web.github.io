//通过class来获取对象
function getEleByClass(classname, parent) {     
    var oParent=parent?document.getElementById(parent):document,
        eles=[],
        elements=oParent.getElementsByTagName('*');

    for(var i=0,l=elements.length;i<l;i++){
        if(elements[i].className==classname){
          eles.push(elements[i]);
        }
    }
    return eles;
}

var loginPanel = document.getElementById("loginPanel"), 
    logo = getEleByClass("login_logo_webqq", "loginPanel")[0],
    close = document.getElementById("ui_boxyClose");
//鼠标拖动效果
function init() {      
	logo.onmousedown = downMove;
	close.onclick = closePanel;

	//选择下拉列表框，状态切换
	var loginState = document.getElementById("loginState"), 
	    stateList = document.getElementById("loginStatePanel"), 
	    lists = stateList.getElementsByTagName("li"), 
	    stateshow = document.getElementById("loginStateShow"), 
	    stateTxt = document.getElementById("login2qq_state_txt");
    //点击选择，显示下拉狂
    loginState.onclick = function(event) {
    	event = event || window.event;
    	stateList.style.display = "block";
    	stopPropagation(event);
    };
    //鼠标滑过、点击状态
    for(var i=0; i<lists.length; i++) {
        lists[i].onmouseover = function() {
        	this.className = "statePanel_li over";
        };
        lists[i].onmouseout = function() {
        	this.className = "statePanel_li";
        };
    	lists[i].onclick = function(event) {
    		event = event || window.event;
    		stateTxt.innerHTML = getEleByClass("stateSelect_text", this.id)[0].innerHTML;
    		stateshow.className = "login-state-show " + this.id;
    		stateList.style.display = "none";
    		//阻止事件冒泡
    		stopPropagation(event);
    	};
    }
    //点击文档任意地方，隐藏下拉框
    document.onclick = function() {
    	stateList.style.display = "none";
    };
}
//鼠标按下
function downMove(event) {
    event = event || window.event;
    var disX=event.clientX-loginPanel.offsetLeft,
        disY=event.clientY-loginPanel.offsetTop;
      
    document.onmousemove = function(event) {
    	event = event || window.event;
    	move(event, disX, disY);
    };

    document.onmouseup = function() {
		document.onmousemove = null;
		document.onmouseup = null;
	}
}
//鼠标移动，面板移动
function move(e, disx, disy) {
	var x = e.clientX - disx, 
	    y = e.clientY - disy, 
	    winW=document.documentElement.clientWidth || document.body.clientWidth,
        winH=document.documentElement.clientHeight || document.body.clientHeight,
	    minW = 0, 
	    maxW = winW - loginPanel.offsetWidth - 10, 
	    minH = 0, 
	    maxH = winH - loginPanel.offsetHeight;

	if(x < minW)
		x = minW;
	else if(x > maxW)
		x = maxW;
	if(y < minH)
		y = minH + 10;
	else if(y > maxH)
		y = maxH;
	loginPanel.style.left = x + "px";
	loginPanel.style.top = y + "px";
}

//关闭登录框
function closePanel() {
    loginPanel.style.display = "none";
}

//阻止事件冒泡
function stopPropagation(event) {
    if(event.stopPropagation) {
    	event.stopPropagation();
    }
    else {
    	event.cancelBubble = true;
    }
}

window.onload = init;