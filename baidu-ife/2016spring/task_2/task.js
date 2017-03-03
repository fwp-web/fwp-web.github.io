/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function $(id) {
    return document.getElementById(id);
}

function addAqiData() {
    var city = $("aqi-city-input").value.trim(), 
        num = parseInt($("aqi-value-input").value);
    if(city && !isNaN(num) && num >= 0 && num <= 500) {
        aqiData[city] = num;
    } else {
        alert("请填写城市或正确的空气质量指数");
    }
   // console.log(aqiData);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = $("aqi-table"), 
        text = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var city in aqiData) {
        text += "<tr><td>" + city + "</td><td>" + aqiData[city] + 
                "</td><td><button data-city='" + city + "'>删除</button></td>"; 
    }
    table.innerHTML = city ? text : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  $("add-btn").onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  $("aqi-table").onclick = function(event) {
    var event = event || window.event, 
        target = event.target || event.srcElement;
    if(target.tagName.toLowerCase() === "button") {
        delBtnHandle.call(null, target.dataset.city);
    }
  };
  // 在这下面给会回车绑定一个事件，触发addBtnHandle函数
  document.onkeyup = function(event) {
    var event = event || window.event;
    if(event.keyCode === 13) {
        addBtnHandle();
    }
  };
}

init();