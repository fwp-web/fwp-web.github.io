//判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return arr instanceof Array;
}

//判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return fn instanceof Function;
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var copy;
    if(typeof src != "object" || src == null) {  //处理基本类型
        return src;
    }
    else if(isArray(src)) {    //处理数组对象
        return src.concat();
    }
    else if(src instanceof Date) {    //处理日期对象
        copy = new Date();
        copy.setTime(src.getTime());
        return copy;
    }
    else if(src instanceof Object) {  //处理一般对象
        copy = {};
        for(var attr in src) {
            if(src.hasOwnProperty(attr)) {
                copy[attr] = cloneObject(src[attr]);
            }
        }
        return copy;
    }

    throw new Error("unable to copy object, its type isn't supported");

}


// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
// 方法1：排序
function uniqArray(arr) {
    arr.sort(function(a, b) {
        return a - b;
    });
    for(var i=0; i<arr.length-1; i++) {
        while(arr[i] == arr[i+1]) {
            arr.splice(i+1, 1);
        }
    }
    return arr;
}
//方法2：双层循环
function uniqArray(arr) {
    var len = arr.length, 
        i, temp;
    while(--len) {
        i = len;
        temp = arr[len];
        while(i--) {
            if(temp == arr[i]) {
                arr.splice(len, 1);
                break;
            }
        }
    }
    return arr;
}
//方法3：hash
function uniqArray(arr) {
    var object = {}, 
        rs = [], 
        i, len;
    for(i=0, len=arr.length; i<len; i++) {
        if(!object[arr[i]]) {
            rs.push(arr[i]);
            object[arr[i]] = true;
        }
    }
    return rs;
}
//方法4：hash和es5
function uniqArray(arr) {
    var object = {}, i, len;
    for(i=0, len=arr.length; i<len; i++) {
        object[arr[i]] = true;
    }
    return Object.keys(object);
}


// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    if(str.match(/^\s+$/)) {
        return "";
    }
    var i = 0, j = str.length-1;
    while(str.substr(i, 1) == " ") {
        i++;
    }
    while(str.substr(j, 1) == " ") {
        j--;
    }
    if(i > j) {
        return "";
    }
    return str.substring(i, j+1);
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+ | \s+$/g, "");
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for(var i=0, len=arr.length; i<len; i++) {
        fn(arr[i], i);
    }
}

// 其中fn函数可以接受两个参数：item和index


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var count = 0;
    for(var attr in obj) {
        if(obj.hasOwnProperty(attr))
            count++;
    }
    return count;
}

function getObjectLength(obj) {
    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    if (!Object.keys) {
        Object.keys = (function() {
            'use strict';
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function(obj) {
                if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                }

                var result = [], prop, i;

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        }());
    }
}
// 判断是否为邮箱地址
function isEmail(emailStr) {
    var pattern = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/g;
    return pattern.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var pattern = /^1[3|4|5|8][0-9]{9}$/g;
    return pattern.test(phone);
}




//domUtils
//检测是否有className
function hasClass(element, classname) {
    if(!element.className) {
        return false;
    }
    var classnames = element.className.split(/\s+/);
    for(var i=0; i<classnames.length; i++) {
        if(classnames[i] == classname) {
            return true;
        }
    }
    return false;
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(!hasClass(element, newClassName)) {
        element.className = element.className ? element.className + " " + newClassName : newClassName;
    }    
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if(hasClass(element, oldClassName)) {
        var classnames = element.className.split(/\s+/);
        for(var i=0; i<classnames.length; i++) {
            if(classnames[i] == oldClassName) {
                classnames.splice(i, 1);
            }
        }
    }
    element.className = classnames.join(" ");
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode == siblingNode.parentNode;
}

