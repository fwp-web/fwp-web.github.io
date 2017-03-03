//添加事件方法
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

//表单联动数据
var colleges = {  
    beijing: ["清华大学", "北京大学", "人民大学", "北京航天航空大学", "北京邮电大学", "北京理工大学", "其他"], 
    shanghai: ["复旦大学", "上海交通大学", "同济大学", "其他"], 
    wuhan: ["武汉大学", "华中科技大学", "华中师范大学", "其他"],
    changsha: ["湖南大学", "中南大学", "湖南师范大学", "其他"],
    chengdu: ["四川大学", "电子科技大学", "其他"],   
    xian: ["西安交通大学", "西安电子科技大学", "西北工业大学", "西北大学", "其他"], 
    haerbin: ["哈尔滨工业大学", "哈尔滨工程大学", "东北农业大学", "东北林业大学", "哈尔滨理工大学", "其他"],
    qita: ["暨南大学", "华南理工大学", "兰州大学", "厦门大学", "云南大学", "其他"]     
}, 
    cities = {
    beijing: "北京", 
    shanghai: "上海", 
    wuhan: "武汉", 
    changsha: "长沙", 
    chengdu: "成都", 
    xian: "西安", 
    haerbin: "哈尔滨", 
    qita: "其他"
}

var form = document.getElementsByTagName("form")[0], 
    stuInfo = document.getElementById("student_info"), 
    noStuInfo = document.getElementById("noStudent_info"),
    stu = document.getElementById("student"),
    noStu = document.getElementById("noStudent"), 
    radio = document.getElementById("selection"),   
    citySelection = form.city, 
    collegeSelection = form.college;

//生成对应城市
function setCities() {
    var html = "";
    citySelection.innerHTML = "<option value='cities'>请选择城市</option>";
    for(var attr in cities) {
        html += "<option value='"+attr+"'>"+cities[attr]+"</option>";
    }
    citySelection.innerHTML += html;
}
//根据城市生成学校选项
function setColleges() {
    var html = "", 
        index = citySelection.selectedIndex, 
        selectValue = citySelection.options[index].value, 
        cols;
    collegeSelection.innerHTML = "<option value='colleges'>请选择学校</option>";
    if(selectValue == "cities") {
        return;
    }
    cols = colleges[selectValue];
    for(var i = 0, len = cols.length; i < len; i++) {
        html += "<option value='"+cols[i]+"'>"+cols[i]+"</option>";
    }
    collegeSelection.innerHTML += html;
}

//切换radio选项页面
function radioChange() {
    if(stu.checked) {
        stuInfo.className = "show";
        noStuInfo.className = "hidden";
        setCities();
    } else {
        stuInfo.className = "hidden";
        noStuInfo.className = "show";
    }
}
//初始默认
function init() {
    if(stu.checked) {
        stuInfo.className = "show";
        noStuInfo.className = "hidden";
        setCities();
    }
}
//为城市选项添加改变事件
addEvent(citySelection, "change", function() {
    setColleges();
});
//为radio区域添加改变事件
addEvent(radio, "change", function() {
    radioChange();
});
init();

