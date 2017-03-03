//定义二叉树类
function Binarytree() {
    this.treeNodes = [];
    this.isTraverse = false;
}

//前序遍历
Binarytree.prototype.preOrder = function(node) {
    if(!(node == null)) {
        this.treeNodes.push(node);
        this.preOrder(node.firstElementChild);
        this.preOrder(node.lastElementChild);
    }
}

//中序遍历
Binarytree.prototype.inOrder = function(node) {
    if(!(node == null)) {
        this.inOrder(node.firstElementChild);
        this.treeNodes.push(node);
        this.inOrder(node.lastElementChild);
    }
}

//后序遍历
Binarytree.prototype.postOrder = function(node) {
    if(!(node == null)) {
        this.postOrder(node.firstElementChild);
        this.postOrder(node.lastElementChild);
        this.treeNodes.push(node);
    }
}

//展示遍历过程
Binarytree.prototype.showTraverse = function() {
    var i = 0, timer = null, that = this;

    this.isTraverse = true;
    this.treeNodes[0].style.backgroundColor = "#00f";
    timer = setInterval(function() {
        i++;
        if(i < that.treeNodes.length) {
            that.treeNodes[i-1].style.backgroundColor = "#fff";
            that.treeNodes[i].style.backgroundColor = "#00f";  
        } else {
            that.treeNodes[i-1].style.backgroundColor = "#fff";
            that.isTraverse = false;
            clearInterval(timer);
        }
    }, 500);
}

//重置二叉树
Binarytree.prototype.reset = function() {
    this.treeNodes = [];
    var divs = document.getElementsByTagName("div");
    for(var i = 0, len = divs.length; i < len; i++) {
        divs[i].style.backgroundColor = "#fff";
    }
}

function $(id) {
    return document.getElementById(id);
}

//创建二叉树对象
var tree = new Binarytree(), 
    treeroot = document.getElementsByClassName("root")[0];

//为btn添加点击事件
$("pre").onclick = function() {
    if(tree.isTraverse) {
        return;
    }
    tree.reset();
    tree.preOrder(treeroot);
    console.log(tree.treeNodes);
    tree.showTraverse();
};
$("in").onclick = function() {
    if(tree.isTraverse) {
        return;
    }
    tree.reset();
    tree.inOrder(treeroot);
    tree.showTraverse();
};
$("post").onclick = function() {
    if(tree.isTraverse) {
        return;
    }
    tree.reset();
    tree.postOrder(treeroot);
    tree.showTraverse();
};