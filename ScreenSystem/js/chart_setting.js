
// 建档立卡工作情况统计
var placeHoledStyle = {
	normal: {
		barBorderColor: 'rgba(0,0,0,0)',
		color: 'rgba(0,0,0,0)'
	},
	emphasis: {
		barBorderColor: 'rgba(0,0,0,0)',
		color: 'rgba(0,0,0,0)'
	}
};
var dataStyle = {
	normal: {
		label: {
			show: true,
			position: 'insideLeft',
			formatter: '{c}%'
		}
	}
};

//option = {
//    tooltip : {
//        trigger: 'axis',
//        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//        },
//       formatter : '{b}<br/>{a0}:{c0}<br/>'
//    },
//    grid: {
//
//    },
//    xAxis : [
//        {
//            type : 'value',
//            position: 'top',
//            splitLine: {show: false},
//            axisLabel: {show: false}
//        }
//    ],
//    yAxis : [
//        {
//            type : 'category',
//            splitLine: {show: false},
//            data : ['第四周', '第三周', '第二周', '第一周'],
//			axisLabel:{
//                textStyle:{
//                    color:'#fff', //刻度颜色
//                    //fontSize:16  //刻度大小
//                }
//            }
//        }
//    ],
//    series : [
//         {
//            name:'户数',
//            type:'bar',
//            stack: '总量',
//            itemStyle :{
//				normal: {
//					color:'#00E5EE',
//                  	barBorderWidth  :4,
//                  	barBorderRadius :[0,5,5,0],
//    				barBorderColor :'#fff',
//					 label: {
//                        show: true,
//                        position: 'right',
//                        formatter: '{c}'
//                    }
//				}
//			},
//            data:[38, 50, 33, 100]
//        },
//
//        {
//            name:'户数',
//            type:'bar',
//            stack: '总量',
//            itemStyle: placeHoledStyle,
//            data:[10, 10, 10, 10]
//        }
//    ]
//};
option = {
	tooltip: {
		trigger: 'axis'
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: [{
		type: 'category',
		boundaryGap: false,
		splitLine: {
			show: false
		},
		axisLabel: {
			textStyle: {
				color: '#fff', //刻度颜色
				//fontSize:16  //刻度大小
			}
		},
		data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
	}],
	yAxis: [{
		type: 'value',
		splitLine: {
			show: false
		},
		axisLabel: {
			textStyle: {
				color: '#fff', //刻度颜色
				//fontSize:16  //刻度大小
			}
		},
	}],
	series: [{
		name: '建档立卡',
		type: 'line',
		stack: '总量',
		label: {
			normal: {
				show: true,
				position: 'top'
			}
		},
		itemStyle: {
			normal: {
				color: '#EE0000'
			}
		},
		areaStyle: {
			normal: {}
		},
		data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	}]
};



/*环形图*/
//致贫困因素情况统计
option2 = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b}: {c} ({d}%)"
	},
	series: [{
		name: '访问来源',
		type: 'pie',
		selectedMode: 'single',
		radius: [0, '30%'],

		label: {
			normal: {
				position: 'inner'
			}
		},
		labelLine: {
			normal: {
				show: false
			}
		},
		data: [{
			value: 949,
			name: '社会因素',
			selected: true
		}, {
			value: 335,
			name: '自然因素'
		}, {
			value: 1446,
			name: '自身因素'
		}]
	}, {
		name: '访问来源',
		type: 'pie',
		radius: ['40%', '55%'],
		data:[]
		/*data: [

			{
				value: 310,
				name: '交通条件落后'
			}, {
				value: 234,
				name: '缺技术'
			}, {
				value: 135,
				name: '缺劳力'
			}, {
				value: 135,
				name: '缺发展资金'
			}, {
				value: 135,
				name: '缺土地'
			}, {
				value: 335,
				name: '因灾'
			}, {
				value: 1048,
				name: '因病'
			}, {
				value: 251,
				name: '因学'
			}, {
				value: 147,
				name: '自身发展动力不足'
			}
		]*/
	}]
};

/*扶贫项目类别统计*/
option3 = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	series: [{
		//name: '访问来源',
		type: 'pie',
		radius: '65%',
		center: ['50%', '50%'],
		data: [

			{
				value: 897,
				name: '人畜饮水'
			}, {
				value: 459,
				name: '通讯到户'
			}, {
				value: 2115,
				name: '易地搬迁'
			}, {
				value: 367,
				name: '教育扶贫'
			}, {
				value: 9870,
				name: '产业扶持'
			}, {
				value: 392,
				name: '其他'
			}
		],
		itemStyle: {
			emphasis: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
			}
		}
	}]
};

/*脱贫工作组服务统计*/
option4 = {
	tooltip: {
		trigger: 'axis'
	},
	calculable: true,
	xAxis: [{
		type: 'category',
		splitLine: {
			show: false
		},
		data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
		axisLabel: {
			textStyle: {
				color: '#fff', //刻度颜色
				//fontSize:16  //刻度大小
			}
		}
	}],
	yAxis: [{
		type: 'value',
		splitLine: {
			show: false
		},
		axisLabel: {
			textStyle: {
				color: '#fff', //刻度颜色
				//fontSize:16  //刻度大小
			}
		}
	}],
	series: [{
		name: '脱贫服务',
		type: 'bar',
		data: [25, 18, 23, 26, 18, 7, 13, 19, 20],
		itemStyle: {
			normal: {
				color: '#00E5EE',
				barBorderWidth: 2,
				barBorderRadius: [5, 5, 0, 0],
				barBorderColor: '#fff',
				label: {
					show: true,
					position: 'top',
					formatter: '{c}'
				}
			}
		},
		markPoint: {
			data: [{
				type: 'max',
				name: '最大值'
			}, {
				type: 'min',
				name: '最小值'
			}],
			itemStyle: {
				normal: {
					color: '#00E5EE'
				}
			}

		},
		markLine: {
			data: [{
				type: 'average',
				name: '平均值'
			}],
			itemStyle: {
				normal: {
					color: '#00E5EE'
				}
			}
		}
	}]
};

