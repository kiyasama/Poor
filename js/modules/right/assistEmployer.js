//帮扶单位详情
define(function(require, exports, module) {
  var rid = '',
    paramPkc = { //贫困村分页
      pagePkc: "1",
      sizePkc: "12"
    },
    cntPkc = 0;
  var cntPkcPa = 0; //进度监管
  var paramPkcPa = { //进度监管
    pagePkc: "1",
    sizePkc: "6"
  };
  exports.init = function(id) {
    cntPkc = 0;
    paramPkc.pagePkc = '1';
    cntPkcPa = 0;
    paramPkcPa.pagePkc = '1';
    require("css/bfPersonInfo.css");
    require("css/poorVillage.css");
    require("drag");
    getBaseData(id);
    $("#closeBfdw").click(closeDetailDiv);
    $("#bfjhTab").click(function() {
      $(".titles").removeClass("current");
      $("#bfjhTab").addClass("current");
      $(".contentWrap").hide();
      $(".bfdx").show();
    });
    $("#base2").click(function() {
      $(".titles").removeClass("current");
      $("#base2").addClass("current");
      $(".contentWrap").hide();
      $(".jbqk2").show();
    });
    $("#pkcTab").click(function() {
      $(".titles").removeClass("current");
      $("#pkcTab").addClass("current");
      $(".contentWrap").hide();
      $(".bfrz").show();
    });
    //帮扶进度
    $("#bfjdTab").click(function() {
      $(".titles").removeClass("current");
      $("#bfjdTab").addClass("current");
      $(".contentWrap").hide();
      $(".bfjd").show();
    });
    //奇偶行变色
    changeColor("jhTable", 0, 0);
    changeColor("pkcTable", 0, 0);
    //贫困村详情
    $(".pkcxq").live('click', function() {
      openDetailDiv($(this));
    });
    //图片弹窗
    $(".pics").live('click', function() {
      openPicture($(this));
    });
    //关闭
    $("#closepic").live('click', function() {
      $("#bfjdPic").hide();
    });
  };

  function changeColor(tableId, isOver, isClick) {
    //为表格的奇偶行设定不同的颜色 isover:鼠标移入是否变色；isClick:鼠标点击是否变色
    $("#" + tableId + " tr:even").addClass("even");
    $("#" + tableId + " tr:odd").addClass("odd");
  }

  function getBaseData(id) {
    $.ajax({
      type: "get",
      async: false,
      url: $.serviceHttp() + 'assistEmployer/assistEmployerInterface.shtml?act=getAssistEmployer&id=' + id,
      success: function(data) {
        var arr = $.parseJSON(data);
        var obj = arr.obj;
        var assistPlans = obj.assistPlans; //帮扶计划列表
        var dataObj = {
          addres: obj.addres,
          contactPhone: obj.contactPhone,
          contactpeople: obj.contactpeople,
          endTime: obj.endTime,
          id: obj.id,
          name: obj.name,
          orgRelation: obj.orgRelation,
          orgType: obj.orgType,
          startTime: obj.startTime,
          remarks: obj.remarks
        };
        $("#pkfbDiv").hide();
        $("#tpcxDiv").html('');
        $("#tpcxDiv").setTemplateURL("./htmltemplate/assistEmployer.html").processTemplate(dataObj);
        setDiv('tpcxDiv');
        rid = id;
        listPlans(assistPlans);
      },
      error: function(e) {
        alert(e);
      }
    });
  }
  //帮扶计划与措施列表
  function listPlans(plans) {
    var dataList = [];
    for (var i = 0; i < plans.length; i++) {
      var bfjhObj = {};
      bfjhObj.index = i + 1;
      bfjhObj.year = plans[i].year;
      bfjhObj.assistplan = plans[i].assistplan;
      bfjhObj.assistprecaution = plans[i].assistprecaution;
      dataList.push(bfjhObj);
    }
    $("#bfjhInfo").setTemplateURL("./htmltemplate/assistPlanList.html").processTemplate(dataList);
    getPkcData(rid);
    loadPanginationPkc();
    //帮扶进度
    getEmployerPlans(rid);
    pkfbPangination2();
  }
  //贫困村列表
  function getPkcData(id) {
    $.ajax({
      type: "get",
      async: false,
      url: $.serviceHttp() + 'assistEmployer/assistEmployerInterface.shtml?act=listPoorVillages&id=' + id + '&pageSize=' + paramPkc.sizePkc + '&pageNow=' + paramPkc.pagePkc,
      success: function(data) {
        var brr = $.parseJSON(data);
        cntPkc = brr.count;
        var abj = brr.list;
        var dataList = [];
        for (var n = 0; n < abj.length; n++) {
          var pkcObj = {};
          pkcObj.index = n + 1;
          pkcObj.AREANAME = abj[n].AREANAME;
          pkcObj.PHONENUM = abj[n].PHONENUM;
          pkcObj.VILLAGEATTRIBUTE = abj[n].VILLAGEATTRIBUTE;
          pkcObj.VILLAGEMANAGER = abj[n].VILLAGEMANAGER;
          pkcObj.id = abj[n].id;
          dataList.push(pkcObj);
        }
        $("#pkcList").setTemplateURL("./htmltemplate/pkVillageList.html").processTemplate(dataList);
      },
      error: function(e) {
        alert(e);
      }
    });
  }
  //日志分页
  var loadPanginationPkc = function() {
    if (cntPkc > 0) {
      $("#pkclist").css('height', '400px');
      $("#poorVPagenav").geokpagination({
        items: cntPkc,
        itemsOnPage: paramPkc.sizePkc,
        prevText: "上一页",
        nextText: "下一页",
        cssStyle: 'light-theme',
        onPageClick: function(pageNumber, event) {
          paramPkc.pagePkc = pageNumber;
          getPkcData(rid);
        }
      });
    } else {
      $("#poorVPagenav").html("");
    }
  };

  //进度监管分页
  var pkfbPangination2 = function() {
    $("#pkfbPagenavJd").show();
    if (cntPkcPa > 0) {
      $("#pkfbPagenavJd").geokpagination({
        items: cntPkcPa,
        itemsOnPage: paramPkcPa.sizePkc,
        prevText: "上一页",
        nextText: "下一页",
        cssStyle: 'light-theme',
        onPageClick: function(pageNumber, event) {
          paramPkcPa.pagePkc = pageNumber;
          getEmployerPlans();
        }
      });
    } else {
      $("#pkfbPagenavJd").html("");
    }
  };
  //进度监管数据
  function getEmployerPlans(id) {
    var url = 'assistEmployer/assistEmployerInterface.shtml?act=listEmployerPlans&id=' + id + '&pageSize=' + paramPkcPa.sizePkc + '&pageNow=' + paramPkcPa.pagePkc;
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
          id: list[n].id,
          photopath: list[n].photopath
        };
        helpPeoList.push(everyObj);
      }
    }
    $("#jdList").setTemplateURL("./htmltemplate/emPloyerPlan.html").processTemplate(helpPeoList);
  }

  function closeDetailDiv() {
    $("#tpcxDiv").hide();
  }
  //设置弹出框拖动、放大缩小
  function setDiv(divId) {
    $("#" + divId).show();
    var initialWidth = 720;
    var initialHeight = 550;
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

  //贫困村详情
  function openDetailDiv(obj) {
    var e = $(obj).attr('id');
    var rzInfo = require('js/modules/right/poorVillage.js');
    rzInfo.init(e);
    setDiv('pVillageDetail');
  }

  //图片弹窗
  function openPicture(obj) {
    var vals= $(obj).next().html();
    $("#jgPicture").attr('src',vals);
    setDiv('bfjdPic');
  }
});
