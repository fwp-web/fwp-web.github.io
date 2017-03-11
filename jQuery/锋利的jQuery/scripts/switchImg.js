$(function() {
    $("#jnProitem ul.imgList li a").click(function() {
        var imgSrc = $(this).find("img").attr("src"), 
            i = imgSrc.lastIndexOf("."), 
            unit = imgSrc.substring(i), 
            img = imgSrc.substring(0, i), 
            imgSrc_big = img + "_big" + unit;
        $("thickImg").attr("href", imgSrc_big);
    });    
});