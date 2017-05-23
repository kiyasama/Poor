//扶贫项目-项目监管
define(function(require, exports, module) {
	require("jquery");
	require("pagination");
	require("jquery-jtemplates");
	require("echarts");
	//require("jquery.ztree.core");
	//require("jquery.ztree.excheck");
	require('js/core/UICore.js')($);
	//require('js/modules/right/pkfbDetail.js');
	require("js/lib/pagination/simplePagination.css");
	//require("css/demo.css");
	//require("../../../css/zTreeStyle/zTreeStyle1.css");
	require("css/projectLeft.css");
	require("css/projectRight.css");
	//require("css/bootstrap.min.css");
	//require("css/zTree.css");
	//require("css/zTree_new.css");
	var xzqh = require("js/modules/left/xzqhTree.js"); //引用树
	var cntPkc = 0;
	var cntPkcPa = 0; //进度监管
	var paramPkc = {
		pagePkc: "1",
		sizePkc: "7"
	};
	var paramPkcPa = { //进度监管
		pagePkc: "1",
		sizePkc: "6"
	};
	var idTemp = "";
	var codeTemp = "";
	var year = 2016;
	var setting1 = {
		data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pId",
				rootPId: 0
			}
		},
		callback: {
			onClick: onClick
		}
	};
	var setting = {
		data: {
			/*key: {
				title: "name"
			},*/
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pid",
				rootPId: 0
			}
		},
		/*view: {
			fontCss: getFontCss,

		},*/
		callback: {
			onClick: clicks
		}
	};

	function clicks(e, treeId, treeNode) {
		$("#treeDemo").hide();
		$("#treeDemo1").show();
		$("#treefh").show();
		$(".select-div").css("visibility", "visible");
		$(".year-select").attr('id', 'year_tpxm');
		codeTemp = treeNode.code;
		var url1 = "project/projectInterface.shtml?act=tree&code=" + codeTemp + "&year=" + year;
		var divId1 = "#treeDemo1";
		xzqh.init(url1, divId1, setting1);
	};
	var mapModule = require("../map/map.js");
	//alert(document.cookie);
	function setMinHeight() {
		var minHeight = document.documentElement.clientHeight - 121 - 114;
		$("#treeHight").css('height', minHeight);
	}
	exports.init = function() {
		cntPkc = 0;
		cntPkcPa = 0; //进度监管
		paramPkc.pagePkc = '1';
		paramPkcPa.pagePkc = '1';
		mapModule.initMap();
		require("drag");
		$("#tabLeft").setTemplateURL("./htmltemplate/pkfbTree.html").processTemplate();
		setMinHeight();
		$('#tree').hide();
		//$('#hideRightDiv2').hide();
		$('#showLeftDiv1').show();
		setYear();
		$(".select-div").css("visibility", "hidden");
		var zNodes;
		var url = '/poorPeople/poorPeopleInterface.shtml?act=town';
		var divId = "#treeDemo";
		xzqh.init(url, divId, setting);
		//切换年度入口
		$("#year_tpxm").live("change", function() {
			mapModule.removeMarkers();
			$(".select-div").css("visibility", "visible");
			year = $(this).children('option:selected').val();
			var url1 = "project/projectInterface.shtml?act=tree&code=" + codeTemp + "&year=" + year;
			var divId1 = "#treeDemo1";
			xzqh.init(url1, divId1, setting1);
			//xzqh.zkjd();
		});

		$("#showLeftDiv1").click(function() {
			$(this).hide();
			$('#tree').show();
		});
		$("#hideLeftDiv2").click(function() {
			$('#tree').hide();
			$("#showLeftDiv1").show();
		});
		$("#ztreecx").live('click', function() {
			zTreecx();
		});
		//项目树返回行政区划树
		$("#treefhbt").live("click", function() {
			$("#treeDemo1").hide();
			$("#treefh").hide();
			$("#treeDemo").show();
			$(".select-div").css("visibility", "hidden");
			xzqh.init(url, divId, setting);
		});
	};
	//根据关键字查询树节点
	function zTreecx() {
		//获取输入值
		var inputVal = $("#key").val();
		//验证
		if (!inputVal) {
			alert("请输入关键字查询");
			$("#treeDemo1").hide();
			$("#treeDemo").show();
		} else {
			var url = "project/projectInterface.shtml?act=treelike&type=" + inputVal;
			var zTreeCxJg = eval('([' + $.getMethod2(url) + '])');
			if (zTreeCxJg[0].list.length != 0) {
				var obj = new Object;
				obj = zTreeCxJg[0].list;

				$("#treeDemo").hide();
				$("#treeDemo1").show();
				$("#treeDemo1").empty();
				for (var i = 0; i < obj.length; i++) {
					$("#treeDemo1").append('<li><span id=' + obj[i].id + '>' + obj[i].name + '</span></li>');
					//$("#treeDemo1").append("<li onclick='fhzTree(" + obj[i].id +");'>" + obj[i].name + "</li>");
					//$("#treeDemo1").append("<li onclick='fhzTree(\"11111\");'>" + obj[i].name + "</li>");
				}
			} else {
				alert("查询不到跟'" + inputVal + "'相关信息");
				$("#treeDemo1").hide();
				$("#treeDemo").show();
			}
		}
	}
	/*$("#treeDemo1 li span").live('click', function() {
		var id = $(this).attr("id");
		if (id) {
			$("#treeDemo1").hide();
			$("#treeDemo").show();
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			var node = zTree.getNodeByParam("id", id);
			zTree.selectNode(node);
		}
	});*/

	//项目详情
	function onClick(e, treeId, treeNode) {
		if (treeNode.children) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
			zTree.expandNode(treeNode);
		} else if (treeNode.pId != 0) {
			var x = treeNode.x;
			var y = treeNode.y;
			var id = treeNode.id;
			idTemp = id;
			var e = "fpxm";
			var url = 'project/projectInterface.shtml?act=getProjectInfo&id=' + idTemp + '&code=' + codeTemp + '&pageSize=' + paramPkc.sizePkc + '&pageNow=' + paramPkc.pagePkc;
			var data = $.getMethod2(url);
			var feature;
			if (data != "") {
				data = JSON.parse(data);
				feature = data.obj;
				cntPkc = data.count;
			}
			mapModule.removeMarkers();
			var marker = mapModule.addMarker(x, y, feature, "", codeTemp);
			marker.events.register('mouseover', marker, function(evt) {
				//mapModule.removeMarkers();
				$(".olAlphaImg").attr("src", "images/icon_project_on.png");
			});
			marker.events.register('mouseout', marker, function(evt) {
				//mapModule.removeMarkers();
				$(".olAlphaImg").attr("src", "images/icon_project.png");
			});
			marker.events.register('mousedown', marker, function(evt) {
				var obj = evt.object.feature;
				/*if (obj.assistProjectRePeoples.length != 0) {
					cntPkc = obj.assistProjectRePeoples.length;
				}*/

				$("#fpxmDiv").setTemplateURL("./htmltemplate/projectDetail.html").processTemplate(obj);
				$("#hid").hide();
				setDiv('fpxmDiv');
				//加载受益贫困户
				fysj();
				pkfbPangination();
				var pkcXqDiv = $("#pkcXqDiv"),
					index12;

				pkcXqDiv.find(".detailTabTitle1 span").live("click", function() {
					event.stopPropagation();
					if (!$(this).hasClass()) {
						index12 = $(this).index();
						$(this).addClass("current");
						$(this).siblings("span").removeClass("current");
						//pkcXqDiv.find(".pkcDetail").hide();
						$(".wrapDiv").children().hide();
						//pkcXqDiv.find(".pkcDetail").eq(index12).show();
						$(".wrapDiv").children().eq(index12).show();
						if (index12 == 2) {
							getPoorAssPlans();
							pkfbPangination2();
						}
					}
				});

				$("#projectDetailClose").live("click", function() {
					$("#fpxmDiv").hide();
				});

			});
		}
	}

	//受益贫困户分页
	var pkfbPangination = function() {
		$("#pkfbPagenav").show();
		$("#fhsypkh").hide();
		if (cntPkc > 0) {
			$("#pkfbPagenav").geokpagination({
				items: cntPkc,
				itemsOnPage: paramPkc.sizePkc,
				prevText: "上一页",
				nextText: "下一页",
				cssStyle: 'light-theme',
				onPageClick: function(pageNumber, event) {
					paramPkc.pagePkc = pageNumber;
					fysj();
				}
			});
		} else {
			$("#pkfbPagenav").html("");
		}
	};
	//受益贫困户数据
	function fysj() {
		var sypkhsrs = $("#sypkhsr").val();
		var sypkhsr = sypkhsrs.trim();
		var url;
		if (sypkhsr == "") {
			url = 'project/projectInterface.shtml?act=getProjectInfo&id=' + idTemp + '&code=' + codeTemp + '&pageSize=' + paramPkc.sizePkc + '&pageNow=' + paramPkc.pagePkc;
		} else {
			url = "project/projectInterface.shtml?act=getLikePer&id=" + idTemp + "&name=" + sypkhsr + '&code=' + codeTemp + '&pageSize=' + paramPkc.sizePkc + '&pageNow=' + paramPkc.pagePkc;
		}
		var data = $.getMethod2(url);
		var obj = [];
		var helpPeoList = [];
		if (data != "") {
			data = JSON.parse(data);
			cntPkc = data.count;
			obj = data.obj.assistProjectRePeoples;
			for (var n = 0; n < obj.length; n++) {
				var idNum = obj[n].houseOwnerId,
					cardNum = idNum.substr(0, 6) + "********" + idNum.substr(14, 4);
				var everyObj = {
					xuhao: obj[n].xuhao,
					houseMember: obj[n].houseMember,
					village: obj[n].village,
					houseOwnerId: cardNum,
					id: obj[n].id
				};
				helpPeoList.push(everyObj);
			}
		}
		$("#sypkhtable").empty();
		$("#sypkhtj").empty();
		$("#sypkhtj").setTemplateURL("./htmltemplate/projectDetail_sypkhtj.html").processTemplate(data);
		$("#sypkhtable").setTemplateURL("./htmltemplate/projectDetail_sypkh.html").processTemplate(helpPeoList);
		changeColor("sypkhtable", 0, 0);
	}

	//进度监管分页
	var pkfbPangination2 = function() {
		$("#pkfbPagenav22").show();
		if (cntPkcPa > 0) {
			$("#pkfbPagenav22").geokpagination({
				items: cntPkcPa,
				itemsOnPage: paramPkcPa.sizePkc,
				prevText: "上一页",
				nextText: "下一页",
				cssStyle: 'light-theme',
				onPageClick: function(pageNumber, event) {
					paramPkcPa.pagePkc = pageNumber;
					getPoorAssPlans();
				}
			});
		} else {
			$("#pkfbPagenav22").html("");
		}
	};
	//进度监管数据
	function getPoorAssPlans() {
		var url = 'project/projectInterface.shtml?act=listPoorAssPlans&id=' + idTemp + '&pageSize=' + paramPkcPa.sizePkc + '&pageNow=' + paramPkcPa.pagePkc;
		var data = $.getMethod2(url);
		var list = [];
		var helpPeoList = [];
		if (data !== '') {
			data = JSON.parse(data);
			list = data.list;
			cntPkcPa = data.count;
			for (var n = 0; n < list.length; n++) {
				var everyObj = {
					content: list[n].content,
					timePoint: list[n].timePoint,
					id: list[n].id
				};
				helpPeoList.push(everyObj);
			}
		}
		$("#proAssPlans").empty();
		$("#proAssPlans").setTemplateURL("./htmltemplate/projectAssPlans.html").processTemplate(helpPeoList);
	}

	function changeColor(tableId, isOver, isClick) {
		//为表格的奇偶行设定不同的颜色 isover:鼠标移入是否变色；isClick:鼠标点击是否变色
		$("#" + tableId + " tr:even").addClass("even");
		$("#" + tableId + " tr:odd").addClass("odd");
	}
	//受益贫困户根据户主查询
	$("#sypkhcx").live("click", function() {
		/*$(".sypkhtr").show();
		$("#fhsypkh").show();*/
		cntPkc = 0;
		paramPkc.pagePkc = '1';
		fysj();
		pkfbPangination();
		/*$("#fhsypkh :button").live("click", function() {

			//event.stopPropagation();
		});*/
	});

	//点击查看跳转到贫困人员详情
	$(".xmxq").live("click", function() {
		var id = $(this).attr('id');
		var pkfbDetail = require("js/modules/right/pkfbDetail.js");
		pkfbDetail.init(id);
		$("#pkfbDiv .pkzbDiv").css('margin-right', '-31px');
		$("#goBack").show();
		$(".imgSpan").children("#goBack").attr('id', 'goBack_pro');
	});

	$("#goBack_pro").live('click', function() {
		$("#pkfbDiv").hide();
		$("#fpxmDiv").show();
	});

	function getFontCss(treeId, treeNode) {
		return (!!treeNode.highlight) ? {
			color: "#00CDCD",
			"font-weight": "bold"
		} : {
			color: "#333",
			"font-weight": "normal"
		};
	}

	function setYear() {
		var day = new Date(),
			year = day.getFullYear();
		var fy = parseInt($("#year option").first().val());
		if (year > fy) {
			for (var i = fy + 1; i < year; i++) {
				$("#year option").removeAttr('selected');
				$("#year").prepend('<option value="' + i + '" >' + i + '年</option>');
			}
			$("#year").prepend('<option value="' + year + '" selected="selected">' + year + '年</option>');
		}
		$("#year").attr('value', year);
	}
	//设置弹出框拖动、放大缩小
	function setDiv(divId) {
		$("#" + divId).show();
		var initialWidth = 720;
		var initialHeight = 617;
		goDrag(divId, "detailTitle", initialWidth, initialHeight);
	}

	function goDrag(divId, titleDivClass, initalWidth, initalHeight) {
		//divId：弹出框的ID， titleDivClass：标题div的class， initalWidth：弹框原始宽度，initalHeigh：弹框原始高度t
		var oDrag = document.getElementById(divId);
		var childDiv = oDrag.getElementsByTagName("div")[0];
		var oTitle = get.byClass(titleDivClass, childDiv)[0];
		oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
		oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";

		//调用拖拽、最大化窗口的函数
		drag(oDrag, childDiv, oTitle, initalWidth, initalHeight);
	}
});
