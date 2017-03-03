//定义queue类
function Queue() {
    this.vector = [];
}
//判断队列中是否已经有了tag
Queue.prototype.hasTag = function(input) {
    if(this.vector.length === 0) {
        return false;
    }
    for(var i = 0, len = this.vector.length; i < len; i++) {
        if(input === this.vector[i]) {
            return true;
        }
    }
    return false;
};
//弹出第一个队列元素
Queue.prototype.leftOut = function() {
    if(this.vector.length === 0) {
        alert("队列已空！");
        return;
    }
    this.vector.shift();
};
//按照输入顺序入队列
Queue.prototype.rightIn = function(input) {
    if(this.hasTag(input)) {
        //alert("1");
        return;
    }
    if(this.vector.length >= 10) {   //队列元素超过10个时，弹出第一个，再加入新元素
       // alert("2");
        this.leftOut();
    }
    if(/[0-9a-zA-Z\u4e00-\u9fa5]/g.test(input)) {
        //alert("ok");
        this.vector.push(input);
    } else {
        //alert("3");
        return;
    }
    
};
//展示队列元素
Queue.prototype.show = function(ele) {
    if(this.vector.length === 0) {
        ele.innerHTML = "";
        return;
    }
    var text = "";
    for(var i = 0, len = this.vector.length; i < len; i++) {
        text += "<li data-index='" + i + "'>" + this.vector[i] + "</li>";
    }
    ele.innerHTML = text;
};
//根据索引值删除元素
Queue.prototype.deleteByIndex = function(index) {
    this.vector.splice(index, 1);
};

/*
  简单工厂模式
 */
var inputFactory = {
    createTags: function(input) {
        var type;
        switch(input) {
            case "tag":
                type = new tag();
                break;
            case "hobby":
                type = new hobby();
                break;
            default: 
                type = null;
                break;
        }
        return type;
    }
};

var inputShop = function(){};
inputShop.prototype = {
    sellTags: function(input) {
        var type = inputFactory.createTags(input);
        return type;
    }
}

//创建tag类
var tag = function(){};
tag.prototype = {
    initTags: function() {
        var input = document.getElementById("tag"),
            tshow = document.getElementById("tag_show"),
            tagQueue = new Queue(), tag;
        input.onkeyup = function(event) {
            var e = event || window.event;
            if(e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 188) {
                tag = input.value.trim();
                tagQueue.rightIn(tag.toLowerCase());
                tagQueue.show(tshow);
            }
        };
        tshow.onmouseover = function(event) {
            var e = event || window.event, 
                target = e.target || e.srcElement, 
                text = "";
            if(target.tagName.toLowerCase() === "li") {
                text = target.innerHTML;
                target.innerHTML = target.innerHTML.replace(text, "点击删除"+text);
            }
        };
        tshow.onmouseout = function(event) {
            var e = event || window.event, 
                target = e.target || e.srcElement;
            if(target.tagName.toLowerCase() === "li") {
                target.innerHTML = target.innerHTML.replace("点击删除", "");
            }
        };
        tshow.onclick = function(event) {
            var e = event || window.event, 
                target = e.target || e.srcElement;
            if(target.tagName.toLowerCase() === "li") {
                tagQueue.deleteByIndex(parseInt(target.dataset.index));
                console.log(tagQueue);
                tagQueue.show(tshow);
            }
        };
    }
};

//应用tag类
var fac = new inputShop();
var tags = fac.sellTags("tag");
tags.initTags();

//创建hobby类
var hobby = function(){};
hobby.prototype = {
    initHobbies: function() {
        var input = document.getElementById("hobby"), 
            btn = document.getElementsByTagName("button")[0],
            hshow = document.getElementById("hobby_show"), 
            hobbyQueue = new Queue(), 
            hobbies;
        btn.onclick = function() {
            hobbies = input.value.trim().split(/[\s,，、]/g);
            if(hobbies.length === 0) {
                alert("请输入兴趣爱好！");
                return;
            }
            for(var i = 0, len = hobbies.length; i < len; i++) {
                hobbyQueue.rightIn(hobbies[i].toLowerCase());
            }
            hobbyQueue.show(hshow);
        };
        hshow.onmouseover = function(event) {
            var e = event || window.event, 
                target = e.target || e.srcElement, 
                text = "";
            if(target.tagName.toLowerCase() === "li") {
                text = target.innerHTML;
                target.innerHTML = target.innerHTML.replace(text, "点击删除"+text);
            }
        };
        hshow.onmouseout = function(event) {
            var e = event || window.event, 
                target = e.target || e.srcElement;
            if(target.tagName.toLowerCase() === "li") {
                target.innerHTML = target.innerHTML.replace("点击删除", "");
            }
        };
        hshow.onclick = function(event) {
            var e = event || window.event, 
                target = e.target || e.srcElement;
            if(target.tagName.toLowerCase() === "li") {
                hobbyQueue.deleteByIndex(parseInt(target.dataset.index));
                console.log(hobbyQueue);
                hobbyQueue.show(hshow);
            }
        };
    }
};

//应用hobby类
var hobbies = fac.sellTags("hobby");
hobbies.initHobbies();
