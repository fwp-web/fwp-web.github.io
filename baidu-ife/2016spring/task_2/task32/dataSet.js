
//获取各个类型表单中的数据
function getDataFromInput(id) {
    return document.getElementById(id).value;
}
function getDataFromRadio(name) {
    return document.querySelector("input[name='"+ name + "']:checked").id;
}
function getDataFromSelect(id) {
    var stylebox = document.getElementById(id), 
        index = stylebox.selectedIndex;
    return stylebox.options[index].value;
}
function getDataFromTextarea(id) {
    var textarea = document.getElementById(id), 
        items = textarea.value.split(/[ |,|\n|，]/);
    return items;
}

//表单数据生成
function DataSet(){
    this.data = {
        type: "", 
        input_type: "", 
        label: "", 
        required: true, 
        style: "",
        success_info: "", 
        fail_info: [], 
        default_info: "", 
        min_length: 0, 
        max_length: 1, 
        id: 0, 
        items: [], 
        validator: function(){}
    };
    this.id = 0;
}
DataSet.prototype = {
    init: function() {
        this.data = {
            type: "", 
            input_type: "", 
            label: "", 
            required: true, 
            style: "",
            success_info: "", 
            fail_info: [], 
            default_info: "", 
            min_length: 0, 
            max_length: 1, 
            items: [], 
            id: 0, 
            validator: function(){}
        }
    }, 
    setType: function() {
        var typeId = getDataFromRadio("type");
        switch(typeId) {
            case "inputSet":
                this.data.type = "input";
                break;
            case "radioSet":
                this.data.type = "radio";
                break;
            case "checkboxSet":
                this.data.type = "checkbox";
                break;
            case "selectSet":
                this.data.type = "select";
                break;
            case "textareaSet":
                this.data.type = "textarea";
                break;
        }
    }, 
    setBaseData: function() {
        this.data.label = getDataFromInput("name");
        this.data.required = getDataFromRadio("nece") == "required";
        this.data.style = getDataFromSelect("style");
        console.log(this.data.id);
        this.data.id = "form" + (this.id++);
        if(this.data.type == "input") {
            this.data.input_type = getDataFromRadio("rule");
        }      
    }, 
    //设置text、pwd、tsxtarea的数据格式
    setLengthLimitData: function() {    
        this.data.min_length = parseInt(getDataFromInput("minLen"));
        this.data.max_length = parseInt(getDataFromInput("maxLen"));
        if(this.data.min_length > this.data.max_length) {
            alert("最小长度应小于或等于最大长度");
            this.init();
            return;
        }
        this.data.default_info = (this.data.required?"必填":"选填")+",长度应为"+this.data.min_length+"-"+this.data.max_length+"个字符";
        this.data.fail_info = [this.data.label+"不能为空", 
                               this.data.label+"长度不能小于"+this.data.min_length, 
                               this.data.label+"长度不能大于"+this.data.max_length];
        this.data.success_info = this.data.label + "格式正确";
        this.data.validator = validator.lengthControl;
    }, 
    //设置number、email、phone的数据格式
    setInputLimitData: function() {
        this.data.default_info = (this.data.required?"必填":"选填")+",请输入您的"+this.data.label;
        this.data.fail_info = [this.data.label+"不能为空", 
                               this.data.label+"格式不正确"];
        this.data.success_info = this.data.label + "格式正确";
        this.data.validator = validator.formatControl;
    }, 
    //设置radio、checkbox、select的数据格式
    setSpecialItemData: function() {
        this.data.items = getDataFromTextarea("items");
        if(this.data.items.length === 0) {
            alert("请输入选项");
            this.init();
            return;
        } else if(this.data.items.length === 1) {
            alert("一个选项无法生成表单");
            this.init();
            return;
        }
        this.data.default_info = (this.data.required?"必填":"选填")+",请选择您的"+this.data.label;
        this.data.fail_info = [this.data.label+"没有选择"];
        this.data.success_info = this.data.label + "已选择";
        if(this.data.type === "select") {
            this.data.validator = validator.select;
        } else {
            this.data.validator = validator.radioCheckbox;
        }
    }, 
    //生成表单数据
    setData: function() {
        this.init();
        this.setType();
        this.setBaseData();
        switch(this.data.type) {
            case "input": 
                switch(this.data.input_type) {
                    case "text":
                    case "pwd":
                        this.setLengthLimitData();
                        break;
                    case "number":
                    case "email":
                    case "phone":
                        this.setInputLimitData();
                        break;
                }
                break;
            case "radio":
            case "checkbox":
            case "select":
                this.setSpecialItemData();
                break;
            case "textarea": 
                this.setLengthLimitData();
        }
    }, 
    //获取表单数据
    getData: function() {
        return this.data;
    }
} 



