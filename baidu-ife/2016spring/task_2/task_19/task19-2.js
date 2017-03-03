
//判断数组是否正在排序
var isSort = false;

// 定义queue对象
var queue = {
    items: [], 
    //左侧入
    leftIn: function(num) {
        if(this.isOverflow()) {
            alert("队列已达到最大长度");
            return;
        }
        this.items.unshift(num);
        this.show();
    }, 
    //右侧入
    rightIn: function(num) {
        if(this.isOverflow()) {
            alert("队列已达到最大长度");
            return;
        }
        this.items.push(num);
        this.show();
    },
    //左侧出
    leftOut: function() {
        if(this.isEmpty()) {
            alert("队列已空！");
            return;
        }
        alert(this.items.shift());
        this.show();
    },
    //右侧出
    rightOut: function() {
        if(this.isEmpty()) {
            alert("队列已空！");
            return;
        }
        alert(this.items.pop());
        this.show();
    }, 
    //删除队列任意元素
    deleteByIndex: function(index) {
        this.items.splice(index, 1);
        this.show();
    },
    //显示队列元素
    show: function() {
        var text = "";
        for(var i = 0, len = this.items.length; i < len; i++) {
            text += "<div data-index='" + i + "' title='" + this.items[i] + 
                    "' style='height:" + this.items[i]*3 + "px'></div>";
        }
        $("show").innerHTML = text;
    }, 
    //判断队列是否为空
    isEmpty: function() {
        return (this.items.length === 0);
    }, 
    //判断队列元素是否超过60
    isOverflow: function() {
        return (this.items.length >= 60);
    }, 
    //清空队列
    clearQ: function() {
        this.items = [];
    }, 
    //添加任意数据
    addData: function(num) {
        this.items.push(num);
    }, 
    getData: function() {
        return this.items;
    }
};

function $(id) {
    return document.getElementById(id);
}
//添加事件兼容写法
function addEvent(element, type, handler) {
    if(element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if(element.attachEvent) {
        element.attachEvent("on"+type, handler);
    } else {
        element["on"+type] = handler;
    }
}
//为数字div添加点击事件
var show = $("show");
addEvent(show, "click", function(event) {
    if(isSort) {
        return;
    }
    var event = event || window.event, 
        target = event.target || event.srcElement;

    if(target.tagName.toLowerCase() === "div") {
        queue.deleteByIndex(parseInt(target.dataset.index));
    }
}); 
//为各个按钮添加点击事件
addEvent($("leftIn"), "click", function() {
    if(isSort) {
        return;
    }
    var input = parseInt($("input").value.trim());
    if((/\d+/).test(input) && input >= 10 && input <= 100) {
         queue.leftIn(input);
    } else {
        alert("输入的值不是合法数字");
    }  
});
addEvent($("rightIn"), "click", function() {
    if(isSort) {
        return;
    }
    var input = parseInt($("input").value.trim());
    if((/\d+/).test(input) && input >= 10 && input <= 100) {
        queue.rightIn(input);
    } else {
        alert("输入的值不是合法数字");
    }
});
addEvent($("leftOut"), "click", function() {
    if(isSort) {
        return;
    }
    queue.leftOut();
});
addEvent($("rightOut"), "click", function() {
    if(isSort) {
        return;
    }
    queue.rightOut();
});

//随机生成start-end之间的50个数字
function randomData(start, end) {
    var data;
    queue.clearQ(); 
    for(var i = 0; i < 50; i++) {
        data = Math.round(Math.random()*(end-start)+start);
        queue.addData(data);
    }
    queue.show();
}

addEvent($("randomData"), "click", function() {
    if(isSort) {
        return;
    }
    randomData(10, 100);
});

//冒泡排序
function bubbleSort() {
    var arr = queue.getData(), 
        len = arr.length, t = null, 
        i = 0, j = 0, temp;

    t = setInterval(function() {
        if(i < len) {
            isSort = true;
            if(j < len-i-1) {
                if(arr[j] > arr[j+1]) {
                    temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    queue.show();
                }
            j++;
            return;
            } else {
                j = 0; 
            } 
            i++;
        } else {
            clearInterval(t);
            isSort = false;
        }
    }, 15); 
}

addEvent($("bubbleSort"), "click", function() {
    bubbleSort();
});

//清空数据
addEvent($("clear"), "click", function() {
    if(isSort) {
        return;
    }
    queue.clearQ();
    queue.show();
});