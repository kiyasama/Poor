//脱贫项目-整体情况
define(function(require, exports, module) {
	require("jquery");
	require("pagination");
	require("jquery-jtemplates");
	require("echarts");
	require('js/core/UICore.js')($);
	require("js/lib/pagination/simplePagination.css");
	require("css/projectRight.css");
	//require("css/bootstrap.min.css");
	require("css/right.css");
	require("js/modules/right/ProjectEcharts.js");

	exports.init = function() {
		//$("#zjm111").css("display", "none");

		$("#tabRight").setTemplateURL("./htmltemplate/projectinfo.html").processTemplate();
		setMinHeight();
		$('#zjm111').hide();
		//$('#hideRightDiv2').hide();
		$('#showRightDiv1').show();
		//$("#showRightDiv1").css("display", "block");
		var myChart = echarts.init(document.getElementById('approvedPie'));
		myChart.setOption(option);
		// var pkfb = require("./pkfb.js");
		// pkfb.init();
		$("#showRightDiv1").click(function() {
			$(this).hide();
			$('#zjm111').show();
		});
		$("#hideRightDiv2").click(function() {
			$('#zjm111').hide();
			$("#showRightDiv1").show();
		});
	};

	function setMinHeight() {
		var minHeight = document.documentElement.clientHeight - 120;
		$("#helpProjectDiv").find(".approvedmap").css('height', minHeight);
	}
});
