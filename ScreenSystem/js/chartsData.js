var znodes = new Object();
var code = "610700";
var year = 2017;
var name = "汉中市"
	//var ztqkObj = new Object();
$(function() {
	$(".xzqh-img").click(function() {
		slideT();
	});
	getDefaultCode();
});

function slideT() {
	$(".areaDiv").slideToggle();
}

function getDefaultCode() {
	$("#firstU li").remove();
	var url = "poorPeople/poorPeopleInterface.shtml?act=loginmess&jsonpCallback=?";
	$.getJSON($.serviceHttp() + url,
		function(data) {
			var obj1 = data.list[0];
			code = obj1.areacode;
			name = obj1.areaname;
			$("#firstU").append("<li id='" + code + "'>" + name + "</li>");
			$("#firstU").append('<input style="margin-left:300px" type="button" value="确定" onclick="slideT()">');
			zpyy();
			xmlb();
			jdlk();
			ztqk();
		}

	);

}

function getData(ncode) {
	var url = 'poorPeople/divisionInterface.shtml?act=loadAdministrativeDivision&areaCode=' + ncode;
	var datas = $.getMethod(url);
	if(datas != "") {
		znodes = JSON.parse(datas).list;
	}
}
//点击第一级得到第二级
$("#firstU li").live("click", function(e) {
	$(".search-input").val(e.currentTarget.innerHTML);
	$('.search-input').attr("id", e.currentTarget.id);
	$(".second-area").slideDown();
	$("#secondU li").remove();
	getData(e.currentTarget.id);
	for(var i = 0; i < znodes.length; i++) {
		$("#secondU").append("<li id='" + znodes[i].divisionCode + "'>" + znodes[i].divisionName + "</li>");
	}
});
//点击第二级得到第三级
$("#secondU li").live("click", function(e) {
	$(".search-input").val(e.currentTarget.innerHTML);
	$('.search-input').attr("id", e.currentTarget.id);
	$(".third-area").slideDown();
	$("#thirdU li").remove();
	getData(e.currentTarget.id);
	for(var i = 0; i < znodes.length; i++) {
		$("#thirdU").append("<li id='" + znodes[i].divisionCode + "'>" + znodes[i].divisionName + "</li>");
	}
});
//点击第三级得到第四级
$("#thirdU li").live("click", function(e) {
	$(".search-input").val(e.currentTarget.innerHTML);
	$('.search-input').attr("id", e.currentTarget.id);
	$(".fourth-area").slideDown();
	$("#fourthU li").remove();
	getData(e.currentTarget.id);
	for(var i = 0; i < znodes.length; i++) {
		$("#fourthU").append("<li id='" + znodes[i].divisionCode + "'>" + znodes[i].divisionName + "</li>");
	}
});
//点击第四级
$("#fourthU li").live("click", function(e) {
	$(".search-input").val(e.currentTarget.innerHTML);
	$('.search-input').attr("id", e.currentTarget.id);
	//$(".fourth-area").slideDown();
	//$("#fourthU li").remove();

});
//选择镇
/*$("#town").live("change", function() {
	clear(village);
	var options = $("#town option:selected");
	for (var i = 0; i < datas.length; i++) {
		if (datas[i].pid == options.val()) {
			$("#village").append("<option value=" + datas[i].id + " id=" + datas[i].code + ">" + datas[i].name + "</option>");
		}
	}
});*/
//选择村
/*$("#village").live("change", function() {
	var options = $("#village option:selected");
	if (options.text() == "旬邑县") {
		for (var i = 0; i < datas.length; i++) {
			if (datas[i].pid == "8a8a8f5f482583b6014825ac68d30018") {
				$("#town").append("<option value=''>" + datas[i].name + "</option>");
			}
		}
	}
});*/

//点击统计
$(".sta_btn").live("click", function() {
		var xzqhCode = $(".search-input").attr('id');
		var year1 = $("#year option:selected").val();
		if($(".search-input").val() == "") {
			alert("请选择行政区划");
		} else if(year1 == "nianfeng") {
			alert("请选择年份");
		} else {
			year = year1;
			code = xzqhCode;
			zpyy();
			xmlb();
			jdlk();
			ztqk();
		}

	})
	//点击重置
$(".reset_btn").live("click", function() {
		$("#fourthU").text("");
		$("#thirdU").text("");
		$("#secondU").text("");
		$("#firstU").text("");
		getDefaultCode();
		$(".search-input").val("");
		$("#year option").eq(0).attr("selected", true);
		//$("#county option").eq(0).attr("selected", true);
	})
	/*环形图*/
	//致贫困因素情况统计
