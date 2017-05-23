//贫困户一张图详情
define(function(require, exports, module) {
	require("echarts");
	require("css/pkfbDetail.css");
	require("drag");
	//require("css/text.css");
	exports.init = function(id) {
		$("#tpcxDiv").hide();
		$("#fpxmDiv").hide();
		$("#oneTabDiv").hide();

		var jbqk = require("./pkfbDetail_jbqk.js");
		var obj = jbqk.init(id);

		$("#pkfbDiv").setTemplateURL("./htmltemplate/pkfbDetail.html").processTemplate(obj);
		setDiv('pkfbDiv');
		pcwl();
		getEchart();

		changeColor("tbody1");
		changeColor("tbody2");
		changeColor("tbody3");
		changeColor("tbody4");
		changeColor("tbody");
		changeColor("bfjhTbody");

		var pkcXqDiv = $("#pkcXqDiv"),
			index12;
		pkcXqDiv.find(".detailTabTitle span").click(function() {
			if (!$(this).hasClass()) {
				index12 = $(this).index();
				$(this).addClass("current");
				$(this).siblings("span").removeClass("current");
				pkcXqDiv.find(".pkcDetail").hide();
				pkcXqDiv.find(".pkcDetail").eq(index12).show();

			}
		});

		$("#closeImg").live("click", function() {
			$("#pkfbDiv").hide();
		});
		$("#zb").live("click", function() {
			var url = "poorPeople/poorPeopleInterface.shtml?act=getReference"
				//var datas = new Object();
			var datas = $.getMethod2(url);
			var obj1 = new Object();
			obj1.cankao = JSON.parse(datas);
			obj1.shiji = obj;
			$("#dsjzb").setTemplateURL("./htmltemplate/dsjzb.html").processTemplate(obj1);
			setDiv('dsjzb');
			zpyy(obj.POVERTYREASON);
		});

		$("#dsjzbClose").live("click", function() {
			$("#dsjzb").css("display", "none");
		});

	};
	//建党立卡排除为0的字段
	function pcwl() {
		$('.tdright1').each(function(index) {
			var aaa = $(this).text();
			if (aaa == "0" || aaa == "") {
				$(this).parent().children().css("display", "none");
			}

		});

	}
	//致贫原因选勾
	function zpyy(zpyy) {

		$('#busiform1 li').each(function(index) {
			var aaa = $(this).text();
			if (aaa.trim() == zpyy) {
				$(this).parent().parent().children("td.td3").children().css("display", "block");

			}
			//alert(index + ': ' + $(this).text());
		});

	}

	//右侧图表
	function getEchart() {
		var myChart = echarts.init(document.getElementById('dci_chart1'));
		var myChart2 = echarts.init(document.getElementById('dci_chart2'));
		var myChart3 = echarts.init(document.getElementById('dci_chart3'));
		var myChart4 = echarts.init(document.getElementById('dci_chart4'));

		var label = {
			normal: {
				color: '#FFFFFF',
				label: {
					show: true,
					position: 'center',
					textStyle: {
						color: '#FFFFFF'
					}
				},

				labelLine: {
					show: false
				}
			}
		};

		var label2 = {
			normal: {

				labelLine: {
					show: false
				}
			}
		};

		var option = {

			series: [{
				type: 'pie',
				radius: [25, 33],
				x: '0%', // for funnel

				data: [{
					name: 'other',
					value: 10,
					itemStyle: label2

				}, {
					name: '90%',
					value: 90,
					itemStyle: label

				}]
			}]
		};

		myChart.setOption(option);

		var option2 = {

			series: [{
				type: 'pie',
				radius: [25, 33],
				x: '0%', // for funnel

				data: [{
					name: 'other',
					value: 30,
					itemStyle: label2

				}, {
					name: '70%',
					value: 70,
					itemStyle: label

				}]
			}]
		};

		myChart2.setOption(option2);

		var option3 = {

			series: [{
				type: 'pie',
				radius: [25, 33],
				x: '0%', // for funnel

				data: [{
					name: 'other',
					value: 46,
					itemStyle: label2

				}, {
					name: '54%',
					value: 54,
					itemStyle: label

				}]
			}]
		};

		myChart3.setOption(option3);

		myChart4.setOption(option);
	}

	function changeColor(tbodyId) {
		//为表格的奇偶行设定不同的颜色
		$("#" + tbodyId + " tr:even").addClass("even");
		$("#" + tbodyId + " tr:odd").addClass("odd");
	}

	//设置弹出框拖动、放大缩小
	function setDiv(divId) {
		$("#" + divId).show();
		var initialWidth = 843;
		var initialHeight = 611;
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
