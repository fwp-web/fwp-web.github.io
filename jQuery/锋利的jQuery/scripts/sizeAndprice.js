$(function() {
    $(".pro_size li").click(function() {
        $(this).addClass("cur").siblings().removeClass("cur");
        $(this).parent().siblings("strong").text($(this).text());
    });
});
$(function() {
    var $span = $(".pro_price strong"), 
        price = $span.text();
    $("#num_sort").change(function() {
        var num = $(this).val(), 
            amount = num * price;
        $span.text(amount);
    });
});