//添加事件处理程序
function addEvent(element, event, handler) {
    if(element.addEventListenr) {
        element.addEventListenr(event, handler, false);
    } else if(element.attachEvent) {
         element.attachEvent(event, handler);
    } else {
        element["on"+event] = handler;
    }
}
//检查是否含有类
function hasClass(node, classname) {
    if(!node.className) {
        return;
    }
    var classnames = node.className.split(" ");
    for(var i = 0, len = classnames.length; i < len; i++) {
        if(classnames[i] === classname) {
            return true;
        }
    }
    return false;
}
//添加新类
function addClass(node, classname) {
    if(hasClass(node, classname)) {
        return;
    }
    if(!node.className) {
        node.className = classname;
    } else {
        node.className += " " + classname;
    }
}
//删除指定类名
function removeClass(node, classname) {
    var classnames = node.className.split(" ");
    for(var i = 0, len = classnames.length; i < len; i++) {
        if(classnames[i] === classname) {
            classnames.splice(i, 1);
        }
    }
    node.className = classnames.join(" ");
}

var dataSet = new DataSet(), 
    formAdd = new FormAdd(),
    typeSetBox = document.getElementById("typeSet"),  
    inputTypeSetBox = document.getElementById("ruleSet"),  
    lengthSetBox = document.getElementById("inputLimitSet"), 
    itemsSetBox = document.getElementById("otherLimitSet"), 
    addBtn = document.getElementById("add"), 
    container = document.getElementById("container"), 
    formchecks = [];

//根据表单类型选择不同，显示不同的设置
addEvent(typeSetBox, "click", function(event) {
    var e = event || window.event, 
        target = e.target || e.srcElement;
    console.log(target.id);
    switch(target.id) {
        case "inputSet":
            inputTypeSetBox.className = "display";
            lengthSetBox.className = "display";
            itemsSetBox.className = "hidden";
            break;
        case "textareaSet":
            inputTypeSetBox.className = "hidden";
            lengthSetBox.className = "display";
            itemsSetBox.className = "hidden";
            break;
        case "radioSet": 
        case "checkboxSet":
        case "selectSet": 
            inputTypeSetBox.className = "hidden";
            lengthSetBox.className = "hidden";
            itemsSetBox.className = "display";
            break;
    }
});
//根据input类型选择不同，显示不同的设置
addEvent(inputTypeSetBox, "click", function(event) {
    var e = event || window.event, 
        target = e.target || e.srcElement;
    if(target.id === "text" || target.id === "pwd") {
        lengthSetBox.className = "display";
    } else {
        lengthSetBox.className = "hidden";
    }
});
//为add按钮添加点击事件
addEvent(addBtn, "click", function(){
    dataSet.setData();
    var data = dataSet.getData();
    //console.log(data);
    formAdd.addForm(data, container);
    formchecks.push(new FormCheck(data));
});
//为submit按钮添加点击事件
addEvent(container,"click", function(event) {
    var e = event || window.event, 
        target = e.target || e.srcElement;
    if(target.id === "submit") {
        console.log(formchecks);
        for(var i = 0, len = formchecks.length; i < len; i++) {
            if(!formchecks[i].validator()) {
                alert("提交失败");
                return;
            }
        }
        alert("提交成功");
    }
});
