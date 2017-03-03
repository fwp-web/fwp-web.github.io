window.onload = function() {
    $.click("#btn", countDown);
}

var timer, targetDate;

function countDown() {
    var input = simpleTrim($("#time")[0].value); 
    
    if(!input) {
        alert("请输入日期");
        return;
    }

    clearTimeout(timer);
    targetDate = dateParse(input);
    if(!targetDate) {
        alert("输入的是不合法日期");
        return;
    }
    runTimer(true);
}

//处理用户输入
function dateParse(input) {          //yyyy-mm-dd( 00:00:00|T00:00:00) 或 yyyy/mm/dd
    var reg = /^\d+[\-|\/]\d+[\-|\/]\d+([\s|T][\w\W]+)?$/, 
        parts, dates, times;

    if(reg.test(input)) {
        parts = input.split(/\s|T/);             //part0: yyyy-mm-dd , part1: 00:00:00
        dates = parts[0].split(/\-|\//);
        if(parts.length > 1) {
            times = parts[1].replace(/\s|T/, "").split(/\:/);
            if(times[0] > 23) {
                return false;
            }
            if(times.length <= 1) {
                times[1] = 0;
                times[2] = 0; 
            } else if(times.length <= 2) {
                times[2] = 0;
            }
        } else {
            times = [0, 0, 0];
        }
        if(dates[1] > 12 || dates[2] > 31) {
            return false;
        }
        return new Date(
            dates[0] - 0, 
            dates[1] - 1, 
            dates[2] - 0, 
            times[0] - 0, 
            times[1] - 0, 
            times[2] - 0
        );
    } else {
        return new Date(input);
    }
}

//开始倒计时
function runTimer(first) {
    var now = new Date(), 
        leftTime = targetDate - now;

    if(first && leftTime < 0) {
        alert("输入的时间早于当前时间");
        return;
    }
    printTime(leftTime);

    if(leftTime < 0) {
        clearTimeout(timer);
        return;
    }

    timer = setTimeout(runTimer, 1000);
}

// 输出倒计时
function printTime(leftTime) {
    var leftDate = {
        day: parseInt(leftTime / 1000 / 60 / 60 / 24), 
        hour: parseInt(leftTime / 1000 / 60 / 60 % 24), 
        minute: parseInt(leftTime / 1000 / 60 % 60), 
        second: parseInt(leftTime / 1000 % 60) 
    };

    $("#showTime")[0].innerHTML = "距离" + 
        dateFormat(targetDate).yyyy + "年" + dateFormat(targetDate).mm + "月" + dateFormat(targetDate).dd + "日" + 
        dateFormat(targetDate).hh + "时" + dateFormat(targetDate).mn + "分" + dateFormat(targetDate).ss + "秒还有" + 
        leftDate.day + "天" + leftDate.hour + "小时" + leftDate.minute + "分钟" + leftDate.second + "秒"; 
}

// 将targetDate以yyyy-mm-dd的格式输出
function dateFormat(targetDate) {
    return {
        yyyy: targetDate.getFullYear(), 
        mm: targetDate.getMonth()+1, 
        dd: targetDate.getDate(), 
        hh: targetDate.getHours(), 
        mn: targetDate.getMinutes(), 
        ss: targetDate.getSeconds()
    };
}
