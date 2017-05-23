//贫困分布右侧列表
define(function(require, exports, module) {
	require("jquery");
	require("pagination");
	require("jquery-jtemplates");
	require('js/core/UICore.js')($);
	//require("css/commonStyle.css");
	require("css/right.css");
	//require("css/pkfbRight.css");
	require("js/lib/pagination/simplePagination.css");
	exports.init = function() {
		//$("#tabLeft").css("display", "none");
		$("#tabRight").css("display", "block");
		$("#tabRight").setTemplateURL("./htmltemplate/pkfbList.html").processTemplate();
		setMinHeight();
		var pkfb = require("./pkfb.js");
		pkfb.init();
		//点击详情
		$(".pkfbXq").live("click", function(obj) {
			var id = $(obj.target).attr("id");
			var pkfbDetail = require("./pkfbDetail.js");
			pkfbDetail.init(id);
		});
		//一表清
		$(".fpybq").live("click", function() {
			var oneTab = require("./oneTable.js");
			var id = $(this).attr("name");
			oneTab.init(id);
		});


		$(".search input:text").focus(function() {
			$(this).css("border-color", "#159ff3");
			$(".search input:button").css("border-color", "#159ff3");
		});
		$(".search input:text").blur(function() {
			$(this).css("border-color", "#cccccc");
			$(".search input:button").css("border-color", "#cccccc");
		});

		function setMinHeight() {
			var minHeight = document.documentElement.clientHeight - 102;
			$("#rightdiv").children(".tabRight").css('height', minHeight);
		}
	};

});
