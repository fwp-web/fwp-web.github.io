HTMLElement.prototype.__defineGetter__("currentStyle", function () { 
	return this.ownerDocument.defaultView.getComputedStyle(this, null); 
});
var paint = "white";
function getColor(colorContainer){
	paint = colorContainer.currentStyle.backgroundColor;
 	//alert(paint);
}

function drawCanvas(canvas){
	//alert( paint );
	canvas.style.backgroundColor = paint;
}

/*window.onload = function(){
function drawCanvas(){
	for( var row=1; row<=4; row++)
		for( var column=1; column<=4; column++){
			var canvas = document.getElementById("'row_'+row+'_span_'+column'");
			alert( canvas );
			canvas.onclick = function(){
				canvas.style.backgroundColor = paint;
			};
		}
}
}
*/