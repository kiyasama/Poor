//整体情况-扶贫情况echats
define(function(require, exports, module) {
	require("echarts");
	require('js/core/UICore.js')($);
	exports.init = function(code, year) {
		var myChart1 = echarts.init(document.getElementById('dci_chart_pkry'));
		var myChart2 = echarts.init(document.getElementById('dci_chart_zpyy'));
		var url1 = "poorPeople/poorPeopleInterface.shtml?act=PoorScale&areacode=" + code + "&year=" + year;
		var url2 = "poorPeople/poorPeopleInterface.shtml?act=PoorReason&areacode=" + code + "&year=" + year;
		var zrk = "0";
		var pkrk = "0";
		var pkrkArr = [];
		var getdata1 = $.getMethod2(url1);
		zrk = eval("(" + getdata1 + ")").list[0].allpeople;
		pkrk = eval("(" + getdata1 + ")").list[0].poorpeople;
		//var arr1 = [pkrk,zrk-pkrk];
		if (zrk != "0" && pkrk != "0") {
			pkrkArr = [{
				name: '贫困人数',
				value: pkrk,
				//itemStyle: labelBottom
			}, {
				name: '非贫困人数',
				value: zrk - pkrk,
				//itemStyle: labelTop
			}]
		};
		var radius = [40, 55];
		option1 = {
			title: {
				text: '贫困人数',
				//subtext: '贫困户致贫原因',
				x: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [{

				type: 'pie',
				center: ['50%', '50%'],
				radius: radius,
				//y: '55%', // for funnel
				//x: '40%', // for funnel
				//itemStyle: labelFromatter,
				data: pkrkArr

			}]
		};

		//致贫原因数据
		var getdata2 = $.getMethod2(url2);
		var data2 = new Object();
		data2 = JSON.parse(getdata2).list;
		var zpyy0Arr = [];
		var zpyy1Arr = [];
		var zsNum = 0,
			shNum = 0,
			zrNum = 0;
		if (data2.length != 0) {
			for (var i = 0; i < data2.length; i++) {
				var zpyyOb = new Object();
				zpyyOb.name = data2[i].reason;
				zpyyOb.value = data2[i].peopnum;
				zpyy1Arr.push(zpyyOb);
				switch (data2[i].reason) {
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
			/*zpyy0Arr = [{
				value: shNum,
				name: '社会因素',
				selected: true
			}, {
				value: zrNum,
				name: '自然因素'
			}, {
				value: zsNum,
				name: '自身因素'
			}];*/
		};

		//option2.series[1].data = zpyyArr;

		option2 = {
			title: {
				text: '贫困户致贫原因',
				subtext: '',
				x: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [
				/*{
				type: 'pie',
				selectedMode: 'single',
				radius: [0, '30%'],
				data: zpyy0Arr
			},*/
				{
				type: 'pie',
				radius: '55%',
				radius: ['40%', '55%'],
				data: zpyy1Arr
			}]
		};

		//装载
		myChart1.setOption(option1);
		myChart2.setOption(option2);

	};

});
