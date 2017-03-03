
//点击图标，缓慢返回顶部
function toTop() {
  var tTop = document.getElementById("toTop"), 
      pHeight = document.documentElement.clientHeight, 
      scrollTop = 0, 
      timer = null;

  //显示toTop图标
  window.onscroll = function() {
  	scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  	if(scrollTop >= pHeight) {
  	  tTop.style.display = "block";
  	}
  	else {
  	  tTop.style.display = "none";
  	}
  	return scrollTop;
  }

  //点击toTop，缓慢返回顶部
  tTop.onclick = function(event) {
    event = window.event || event;
    preventDefault(event);
  	clearInterval(timer);
  	timer = setInterval(function() {
  	  var nHeight = scrollTop;
  	  console.log(nHeight);
  	  var speed = (0 - nHeight) / 8;
  	  speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
  	  if(nHeight == 0) {
  	  	clearInterval(timer);
  	  }
  	  else {
  	  	document.documentElement.scrollTop = nHeight + speed;
  	  	document.body.scrollTop = nHeight + speed;
  	  }
  	}, 30)
  };
}

//阻止事件默认行为
function preventDefault(event) {
  if(event.preventDefault) {
  	event.preventDefault();
  }
  else {
  	event.returnValue = false;
  }
}