window.onload = function() {
    var signUp = document.getElementById("signUp"), 
        signIn = document.getElementById("signIn"), 
        signUpFs = document.getElementById("signUpFs"), 
        signInFs = document.getElementById("signInFs"), 
        downloadApp = document.getElementById("downloadApp"), 
        otherLogin = getElesByClass("otherLogin", "signInFs")[0], 
        iconsContainer = document.getElementById("iconsContainer"),
        IdentifyCode = document.getElementById("IdentifyCode"),  
        appCode = getElesByClass("appCode")[0];
    
    //注册、登录选项切换
    signUp.onclick = function(e) {
    	e = e || window.event;
    	preventDefault(e);
    	this.className = "selected";
    	signIn.className = null;
    	signInFs.style.display = "none";
    	signUpFs.style.display = "block";
    };
    signIn.onclick = function(e) {
    	e = e || window.event;
    	preventDefault(e);
    	this.className = "selected";
    	signUp.className = null;
    	signUpFs.style.display = "none";
    	signInFs.style.display = "block";
    };
    //显示和隐藏知乎二维码
    downloadApp.onclick = function(e) {
        e = e || window.event;
    	preventDefault(e);
    	display(appCode, "block");
    };
    //登录页面，显示和隐藏Icons
    otherLogin.onclick = function(e) {
    	e = e || window.event;
    	preventDefault(e);
        display(iconsContainer, "inline-block");
    };
    //注册页面，展示验证码
    setTimeout(function() {
    	generateCode();
    	IdentifyCode.style.display = "block";
    }, 1000);
};

function display(obj, target) {
    if(getStyle(obj, "display") == "none") {
    	obj.style.display = target;
    }
    else {
    	obj.style.display = "none";
    }
}

function preventDefault(event) {
	if(event.preventDefault) {
		event.preventDefault();
	}
	else {
		event.returnValue = false;
	}
}

function move(obj, target, attr) {
    clearInterval(obj.timer);
    var current = 0, speed = 0;
    obj.timer = setInterval(function() {
    	current = parseInt(getStyle(obj, attr));
        speed = (target - current)/8;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if(current == target) {
        	clearInterval(obj.timer);
        }
        else {
            obj.style[attr] = current + speed + "px";
        }
    }, 10);
}
