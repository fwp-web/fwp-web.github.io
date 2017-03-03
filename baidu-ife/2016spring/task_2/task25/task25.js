/*  ******    Tree类的定义     *******   */
function Tree() {
    this.treeNodes = [];
    this.selectIndex = -1;
    this.searchIndex = [];
}
//前序遍历
Tree.prototype.preOrder = function(node) {
    if(!(node == null)) {
        this.treeNodes.push(node);
        //依次遍历子树
        var childNodes = node.childNodes,
            len = childNodes.length;
         //   console.log(childNodes);
        for(var i = 0; i < len; i++) {
            if(hasClass(childNodes[i], "node_display") || hasClass(childNodes[i], "node_hidden")) {
                this.preOrder(childNodes[i]);
            }
        }
    }
}
//查找指定节点
Tree.prototype.search = function(query) {
    if(query === "" || query == null) {
        alert("请输入查询词！");
        return;
    }
    var match = "",
        node, parent, siblings = [],
        i, len, j;
    for(i = 0, len = this.treeNodes.length; i < len; i++) {
        match = this.treeNodes[i].getElementsByTagName("span")[0].innerHTML.trim();
        console.log(match);
        if(query.toLowerCase() === match.toLowerCase()) {
            this.searchIndex.push(i);
        }
    }
    if(this.searchIndex.length === 0) {
        alert("没有找到查询的词！");
        return;
    }
    for(i = 0, len = this.searchIndex.length; i < len; i++) {
      node = this.treeNodes[this.searchIndex[i]];
      addClass(node, "searched");
      this.showNode(node);
      //将所有父节点展示出来
      parent = node.parentNode;
      for(j = this.searchIndex[i]-1; j >= 0; j--) {
          this.showNode(this.treeNodes[j]);
          if(hasClass(this.treeNodes[j].firstElementChild, "right_arrow")) {
              removeClass(this.treeNodes[j].firstElementChild, "right_arrow");
              addClass(this.treeNodes[j].firstElementChild, "down_arrow");
          }
      }
      //将节点所有的兄弟子节点展示出来
      getSiblings(parent.firstElementChild, siblings);
      for(j = 0; j < siblings.length; j++) {
          if(hasClass(siblings[j], "node_hidden")) {
              this.showNode(siblings[j]);
          }
      }
    }

}
//选中某个节点
Tree.prototype.select = function(node) {
    console.log(node);
    if(this.treeNodes.indexOf(node) !== -1) {
        this.selectIndex = this.treeNodes.indexOf(node);
    }
}
//添加节点
Tree.prototype.addNode = function(input) {
    if(!input || input === "") {
        alert("请输入节点词语！");
        return;
    } else if(this.selectIndex === -1) {
        alert("没有选中的父节点");
        return;
    }
    var parent = this.treeNodes[this.selectIndex],
        childNodes = parent.childNodes,
        index = this.selectIndex+1,
        classname = parent.className;
    //在队列中添加节点
    for(var i = 0, len = childNodes.length; i < len; i++) {
        if(hasClass(childNodes[i], "node_display") || hasClass(childNodes[i], "node_hidden")) {
            index++;
        }
    }
    this.treeNodes.splice(index, 0, input);
    //在dom树中添加节点
    var newnode = document.createElement("div");
    newnode.innerHTML = "<div class='arrow empty_arrow'></div><span>" + input + "</span>";
    addClass(newnode, "node_display");
    parent.appendChild(newnode);
    removeClass(parent.firstChild, "empty_arrow");
    removeClass(parent.firstChild, "right_arrow");
    addClass(parent.firstChild, "down_arrow");
    this.showNode(parentNode);
}
//删除子树
Tree.prototype.deleteNodesByIndex = function() {
    if(this.selectIndex === -1) {
        alert("没有选中的节点");
        return;
    }
    var node = this.treeNodes[this.selectIndex],
        parent = node.parentNode,
        childNodes = node.childNodes,
        deletelen = 1;
    //在顺序存储中删除节点及其子节点
    for(var i = 0, len = childNodes.length; i < len; i++) {
        if(hasClass(childNodes[i], "node_display") || hasClass(childNodes[i], "node_hidden")) {
            deletelen++;
        }
    }
    this.treeNodes.splice(this.selectIndex, deletelen);
    //在dom树中删除节点
    parent.removeChild(node);
}
//展示节点
Tree.prototype.showNode = function(node) {
    if(node) {
        removeClass(node, "node_hidden");
        addClass(node, "node_display");
    }
}
//隐藏节点
Tree.prototype.hideNode = function(node) {
    if(node) {
        removeClass(node, "node_display");
        addClass(node, "node_hidden");
    }
}
//展示查找过程
Tree.prototype.showTraverse = function(query) {
    if(query == null || query == "") {
        alert("请输入查询词！");
        return;
    }
    var i = 1,
        that = this,
        match = "",
        timer;

    removeClass(this.treeNodes[i], "node_hidden");
    addClass(this.treeNodes[i], "node_display");
    addClass(this.treeNodes[i], "traverse");
    timer = setInterval(function() {
        match = that.treeNodes[i].getElemetnsByTagName("span")[0].innerHTML.trim();
        if(match.toLowerCase() === query.toLowerCase()) {

        }
        i++;
        if(i < that.treeNodes.length) {

        }
    }, 300);
}
//重置树
Tree.prototype.reset = function() {
    this.treeNodes = [];
    this.selectIndex = -1;
    this.searchIndex = [];
    var labels = document.getElementsByTagName("span"),
        nodes = document.getElementsByTagName("div"),
        i, len;
    for(i = 0, len = labels.length; i < len; i++) {
        removeClass(labels[i], "selected");
    }
    for(i = 0, len = nodes.length; i < len; i++) {
        if(hasClass(nodes[i], "node_display")) {
            removeClass(nodes[i], "searched");
        }
    }
}

