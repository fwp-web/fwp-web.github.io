function getStyle(obj, attr) {
	if(obj.style[attr]) {
		return obj.style[attr];
	}
	else if(obj.currentStyle) {
	    return obj.currentStyle[attr];
	}
	else {
		return getComputedStyle(obj, false)[attr];
	}
}