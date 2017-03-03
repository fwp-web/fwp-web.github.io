var validator = {
    //长度验证
    lengthControl: function() {
        //console.log(this);
        var min_length = this.data.min_length, 
            max_length = this.data.max_length, 
            input = this.form.value, 
            inputs = input.split(""), 
            length = 0;
        if(input.trim() == "") {
            if(this.data.required){
                this.failTip(0);
            } else {
                this.defaultTip();
                return true;
            }    
        } else {
            for(var i = 0, len = inputs.length; i < len; i++) {
                if(/[^\x00-\xff]/.test(inputs[i])) {   //匹配双字节字符
                    length += 2;
                } else {
                    length += 1;
                }
            }
            if(length < min_length) {
                this.failTip(1);
            } else if(length > max_length) {
                this.failTip(2);         
            } else {
                this.successTip();
                return true;
            }
        }
        return false;
    }, 
    //验证number、email、phone
    formatControl: function() {
        var input = this.form.value;
        if(input.trim() == "") {
            if(this.data.required){
                this.failTip(0);
            } else {
                this.defaultTip();
                return true;
            }    
        } else {
            switch(this.data.input_type) {
                case "number":          //验证number格式
                    if(/\d/.test(input)) {
                        this.successTip();
                        return true;
                    } else {
                        this.failTip(1);
                    }
                    break; 
                case "email":          //验证email格式
                    if((/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/).test(input)) {
                        this.successTip();
                        return true;
                    } else {
                        this.failTip(1);
                    }
                    break;
                case "phone":          //验证手机号码格式
                    if(/^1[3|4|5|8][0-9]\d{4,8}$/.test(input)) {
                        this.successTip();
                        return true;
                    } else {
                        this.failTip(1);
                    }
                    break;
            }       
        }
        return false;
    }, 
    //验证radio、checkbox是否选择
    radioCheckbox: function() {
        var items = this.form.getElementsByTagName("input");
        for(var i = 0, len = items.length; i < len; i++) {
            if(items[i].checked) {
                this.successTip();
                return true;
            }
        }
        if(this.data.required) {
            this.failTip(0);
        } else {
            this.defaultTip();
            return true;
        }
        return false;
    }, 
    //验证select
    select: function() {
        this.successTip();
        return true;
    }
};
