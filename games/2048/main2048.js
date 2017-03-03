var board = new Array(); //存储每个小格中数字的值
var score = 0;
var hasAdded = new Array();  //用来判断当前位置是否发生过叠加 
var specialName = new Array();  //存储特别名称

//触控起始坐标点
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
	prepareForMobile();
	newGame();
});

function prepareForMobile(){
	if( window.screen.availWidth>=500){
		containerWidth = 500;
		gridcellWidth = 100;
		cellWidth = 20;
	}
	$("#grid-container").css("width", containerWidth-2*cellWidth);
	$("#grid-container").css("height", containerWidth-2*cellWidth);
	$("#grid-container").css("padding", cellWidth);
	$("#grid-container").css("border-radius", 0.02*containerWidth);

	$(".grid-cell").css("width", gridcellWidth);
	$(".grid-cell").css("height", gridcellWidth);
	$(".grid-cell").css("border-radius", 0.02*gridcellWidth);	
}

function newGame(){
	//初始化游戏方格
	init();
	//随机选取两个方格放入数字
	generateOneNumber();
	generateOneNumber();
}
function init(){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css("top",getPosTop(i,j));
			gridCell.css("left",getPosLeft(i,j));
		}
		//初始化board
	for(var i=0;i<4;i++){
		board[i]=new Array();
		hasAdded[i] = new Array();
		specialName[i] = new Array();
		for(var j=0;j<4;j++){
			board[i][j]=0;
			hasAdded[i][j] = false;
			specialName[i][j] = "";
		}
	}
	score = 0;
	updateBoardView();
}

function updateBoardView(){
	$(".number-cell").remove();
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
			var numberCell = $("#number-cell-"+i+"-"+j);
			if(board[i][j]==0){    
				numberCell.css("width","0px");
				numberCell.css("height","0px");
				numberCell.css("top",getPosTop(i,j)+gridcellWidth/2);
				numberCell.css("left",getPosLeft(i,j)+gridcellWidth/2);
			}else{
				numberCell.css("width",gridcellWidth);
				numberCell.css("height",gridcellWidth);
				numberCell.css("top",getPosTop(i,j));
				numberCell.css("left",getPosLeft(i,j));
				numberCell.css("background-color",getNumberBgcolor(board[i][j]));
				numberCell.css("color",getNumberColor(board[i][j]));
				special(i,j,specialName,board);
				numberCell.text(specialName[i][j]);
				//numberCell.text(board[i][j]);
			}
			hasAdded[i][j] = false;
		}
		$(".number-cell").css("line-height", gridcellWidth+"px");
		$(".number-cell").css("font-size", 0.06*gridcellWidth+"px");

		$("#score").text(score);
}

function generateOneNumber(){
	//判断是否还有剩余空格
	 
    if(nospace(board))
        return false; 

    //随机一个位置
    var randx = parseInt( Math.floor(Math.random() * 4 ));
    var randy = parseInt( Math.floor(Math.random() * 4 ));
    var times = 0;
    while( times<50 ){
        if( board[randx][randy] == 0 )
            break;

        randx = parseInt( Math.floor(Math.random()  * 4 ));
        randy = parseInt( Math.floor(Math.random() * 4 ));
        times++;
    }
    if( times == 50){
    	for( var i=0;i<4;i++ )
    		for( var j=0;j<4;j++ ){
    			if( board[i][j] == 0){
    				randx = i;
    				randy = j;
    			}
    		}
    }
    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    special(randx,randy,specialName,board);
    showAtBoard( randx , randy , randNumber, specialName);

    return true;
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37:  //left
			if( moveLeft() ){
				event.preventDefault();
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 38:  //up
			if( moveUp() ){
				event.preventDefault();
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 39:  //right
			if( moveRight() ){
				event.preventDefault();
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 40:  //down
			if( moveDown() ){
				event.preventDefault();
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		default: break;
	}
});



document.addEventListener("touchstart",function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

document.addEventListener("touchmove",function(event){
	event.preventDefault();
});

document.addEventListener("touchend",function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;

	var detax = endx - startx;
	var detay = endy - starty;

	if( Math.abs( detax ) < 0.3*gridcellWidth && Math.abs( detay ) < 0.3*gridcellWidth )
		return;

	if(Math.abs( detax ) >= Math.abs( detay )){         //x方向上滑动
		if( detax>=0 ){
			//move right
			if( moveRight() ){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
		else{
			//move left
			if( moveLeft() ){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
	}
	else{                                              //y方向上滑动
		if( detay>=0 ){
			//move down
			if( moveDown() ){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
		else{
			//move up
			if( moveUp() ){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
	}
});

function gameOver(){
	var confail = confirm("修行未达到最高境界, 是否继续挑战？");
	if( confail == true){
		newGame();
	}
}
function isGameOver(){        //game over
	if( nospace( board ) && nomove( board )){
		gameOver();
	}
}

function moveLeft(){ 
         //move left
	if( !canMoveLeft(board))
		return false;

	//moveleft
	for( var i=0;i<4;i++ )
		for( var j=1;j<4;j++ ){
			if( board[i][j] != 0){

				for( var k=0;k<j;k++ ){
					if( board[i][k] == 0 && noBarrierHorizontal( i,k,j,board )){
						//move
						showMove(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if( board[i][k] == board[i][j] && noBarrierHorizontal( i,k,j,board ) && !hasAdded[i][k]){
						//move and add
						showMove(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						showScore( score );
						hasAdded[i][k] = true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveUp(){             //move up
	if( !canMoveUp( board ) ){
		return false;
	}
	//moveup
	for( var j=0;j<4;j++ )
		for( var i=1;i<4;i++){
			if( board[i][j] != 0 ){
				for( var k=0;k<i;k++ ){
					if( board[k][j] == 0 && noBarrierVertical( j, k, i, board)){
						//move
						showMove( i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if( board[k][j] == board[i][j] && noBarrierVertical( j, k, i, board) && !hasAdded[i][k]){
						//move and add
						showMove( i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						showScore( score );
						hasAdded[k][j] = true;
						continue;
					}				
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveRight(){ 
         //move right
	if( !canMoveRight(board))
		return false;

	//moveright
	for( var i=0;i<4;i++ )
		for( var j=2;j>=0;j-- ){
			if( board[i][j] != 0){

				for( var k=3;k>j;k-- ){
					if( board[i][k] == 0 && noBarrierHorizontal( i,j,k,board )){
						//move
						showMove(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if( board[i][k] == board[i][j] && noBarrierHorizontal( i,j,k,board ) && !hasAdded[i][k]){
						//move and add
						showMove(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						showScore( score );
						hasAdded[i][k] = true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveDown(){             //move down
	if( !canMoveDown( board ) ){
		return false;
	}
	//movedown
	for( var j=0;j<4;j++ )
		for( var i=2;i>=0;i--){
			if( board[i][j] != 0 ){
				for( var k=3;k>i;k-- ){
					if( board[k][j] == 0 && noBarrierVertical( j, i, k, board)){
						//move
						showMove( i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if( board[k][j] == board[i][j] && noBarrierVertical( j, i, k, board)){
						//move and add
						showMove( i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						showScore( score );
						hasAdded[k][j] = true;
						continue;
					}				
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}