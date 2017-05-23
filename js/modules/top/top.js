//行政区划全局变量
var LoginAccount = {
	code: "610700",
	address: "汉中市",
	mapId: "1",
	center: {
		x: "211910.51",
		y: "291917.2"
	}
};
//头部菜单
define(function(require, exports, module) {
	require("jquery");
	require("jquery-jtemplates");
	require('js/core/UICore.js')($);
	require("css/top.css");
	require("css/common.css");
	require("css/config.css");
	require("css/mapcss.css");
	require("css/maptreecss.css");
	//require("css/text.css");
	require("css/zTree.css");
	//初始化
	exports.init = function() {
		$("#header_container").setTemplateURL("./htmltemplate/top.html").processTemplate();
		getDefaultCode();
		mapLoader();
		//菜单点击
		$(".zcfg").click(function() { //政策法规
			muneStyle(this);
			window.location.href = $.serviceHttp() + 'policyRegulation_messList.html?pageType=policyRegulation&type=2';
		});
		$(".tpjz").click(function() { //脱贫机制
			muneStyle(this);
			window.location.href = $.serviceHttp() + 'policyRegulation_messList.html?pageType=TuoPinJZ&type=3';
		});
		$(".pkh").click(function() { //贫困分布
			muneStyle(this);
			loadPkfbList();
			loadpkfbTree();
		});
		$(".pkxm").click(function() { //扶贫项目
			muneStyle(this);
			//loadProjectRight();
			loadProjectLeft();
		});
		$(".tpgz").click(function() { //帮扶主体
			muneStyle(this);
			loadPkfbRight();
			loadareaTree('jdbf');
		});
		$(".tpcx").click(function() { //脱贫成效
			muneStyle(this);
			if (LoginAccount.code.indexOf('610429') !== -1) {
				if (confirm("是否进入2015年脱贫成效界面？")) {
					window.location.href = $.serviceHttp() + 'tjfx/tpEffect_XY.html';
				} else {
					window.location.href = $.serviceHttp() + 'tjfx/tpEffect.html';
				}
			} else {
				window.location.href = $.serviceHttp() + 'tjfx/tpEffect.html';
			}
		});
		$(".tjfx").click(function() { //统计分析
			muneStyle(this);
			if (LoginAccount.code.indexOf('610429') !== -1) {
				if (confirm("是否进入2015年统计分析界面？")) {
					window.location.href = $.serviceHttp() + 'tjfx/poorPeople_XY.html';
				} else {
					window.location.href = $.serviceHttp() + 'tjfx/poorPeopleTJ.html';
				}
			} else {
				window.location.href = $.serviceHttp() + 'tjfx/poorPeopleTJ.html';
			}
		});
		$(".jdfx").click(function() { //监督分析
			muneStyle(this);
			window.location.href = $.serviceHttp() + 'Poor/ScreenSystem/';
		});
	};

	function mapLoader() {
		// require.async("../map/map.js", function(e) {
		// e.initMap();
		// });
		var mapModule = require("../map/map.js");
		mapModule.initMap();
	}
	//加载左侧贫困分布tree
	function loadpkfbTree() {
		require.async("../left/pkfbTree.js", function(e) {
			e.init();
		});
	}
	//加载行政区划树
	function loadareaTree(name) {
		require.async("../left/areaTree.js", function(e) {
			e.init(name);
		});
	}
	//加载右侧贫困分布列表
	function loadPkfbList() {
		require.async("../right/pkfbList.js", function(e) {
			e.init();
		});
	}

	function loadProjectLeft() {
		require.async("../left/xmjg.js", function(e) {
			e.init();
		});
	}

	function loadProjectRight() {
		require.async("../right/ztqk.js", function(e) {
			e.init();
		});
	}

	//加载脱贫成效列表
	function loadPkfbRight() {
		require.async("../right/pkfbRight.js", function(e) {
			e.init();
		});
	}

	function muneStyle(obj) { //菜单点击效果（获取选中元素的所有同胞元素遍历，去除选中样式）
		$(obj).addClass("current").siblings().each(function(i, e) {
			var className = $(e).attr("class");
			if (className.indexOf("current") > -1) {
				className = className.substring(0, className.indexOf("current"));
				$(e).attr("class", className);
			}
		});
	}
	//根据登录帐号获取树的根节点code和name,用作默认显示内容
	function getDefaultCode() {
		//跨域提取数据
		var url = "poorPeople/poorPeopleInterface.shtml?act=loginmess&jsonpCallback=?";
		$.ajaxSettings.async = false; //同步执行
		$.getJSON($.serviceHttp() + url,
			function(data) {
				var obj1 = data.list[0];
				if (obj1.mapid === null || obj1.mapid === '') {
					return;
				}
				LoginAccount.code = obj1.areacode;
				LoginAccount.mapId = obj1.mapid;
				LoginAccount.address = obj1.areaname;
				LoginAccount.center = {
					x: obj1.x,
					y: obj1.y
				}
				var account = data.obj;
				$(".optEntry").children().eq(0).children().attr({
					title: account
				});
			}
		);
	}

});
