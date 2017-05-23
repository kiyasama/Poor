 
var setting = {
	data: {
		key: {
			title: "t"
		},
		simpleData: {
			enable: true
		}
	},
	view: {
		fontCss: getFontCss,

	},
	callback: {
		onClick: onClick
	}
};

//        var zNodes =[
//            {"id":"1","name":"产业扶持","pId":"0","t":"产业扶持"},
//            {"id":"2","name":"人畜饮水","pId":"0","t":"人畜饮水"},
//            {"id":"3","name":"电力一表一户","pId":"0","t":"电力一表一户"},
//            {"id":"4","name":"通讯到户","pId":"0","t":"通讯到户"},
//            {"id":"5","name":"危房改造","pId":"0","t":"危房改造"},
//            {"id":"6","name":"生态移民","pId":"0","t":"生态移民"},
//            {"id":"7","name":"教育转移培训","pId":"0","t":"教育转移培训"},
//            {"id":"8","name":"其他","pId":"0","t":"其他"},
//            {"id":"8abf7b0353cbf5760153cd0933a70002","name":"产业扶持","pId":"1","t":"产业扶持"}
//        ];

function focusKey(e) {
	if (key.hasClass("empty")) {
		key.removeClass("empty");
	}
}

function blurKey(e) {
	if (key.get(0).value === "") {
		key.addClass("empty");
	}
}
var lastValue = "",
	nodeList = [],
	fontCss = {};

function clickRadio(e) {
	lastValue = "";
	//            searchNode(e);
}
//        function searchNode(e) {
//            debugger;
//            var keyType = "name";
//            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
//            if (!$("#getNodesByFilter").attr("checked")) {
//                var value = $.trim(key.get(0).value);
//                if (key.hasClass("empty")) {
//                    value = "";
//                }
//                if (lastValue === value) return;
//                lastValue = value;
//                if (value === "") return;
//                updateNodes(false);
//
//
//                nodeList = zTree.getNodesByParamFuzzy(keyType, value);
//
//            }
//            updateNodes(true);
//
//        }
function updateNodes(highlight) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	for (var i = 0, l = nodeList.length; i < l; i++) {
		nodeList[i].highlight = highlight;
		zTree.updateNode(nodeList[i]);
	}
}

function getFontCss(treeId, treeNode) {
	return (!!treeNode.highlight) ? {
		color: "#00CDCD",
		"font-weight": "bold"
	} : {
		color: "#333",
		"font-weight": "normal"
	};
}

function filter(node) {
	return !node.isParent && node.isFirstNode;
}

//        var key;
//        $(document).ready(function(){
//            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
//            key = $("#key");
//            key.bind("focus", focusKey)
//                    .bind("blur", blurKey)
//                    .bind("propertychange", searchNode)
//                    .bind("input", searchNode);
//            clickRadio("change");
//        });
function onClick(e, treeId, treeNode) {
	if (treeNode.children) {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.expandNode(treeNode);
	} else {
		var x = treeNode.x;
		var y = treeNode.y;
		var id = treeNode.id;
		var e = "fpxm";
		var a = "projectDetail.html?code=" + id;
		parent.$("#projectiframe").attr("src", a);
		var id = treeNode.id;
		// var mapModule = require("../map/map.js");
		// mapModule.addMarker(x,y,"");
		//parent.addMarker(x, y, e);
	}
}
 
