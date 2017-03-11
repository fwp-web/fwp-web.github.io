$(function() {
    $("#jnBrandTab li a").click(function() {
        $(this).parent().addClass("chos")
               .siblings().removeClass('chos');
        var index = $("#jnBrandTab li a").index(this);
        showBrand(index);
    }).eq(0).click();
});
//显示不同的广告
function showBrand(index) {
    var $rollbj = $("#jnBrandList"), 
        rollwidth = $rollbj.find("li").outerWidth();
    rollwidth = rollwidth * 4;
    $rollbj.stop(true, false).animate({left: -rollwidth*index}, 1000);
}