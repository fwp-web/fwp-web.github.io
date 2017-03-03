var formCheck = function(){
		this.checkState = [false, false, false, false, false];
		this.pwd = "";
};
formCheck.prototype.setNameLength = function(value) {
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
//验证名称格式
formCheck.prototype.checkName = function(input, message, inputArea) {
		var returnValue = this.setNameLength(input);
		switch (returnValue) {
	  	case -2:
	  		message.innerHTML = "名称不能为空";
				message.className = "error";
				inputArea.style.borderColor = "#f00";
	  		break;
			case -1:
				message.innerHTML = "名称字符长度不能小于4";
				message.className = "error";
				inputArea.style.borderColor = "#f00";
				break;
			case 0:
				message.innerHTML = "名称字符长度不能超过16";
				message.className = "error";
				inputArea.style.borderColor = "#f00";
				break;
			case 1:
				message.innerHTML = "名称格式正确";
			  message.className = "correct";
				inputArea.style.borderColor = "#0f0";
				this.checkState[0] = true;
				break;
	  	default:
				break;
	  }
}
//验证密码格式
formCheck.prototype.checkPwd1 = function(pwd, message, inputArea) {
		if(pwd == "" || pwd == null) {
				message.innerHTML = "密码不能为空";
				message.className = "error";
				inputArea.style.borderColor = "#f00";
		} else if((/^\S{4,16}$/).test(pwd)) {
				message.innerHTML = "密码格式正确";
				message.className = "correct";
				inputArea.style.borderColor = "#0f0";
				this.pwd = pwd;
				this.checkState[1] = true;
		} else {
				message.innerHTML = "密码格式错误";
				message.className = "error";
				inputArea.style.borderColor = "#f00";
		}
}
//验证两次密码是否一样
formCheck.prototype.checkPwd2 = function(pwd2, message, inputArea) {
		if(this.pwd == "") {
				message.innerHTML = "请先输入密码";
				message.className = "error";
				inputArea.style.borderColor = "#f00";
		} else if(pwd2 == "" || pwd2 == null) {
				message.innerHTML = "密码不能为空";
				message.className = "error";
				inputArea.style.borderColor = "#f00";
		} else if(this.pwd !== pwd2) {
				message.innerHTML = "密码与上次不一致";
				message.className = "error";
				inputArea.style.borderColor = "#f00";
		} else {
				message.innerHTML = "密码正确";
				message.className = "correct";
				inputArea.style.borderColor = "#0f0";
				this.checkState[2] = true;
		}
}
//验证邮箱格式
formCheck.prototype.checkEmail = function(email, message, inputArea) {
		if(email == "" || email == null) {
				message.innerHTML = "邮箱不能为空";
				message.className = "error";
				inputArea.style.borderColor = "#f00";
		} else if((/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/).test(email)) {
				message.innerHTML = "邮箱格式正确";
				message.className = "correct";
				inputArea.style.borderColor = "#0f0";
				this.checkState[3] = true;
		} else {
				message.innerHTML = "邮箱格式错误";
				message.className = "error";
				inputArea.style.borderColor = "#f00";
		}
}
//验证手机格式
formCheck.prototype.checkPhone = function(phone, message, inputArea) {
		if(phone == "" || phone == null) {
				message.innerHTML = "手机号码不能为空";
				message.className = "error";
				inputArea.style.borderColor = "#f00";
		} else if(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone)) {
				message.innerHTML = "手机号码格式正确";
				message.className = "correct";
				inputArea.style.borderColor = "#0f0";
				this.checkState[4] = true;
		} else {
				message.innerHTML = "手机号码格式错误";
				message.className = "error";
				inputArea.style.borderColor = "#f00";
		}
}
//重置
formCheck.prototype.reset = function() {
		this.checkState = [false, false, false, false, false];
		this.pwd = "";
}
//判断是否全部验证通过
formCheck.prototype.isPass = function() {
		for(var i = 0, len = this.checkState.length; i < len; i++) {
				if(!this.checkState[i]) {
						alert("提交失败");
						return;
				}
		}
		if(i >= len) {
				alert("提交成功");
		}
}

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
		inputareas = document.getElementsByTagName("input"),
		formcheck = new formCheck(),
		i, len;

//为各个输入框添加获得焦点事件
function focusEvent(id, message) {
		switch (id) {
			case "name":
				message.innerHTML = "名称长度应为4~16个字节";
				message.className = "normal";
				break;
			case "pwd1":
					message.innerHTML = "密码长度应为4~16个字节";
					message.className = "normal";
					break;
			case "pwd2":
					message.innerHTML = "确认密码应与上次输入一致";
					message.className = "normal";
					break;
			case "email":
					message.innerHTML = "请输入正确的邮箱地址";
					message.className = "normal";
					break;
			case "phone":
					message.innerHTML = "请输入有效的手机号码";
					message.className = "normal";
					break;
			default:
					break;
		}
}
function blurEvent(id, input, message, inputArea) {
		switch (id) {
			case "name":
					formcheck.checkName(input, message, inputArea);
					break;
			case "pwd1":
					formcheck.checkPwd1(input, message, inputArea);
					break;
			case "pwd2":
					formcheck.checkPwd2(input, message, inputArea);
					break;
			case "email":
					formcheck.checkEmail(input, message, inputArea);
					break;
			case "phone":
					formcheck.checkPhone(input, message, inputArea);
					break;
			default:
					break;
		}
}
for(i = 0, len = inputareas.length; i < len; i++) {
		addEvent(inputareas[i], "focus", function(event) {
				var e = event || window.event,
						target = e.target || e.srcElement,
						ms = target.parentElement.parentElement.lastElementChild;
				//console.log(target.id);
				focusEvent(target.id, ms);
		});
}
//为各个输入框添加失去焦点事件
for(i = 0, len = inputareas.length; i < len; i++) {
		addEvent(inputareas[i], "blur", function(event) {
				var e = event || window.event,
						target = e.target || e.srcElement,
						ms = target.parentElement.parentElement.lastElementChild,
						input = target.value;
				console.log(target.id);
				blurEvent(target.id, input, ms, target);
		});
}
//点击按钮验证表单
addEvent(btn, "click", function() {
		formcheck.isPass();
});
