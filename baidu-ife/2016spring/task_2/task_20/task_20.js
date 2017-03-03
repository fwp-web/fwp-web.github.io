/*
创建queue对象
 */
var queue = {
	data: [],
	isEmpty: function() {
		if(this.data.length == 0)
			return true;
		else
			return false;
	},
	//左侧入
	leftEnqueue: function(num) {
		this.data.unshift(num);
		this.showData();
	},
	//右侧入
	rightEnqueue: function(num) {
        this.data.push(num);
        this.showData();
	},
	//左侧出
    leftDequeue: function() {
    	if(!this.isEmpty()) {
	        this.data.shift();
	        this.showData();
	    }
	    else{
	    	alert("队列已空！");
	    }
    },
    //右侧出
    rightDequeue: function () {
    	if(!this.isEmpty()) {
	        this.data.pop();
	        this.showData();
	    }
	    else{
	    	alert("队列已空！");
	    }
    },
    //删除指定位置的数据
    removeIndex: function(index) {
        this.data.splice(index, 1);
        this.showData();
    },
    //显示队列中的数据
    showData: function() {
	    var container = document.getElementById("container");
	    var content = "";
        this.data.forEach(function(element, index, array) {
            content += "<div class='numDiv'>" + element + "</div>";
        });
        container.innerHTML = content;
        deleteDiv();
    }
}
/*
  去掉字符串前后空格
 */
function trimStr(str) {
    return str.replace(/(^\s*)|(\s*$)/g,"");
}
//处理输入
function isProper(input) {
	return input.split(/ +|,|，|、|\t|\r/);
}
//进行相应按钮上的操作
function changeData() {
	var input = document.getElementById("input");
	var leftAdd = document.getElementById("leftAdd");
	var str = trimStr(input.value);
	var inputData = isProper(str);
	leftAdd.addEventListener("click", function() {	
		for(var i=0; i<inputData.length; i++) {
            queue.leftEnqueue(inputData[i]);
        }
	});
	var rightAdd = document.getElementById("rightAdd");
	rightAdd.addEventListener("click", function() {
		var num = trimStr(input.value);
		if(isNum(num)) {
			queue.rightEnqueue(num);
		}    
	});
	var leftMove = document.getElementById("leftMove");
	leftMove.addEventListener("click", function() {
        queue.leftDequeue();
	});
	var rightMove = document.getElementById("rightMove");
	rightMove.addEventListener("click", function() {
        queue.rightDequeue();
	});
}

//给每个div绑定点击事件
/*function deleteDiv() {
	var divs = document.getElementsByClassName("numDiv");
	var getHandler = function(index) {
    // 这儿出现了一个新的scope
        return function(){
            queue.removeIndex(index);    
        };
    };
    for(var i = 0; i < divs.length; i++) {
    	divs[i].addEventListener("click", getHandler(i));
    }

}*/
function deleteDiv() {
	var divs = document.getElementsByClassName("numDiv");
	for(var i = 0; i < divs.length; i++) {
		//闭包
		!function(i) {
    	    divs[i].addEventListener("click", function() {
                queue.removeIndex(i);
    	    });
    	}(i);
    }
}
/*
    加载函数
 */
function addLoadEvent(func) {
	var oldLoad = window.onload;
	if( typeof window.onload != 'function' ){
		window.onload = func;
	}
	else{
		window.onload = function(){
			oldLoad();
			func();
		}
	}
}
addLoadEvent(changeData);
