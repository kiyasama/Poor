//帮扶监管echarts
define(function(require, exports, module) {
  require("echarts");
  var option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['上报服务日志']
    },
    grid: {
      x: 40,
      y: 30,
      x2: 20,
      y2: 40
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: '上报服务日志',
      type: 'line',
      stack: '总量',
      areaStyle: {
        normal: {}
      },
      data: [2, 1, 1, 3, 2, 3]
    }]
  };
  exports.init = function(id) {
    var myChart1 = echarts.init(document.getElementById('bfdc1'));
    myChart1.showLoading();
    myChart1.setOption(option);
    getData(id);
    myChart1.hideLoading();
    myChart1.setOption(option);
  };

  function getData(id) {
    var url = 'helpPerson/helpPersonInterface.shtml?act=getHelpCounts&id=' + id;
    $.getAsyncMethod(url, callback, function(e) {
      alert(e);
    });

    function callback(data) {
      var arr = $.parseJSON(data);
      var list = arr.list;
      option.series[0].data = list;
      //option.series[1].data = list;
    }
  }
});