//获取element相对于视口的位置
function getBoundingClientRect(element) {
    var scrollTop = document.documentElement.scrollTop, 
        scrollLeft = document.documentElement.scrollLeft;

    if(element.getBoundingClientRect) {
        if(typeof arguments.callee.offset != "number") {
            var temp = document.createElement("div");
            temp.style.cssText = "position: absolute; left: 0; top: 0;";
            document.body.appendChild(temp);
            arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
            document.body.removeChild(temp);
            temp = null;
        }
        var rect = element.getBoundingClientRect(), 
            offset = arguments.callee.offset;
        return {
            left: rect.left + offset, 
            right: rect.right + offset, 
            top: rect.top + offset, 
            bottom: rect.bottom + offset
        };       
    } else {
        var actualLeft = getElementLeft(element), 
            actualTop = getElementTop(element);
        return {
            left: actualLeft - scrollLeft, 
            right: actualLeft + element.offsetWidth - scrollLeft, 
            top: actualTop - scrollTop,
            bottom: actualTop + element.offsetHeight - scrollTop
        };
    }
}
// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var rect = getBoundingClientRect(element);
    return {
        x: rect.left, 
        y: rect.top
    };
}



// 实现一个简单的Query, 可以通过id获取DOM对象，通过#标示
// 可以通过样式名称获取DOM对象
// 可以通过tagName获取DOM对象
// 可以通过attribute匹配获取DOM对象
// 可以通过简单的组合提高查询便利性, 组合间只考虑用空格连接的情况
function $(selector) {
    var patterns = {
        id: /^#[\w_\-]+$/, 
        class: /^\.[\w_\-]+$/, 
        tag: /^\*|\w+$/i, 
        // [data-log]
        // [data-log="test"]
        // [data-log=test]
        // [data-log='test']
        attribute: /(\w+)?\[([^=\]]+)(?:=(["'])?([^\]"']+)\3?)?\]/ 
    }, 
        res = [];

    function blank() {}

    //match patterns
    function match(substr, actions) {
        var params = [].slice.call(arguments, 2), 
            rs = [], flag;
        actions = actions || {
            id: blank, 
            class: blank, 
            tag: blank, 
            attribute: blank
        };

        if(rs = patterns.id.exec(substr)) {     //match id
            flag = "id";
            params.push(rs[0].substr(1));
        }
        else if(rs = patterns.class.exec(substr)) {   //match classname
            flag = "class";
            params.push(rs[0].substr(1));
        }
        else if(rs = patterns.tag.exec(substr)) {
            flag = "tag";
            params.push(rs[0]);
        }
        else if(rs = patterns.attribute.exec(substr)) {
            flag = "attribute";
            params.push(rs[1], rs[2], rs[4]);       //rs[1]:tag, rs[2]:attribute, rs[4]: value  
        }
        else {
            throw new error("Can not recognize the selector!");
        }
        return actions[flag].apply(null, params);
    }

    function search(substrs, context) {
        var substr = substrs.pop();
        context = context || document;
        var actions = {
            id: function(id) {
                return [document.getElementById(id)];
            }, 
            class: function(classname) {
                var result = [];
                if(context.getElementsByClassName) {
                     result = context.getElementsByClassName(classname);
                }
                else {
                    var eles = context.getElementsByTagName("*");
                    for(var i=0; i<eles.length; i++) {
                        var node = eles[i];
                        if(hasClass(node, classname)) {
                            result.push(node);
                        }
                    }
                }
                return result;
            }, 
            tag: function(tagname) {
                return context.getElementsByTagName(tagname);
            }, 
            attribute: function(tag, attr, value) {
                var eles = context.getElementsByTagName(tag || "*"), 
                    result = [];
                for(var i=0; i<eles.length; i++) {
                    var node = eles[i];
                    if(value) {
                        if(value == node.getAttribute(attr)) {
                            result.push(node);
                        }
                    }
                    else {
                        if(node.hasAttribute(attr)) {
                            result.push(node);
                        }
                    }
                }
                return result;
            }
        }
        var rs = match(substr, actions);
        return substrs[0] && rs[0] ? filterParent(substrs, rs) : rs;
    }
    
    function filterParent(substrs, rs) {
        var substr = substrs.pop(), 
            result = [];

        for(var i=0; i<rs.length; i++) {
            var node = rs[i], 
                temp = node;
            while(temp = temp.parentNode) {
                var actions = {
                    id: function(obj, id) {
                        return obj.id == id;
                    },
                    class: function(obj, classname) {
                        return hasClass(obj, classname);
                    },
                    tag: function(obj, tagname) {
                        return obj.tagName.toLowerCase() == tagname.toLowerCase();
                    },
                    attribute: function(obj, tag, attr, value) {
                        var state = true;
                        if(tag) {
                            state = this.tag(obj, tag);
                        }
                        state = state && obj.hasAttribute(attr);
                        if(value) {
                            state = state && (obj.getAttribute(attr) == value);
                        }
                        return state;
                    }
                };
                var matches = match(substr, actions, temp)
                if(matches) {
                    break;
                }
            }
            if(matches) {
                result.push(node);
            } 
        }
        return substrs[0] && result[0] ? filterParent(substrs, result) : result;
    }

    res = search(selector.split(/\s+/));
    return res;
}


// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvents(elements, event, listener) {
    event = event.replace(/^on/i, "").toLowerCase();
    var element;
    for(var i = 0, len = elements.length; i < len; i++) {
        element = elements[i];
        addEvent(element, event, listener);
    }
}
function addEvent(element, event, listener) {
      /*  var realListener = function(e) {
            if(typeof listener === "function") {
                listener.call(element, e);
            }
        };
    */
    if(element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if(element.attachEvent) {
        element.attachEvent("on"+event, listener);
    } else {
        element["on"+event] = listener;
    }
}   

// 例如：
function clicklistener(event) {
    //...
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvents(elements, event, listener) {
    event = event.replace(/^on/i, "").toLowerCase();
    var element;
    for(var i = 0, len = elements.length; i < len; i++) {
        element = elements[i];
        removeEvent(element, event, listener);
    }
}
function removeEvent(element, event, listener) {
    if(element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    } else if(element.detachEvent) {
        element.detachEvent("on"+event, listener);
    } else {
        element["on"+event] = null;
    }
}

// 实现对click事件的绑定
function addClickEvents(elements, listener) {
    addEvents(elements, "click", listener);
}
function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvents(elements, listener) {
    addEvents(elements, "keydown", function(event) {
        var e = event || window.event, 
            keycode = e.which || e.keyCode;
        if(keycode == 13) {
            listener(e);
        }
    });
}
function addEnterEvent(element, listener) {
    addEvent(element, "keydown", function(event) {
        var e = event || window.event, 
            keycode = e.which || e.keyCode;
        if(keycode == 13) {
            listener(e);
        }
    });
}

$.on = function(selector, event, listener) {
    addEvents($(selector), event, listener);
};
$.un = function(selector, event, listener) {
    removeEvents($(selector), event, listener);
};
$.click = function(selector, listener) {
    addClickEvents($(selector), listener);
}; 
$.enter = function(selector, listener) {
    addEnterEvents($(selector), listener);
};

$.onOne = function(element, event, listener) {
    addEvent(element, event, listener);
};
$.unOne = function(element, event, listener) {
    removeEvent(element, event, listener);
};
$.clickOne = function(element, listener) {
    addClickEvent(element, listener);
}; 
$.enterOne = function(element, listener) {
    addEnterEvent(element, listener);
};


// 先简单一些
function delegateEvent(selector, tag, eventName, listener) {
    $.on(selector, eventName, function(event) {
        var e = event || window.event, 
            target = e.srcElement ? e.srcElement : e.target;
        if(target.nodeName.toLowerCase() === tag) {
            listener(e);
        }
    });
}

$.delegate = delegateEvent;

// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
//$.delegate($("#list")[0], "li", "click", clickHandle);

function insertAfter(newElement, targetElement){       //在targetElement后插入节点
    var parent = targetElement.parentNode;
    if( parent.lastChild == targetElement ){
        parent.appendChild(newElement);
    }
    else{
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

//获取元素的最终样式
function getStyle(element, attr) {
    if(typeof window.getComputedStyle != "undefined") {
        return parseInt(window.getComputedStyle(element, null).getPropertyValue(attr));
    } else if(element.currentStyle) {
        return parseInt(element.currentStyle[attr]);
    }
}

//阻止事件冒泡
function stopPropagation(event) {
    if(event.stopPropagation) {
        event.stopPropagation();
    }
    else {
        event.cancelBubble = true;
    }
}

// 判断是否为IE浏览器，返回-1或者版本号
// 这是传统的userAgent + documentMode方式的ie版本判断。
// 这在大多数对老IE问题进行hack的场景下有效果。
function isIE() {
    return /msie (\d+\.\d+)/i.test(navigator.userAgent)
        ? (document.documentMode || + RegExp['\x241']) : undefined;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    if (!isValidCookieName(cookieName)) {
        return;
    }
    var exdate = new date();
    exdate = setDate(exdate.getDate()+expiredays);
    document.cookie = cookieName + "=" + escape(cookieValue) + 
                      ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

// 获取cookie值
function getCookie(cookieName) {
    if (isValidCookieName(cookieName)) {
        var start = document.cookie.indexOf(cookieName+"="), 
            end = document.cookie.length;
        if(start != -1) {
            if(document.cookie.indexOf(";", start) != -1) {
                end = document.cookie.indexOf(";", start);
            }
            return unescape(document.cookie.substring(start, end));
        }
    }
    return "";
}


// ajax
function ajax(url, options) {
    var xhr = createXHR(),
        options = options? options : {}, 
        type = options.type ? options.type.toUpperCase() : "GET", 
        eventHanders = {
            onsuccess: options.onsuccess,
            onfail: options.onfail
        }, 
        data = dataHandler(options.data || {}), 
        msg;

    xhr.onreadystatechange = stateChangeHandler;

    if(type === "GET" && data) {
        url += ((url.indexOf("?") >= 0) ? "&" : "?") + data;
        msg = null;
    } 
    xhr.open(type, url, true);
    if(type === "POST") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        msg = data;
    }
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(msg);

    //处理要传送的数据
    function dataHandler(data) {
        var rs = [], item;
        for(var prop in data) {
            item = escape(prop) + "=" + escape(data[prop]);
            rs.push(item);
        }
        return rs.join("&");
    }

    //处理状态改变
    function stateChangeHandler() {
        var state;
        if(xhr.readyState == 4) {
            try {
                state = xhr.status;
            } catch(e) {
                deal("fail");
            }

            if((state >= 200 && state < 300) || state == 304 || state == 1223) {   //成功
                deal("success");
            } else {
                deal("fail");
            }

            window.setTimeout(function() {
                xhr.onreadystatechange = new Function();
                xhr = null;
            }, 0);
        }
    }

    //处理成功或失败状态
    function deal(state) {
        var stat = "on" + state, 
            handler = eventHanders[stat], 
            response;

        if(!handler) {
            return;
        }
        if(stat != "onsuccess") {
            handler(xhr);
        } else {
            try {
                response = xhr.responseText;
            } catch(e) {
                handler(xhr);
            }
            handler(xhr, response);
        }
    }
}

function createXHR() {
    var xhr;
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if(window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        throw new Error("no XHR object available");
    }
}

// 使用示例：
/*ajax(
    'http://localhost:8080/server/ajaxtest', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (xhr, responseText) {
            console.log(responseText);
        }
    }
);*/



//参考
function isValidCookieName(cookieName) {
    // http://www.w3.org/Protocols/rfc2109/rfc2109
    // Syntax:  General
    // The two state management headers, Set-Cookie and Cookie, have common
    // syntactic properties involving attribute-value pairs.  The following
    // grammar uses the notation, and tokens DIGIT (decimal digits) and
    // token (informally, a sequence of non-special, non-white space
    // characters) from the HTTP/1.1 specification [RFC 2068] to describe
    // their syntax.
    // av-pairs   = av-pair *(";" av-pair)
    // av-pair    = attr ["=" value] ; optional value
    // attr       = token
    // value      = word
    // word       = token | quoted-string

    // http://www.ietf.org/rfc/rfc2068.txt
    // token      = 1*<any CHAR except CTLs or tspecials>
    // CHAR       = <any US-ASCII character (octets 0 - 127)>
    // CTL        = <any US-ASCII control character
    //              (octets 0 - 31) and DEL (127)>
    // tspecials  = "(" | ")" | "<" | ">" | "@"
    //              | "," | ";" | ":" | "\" | <">
    //              | "/" | "[" | "]" | "?" | "="
    //              | "{" | "}" | SP | HT
    // SP         = <US-ASCII SP, space (32)>
    // HT         = <US-ASCII HT, horizontal-tab (9)>

    return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24'))
        .test(cookieName);
}
/*

function setCookie(cookieName, cookieValue, expiredays) {
    if (!isValidCookieName(cookieName)) {
        return;
    }

    var expires;
    if (expiredays != null) {
        expires = new Date();
        expires.setTime(expires.getTime() + expiredays * 24 * 60 * 60 * 1000);
    }

    document.cookie =
        cookieName + '=' + encodeURIComponent(cookieValue)
        + (expires ? '; expires=' + expires.toGMTString() : '');
}

function getCookie(cookieName) {
    if (isValidCookieName(cookieName)) {
        var reg = new RegExp('(^| )' + cookieName + '=([^;]*)(;|\x24)');
        var result = reg.exec(document.cookie);

        if (result) {
            return result[2] || null;
        }
    }

    return null;
}

*/


// ------------------------------------------------------------------
// Ajax
// ------------------------------------------------------------------

/**
 * @param {string} url 发送请求的url
 * @param {Object} options 发送请求的选项参数
 * @config {string} [options.type] 请求发送的类型。默认为GET。
 * @config {Object} [options.data] 需要发送的数据。
 * @config {Function} [options.onsuccess] 请求成功时触发，function(XMLHttpRequest xhr, string responseText)。
 * @config {Function} [options.onfail] 请求失败时触发，function(XMLHttpRequest xhr)。
 *
 * @returns {XMLHttpRequest} 发送请求的XMLHttpRequest对象
 */

/*
function ajax(url, options) {
    var options = options || {};
    var data = stringifyData(options.data || {});
    var type = (options.type || 'GET').toUpperCase();
    var xhr;
    var eventHandlers = {
        onsuccess: options.onsuccess,
        onfail: options.onfail
    };

    try {
        if (type === 'GET' && data) {
            url += (url.indexOf('?') >= 0 ? '&' : '?') + data;
            data = null;
        }

        xhr = getXHR();
        xhr.open(type, url, true);
        xhr.onreadystatechange = stateChangeHandler;

        // 在open之后再进行http请求头设定
        if (type === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(data);
    }
    catch (ex) {
        fire('fail');
    }

    return xhr;

    function stringifyData(data) {
        // 此方法只是简单示意性实现，并未考虑数组等情况。
        var param = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                param.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
        }
        return param.join('&');
    }

    function stateChangeHandler() {
        var stat;
        if (xhr.readyState === 4) {
            try {
                stat = xhr.status;
            }
            catch (ex) {
                // 在请求时，如果网络中断，Firefox会无法取得status
                fire('fail');
                return;
            }

            fire(stat);

            // http://www.never-online.net/blog/article.asp?id=261
            // case 12002: // Server timeout
            // case 12029: // dropped connections
            // case 12030: // dropped connections
            // case 12031: // dropped connections
            // case 12152: // closed by server
            // case 13030: // status and statusText are unavailable

            // IE error sometimes returns 1223 when it
            // should be 204, so treat it as success
            if ((stat >= 200 && stat < 300)
                || stat === 304
                || stat === 1223) {
                fire('success');
            }
            else {
                fire('fail');
            } */

            /*
             * NOTE: Testing discovered that for some bizarre reason, on Mozilla, the
             * JavaScript <code>XmlHttpRequest.onreadystatechange</code> handler
             * function maybe still be called after it is deleted. The theory is that the
             * callback is cached somewhere. Setting it to null or an empty function does
             * seem to work properly, though.
             *
             * On IE, there are two problems: Setting onreadystatechange to null (as
             * opposed to an empty function) sometimes throws an exception. With
             * particular (rare) versions of jscript.dll, setting onreadystatechange from
             * within onreadystatechange causes a crash. Setting it from within a timeout
             * fixes this bug (see issue 1610).
             *
             * End result: *always* set onreadystatechange to an empty function (never to
             * null). Never set onreadystatechange from within onreadystatechange (always
             * in a setTimeout()).
             */
            /*
            window.setTimeout(
                function() {
                    xhr.onreadystatechange = new Function();
                    xhr = null;
                },
                0
            );
        }
    }

    function getXHR() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject('Msxml2.XMLHTTP');
            }
            catch (e) {
                try {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
                catch (e) {}
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }

    function fire(type) {
        type = 'on' + type;
        var handler = eventHandlers[type];

        if (!handler) {
            return;
        }
        if (type !== 'onsuccess') {
            handler(xhr);
        }
        else {
            //处理获取xhr.responseText导致出错的情况,比如请求图片地址.
            try {
                xhr.responseText;
            }
            catch(error) {
                return handler(xhr);
            }
            handler(xhr, xhr.responseText);
        }
    }
}
*/
