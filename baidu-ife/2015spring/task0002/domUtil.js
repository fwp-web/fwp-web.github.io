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
        return substrs[0] && result[0] ? filterParent(substrs, rs) : rs;
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
function addEvent(element, event, listener) {
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
    ...
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if(element.removeEvent) {
        element.removeEvent(event, listener, false);
    } else if(element.detachEvent) {
        element.detachEvent("on"+event, listener);
    } else {
        element["on"+event] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, "keydown", function(event) {
        var e = event || window.event, 
            keycode = e.which || e.keyCode;
        if(keycode == 13) {
            listener();
        }
    });
}

$.on = function(element, event, listener) {
    addEvent(element, event, listener);
};
$.un = function(element, event, listener) {
    removeEvent(element, event, listener);
};
$.click = function(element, listener) {
    addClickEvent(element, listener);
}; 
$.enter = function(element, listener) {
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
$.delegate($("#list")[0], "li", "click", clickHandle);

function clickHandle(event) {
    alert(event.target.innerHTML);
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







