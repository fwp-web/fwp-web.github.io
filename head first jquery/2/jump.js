$(document).ready(function(){
    $(".guess_box").click(checkForCode);
    function getRandom(num){
    	var result = Math.floor( Math.random() * num);
    	return result; 
    }
    var hideCode = function(){
    	var numRand = getRandom(4);
    	$(".guess_box").each(function(index, value){
    		if( numRand == index ){
    			$(this).append("<span id='has_discount'></span>");
    			return false;
    		}
    	});
    }
    hideCode();
    function checkForCode(){
    	var discount;
    	if($.contains(this, document.getElementById("has_discount"))){
    		var myDiscount = getRandom(100);
    		discount = "<p>Your code: CODE" + myDiscount + "</p>";
    	}
    	else{
    		discount = "<p>Sorry,no discount this time!</p>";
    	}
    	$(".guess_box").each(function(){
    		if($.contains(this, document.getElementById("has_discount"))){
    			$(this).addClass("discount");
    		}
    		else{
    			$(this).addClass("no_discount");
    		}
    		$(this).unbind("click");
    	});
    	$("#result").append(discount);
    }
    $(".guess_box").hover(function(){
    	$(this).addClass("hover");
    }, function(){
    	$(this).removeClass("hover");
    });
});