/*  ******    常用方法     *******   */
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
//给指定节点绑定事件监听
function addEvent(element, event, listener) {
    if(element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if(element.attachEvent) {
        element.attachEvent("on"+event, listener);
    } else {
        element["on"+event] = listener;
    }
}
//获取节点的兄弟节点
function getSiblings(node, list) {
    if(node) {
        list.push(node);
        getSiblings(node.nextElementSibling, list);
    }
}

//创建树的对象
var tree = new Tree(),
    treeroot = document.getElementsByClassName("root")[0];

/*  ******    事件绑定     *******   */
//树节点展开和收起事件
var arrows = document.getElementsByClassName("arrow"),
    div = document.getElementsByClassName("root")[0],
    resetBtn = document.getElementById("reset"),
    searchBtn = document.getElementById("search"),
    delBtn = document.getElementById("delete"),
    addBtn = document.getElementById("add"),
    i, len;

for(i = 0, len = arrows.length; i < len; i++) {
    addEvent(arrows[i], "click", function(event) {
        var event = event || window.event,
            target = event.target || event.srcElement,
            siblings = [], j, len;

        getSiblings(target, siblings);
        len = siblings.length;
        //展开
        if(hasClass(target, "right_arrow")) {
            removeClass(target, "right_arrow");
            addClass(target, "down_arrow");
            for(j = 0; j < len; j++) {
                if(hasClass(siblings[j], "node_hidden")) {
                    tree.showNode(siblings[j]);
                }
            }
            //收起
        } else if(hasClass(target, "down_arrow")) {
            removeClass(target, "down_arrow");
            addClass(target, "right_arrow");
            for(j = 0; j < len; j++) {
                if(hasClass(siblings[j], "node_display")) {
                    tree.hideNode(siblings[j]);
                }
            }
        }
    });
}
//选中树节点事件
addEvent(div, "click", function(event) {
    var event = event || window.event,
        target = event.target || event.srcElement;
    tree.reset();
    tree.preOrder(treeroot);
    addClass(target, "selected");
    console.log(target.parentNode);
    tree.select(target.parentNode);
});
//重置
addEvent(resetBtn, "click", function() {
    tree.reset();
});
//搜索查询词
addEvent(searchBtn, "click", function() {
    var query = document.getElementsByTagName("input")[0].value.trim();
    console.log(query);
    tree.reset();
    tree.preOrder(treeroot);
    tree.search(query);
});
//删除树节点
addEvent(delBtn,"click", function() {
   tree.deleteNodesByIndex();
});
//添加树节点
addEvent(addBtn, "click", function() {
   var input = document.getElementsByTagName("input")[1].value.trim();
   tree.addNode(input);
})
