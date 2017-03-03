
function showAtBoard(x,y,number,arr){

    var inumberCell = $("#number-cell-" + x + "-" + y );

    inumberCell.css("background-color",getNumberBgcolor(number));
    inumberCell.css("color",getNumberColor(number));
    inumberCell.text(arr[x][y]);
   // inumberCell.text(number);


    inumberCell.animate({
    	width: gridcellWidth,
    	height: gridcellWidth,
    	top: getPosTop(x,y),
    	left: getPosLeft(x,y)
    }, 50);
}

function showMove( fromx, fromy, tox, toy ){
    var showNumberCell = $("#number-cell-"+fromx+"-"+fromy);
    showNumberCell.animate({
        top: getPosTop( tox, toy ),
        left: getPosLeft( tox, toy )
    },200);
}

function showScore( score ){
    $("#score").text(score);
}