/*  ******    Tree类的定义     *******   */
function Tree() {
	this.treeNodes = [];
	this.isTraverse = false;
	this.selectIndex = -1;
}

//树的先序遍历
Tree.prototype.preOrder = function(node) {
	if(!(node == null)) {
		this.treeNodes.push(node);
		//依次遍历子树
		var childNodes = node.childNodes, 
			len = childNodes.length;
		for(var i = 0; i < len; i++) {
			if(childNodes[i].nodeType === 1) {
				this.preOrder(childNodes[i]);
			}
		}
	}
}

//树的后序遍历
Tree.prototype.postOrder = function(node) {
	if(!(node == null)) {
		//依次遍历子树
		var childNodes = node.childNodes, 
			len = childNodes.length;
		for(var i = 0; i < len; i++) {
			if(childNodes[i].nodeType === 1) {
				this.postOrder(childNodes[i]);
			}
		}
		this.treeNodes.push(node);
	}
}

//展示树的遍历过程
Tree.prototype.showTraverse = function(query) {
	var i = 0, 
		that = this,  
		timer = null, 
		querystr = "", 
		isfind = true;

	if(query) {
		querystr = query.toLowerCase();
		isfind = false;
	}

	this.isTraverse = true;
    this.treeNodes[0].style.backgroundColor = "#00f";
	timer = setInterval(function() {
		i++;
		if(i < that.treeNodes.length) {
			if(that.treeNodes[i-1].firstChild.nodeValue.trim().toLowerCase() !== querystr) {
				that.treeNodes[i-1].style.backgroundColor = "#fff";
			} else {
				that.treeNodes[i-1].style.color = "#fff";
				isfind = true;
			}
			that.treeNodes[i].style.backgroundColor = "#00f";
		} else {
			if(that.treeNodes[i-1].firstChild.nodeValue.trim().toLowerCase() !== querystr) {
				that.treeNodes[i-1].style.backgroundColor = "#fff";
			} else {
				that.treeNodes[i-1].style.color = "#fff";
				isfind = true;
			}
			if(isfind === false) {
				alert("没有找到查询的词语！");
			}
			that.isTraverse = false;
			clearInterval(timer);
		}
	}, 500);
}

//初始化
Tree.prototype.reset = function() {
	this.treeNodes = [];
	this.selectIndex = -1;
	var divs = document.getElementsByTagName("div");
    for(var i = 0, len = divs.length; i < len; i++) {
    	addClass(divs[i], "default");
    }
}

//选中某个节点
Tree.prototype.select = function(node) {
/*	for(var i = 0, len = this.treeNodes.length; i < len; i++) {
		if(hasClass(this.treeNodes[i], "select")) {
			this.selectIndex = i;
		}
	}
*/
	console.log(node);
	if(this.treeNodes.indexOf(node) !== -1) {
		this.selectIndex = this.treeNodes.indexOf(node);
	}
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
		if(childNodes[i].nodeType === 1) {
			deletelen++;
		}
	}
	this.treeNodes.splice(this.selectIndex, deletelen);
	//在dom树中删除节点
	parent.removeChild(node);
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
		if(childNodes[i].nodeType === 1) {
			index++;
		}
	}
	this.treeNodes.splice(index, 0, input);
	//在dom树中添加节点
	var newnode = document.createElement("div");
	newnode.innerHTML = input;
	newnode.style.color = "#000";
	newnode.style.backgroundColor = "#fff";
	switch(classname) {
		case "root": 
			addClass(newnode, "child_1"); break;
		case "child_1": 
			addClass(newnode, "child_2"); break;
		case "child_2": 
			addClass(newnode, "child_3"); break;
		case "child_3": 
			addClass(newnode, "child_4"); break;
		case "child_4": 
		default: 
			addClass(newnode, "child_1"); break;
	}
	parent.appendChild(newnode);
}


/*  ******    功能函数和事件绑定     *******   */
function $(id) {
    return document.getElementById(id);
}
//检查是否含有类
function hasClass(node, classname) {
	var classnames = node.className.split(" ");
	for(var i = 0, len = classnames; i < len; i++) {
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

//创建树的对象
var tree = new Tree(), 
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

$("post").onclick = function() {
    if(tree.isTraverse) {
        return;
    }
    tree.reset();
    tree.postOrder(treeroot);
    tree.showTraverse();
};

$("preSearch").onclick = function() {
    if(tree.isTraverse) {
        return;
    }
    var input = document.getElementsByTagName("input")[0].value.trim();
    tree.reset();
    tree.preOrder(treeroot);
    tree.showTraverse(input);
};

$("postSearch").onclick = function() {
    if(tree.isTraverse) {
        return;
    }
    var input = document.getElementsByTagName("input")[0].value.trim();
    tree.reset();
    tree.postOrder(treeroot);
    tree.showTraverse(input);
};

//给每个树节点添加点击事件
treeroot.onclick = function(event) {
	if(tree.isTraverse) {
		return;
	}
	tree.preOrder(treeroot);
	var divs = document.getElementsByTagName("div");
    for(var i = 0, len = divs.length; i < len; i++) {
    	divs[i].style.color = "#000";
        divs[i].style.backgroundColor = "#fff";
    }
	var event = event || window.event, 
		target = event.target || event.srcElement;
	if(target.nodeType === 1) {
		target.style.color = "#fff";
		target.style.backgroundColor = "#f63a64";
		tree.select(target);
	}
};

//给删除按钮添加点击事件
$("delete").onclick = function() {
	if(tree.isTraverse) {
		return;
	}
	if(confirm("确定删除吗?")) {
		tree.deleteNodesByIndex();
	} else {
		return;
	}
};

//添加节点事件
$("add").onclick = function() {
	if(tree.isTraverse) {
		return;
	}
	var input = $("newNode").value.trim();
	tree.addNode(input);
};


