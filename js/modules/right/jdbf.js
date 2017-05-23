//结对帮扶管理、脱贫资金管理列表
define(function(require, exports, module) {
	var cntPkc = 0;
	var jdbfObj = {
		code: '',
		address: '',
		year: ''
	};
	var paramPkc = {
		pagePkc: "1",
		sizePkc: "4"
	};
	var cntPkc1 = 0;
	var paramPkc1 = {
		pagePkc: "1",
		sizePkc: "4"
	};
	//帮扶单位分页
	var cntPkcDw = 0;
	var paramPkcDw = {
		pagePkc: "1",
		sizePkc: "4"
	};
	var mapModule = require("../map/map.js");

	function setMinHeight() {
		var minHeight = document.documentElement.clientHeight - 121;
		$("#jdbf").children(".tabRight").css('height', minHeight);
		$("#tpzj").children(".tabRight").css('height', minHeight);
	}
	exports.init = function() {
		//分页变量初始化
		cntPkc = 0;
		paramPkc.pagePkc = '1';
		cntPkc1 = 0;
		paramPkc1.pagePkc = '1';
		jdbfObj.code = LoginAccount.code;
		jdbfObj.address = LoginAccount.address;
		if ($("#year_bfzt").length > 0) {
			jdbfObj.year = $("#year_bfzt").val();
		} else {
			var day = new Date();
			jdbfObj.year = day.getFullYear();
		}
		getStatistics();
		setMinHeight();
		searchBfry();
		loadPangination3();
		//脱贫资金
		$("#tpzjTab").live('click', function() {
			cntPkc1 = 0;
			paramPkc1.pagePkc = '1';
			$(".leftTitle").removeClass("current");
			$("#tpzjTab").addClass("current");
			searchZjwj();
			loadPangination4();
			$(".helpRList").hide();
			$("#tpzj").show();
		});
		//帮扶人员
		$("#jdbfTab").live('click', function() {
			$(".leftTitle").removeClass("current");
			$("#jdbfTab").addClass("current");
			$(".helpRList").hide();
			$("#jdbf").show();
		});
		//帮扶单位
		$("#bfdwTab").live('click', function() {
			cntPkc1 = 0;
			paramPkc1.pagePkc = '1';
			$(".leftTitle").removeClass("current");
			$("#bfdwTab").addClass("current");
			searchBfdw();
			loadPanginationDw();
			$(".helpRList").hide();
			$("#bfdw").show();
		});
		//定位地图
		$(".locateClass").live('click', function() {
			dingwei($(this));
		});
		$(".tpcxXq").live('click', function() {
			if ($(this).attr('name') === 'jdbfxq') {
				openDetailDiv($(this));
			} else if ($(this).attr('name') === 'bfdwxq') {
				openAssistEpDiv($(this));
			} else {
				findinfo($(this));
			}
		});

		$(".search input:text").focus(function() {
			$(this).css("border-color", "#159ff3");
			$(".search input:button").css("border-color", "#159ff3");
		});
		$(".search input:text").blur(function() {
			$(this).css("border-color", "#cccccc");
			$(".search input:button").css("border-color", "#cccccc");
		});

		//根据姓名查询帮扶人员
		$("#searchBar").live('click', function() {
			cntPkc = 0;
			paramPkc.pagePkc = '1';
			searchBfry();
			loadPangination3();
		});
		$(".iconLink").live('mouseover', function() {
			$(this).find("img").attr("src", "images/dw_icon_cur.png");
		});
		$(".iconLink").live('mouseout', function() {
			$(this).find("img").attr("src", "images/dw_icon.png");
		});
		//根据名称查资金文件
		$("#searchZjBar").live('click', function() {
			cntPkc1 = 0;
			paramPkc1.pagePkc = '1';
			searchZjwj();
			loadPangination4();
		});
		//根据名称查询帮扶单位
		$("#searchDwBar").live('click', function() {
			cntPkcDw = 0;
			paramPkcDw.pagePkc = '1';
			searchBfdw();
			loadPanginationDw();
		});
		//年度下拉框改变取值
		$("#year_bfzt").live('change', function() {
			cntPkc = 0;
			paramPkc.pagePkc = '1';
			jdbfObj.year = $("#year_bfzt").val();
			getStatistics();
			setMinHeight();
			searchBfry();
			loadPangination3();
		});

	};
	//与树联动
	exports.xzqhchange = function(treeNode) {
		cntPkc = 0;
		cntPkc1 = 0;
		paramPkc.pagePkc = "1";
		paramPkc1.pagePkc = "1";
		jdbfObj.code = treeNode.code;
		jdbfObj.address = treeNode.name;
		getStatistics();
		setMinHeight();
		searchBfry();
		loadPangination3();
		if ($("#tpzj").is(":visible")) {
			searchZjwj();
			loadPangination4();
		}
	};
	//统计帮扶情况
	function getStatistics() {
		var url = 'helpPerson/helpPersonInterface.shtml?act=HelpData&code=' + jdbfObj.code + '&year=' + jdbfObj.year;
		$.getAsyncMethod(url, callback1, function(e) {
			alert(e);
		});

		function callback1(data) {
			var arr = $.parseJSON(data);
			var list = arr.list,
				famliy = 0,
				people = 0,
				help = 0;
			for (var i = 0; i < list.length; i++) {
				famliy += parseInt(list[i].hunum);
				people += parseInt(list[i].peopnum);
				help += parseInt(list[i].zfcount);
			}
			var obj = {
				famliy: famliy,
				people: people,
				help: help
			}
			$("#tabRight").processTemplate(obj);
		}
	}
	//改变qq链接
	function changeLink() {
		var glinks = $(".gjLink");
		for (var i = 0; i < glinks.length; i++) {
			if (glinks[i].attr('href') === "#") {
				glinks[i].attr('target', '');
			} else {
				glinks[i].attr('target', '_blank');
			}
		}
	}
	//查询帮扶人员
	function searchBfry() {
		var name = $("#search").val();
		var url = '';
		if (name.length > 0) {
			url = 'helpPerson/helpPersonInterface.shtml?act=QueryName&code=' + jdbfObj.code + '&year=' + jdbfObj.year + '&pageNow=' + paramPkc.pagePkc + '&pageSize=' + paramPkc.sizePkc + '&name=' + name;
		} else {
			url = 'helpPerson/helpPersonInterface.shtml?act=list&code=' + jdbfObj.code + '&year=' + jdbfObj.year + '&pageNow=' + paramPkc.pagePkc + '&pageSize=' + paramPkc.sizePkc;
		}
		$.getAsyncMethod(url, callback, function(e) {
			alert(e);
		});
		//显示帮扶人员
		function callback(data) {
			var arr = $.parseJSON(data);
			var obj = arr.list;
			var count = arr.count;
			cntPkc = count;
			var bfryList = [],
				linkStr = '',
				imgStr = '';
			for (var n = 0; n < obj.length; n++) {
				if (obj[n].qq == null || obj[n].qq === '') {
					linkStr = '#';
					imgStr = 'images/button_11_n.gif';
				} else {
					linkStr = 'http://wpa.qq.com/msgrd?v=3&uin=' + obj[n].qq + '&site=qq&menu=yes';
					imgStr = 'http://wpa.qq.com/pa?p=2:' + obj[n].qq + ':41';
				}
				var everyObj = {
					id: obj[n].id,
					name: obj[n].name,
					orgname: obj[n].orgname,
					position: obj[n].position,
					tel: obj[n].tel,
					x: obj[n].x,
					y: obj[n].y,
					linkStr: linkStr,
					imgStr: imgStr
				};
				bfryList.push(everyObj);
			}
			document.getElementById("areaName").innerHTML = jdbfObj.address;
			document.getElementById("pcount").innerHTML = count;
			$("#div_id_jdbf").setTemplateURL("./htmltemplate/jdbf.html").processTemplate(bfryList);
			mapModule.removeMarkers();
			mapModule.removePop();
			for (var i = 0; i < obj.length; i++) {
				var featureout = function(e) {
					//$(".olAlphaImg").attr("src", "images/icon_household.png");
					e.feature.style.externalGraphic = "images/icon_household.png";
					e.feature.layer.drawFeature(e.feature);
				};
				var featureover = function(e) {
					//var divId = "#" + e.feature.geometry.id;
					//$(divId).attr("src", "images/icon_household_on.png");
					e.feature.style.externalGraphic = "images/icon_household_on.png";
					e.feature.layer.drawFeature(e.feature);
				};
				var featureclick = function(e) {
					var id = e.feature.data.id,
						bfPerson = require('js/modules/right/bfPersonMsg.js');
					bfPerson.init(id);
				};
				mapModule.initMarkerLayer(featureclick, featureover, featureout);
				var marker = mapModule.addMarker(obj[i].x, obj[i].y, obj[i], 'images/icon_household.png', jdbfObj.code);
				/*marker.events.register('mouseover', marker, function(evt) {
					var divId = "#" + evt.srcElement.id;
					$(divId).attr("src", "images/icon_household_on.png");
				});
				marker.events.register('mouseout', marker, function(evt) {
					//mapModule.removeMarkers();
					$(".olAlphaImg").attr("src", "images/icon_household.png");
				});
				marker.events.register('mousedown', marker, function(evt) {
					//var name = evt.object.feature.name;
					//alert(name);坐标
					var id = evt.object.feature.id,
						bfPerson = require('js/modules/right/bfPersonMsg.js');
					bfPerson.init(id);
				});*/
			}
		}
	}

	//查询资金文件
	function searchZjwj() {
		var name = $("#searchZj").val();
		var url = '';
		if (name.length > 0) {
			url = 'helpMoney/helpMoneyInterface.shtml?act=like&code=' + jdbfObj.code + '&year=' + jdbfObj.year + '&pageNow=' + paramPkc1.pagePkc + '&pageSize=' + paramPkc1.sizePkc + '&pagename=' + name;
		} else {
			url = 'helpMoney/helpMoneyInterface.shtml?act=list&code=' + jdbfObj.code + '&year=' + jdbfObj.year + '&pageNow=' + paramPkc1.pagePkc + '&pageSize=' + paramPkc1.sizePkc;
		}
		$.getAsyncMethod(url, getFileList, function(e) {
			alert(e);
		});

		function getFileList(data) {
			var arr = $.parseJSON(data);
			var obj = arr.list;
			var count = arr.count;
			cntPkc1 = count;
			$("#areaName2").html(jdbfObj.address);
			$("#allfile").html(count);
			var getjs = "";
			var moneytype = '';
			var pkfbList = [];
			for (var n = 0; n < obj.length; n++) {
				moneytype = swichMoneytype(obj[n].moneytype);
				var everyObj = {
					wjname: obj[n].wjname,
					xbsj: obj[n].xbsj,
					moneytype: moneytype,
					moneynum: obj[n].moneynum,
					id: obj[n].id
				};
				pkfbList.push(everyObj);
			}
			$("#div_id_tpzj").setTemplateURL("./htmltemplate/tpzj.html").processTemplate(pkfbList);
		}
	}

	function swichMoneytype(type) {
		var moneytype = '';
		switch (type) {
			case '1':
				moneytype = "发展资金";
				break;
			case '2':
				moneytype = "以工代赈资金";
				break;
			case '3':
				moneytype = "少数民族发展资金";
				break;
		}
		return moneytype;
	}


	var loadPangination3 = function() {
		if (cntPkc > 0) {
			$("#pkcPagenav").geokpagination({
				items: cntPkc,
				itemsOnPage: paramPkc.sizePkc,
				prevText: "上一页",
				nextText: "下一页",
				cssStyle: 'light-theme',
				onPageClick: function(pageNumber, event) {
					paramPkc.pagePkc = pageNumber;
					searchBfry();
				}
			});
		} else {
			$("#pkcPagenav").html("");
		}
	};

	var loadPangination4 = function(flag) {
		if (cntPkc1 > 0) {
			$("#pkcPagenavZj").geokpagination({
				items: cntPkc1,
				itemsOnPage: paramPkc1.sizePkc,
				prevText: "上一页",
				nextText: "下一页",
				cssStyle: 'light-theme',
				onPageClick: function(pageNumber, event) {
					paramPkc1.pagePkc = pageNumber;
					searchZjwj();
				}
			});
		} else {
			$("#pkcPagenavZj").html("");
		}
	};

	function dingwei(obj) {
		var x = $(obj).attr("x"),
			y = $(obj).attr("y"),
			name = $(obj).attr("name"),
			flag = $(obj).attr("flag");
		mapModule.addPop(x, y, name, jdbfObj.code, flag);
		var sobj = {
			name: name,
			id: $(obj).attr("id"),
			x: x,
			y: y
		};
		if (flag === 'bfdw') {
			$("#pkhimg").click(function() {
				var oid = sobj.id,
					bfEmployer = require('js/modules/right/assistEmployer.js');
				bfEmployer.init(oid);
			});
		} else {
			$("#pkhimg").click(function() {
				var oid = sobj.id,
					bfPerson = require('js/modules/right/bfPersonMsg.js');
				bfPerson.init(oid);
			});
		}
	}
	//资金文件详情
	function findinfo(obj) {
		var e = $(obj).attr('id');
		var bfMoney = require('js/modules/right/bfMoneyInfo.js');
		bfMoney.init(e);
	}
	//帮扶人员详情
	function openDetailDiv(obj) {
		var e = $(obj).attr('id');
		var bfPerson = require('js/modules/right/bfPersonMsg.js');
		bfPerson.init(e);
	}
	//帮扶单位详情
	function openAssistEpDiv(obj) {
		var e = $(obj).attr('id');
		var assistEp = require('js/modules/right/assistEmployer.js');
		assistEp.init(e);
	}
	//查询帮扶单位
	function searchBfdw() {
		var name = $("#searchDw").val();
		var url = '';
		if (name.length > 0) {
			url = 'assistEmployer/assistEmployerInterface.shtml?act=queryName&code=' + jdbfObj.code + '&year=' + jdbfObj.year + '&pageNow=' + paramPkcDw.pagePkc + '&pageSize=' + paramPkcDw.sizePkc + '&name=' + name;
		} else {
			url = 'assistEmployer/assistEmployerInterface.shtml?act=list&code=' + jdbfObj.code + '&year=' + jdbfObj.year + '&pageNow=' + paramPkcDw.pagePkc + '&pageSize=' + paramPkcDw.sizePkc;
		}
		$.getAsyncMethod(url, getList, function(e) {
			alert(e);
		});

		function getList(data) {
			var arr = $.parseJSON(data);
			var obj = arr.list;
			var count = arr.count;
			cntPkcDw = count;
			$("#areaName3").html(jdbfObj.address);
			$("#allDw").html(count);
			var pkfbList = [];
			for (var n = 0; n < obj.length; n++) {
				var everyObj = {
					addres: obj[n].addres,
					contactPhone: obj[n].contactPhone,
					contactpeople: obj[n].contactpeople,
					name: obj[n].name,
					id: obj[n].id,
					x: obj[n].x,
					y: obj[n].y
				};
				pkfbList.push(everyObj);
			}
			$("#div_id_bfdw").setTemplateURL("./htmltemplate/bfdw.html").processTemplate(pkfbList);
			mapModule.removeMarkers();
			mapModule.removePop();
			for (var i = 0; i < obj.length; i++) {
				/*var featureout = function(e) {
					//$(".olAlphaImg").attr("src", "images/icon_household.png");
					e.feature.style.externalGraphic = "images/icon_household.png";
					e.feature.layer.drawFeature(e.feature);
				};
				var featureover = function(e) {
					//var divId = "#" + e.feature.geometry.id;
					//$(divId).attr("src", "images/icon_household_on.png");
					e.feature.style.externalGraphic = "images/icon_household_on.png";
					e.feature.layer.drawFeature(e.feature);
				};
				var featureclick = function(e) {
					var id = e.feature.data.id,
						bfdw = require('js/modules/right/assistEmployer.js');
					bfdw.init(id);
				};
				mapModule.initMarkerLayer(featureclick, featureover, featureout);
				var marker = mapModule.addMarker(obj[i].x, obj[i].y, obj[i], 'images/icon_household.png', jdbfObj.code);*/
				marker.events.register('mouseover', marker, function(evt) {
					var divId = "#" + evt.srcElement.id;
					$(divId).attr("src", "images/icon_household_on.png");
				});
				marker.events.register('mouseout', marker, function(evt) {
					//mapModule.removeMarkers();
					$(".olAlphaImg").attr("src", "images/icon_household.png");
				});
				marker.events.register('mousedown', marker, function(evt) {
					//var name = evt.object.feature.name;帮扶单位弹窗
					//alert(name);坐标
					var id = evt.object.feature.id,
						bfdw = require('js/modules/right/assistEmployer.js');
					bfdw.init(id);
				});
			}
		}
	}
	//帮扶单位分页
	var loadPanginationDw = function(flag) {
		if (cntPkcDw > 0) {
			$("#pkcPagenavDw").geokpagination({
				items: cntPkcDw,
				itemsOnPage: paramPkcDw.sizePkc,
				prevText: "上一页",
				nextText: "下一页",
				cssStyle: 'light-theme',
				onPageClick: function(pageNumber, event) {
					paramPkcDw.pagePkc = pageNumber;
					searchBfdw();
				}
			});
		} else {
			$("#pkcPagenavDw").html("");
		}
	};
});
