/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for(var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
}; 

// 用于渲染图表的数据
var chartData = {};
var colors = ["#32e444", "#1da4e8", "#a152d9", "#fa0896", "#df0620"];

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
};

//月份的天数
var monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//用到的dom节点
var timeForm = $("#form-gra-time")[0], 
    citySelect = $("#city-select")[0], 
    show = $(".aqi-chart-wrap")[0];
/**
 * 渲染图表
 */
function renderChart() {
  var text = "", colorIndex;
  for(var item in chartData) {
    colorIndex = Math.floor(chartData[item] / 100);
    text += "<div title='"+ item +":"+ chartData[item] + 
            "' style='height:" + chartData[item] + 
            "px; background-color:" + colors[colorIndex] +"'></div>";
  }
  show.innerHTML = text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(radio) {
  // 确定是否选项发生了变化 
  if(radio.value === pageState.nowGraTime) {
    return;
  } else {
    pageState.nowGraTime = radio.value;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  if(pageState.nowSelectCity === this.value) {
    return;
  } else {
    pageState.nowSelectCity = this.value;
  }
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  $.clickOne(timeForm, function(event) {
    var event = event || window.event, 
        target = event.target || event.srcElement;

    if(target.tagName.toLowerCase() === "input") {
      graTimeChange(target);
    }
  });
    
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var text = "";
  for(var city in aqiSourceData) {
    text += "<option>" + city + "</option>";
  }
  citySelect.innerHTML = text;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  $.clickOne(citySelect, citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var nowData = aqiSourceData[pageState.nowSelectCity];
  chartData = {};
  
  if(pageState.nowGraTime === "day") {
    chartData = nowData;
  } else if(pageState.nowGraTime === "week") {
    var sum = 0, dayCount = 0, week = 1; 
    for(var time in nowData) {
      sum += nowData[time];
      dayCount++;
      if(new Date(time).getDay() === 6) {
        chartData["第"+week+"周"] = Math.floor(sum / dayCount);
        week++;
        sum = 0;
        dayCount = 0;
      }
    }
    //保证最后一周剩余的天算上
    if(dayCount !== 0) {
      chartData["第"+week+"周"] = Math.floor(sum / dayCount);
    }
  } else if(pageState.nowGraTime === "month") {
    var dt = new Date(Object.keys(nowData)[0]), 
        month = dt.getMonth(),
        sum = 0, dayCount = 0, monthCount = 1;
    for(var date in nowData) {
      sum += nowData[date];
      dayCount++;
      //日期到达月底
      if(dayCount === monthDays[month]) {
        chartData["第"+monthCount+"月"] = Math.floor(sum / dayCount);
        monthCount++;
        sum = 0;
        dayCount = 0;
      }
    }
    //保证最后一个月剩余的天算上
    if(dayCount !== 0) {
      chartData["第"+monthCount+"月"] = Math.floor(sum / dayCount);
    }
  }
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();