function FormCheck(data){
    this.data = data;
    this.tip = document.getElementById("tip_"+data.id);
    this.form = document.getElementById(data.id);
    this.validator = data.validator;
    this.init();
}
FormCheck.prototype = {
    init: function() {
        addEvent(this.form, "focus", this.defaultTip.bind(this));
        addEvent(this.form, "blur", this.validator.bind(this));
        addEvent(this.form, "change", this.validator.bind(this));
    }, 
    defaultTip: function() {
        this.tip.innerHTML = this.data.default_info;
        this.tip.className = "default";
        this.form.className = "default";
    }, 
    failTip: function(i) {
        this.tip.innerHTML = this.data.fail_info[i];
        this.tip.className = "fail";
        this.form.className = "fail";
    }, 
    successTip: function() {
        this.tip.innerHTML = this.data.success_info;
        this.tip.className = "success";
        this.form.className = "success";
    } 
}