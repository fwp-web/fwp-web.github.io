var citySelect = document.getElementById("city");
var colledgeSelect = document.getElementById("school");
var radio = document.getElementsByTagName("fieldset")[0];
var colledges = {
	Beijing: ["北京大学", "清华大学", "北京理工大学", "北京航空航天大学"],
	Shanghai: ["上海交通大学", "复旦大学", "同济大学"],
	Wuhan: ["武汉大学", "华中科技大学", "华中师范大学"],
	Harbin: ["哈尔滨工业大学", "哈尔滨工程大学", "东北农业大学"]
};
//城市、学校联动
function onSelect() {
	var city = citySelect.options[citySelect.selectedIndex].value;
	colledgeSelect.innerHTML = "<option value='0'>请选择学校</option>";
    for(var i=0; i<colledges[city].length; i++) {
        colledgeSelect.innerHTML += "<option value=" + colledges[city][i] + ">" + colledges[city][i] + "</option>";
    }
}
//在校生（非在校生）选择
function radioChange() {
	if(document.getElementById("undergraduate").checked) {
		document.getElementById("fs1").className = "";
		document.getElementById("fs2").className = "hidden";
	}
	else {
        document.getElementById("fs2").className = "";
        document.getElementById("fs1").className = "hidden";
	}
}
function init() {
	radio.addEventListener("change", function() {
        radioChange();
	});
    citySelect.addEventListener("change", function() {
    	onSelect();
    });
}

window.onload = init;