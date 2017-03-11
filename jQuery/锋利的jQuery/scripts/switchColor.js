$(function() {
    $(".color_change ul li img").click(function() {
        $(this).addClass("hover")
               .parent().siblings().find('img').removeClass('hover');
        //切换商品信息
        var imgSrc = $(this).attr("src"), 
            i = imgSrc.lastIndexOf("."), 
            unit = imgSrc.substring(i), 
            imgSrc = imgSrc.substring(0, i), 
            img_small = imgSrc + "_one_small" + unit, 
            img_big = imgSrc + "_one_big" + unit;
        $("#bigImg").attr("src", img_small);
        $("#thickImg").attr("href", img_big);
        //切换颜色名
        var alt = $(this).attr("alt");
        $(".color_change strong").text(alt);
        //切换商品小图标列表
        var newImgSrc = imgSrc.replace("images/pro_img/", "");
        $("#jnProitem .imgList li").hide();
        $("#jnProitem .imgList").find(".imgList_"+newImgSrc).show()
                                .eq(0).find("a").click();
    });
});