function zpyy() {
	var url2 = "poorPeople/poorPeopleInterface.shtml?act=PoorReason&areacode=" + code + "&year=" + year;
	var getdata2 = $.getMethod(url2);
	var data2 = new Object();
	data2 = JSON.parse(getdata2).list;
	var zpyy0Arr = [];
	var zpyy1Arr = [];
	var zsNum = 0,
		shNum = 0,
		zrNum = 0;
	if(data2.length != 0) {
		for(var i = 0; i < data2.length; i++) {
			var zpyyOb = new Object();
			zpyyOb.name = data2[i].reason;
			zpyyOb.value = data2[i].peopnum;
			zpyy1Arr.push(zpyyOb);
			switch(data2[i].reason) {
				case "因病":
					zsNum += Number(data2[i].peopnum);
					break
				case "因学":
					zsNum += Number(data2[i].peopnum);
					break
				case "自身发展动力不足":
					zsNum += Number(data2[i].peopnum);
					break
				case "交通条件落后":
					shNum += Number(data2[i].peopnum);
					break
				case "缺技术":
					shNum += Number(data2[i].peopnum);
					break
				case "缺劳力":
					shNum += Number(data2[i].peopnum);
					break
				case "缺发展资金":
					shNum += Number(data2[i].peopnum);
					break
				case "缺土地":
					shNum += Number(data2[i].peopnum);
					break
				case "因灾":
					zrNum += Number(data2[i].peopnum);
					break
			}
		};
		zpyy0Arr = [{
			value: shNum,
			name: '社会因素',
			selected: true
		}, {
			value: zrNum,
			name: '自然因素'
		}, {
			value: zsNum,
			name: '自身因素'
		}];
	};
	var myChart2 = echarts.init(document.getElementById('tj_fwd2'));
	option2.series[0].data = zpyy0Arr;
	option2.series[1].data = zpyy1Arr;
	myChart2.clear();
	myChart2.setOption(option2);
	//clear();
}
/*扶贫项目类别统计*/
function xmlb() {
	var url = "project/projectInterface.shtml?act=tree&code=" + code + "&year=" + year + "&jsonpCallback=?";
	//var getdata = $.getMethod(url);
	$.getJSON($.serviceHttp() + url,
		function(data) {
			var datas = new Object();
			datas = data.list;
			var xmlbArr = [];
			var temp = 0;
			for(var i = 0; i < datas.length; i++) {
				var xmlbOb = new Object();
				if(datas[i].pId == "0") {
					xmlbOb.name = datas[i].name;
					var num = 0;
					for(var j = 0; j < datas.length; j++) {
						if(datas[i].id == datas[j].pId) {
							num++;
							temp++;
						}
					}
					xmlbOb.value = num;
					xmlbArr.push(xmlbOb);
				}
			}
			if(temp == 0) {
				option3.series[0].data = [];
			} else {
				option3.series[0].data = xmlbArr;
			}
			var myChart3 = echarts.init(document.getElementById('tj_jr_ch'));
			myChart3.clear();
			myChart3.setOption(option3);

		}

	)

}
//建档立卡工作统计
function jdlk() {
	var url = "screen/screenInterface.shtml?act=PoorHouse&areacode=" + code + "&year=" + year;
	var getdata = $.getMethod(url);
	var datas = new Object();
	if(getdata) {
		option.series[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		datas = JSON.parse(getdata).list;
		if(datas.length != 0) {
			for(var i = 0; i < datas.length; i++) {
				var str = datas[i].year;
				var s = Number(str.substring(5));
				option.series[0].data[s - 1] = datas[i].num
			}
		} else {
			option.series[0].data = [];
		}
	}
	var myChart = echarts.init(document.getElementById('tj_fwd'));
	myChart.clear();
	myChart.setOption(option);
}
//整体情况
function ztqk() {
	var url = "outPoor/outPoorInterface.shtml?act=reportScreanData&areaCode=" + code + "&year=" + year;
	var getdata = $.getMethod(url);
	var datas = new Object();
	if(getdata) {
		datas = JSON.parse(getdata).obj2;
		option7.series[0].data[0].value = datas.sumpkhs-datas.pkhs;
		option7.series[0].data[1].value = datas.pkhs;
		option7.series[1].data[0].value = datas.sumtpxm-datas.tpxm;
		option7.series[1].data[1].value = datas.tpxm;
		option7.series[2].data[0].value = datas.sumbfcs-datas.bfcs;
		option7.series[2].data[1].value = datas.bfcs;
		option7.series[3].data[0].value = datas.sumbfry-datas.bfry;
		option7.series[3].data[1].value = datas.bfry;
		
	}
	var myChart7 = echarts.init(document.getElementById('map_info'));
	myChart7.clear();
	myChart7.setOption(option7);
}