//贫困村详情
define(function(require, exports, module) {
  exports.init = function(id) {
    //$("#bfry").hide();
    getData(id);
    $("#closepkc").live('click', function() {
      $("#pVillageDetail").hide();
    });
    //标签切换
    $("#base3").click(function() {
      $("#zcryTable").removeClass("current");
      $("#base3").addClass("current");
      $(".zcry").hide();
      $(".jbqk3").show();
    });
    $("#zcryTab").click(function() {
      $("#base3").removeClass("current");
      $("#zcryTab").addClass("current");
      $(".jbqk3").hide();
      $(".zcry").show();
    });
    changeColor("zcryTable", 0, 0);
  };

  function changeColor(tableId, isOver, isClick) {
    //为表格的奇偶行设定不同的颜色 isover:鼠标移入是否变色；isClick:鼠标点击是否变色
    $("#" + tableId + " tr:even").addClass("even");
    $("#" + tableId + " tr:odd").addClass("odd");
  }

  function getData(id) {
    $.ajax({
      type: "get",
      async: false,
      url: $.serviceHttp() + 'assistEmployer/assistEmployerInterface.shtml?act=getPoorVillage&id=' + id,
      success: function(data) {
        var arr = $.parseJSON(data);
        var obj = arr.obj;
        var poorVillageWorkers = obj.poorVillageWorkers;
        var dataObj = {};
        dataObj.AREANAME = obj.AREANAME;
        dataObj.CJRKS = obj.CJRKS;
        dataObj.DBHS = obj.DBHS;
        dataObj.DBRKS = obj.DBRKS;
        dataObj.FNRKS = obj.FNRKS;
        dataObj.GDMJ = obj.GDMJ;
        dataObj.GDMJM = obj.GDMJM;
        dataObj.LDLRS = obj.LDLRS;
        dataObj.LGMJ = obj.LGMJ;
        dataObj.MCDMJ = obj.MCDMJ;
        dataObj.NMNRJCSR = obj.NMNRJCSR;
        dataObj.PHONENUM = obj.PHONENUM;
        dataObj.PKHS = obj.PKHS;
        dataObj.PKRKS = obj.PKRKS;
        dataObj.SSMZRKS = obj.SSMZRKS;
        dataObj.SYMJ = obj.SYMJ;
        dataObj.TGHLMJ = obj.TGHLMJ;
        dataObj.VILLAGEATTRIBUTE = obj.VILLAGEATTRIBUTE;
        dataObj.VILLAGEMANAGER = obj.VILLAGEMANAGER;
        dataObj.WBHS = obj.WBHS;
        dataObj.WBRKS = obj.WBRKS;
        dataObj.WCWGRS = obj.WCWGRS;
        dataObj.XCCLS = obj.XCCLS;
        dataObj.YXGGMJ = obj.YXGGMJ;
        dataObj.ZHS = obj.ZHS;
        dataObj.ZRCGS = obj.ZRCGS;
        dataObj.ZRKS = obj.ZRKS;
        $("#pVillageDetail").html();
        $("#pVillageDetail").setTemplateURL("./htmltemplate/poorVillageDt.html").processTemplate(dataObj);
        listHelpPeo(poorVillageWorkers);
      },
      error: function() {}
    });

  }
  //驻村人员列表
  function listHelpPeo(workers) {
    var dataList = [];
    for (var i = 0; i < workers.length; i++) {
      var obj = {};
      obj.index = i + 1;
      obj.PHONENUM = workers[i].PHONENUM;
      obj.UNITNAME = workers[i].UNITNAME;
      obj.UNITREALTION = workers[i].UNITREALTION;
      obj.WORKNAME = workers[i].WORKNAME;
      obj.WORKTIME = workers[i].WORKTIME;
      dataList.push(obj);
    }
    $("#zcryInfo").setTemplateURL("./htmltemplate/villageWorkersList.html").processTemplate(dataList);
  }
});
