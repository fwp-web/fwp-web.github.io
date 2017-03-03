function change(obj, json, fn) {
	var speed = 0, curattr, flag;
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		flag = true;
		for(attr in json) {
		    if(attr == "opacity") {
			    curattr = Math.round(parseFloat(getStyle(obj, attr))*100);
		    }
		    else {
                curattr = parseInt(getStyle(obj, attr));
            }
		    speed = (json[attr] - curattr)/8;
		    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		    if(curattr != json[attr]) {
			    flag = false;
		    }  
			if(attr == "opacity") {
				obj.style.filter = "alpha(opacity:" + (curattr+speed) + ")";
                obj.style.opacity = (curattr + speed) / 100;
			}
			else {
				obj.style[attr] = curattr + speed + "px";
			}
		}
		if(flag) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}
	}, 30);
}

function getStyle(obj, attr) {
	if(obj.currentStyle) {
	    return obj.currentStyle[attr];
	}
	else {
		return getComputedStyle(obj, false)[attr];
	}
}