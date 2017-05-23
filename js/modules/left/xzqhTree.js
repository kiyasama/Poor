//通用行政区划树
define(function(require, exports, module) {
	require("jquery");
	require("pagination");
	require("jquery-jtemplates");
	require('js/core/UICore.js')($);
	require("jquery.ztree.core");
	//require("jquery.ztree.excheck");
	require("css/zTreeStyle/zTreeStyle1.css");
	require("css/zTree.css");
	require("css/zTree_new.css");
	//require("css/zTree.css");
	//require("css/zTree_new.css");
	//tree setting

	//var treeNodes;
	var zNodes;
	var treeObj = {};
	exports.init = function(url, divId, setting) {
		//展开所有节点
		function expendAllNode() {
			treeObj.expandAll(true);
		}
		//关闭所有节点
		function expandAllNodeFalse() {
			treeObj.expandAll(false);
		}
		getData(url,divId,setting);

		$("#qbzk").live("click", function() {
			expendAllNode();
		});
		$("#qbsq").live("click", function() {
			expandAllNodeFalse();
		});

		

	};

	//	function getData(url) {
	//		$.ajax({
	//			type: "get",
	//			async: false,
	//			url: $.serviceHttp() + url,
	//			success: function(data) {
	//				var arr = $.parseJSON(data);
	//				zNodes = arr.list;
	//				for (var i = 0; i < zNodes.length; i++) {
	//					zNodes[i].isParent = true;
	//					/*if (zNodes[i].pId != "0" && divId == "#treeDemo1") {
	//						//zNodes[i].open = true;
	//						zNodes[i].iconSkin = "icon_level2_cur.png"
	//					}*/
	//				}
	//			},
	//			error: function() {}
	//		});
	//	}

	function getData(url,divId,setting) {
		//跨域提取数据
		var url = url + "&jsonpCallback=?";
		$.ajaxSettings.async = false; //同步执行
		$.getJSON($.serviceHttp() + url,
			function(data) {
				zNodes = data.list;
				for(var i = 0; i < zNodes.length; i++) {
					zNodes[i].isParent = true;
//					if (zNodes[i].pId != "0" && divId == "#treeDemo1") {
//						zNodes[i].open = true;
//						//zNodes[i].iconSkin = "icon_level2_cur.png"
//					}
				}
				treeObj = $.fn.zTree.init($(divId), setting, zNodes);
				//$.fn.zTree.getZTreeObj(divId.split("#")[1]);
				var nodes = treeObj.getNodes();
				if(divId == "#treeDemo1") {
					treeObj.expandAll(true);
				} else {
					treeObj.expandNode(nodes[0], true);
					//address = treeObj.getNodes()[0].name;
					// code = treeObj.getNodes()[0].code;
				}
			}
		);
	}
});