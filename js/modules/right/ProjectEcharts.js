

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
				return 100 - params.value + '%'
			},
			textStyle: {
				baseline: 'top'
			}
		}
	},
};
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
option = {
	legend: {

		x: 'center',
		y: 'center',
		data: ['过程正常', '进度正常', '资金正常', '成效正常']
	},

	series: [{
		type: 'pie',
		center: ['25%', '25%'],
		radius: radius,
		x: '0%', // for funnel
		itemStyle: labelFromatter,
		data: [{
			name: 'other',
			value: 0,
			itemStyle: labelBottom
		}, {
			name: '过程正常',
			value: 100,
			itemStyle: labelTop
		}]
	}, {
		type: 'pie',
		center: ['75%', '25%'],
		radius: radius,
		x: '20%', // for funnel
		itemStyle: labelFromatter,
		data: [{
			name: 'other',
			value: 0,
			itemStyle: labelBottom
		}, {
			name: '进度正常',
			value: 100,
			itemStyle: labelTop
		}]
	}, {
		type: 'pie',
		center: ['25%', '75%'],
		radius: radius,
		x: '40%', // for funnel
		itemStyle: labelFromatter,
		data: [{
			name: 'other',
			value: 0,
			itemStyle: labelBottom
		}, {
			name: '资金正常',
			value: 100,
			itemStyle: labelTop
		}]
	}, {
		type: 'pie',
		center: ['75%', '75%'],
		radius: radius,
		x: '60%', // for funnel
		itemStyle: labelFromatter,
		data: [{
			name: 'other',
			value: 0,
			itemStyle: labelBottom
		}, {
			name: '成效正常',
			value: 100,
			itemStyle: labelTop
		}]
	}]
};

