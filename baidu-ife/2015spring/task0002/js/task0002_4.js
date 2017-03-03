function init() {
    var inputArea = $("input")[0], 
        suggestDataset = {
            t: ["text", "txt", "tencent"], 
            text: ["text1", "text234", "text1234","texthah"], 
            defaultV: ["text", "like", "food", "book"]
        }, 
        index = 0;
    //按照输入给出提示    
    inputArea.onkeyup = suggest;

    function suggest() {
        var input = simpleTrim(inputArea.value);
        if(input === "") {
            return;
        }
        generateSugs(input);
    }

    //生成suggestions
    function generateSugs(input) {
        var txt = "", suggestData, suggestions;
        if(!$("#suggestions")[0]) {
            suggestions = document.createElement("div");
            suggestions.id = "suggestions";
            insertAfter(suggestions, inputArea);
        } else {
            suggestions = $("#suggestions")[0];
        }
        //获取suggestData
        if(input.toLowerCase() == "t") {
            suggestData = suggestDataset.t;
        } else if(input.toLowerCase() == "text") {
            suggestData = suggestDataset.text;
        } else {
            suggestData =suggestDataset.defaultV;
        }
        for(var i = 0, len = suggestData.length; i < len; i++) {
            txt += "<span index='"+ (i+1) + "'>"  + suggestData[i] + "</span>";
        }
        suggestions.innerHTML = txt;
        suggestions.style.display = "block";

        var tips = $("#suggestions span");

        //鼠标滑过提示效果
        suggestions.onmouseover = hoverSugs;
        function hoverSugs(event) {
            var e = event || window.event, 
                target = e.target || e.srcElement;
                
            if(target.tagName.toLowerCase() == "span") {
                for(var i = 0, len = tips.length; i < len; i++) {
                    if(hasClass(tips[i], "on")) {
                        removeClass(tips[i], "on");
                        break;
                    }
                }
                addClass(target, "on");
                index = parseInt(target.getAttribute("index"));
            }
        }
        //鼠标单击选中提示
        suggestions.onclick = clickSugs;   
        function clickSugs(event) {
            var e = event || window.event, 
                target = e.target || e.srcElement;

            if(target.tagName.toLowerCase() == "span") {
                inputArea.value = target.innerHTML;
                index = 0;
                suggestions.style.display = "none";
            }
        }

        //键盘上下键选择提示
        if(suggestions.style.display == "block") {
            document.onkeyup = keypressSugs;
            function keypressSugs(event) {
                var e = event || window.event, 
                    target = e.target || e.srcElement;

                stopPropagation(e);

                if(e.keyCode == 40) {            //向下选择
                    if(index != 0 && tips[index - 1].className) {
                         removeClass(tips[index - 1], "on");
                    }
                    if(index == 0 || index == tips.length) {
                        index = 1;
                    } else {
                        index++;
                    }
                    addClass(tips[index - 1], "on");
                } else if(e.keyCode == 38) {     //向上选择
                    if(index != 0 && tips[index - 1].className) {
                         removeClass(tips[index - 1], "on");
                    }
                    if(index == 0 || index == 1) {
                        index = tips.length;
                    } else {
                        index--;
                    }
                    addClass(tips[index - 1], "on");
                } else if(e.keyCode == 13) {     //回车选择
                    inputArea.value = tips[index - 1].innerHTML;
                    index = 0;
                    suggestions.style.display = "none";
                }
            }
        }

    }

}

window.onload = init;



