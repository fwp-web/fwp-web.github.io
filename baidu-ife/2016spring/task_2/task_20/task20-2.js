// 定义queue对象
var queue = {
    items: [], 
    //左侧入
    leftIn: function(num) {
        this.items.unshift(num);
        this.show();
    }, 
    //右侧入
    rightIn: function(num) {
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
            text += "<div data-index='" + i + "'>" + this.items[i] +"</div>";
        }
        $("show").innerHTML = text;
    }, 
    //判断队列是否为空
    isEmpty: function() {
        return (this.items.length === 0);
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
    var event = event || window.event, 
        target = event.target || event.srcElement;

    if(target.tagName.toLowerCase() === "div") {
        queue.deleteByIndex(parseInt(target.dataset.index));
    }
}); 

//操作输入
function addInput(handler) {
    var input = $("input").value.trim(), 
        inputs = input.split(/[\s,，、]/g);
    for(var i = 0, len = inputs.length; i < len; i++) {
        if(/[0-9a-zA-Z\u4e00-\u9fa5]/.test(inputs[i])) {
            queue[handler](inputs[i]);
        }
    }
}

//处理查询
function query() {
    var query = $("queryInput").value.trim(), 
        results = $("show").children, text;

    if(results.length === 0) {
        alert("此时队列为空不能查询");
    } else {
        for(var i = 0, len = results.length; i < len; i++) {
            results[i].innerHTML = results[i].innerHTML.replace(query, "<span class='match'>"+query+"</span>");
        }
    }
}

//为各个按钮添加点击事件
addEvent($("leftIn"), "click", function() {
   addInput("leftIn");
});
addEvent($("rightIn"), "click", function() {
    addInput("rightIn");
});
addEvent($("leftOut"), "click", function() {
    queue.leftOut();
});
addEvent($("rightOut"), "click", function() {
    queue.rightOut();
});
addEvent($("query"), "click", function() {
    query();
});