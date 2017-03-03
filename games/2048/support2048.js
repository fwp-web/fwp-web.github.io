documentWidth = window.screen.availWidth;
containerWidth = 0.92*documentWidth;
gridcellWidth = 0.18*documentWidth;
cellWidth = 0.04*documentWidth;

function getPosTop(i,j){
	return cellWidth+(cellWidth+gridcellWidth)*i;
}

function getPosLeft(i,j){
	return cellWidth+(cellWidth+gridcellWidth)*j;
}

function getNumberBgcolor(num){
    switch( num ){
        case 2:return "#eee4da";break;         //幼儿园
        case 4:return "#ede0c8";break;         //学前班
        case 8:return "#f2b179";break;         //小学
        case 16:return "#f59563";break;        //初中
        case 32:return "#f67c5f";break;        //高中
        case 64:return "#f65e3b";break;        //大学
        case 128:return "#edcf72";break;       //硕士
        case 256:return "#edcc61";break;       //博士
        case 512:return "#9c0";break;          //博士后
        case 1024:return "#33b5e5";break;      //学傻了
        case 2048:return "#09c";break;         //大龄未婚
        case 4096:return "#a6c";break;         //大龄未婚
        case 8192:return "#93c";break;         //命运
    }

    return "black";
}

function getNumberColor(num){
    if( num <= 4 )
        return "#776e65";

    return "white";
}

function nospace(board){
	for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ )
            if( board[i][j] == 0 )
                return false;

    return true;
}

function canMoveLeft(board){
    for( var i=0;i<4;i++ )
        for( var j=1;j<4;j++ ){
            if( board[i][j] != 0 ){
                if( board[i][j-1] == 0 || board[i][j-1] == board[i][j])
                    return true;
            }
        }
    return false;
}

function canMoveUp(board){
    for( var j=0;j<4;j++ )
        for( var i=1;i<4;i++ ){
            if( board[i][j] != 0 ){
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j])
                    return true;
            }
        }
    return false;
}

function canMoveRight( board ){
    for( var i=0;i<4;i++ )
        for( var j=2;j>=0;j--){
            if( board[i][j] != 0){
                if( board[i][j+1] == 0 || board[i][j+1] == board[i][j])
                    return true;
            }
        }
    return false;
}

function canMoveDown( board ){
    for( var j=0;j<4;j++ )
        for( var i=2;i>=0;i-- ){
            if( board[i][j] != 0){
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j])
                    return true;
            }
        }
    return false;
}
function noBarrierHorizontal( row,col1,col2,board ){
    for( var i=col1+1;i<col2;i++){
        if( board[row][i] != 0 )
            return false;
    }
    return true;
}


function noBarrierVertical( col,row1,row2,board ){
    for( var i=row1+1;i<row2;i++){
        if( board[i][col] != 0 )
            return false;
    }
    return true;
}

function nomove( board ){
    if( canMoveLeft( board ) ||
        canMoveUp( board ) ||
        canMoveRight( board ) ||
        canMoveDown( board ))
        return false;
    return true;
}

function special( i,j,arr,board ){
    switch( board[i][j] ){
        case 2: arr[i][j] = "幼儿园"; break;
        case 4: arr[i][j] = "学前班"; break;
        case 8: arr[i][j] = "小学"; break;
        case 16: arr[i][j] = "初中"; break;
        case 32: arr[i][j] = "高中"; break;
        case 64: arr[i][j] = "大学"; break;
        case 128: arr[i][j] = "硕士"; break;
        case 256: arr[i][j] = "博士"; break;
        case 512: arr[i][j] = "博士后"; break;
        case 1024: arr[i][j] = "学傻了"; break;
        case 2048: arr[i][j] = "大龄未婚"; break;
        case 4096: arr[i][j] = "大龄未婚"; break;
        case 8192: arr[i][j] = "命运"; break;
        default: break;
    }
}