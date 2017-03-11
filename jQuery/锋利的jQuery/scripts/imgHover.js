$(function() {
    $("#jnBrandList li").each(function(index) {
        var $img = $(this).find("img"), 
            img_width = $img.width(), 
            img_height = $img.height(), 
            spanHtml = "<span style='position:absolute;top:0;left:5px;width:"
                        +img_width+"px;height:"+img_height+"px;' class='imageMask'></span>";
        $(spanHtml).appendTo(this);
    })
    $("#jnBrandList").delegate('.imageMask', 'hover', function() {   //事件委托
        $(this).toggleClass('imageOver');
    });
})