/*仪表盘，资金使用情况统计*/
option5 = {
	textStyle: {
		color: 'red'
	},
	tooltip: {
		formatter: "{a} <br/>{b} : {c}%"
	},
	toolbox: {
		feature: {
			restore: {},
			saveAsImage: {}
		}
	},
	series: [{
		name: '扶贫资金',
		type: 'gauge',
		detail: {
			formatter: '91.7%'
		},
		data: [{
			value: 91.7,
			name: '使用率'
		}],
		axisLine: { // 坐标轴线
			lineStyle: { // 属性lineStyle控制线条样式
				color: [
					[0.2, '#ff4500'],
					[0.8, '#48b'],
					[1, '#228b22']
				],
				//width: 150
			}
		}
	}]
};

/*柱状图，脱贫成效统计*/
option6 = {
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['贫困人数', '脱贫人数'],
		itemGap: 5,
		textStyle: {
			color: '#ffffff'
		}
	},
	calculable: true,
	grid: {

	},
	xAxis: [{
		type: 'category',
		splitLine: {
			show: false
		},
		data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
		axisLabel: {
			textStyle: {
				color: '#fff', //刻度颜色
				//fontSize:16  //刻度大小
			}
		}
	}],
	yAxis: [{
		type: 'value',
		splitLine: {
			show: false
		},
		axisLabel: {
			textStyle: {
				color: '#fff', //刻度颜色
				//fontSize:16  //刻度大小
			}
		}
	}],
	series: [{
			name: '贫困人数',
			type: 'bar',
			data: [36997, 36183, 35216, 34092, 33032, 32135, 32100, 32036, 31945],
			itemStyle: {
				normal: {
					color: '#FFA07A',
					barBorderWidth: 2,
					barBorderRadius: [5, 5, 0, 0],
					barBorderColor: '#fff'
				}
			},

		}, {
			name: '脱贫人数',
			type: 'bar',
			data: [883, 1697, 2664, 3788, 4283, 5210, 5330, 5413, 5519],
			itemStyle: {
				normal: {
					color: '#00CD00',
					barBorderWidth: 2,
					barBorderRadius: [5, 5, 0, 0],
					barBorderColor: '#fff'
				}
			},

		}

	]
};

/*饼状图 地图下方统计*/
/*饼状图 地图下方统计*/
var labelTop = {
	normal: {
		label: {
			show: true,
			position: 'center',
			formatter: '{b}',
			textStyle: {
				baseline: 'bottom'
			}
		},
		labelLine: {
			show: false
		}
	}
};
var labelFromatter = {
	normal: {
		label: {
			formatter: function(params) {
				return params.series.data[1].value
			},
			textStyle: {
				baseline: 'top'
			}
		}
	},
}
var labelFromatter1 = {
	normal: {
		label: {
			formatter: function(params) {
				return params.series.data[1].value
			},
			textStyle: {
				baseline: 'top'
			}
		}
	},
}
var labelFromatter2 = {
	normal: {
		label: {
			formatter: function(params) {
				return params.series.data[1].value
			},
			textStyle: {
				baseline: 'top'
			}
		}
	},
}
var labelFromatter3 = {
	normal: {
		label: {
			formatter: function(params) {
				return params.series.data[1].value
			},
			textStyle: {
				baseline: 'top'
			}
		}
	},
}
var labelBottom = {
	normal: {
		color: '#ccc',
		label: {
			show: true,
			position: 'center'
		},
		labelLine: {
			show: false
		}
	},
	emphasis: {
		color: 'rgba(0,0,0,0)'
	}
};
var radius = [40, 55];
option7 = {
	series: [{
		type: 'pie',
		center: ['12%', '50%'],
		radius: radius,
		x: '0%', // for funnel
		itemStyle: labelFromatter,
		data: [{
			name: 'other',
			value: 10000,
			itemStyle: labelBottom
		}, {
			name: '贫困户数',
			value: 11627,
			itemStyle: labelTop
		}]
	}, {
		type: 'pie',
		center: ['37%', '50%'],
		radius: radius,
		x: '20%', // for funnel
		itemStyle: labelFromatter1,
		data: [{
			name: 'other',
			value: 12,
			itemStyle: labelBottom
		}, {
			name: '脱贫项目',
			value: 8,
			itemStyle: labelTop
		}]
	}, {
		type: 'pie',
		center: ['62%', '50%'],
		radius: radius,
		x: '40%', // for funnel
		itemStyle: labelFromatter2,
		data: [{
			name: 'other',
			value: 100,
			itemStyle: labelBottom
		}, {
			name: '帮扶次数',
			value: 308,
			itemStyle: labelTop
		}]
	}, {
		type: 'pie',
		center: ['87%', '50%'],
		radius: radius,
		x: '60%', // for funnel
		itemStyle: labelFromatter3,
		data: [{
			name: 'other',
			value: 239,
			itemStyle: labelBottom
		}, {
			name: '帮扶人员',
			value: 261,
			itemStyle: labelTop
		}]
	}, ]
};