function FormAdd() {}
FormAdd.prototype = {
    //添加提交按钮
    addSubmitButton: function(container) {
        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("id", "submit");
        btn.innerHTML = "提交";
        container.appendChild(btn);
    }, 
    //添加input表单
    addInputForm: function(data, container) {
        var box = document.createElement("div"), 
            type = data.input_type == "pwd"?"password":"text";
        box.innerHTML = "<label>"+data.label+"<input type='"+type+"' id='"+data.id+"'>"
                        +"</label><span id='tip_"+data.id+"'></span>";
        container.insertBefore(box, container.lastElementChild);
    }, 
    //添加radio、checkbox
    addRadioCheckboxForm: function(data, container) {
        var box = document.createElement("div"), 
            text = "";
        box.setAttribute("id", data.id);
        text += "<label class='divLabel'>"+data.label+"</label>";
        for(var i = 0, len = data.items.length; i < len; i++) {
            text += "<label><input type='"+data.type+"' name='"+data.id+"' id='"+data.id+"_"+i+"'>"+data.items[i]+"</label>";
        }
        text += "<span id='tip_"+data.id+"'></span>";
        box.innerHTML = text;
        container.insertBefore(box, container.lastElementChild);
    }, 
    //添加select
    addSelectForm: function(data, container) {
        var box = document.createElement("div"), 
            text = "";
        text += "<label for='"+data.id+"'>"+data.label+"</label><select name='"+data.id+"' id='"+data.id+"'>";
        for(var i = 0, len = data.items.length; i < len; i++) {
            text += "<option>"+data.items[i]+"</option>";
        }
        text += "</select><span id='tip_"+data.id+"'></span>";
        box.innerHTML = text;
        container.insertBefore(box, container.lastElementChild);
    }, 
    //添加textarea
    addTextareaForm: function(data, container) {
        var box = document.createElement("div");
        box.innerHTML = "<label for='"+data.id+"'></label><textarea name='"+data.id+"' id='"+data.id+"'></textarea><span id='tip_"+data.id+"'></span>";
        container.insertBefore(box, container.lastElementChild);
    }, 
    //根据表单类型添加表单
    addForm: function(data, container) {
        if(data.id === "form0") {
            this.addSubmitButton(container);
        }
        switch(data.type) {
            case "input":
                this.addInputForm(data, container);
                break;
            case "textarea":
                this.addTextareaForm(data, container);
                break;
            case "radio":
            case "checkbox":
                this.addRadioCheckboxForm(data, container);
                break;
            case "select":
                this.addSelectForm(data, container);
                break;        
        }
    }
}
