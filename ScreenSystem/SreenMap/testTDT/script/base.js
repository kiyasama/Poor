$(function(){
	var height = $(window).height();
    var width = $(window).width();
    window.onresize = function () {
        height = $(window).height();
        width = $(window).width();
        $("div.middle").css("height", height);
        $("div.middle").css("width", width);
        if ($("body > div.middle > div.leftpanel").length > 0 && $("body > div.middle > div.leftpanel").position().left == 0) {
            $("div.middle>div.map").css("height", height - 100);
        } else {
            $("div.middle>div.map").css("height", height - 100);
        }
    };
    if ($("body > div.middle > div.leftpanel").length > 0 && $("body > div.middle > div.leftpanel").position().left == 0) {
        $("div.middle>div.map").css("height", height - 100);
    } else {
        $("div.middle>div.map").css("height", height - 100);
    }
	
	addMap();

});