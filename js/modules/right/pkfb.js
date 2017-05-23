//贫困户一张图列表信息
define(function(require, exports, module) {
	//require("css/zTree_new.css");
	var mapModule = require("../map/map.js");
	var charts = require("../right/pkfbChart.js");
	//var country = "610429109";
	var cntPkc = 0;
	var paramPkc = {
		pagePkc: "1",
		sizePkc: "4"
	};
	//行政区划
	var code = LoginAccount.code;
	var address = LoginAccount.address;

	//贫困人员模糊查询搜索框内容
	var pkryname = "";
	//年度
	var year = 2016;
	exports.init = function() {
		//初始化变量
		cntPkc = 0;
		paramPkc.pagePkc = '1';
		setYear();
		getBaceData();
		var tabLeft = $("#rightdiv"),
			index;
		tabLeft.find(".tabLeft span").click(function() {
			if (!$(this).hasClass()) {
				index = $(this).index(); //获取该元素在兄弟元素的位置
				$(this).addClass("current");
				$(this).siblings("span").removeClass("current");
				tabLeft.find(".tabRight").hide();
				tabLeft.find(".tabRight").eq(index).show();
			}
		});
		//脱贫人口
		$("#tpPoorInfo").live('click', function() {
			var tpfb = require("./tpfb.js");
			tpfb.init(code, address, year);
		});
		//贫困人口
		$("#poorInfo").live('click', function() {
			cntPkc = 0;
			paramPkc.pagePkc = '1';
			getData();
			pkfbPangination();
		});

		$(".iconLink").live('mouseover', function() {
			$(this).find("img").attr("src", "images/dw_icon_cur.png");
		});
		$(".iconLink").live('mouseout', function() {
			$(this).find("img").attr("src", "images/dw_icon.png");
		});
		/*$(".gjLink").mouseover(function() { //详情
			$(this).find("img").attr("src", "images/gj_icon_cur.png");
		});
		$(".gjLink").mouseout(function() {
			$(this).find("img").attr("src", "images/gj_icon.png");
		});*/

		//点击搜索贫困人员入口
		$("#pkrycxbt").live("click", function() {
			cntPkc = 0;
			paramPkc.pagePkc = '1';
			mapModule.removeMarkers();
			mapModule.removePop();
			pkryname = $("#pkrycx").val();
			getData();
			pkfbPangination();
		});
		//切换年度入口
		$("#year").live("change", function() {
			cntPkc = 0;
			paramPkc.pagePkc = '1';
			mapModule.removeMarkers();
			mapModule.removePop();
			year = $(this).children('option:selected').val();
			getBaceData();
			$("#poorInfo").removeClass("current");
			$("#tpPoorInfo").removeClass("current");
			$("#totalInfo").addClass("current");
			tabLeft.find(".tabRight").hide();
			tabLeft.find(".tabRight").eq(1).show();
		});
	};

	function getData() {
		//查询贫困人员列表
		var url1 = 'poorPeople/poorPeopleInterface.shtml?act=list&pageNow=' + paramPkc.pagePkc + '&pageSize=' + paramPkc.sizePkc + '&areacode=' + code + '&year=' + year;
		//人员搜索模糊查询
		var url2 = "poorPeople/poorPeopleInterface.shtml?act=like&pageNow=" + paramPkc.pagePkc + "&pageSize=" + paramPkc.sizePkc + "&areacode=" + code + "&name=" + pkryname + "&year=" + year;
		var url = "";
		if (pkryname.length > 0) {
			url = url2;
		} else {
			url = url1;
		}
		//jQuery.support.cors = true;
		$.ajax({
			type: "get",
			async: false,
			url: encodeURI($.serviceHttp() + url),
			success: function(data) {
				var arr = $.parseJSON(data); //json字符串转对象[数组]
				var obj = arr.list;
				var info = "";
				var count = arr.count;
				var povertyreason;
				$("#xzqhqh").text(address);
				document.getElementById("allhushu").innerHTML = count;
				cntPkc = count;
				var pkfbList = [];
				mapModule.removeMarkers();
				mapModule.removePop();
				for (var n = 0; n < obj.length; n++) {
					var zhipinrenason = "";
					var perenson = obj[n].poorReason;
					var renson = perenson.split(",");
					for (var i = 0; i < renson.length; i++) {
						var povertyreason = switchReason(renson[i]); //致贫原因转换
						if (i == renson.length - 1) {
							zhipinrenason += povertyreason;
						} else {
							zhipinrenason += povertyreason + "，";
						}
					}
					var everyObj = {};
					everyObj.name = obj[n].name;
					var cardid = obj[n].cardId;
					everyObj.cardId = cardid.replace(cardid.substr(4, 12), "***********");
					everyObj.zhipinrenason = zhipinrenason;
					everyObj.tel = obj[n].tel;
					everyObj.id = obj[n].id;
					everyObj.x = obj[n].x;
					everyObj.y = obj[n].y;
					pkfbList.push(everyObj);
					var pkfbDetail = require("./pkfbDetail.js");
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
						var idtemp = e.feature.data.id;
						pkfbDetail.init(idtemp);
					};
					mapModule.initMarkerLayer(featureclick, featureover, featureout);
					var marker = mapModule.addMarker(obj[n].x, obj[n].y, everyObj, "images/icon_household.png", code);
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
						var idtemp = evt.object.feature.id;
						pkfbDetail.init(idtemp);
					});*/

				}
				$("#pkfbListDiv").setTemplateURL("./htmltemplate/pkfb.html").processTemplate(pkfbList);
			},
			error: function() {}
		});
	}

	function getBaceData() {
		//加载基本情况
		$("#summary").html('');
		var url3 = "poorPeople/poorPeopleInterface.shtml?act=summary&areacode=" + code + '&year=' + year;
		var jbxx = $.getMethod2(url3);
		if (jbxx) {
			var objjbxx = JSON.parse(jbxx).list[0];
			$("#summary").setTemplateURL("./htmltemplate/pkfbRight_jbqk.html").processTemplate(objjbxx);
		}
		//加载echarts
		charts.init(code, year);
	}

	var pkfbPangination = function() {
		if (cntPkc > 0) {
			$("#pkfbPagenav").geokpagination({
				items: cntPkc,
				itemsOnPage: paramPkc.sizePkc,
				prevText: "上一页",
				nextText: "下一页",
				cssStyle: 'light-theme',
				onPageClick: function(pageNumber, event) {
					paramPkc.pagePkc = pageNumber;
					getData();
				}
			});
		} else {
			$("#pkfbPagenav").html("");
		}
	};

	/*$("#select1").live("change", function(obj) {
		country = $(this).children('option:selected').val();
		getData(country);
		pkfbPangination();
	});
*/
	//点击行政区划入口
	exports.xzqhchange = function(treeNode) {
		mapModule.removeMarkers();
		mapModule.removePop();
		cntPkc = 0;
		paramPkc.pagePkc = "1"; //每次进来把pagenow复位
		code = treeNode.code;
		address = treeNode.name;
		getBaceData();
		$("#poorInfo").removeClass("current");
		$("#tpPoorInfo").removeClass("current");
		$("#totalInfo").addClass("current");
		$("#rightdiv").find(".tabRight").hide();
		$("#rightdiv").find(".tabRight").eq(1).show();
	}

	function switchReason(type) {
		var povertyreason = "";
		switch (type) {
			case '1':
				povertyreason = "因病";
				break;
			case '2':
				povertyreason = "因残";
				break;
			case '3':
				povertyreason = "因学";
				break;
			case '4':
				povertyreason = "因灾";
				break;
			case '5':
				povertyreason = "缺土地";
				break;
			case '6':
				povertyreason = "缺技术";
				break;
			case '7':
				povertyreason = "缺资金";
				break;
			case '8':
				povertyreason = "交通条件落后";
				break;
			case '9':
				povertyreason = "自身发展力不足";
				break;
			case '10':
				povertyreason = "缺劳力";
				break;
			case '11':
				povertyreason = "其他";
				break;
			default:
				povertyreason = "";
				break;
		}
		return povertyreason;
	}

	function setYear() {
		var day = new Date();
		year = day.getFullYear();
		$("#op1").attr('value', year);
	}

	//点击定位
	$(".locateClass").live("click", function(objs) {
		var x = $(objs.target).attr("x");
		var y = $(objs.target).attr("y");
		var name = $(objs.target).attr("name");
		var idtemp = $(objs.target).attr("id");
		var mapModule = require("../map/map.js");
		mapModule.addPop(x, y, name, code);
		$("#pkhimg").click(function() {
			var pkfbDetail = require("./pkfbDetail.js");
			pkfbDetail.init(idtemp);
		});

	});
});
