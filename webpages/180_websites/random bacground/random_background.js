function randomColor(){
	return "#" + Math.random().toString(16).slice(2,8);
}

function changeBgColor(){
	var body = document.getElementsByTagName("body")[0];
	body.style.backgroundColor = randomColor();
}