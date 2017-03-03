var formcheckUtil = function(){};
formcheckUtil.prototype.setLength = function(value) {
		var values = value.split(""), length = 0;
		for(var i = 0, len = values.length; i < len; i++) {
			  if((/[^\x00-\xff]/).test(values[i])) {  //匹配双字节字符
					  length += 2;
				} else {
					  length += 1;
				}
		}
		console.log(length);
		if(length == 0) {
			  return -2;
		} else if(length < 4) {
			  return -1;
		} else if(length > 16) {
			  return 0;
		} else {
			  return 1;
		}
};

//检查是否含有类
function hasClass(node, classname) {
    if(!node.className) {
        return;
    }
    var classnames = node.className.split(" ");
    for(var i = 0, len = classnames.length; i < len; i++) {
        if(classnames[i] === classname) {
            return true;
        }
    }
    return false;
}
//添加新类
function addClass(node, classname) {
    if(hasClass(node, classname)) {
        return;
    }
    if(!node.className) {
        node.className = classname;
    } else {
        node.className += " " + classname;
    }
}
//删除指定类名
function removeClass(node, classname) {
    var classnames = node.className.split(" ");
    for(var i = 0, len = classnames.length; i < len; i++) {
        if(classnames[i] === classname) {
            classnames.splice(i, 1);
        }
    }
    node.className = classnames.join(" ");
}
//绑定事件监听
function addEvent(element, event, listener) {
    if(element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if(element.attachEvent) {
        element.attachEvent("on"+event, listener);
    } else {
        element["on"+event] = listener;
    }
}

var btn = document.getElementsByTagName("button")[0],
		message = document.getElementById("message"),
		inputarea = document.getElementsByTagName("input")[0],
		formCheck = new formcheckUtil();

//点击按钮验证表单
addEvent(btn, "click", function() {
		var input = inputarea.value,
				returnValue = formCheck.setLength(input);

	  switch (returnValue) {
	  	case -2:
	  		message.innerHTML = "名称不能为空";
				message.className = "error";
	  		break;
			case -1:
				message.innerHTML = "名称字符长度不能小于4";
				message.className = "error";
				break;
			case 0:
				message.innerHTML = "名称字符长度不能超过16";
				message.className = "error";
				break;
			case 1:
				message.innerHTML = "名称格式正确";
			  message.className = "correct";
				break;
	  	default:
				break;
	  }
});
