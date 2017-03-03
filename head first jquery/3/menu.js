$(document).ready(function(){
    var v = false;
    $("button#vegOn").click(function(){
        if(v == false){
            $f = $("li.fish").parent().parent().detach();
            $(".hamburger").replaceWith("<li class='portobello'><em>Portobello Mushroom</em></li>");
             $(".portobello").parent().parent().addClass("veg_leaf");
            $(".meat").after("<li class='tofu'><em>Tofu</em></li>");
            $m = $(".meat").detach();
            $(".tofu").parent().parent().addClass("veg_leaf");
            v = true;
        }
    });
    $("button#restoreMe").click(function(){
        if(v == true){
        	$(".menu_entrees").children().first().before($f);
        	//$(".menu_entrees li").first().before($f);
        	$(".portobello").parent().parent().removeClass("veg_leaf");
        	$(".portobello").replaceWith("<li class='hamburger'>Hamburger</li>");
        	$(".tofu").each(function(index){
        		$(this).after($m[index]);	
        	});
        	$(".tofu").parent().parent().removeClass("veg_leaf");
        	$(".tofu").remove();
            v = false;
        }
    });
});