$(function() {
    var $tabLi = $("div.tab_menu ul li");
    $tabLi.click(function() {
        $(this).addClass("selected")
               .siblings().removeClass("selected");
        var index = $tabLi.index(this);
        $("div.tab_box>div").eq(index).show()
                            .siblings().hide();
    }).hover(function() {
        $(this).addClass("hover");
    }, function() {
        $(this).removeClass("hover");
    });
});