function Data_product(origin_data_box) {
    this.box = origin_data_box;
    this.id = 0;  //目前生成的表单id
}
Data_product.prototype = {
    //获取data_box里的相应值
    getBoxData: function(data_box) {
        return data_box.box[];
    },
    //获取表单信息
    getData: function() {
        var data = {
            label: "",             //表单标签
            type: "",              //表单类型
            input_type: "",        //input类型
            necessary: true,       //是否必填
            success: "",           //输入正确的提示
            rules: "",             //填写规则提示
            fail: [],              //输入失败的提示   
            id: "",                //表单的id
            min_length: 0,         //text类最小长度
            max_length: 1,         //text类最大长度
            items: [],             //radio等选择表单的选项
            validator: function() {
            }  //表单的验证规则
        };
        data = getBaseData(data);
        switch(data.type) {
            case "textarea":
                data = this.getLengthLimitData(data);
                break;
            case "input":
                switch(data.input_type) {
                    case "text":
                    case "pwd":
                        data = this.getLengthLimitData(data);
                        break;
                    case "number":
                    case "email":
                    case "phone":
                        data = this.getSpecialInputData(data);
                        break;
                }
                break;
            case "radio": 
            case "checkbox":
            case "select": 
                data = this.getSpecialItemData(data);
                break;
        }
        return data;
    }, 
    //获取基本表单数据
    getBaseData: function(data) {
        data.label = this.getBoxData(this.box.label_box);
        data.type = this.getBoxData(this.box.type_box);
        data.input_type = this.getBoxData(this.box.input_type_box);
        data.necessary = this.getBoxData(this.box.nece_box) == "necessary";
        data.id = "form" + this.id++;
    }, 
    //获取有长度限制的输入的数据
    getLengthLimitData: function(data) {
        data.min_length = this.getBoxData(this.box.min_len_box);
        data.max_length = this.getBoxData(this.box.max_len_box);
        data.rules = data.necessary?"必填":"选填" + "，长度应为" + min_length + "-" + max_length + "个字符";
        data.fail = [data.label + "不能为空", 
                     data.label + "长度不能小于" + min_length + "个字符",
                     data.label + "长度不能大于" + max_length + "个字符"];
        data.success = data.label + "格式正确";
        data.validator = validator.length_limit;
        return data;
    }
    //获取number、email、phone的输入信息
    getSpecialInputData: function(data) {
        data.rules = data.necessary?"必填":"选填" + "，请输入您的" + data.label;
        data.fail = [data.label + "不能为空", 
                     data.label + "格式不正确"];
        data.success = data.label + "格式正确";
        data.validator = validator[data.input_type];
        return data;
    }
    //获取radio、checkbox、select的输入信息
    getSpecialItemData: function(data) {
        var items = this.getBoxData(this.box.item_box);
        if(items.length === 0) {
            alert("请添加"+ data.label +"的选项");
            return;
        } else if(items.length === 1) {
            alert("只添加了一个选项，无法创建");
            return;
        }
        data.items = [];
        for(var i = 0, len = items.length; i < length; i++) {
            data.items.push(items[i]);
        }
        data.rules = data.necessary?"必填":"选填" + "，请选择您的" + data.label;
        data.fail = [data.label + "未选择"];
        data.success = data.label + "已选择";
        data.validator = validator[data.type];
        return data;
    }, 
    //添加表单
    addForm: function(data) {
        switch(data.type) {
            case "input":
                this.addInputForm(data);
                break;
            case "textarea":
                this.addTextareaForm(data);
                break;
            case "radio":
                this.addRadioForm(data);
                break;
            case "checkbox":
                this.addCheckboxForm(data);
                break;
            case "select":
                this.addSelectForm(data);
                break;
        }
    }, 
    //添加Input类型的表单
    addInputForm: function(data) {
        
    }
};