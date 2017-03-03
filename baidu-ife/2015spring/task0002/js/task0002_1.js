window.onload = function() {
    $.click("#btn1", handler1);
    $.click("#btn2", handler2);
    $.click("#btn3", handler3);
};

function handler1() {
    var hobby = simpleTrim($("#hobby1")[0].value), 
        hobbyArr = hobby.split(","), 
        text = "";

    hobbyArr = filterArray(hobbyArr);  //去除空串
    hobbyArr = uniqArray(hobbyArr);   //去重
    for(var i = 0, len = hobbyArr.length; i < len; i++) {
        text += hobbyArr[i] + "<br/>";
    }
    var display = document.createElement("p");
    display.innerHTML = text;
    insertAfter(display, $("#btn1")[0]);
}

function handler2() {
    var hobby = simpleTrim($("#hobby2")[0].value), 
        reg = /[\n\r\s,，、；;]/g, 
        hobbyArr = hobby.split(reg), 
        text = "";

    hobbyArr = filterArray(hobbyArr);  //去除空串
    hobbyArr = filterArray(hobbyArr);  //去除空串
    hobbyArr = uniqArray(hobbyArr);   //去重
    for(var i = 0, len = hobbyArr.length; i < len; i++) {
        text += hobbyArr[i] + "<br/>";
    }
      
    var display = document.createElement("p");
    display.innerHTML = text;
    insertAfter(display, $("#btn2")[0]);
}

function handler3() {
    var hobby = simpleTrim($("#hobby3")[0].value), 
        reg = /[\n\r\s,，、；;]/g, 
        hobbyArr = hobby.split(reg), 
        text = "", 
        errorText = "";

    showError();

    hobbyArr = filterArray(hobbyArr);  //去除空串
    if(hobbyArr.length === 0) {
        errorText = "输入不能为空，请输入您的爱好";
        return showError(errorText);
    }
    hobbyArr = uniqArray(hobbyArr);
    if(hobbyArr.length > 10) {
        errorText = "输入的爱好个数不能超过10个";
        return showError(errorText);
    }

    var display = document.createElement("p");
    for(var i = 0; i < hobbyArr.length; i++) {
        text += "<label>" + hobbyArr[i] + 
                "<input type='checkbox' name='showHobby' value='" + hobbyArr[i] + 
                "'>" + "</label>"
    }
    display.innerHTML = text;
    insertAfter(display, $("#btn3")[0]);

    function showError(msg) {
        var showerror = $("#showError")[0];
        if(msg) {
            showerror.innerHTML = msg;
        } else {
            showerror.innerHTML = "";
        }
    }
}

function filterArray(arr) {
    for(var len = arr.length, i = len-1 ; i >= 0; i--) {
        arr[i] = simpleTrim(arr[i]);
        if(arr[i] === "") {
            arr.splice(i, 1);
        }
    }
    return arr;
}

