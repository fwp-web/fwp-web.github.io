window.onload = function() {
    select();
    toTop();
}

//列表的下拉功能
function select() {
    var sections = document.getElementsByTagName("section"), 
        allCols = document.querySelectorAll(".col-12"), 
        allHiddens = document.querySelectorAll(".hidden"), 
        lists = matchTag(allCols, "DL"), 
        allDds = matchTag(allHiddens, "DD"), 
        dds = [];
  
    //为每个dl绑定click事件
    for(var j in lists) {
        addEvent("click", function() {
            dds = this.getElementsByTagName("dd");
            dds = toRealArray(dds); 
            console.log(typeof dds);
            for(var k in allDds) {
                if(dds.indexOf(allDds[k]) == -1) {
                    allDds[k].className = "hidden";
                }
            }  
            for(var k in dds) {
                if(dds[k].className == "hidden") {
                    dds[k].className = "visible";
                }
                else {
                    dds[k].className = "hidden";
                }
            }
        }, lists[j]); 
    }
}

//为某元素绑定监听事件
function addEvent(e, func, obj) {
    if(obj.addEventListenr) {
        obj.addEventListenr(e, func, false);
    }
    else if(obj.attahEvent) {
        obj.attahEvent("on"+e, func);
    }
    else {
        obj["on"+e] = func;
    }
}

//匹配标签名
function matchTag(parent, tagname) {
    var data = []; 
    for(var i in parent) {
        if(parent[i].tagName == tagname) {
            data.push(parent[i]);
        }
    }
    return data;
}

//将NodeList对象转换为数组
function toRealArray(c) {
    try {
        return Array.prototype.slice.call(c);
    } catch (e) {
        var ret = [], i = 0, len = c.length;
        for (; i < len; i++) {
            ret[i] = (c[i]);
        }
        return ret;
    }
}
 