//帮扶人员详情
define(function(require, exports, module) {
  var zfcs;
  var rid = '',
    paramPkc = { //成效分页
      pagePkc: "1",
      sizePkc: "2"
    },
    cntPkc = 0;
  //日志分页
  var cntPkc1 = 0;
  var paramPkc1 = {
    pagePkc: "1",
    sizePkc: "5"
  };
  //帮扶计划分页
  var cntPkc2 = 0;
  var paramPkc2 = {
    pagePkc: "1",
    sizePkc: "5"
  };
  exports.init = function(id) {
    cntPkc = 0;
    paramPkc.pagePkc = '1';
    cntPkc1 = 0;
    paramPkc1.pagePkc = '1';
    require("css/bfPersonInfo.css");
    require("drag");
    getBaseData(id);
    $("#closeDiv").click(closeDetailDiv);
    $("#bfrzTab").click(function() {
      $("#bfrzTab").addClass("current");
      $("#base").removeClass("current");
      $("#bfdxTab").removeClass("current");
      $("#bfcxTab").removeClass("current");
      $("#bfjhTab").removeClass("current");
      $("#pkfbPagenav").hide();
      $(".bfdx").hide();
      $(".jbqk").hide();
      $("#bfcxDiv").hide();
      $(".bfjh").hide();
      $(".bfrz").show();
      $("#bfjgDiv").show();
    });
    $("#bfdxTab").click(function() {
      $("#bfdxTab").addClass("current");
      $("#base").removeClass("current");
      $("#bfrzTab").removeClass("current");
      $("#bfcxTab").removeClass("current");
      $("#bfjhTab").removeClass("current");
      $("#pkfbPagenav").hide();
      $(".bfrz").hide();
      $(".jbqk").hide();
      $("#bfcxDiv").hide();
      $(".bfjh").hide();
      $(".bfdx").show();
      $("#bfjgDiv").show();
    });
    $("#base").click(function() {
      $("#base").addClass("current");
      $("#bfrzTab").removeClass("current");
      $("#bfdxTab").removeClass("current");
      $("#bfcxTab").removeClass("current");
      $("#bfjhTab").removeClass("current");
      $("#pkfbPagenav").hide();
      $(".bfdx").hide();
      $(".bfrz").hide();
      $("#bfcxDiv").hide();
      $(".bfjh").hide();
      $(".jbqk").show();
      $("#bfjgDiv").show();
    });
    $("#bfcxTab").click(function() {
      $("#bfcxTab").addClass("current");
      $("#bfrzTab").removeClass("current");
      $("#bfdxTab").removeClass("current");
      $("#base").removeClass("current");
      $("#bfjhTab").removeClass("current");
      searchBfcx();
      $(".bfdx").hide();
      $(".bfrz").hide();
      $(".jbqk").hide();
      $(".bfjh").hide();
      $("#bfjgDiv").hide();
      $("#bfcxDiv").show();
    });
    //帮扶计划
    $("#bfjhTab").click(function() {
      $("#bfjhTab").addClass("current");
      $("#bfrzTab").removeClass("current");
      $("#bfdxTab").removeClass("current");
      $("#base").removeClass("current");
      $("#bfcxTab").removeClass("current");
      $("#pkfbPagenav").hide();
      $(".bfdx").hide();
      $(".bfrz").hide();
      $("#bfcxDiv").hide();
      $(".jbqk").hide();
      $(".bfjh").show();
      $("#bfjgDiv").show();
    });
    $(".rzxq").live('click', function() {
      openDetailDiv($(this));
    });
    $(".jhxq").live('click', function() {
      openjhDetailDiv($(this));
    });
    changeColor("dxTable", 0, 0);
    changeColor("dxTable2", 0, 0);
    //跳转到贫困人员详情
    $(".xq").live("click", function() {
      var id = $(this).attr('id');
      var pkfbDetail = require("./pkfbDetail.js");
      pkfbDetail.init(id);
      //$("#pkfbDiv .pkzbDiv").css('margin-right', '-31px');
      $("#goBack").show();
    });
    $("#goBack").live('click', function() {
      $("#pkfbDiv").hide();
      $("#fpxmDiv").hide();
      $("#tpcxDiv").show();
    });
  };
  //一表清
  $(".ybq").live("click", function() {
    var oneTab = require("./oneTable.js");
    var id = $(this).attr("id");
    oneTab.init(id);
  });

  function searchBfcx() {
    $("#pkfbPagenav").html('');
    $("#pkfbPagenav").show();
    getBfcx(rid);
    loadPangination();
  }

  function changeColor(tableId, isOver, isClick) {
    //为表格的奇偶行设定不同的颜色 isover:鼠标移入是否变色；isClick:鼠标点击是否变色
    $("#" + tableId + " tr:even").addClass("even");
    $("#" + tableId + " tr:odd").addClass("odd");

    /*if (1 == isOver) { //鼠标移入该行和鼠标移除该行的事件
      $("#" + tableId + " tr").mouseover(function() {
        $(this).addClass("over");
      }).mouseout(function() {
        $(this).removeClass("over");
      });
    }

    if (1 == isClick) { //鼠标点击事件
      $("#" + tableId + " tr:gt(0)").bind("click", function() {
        $("#" + tableId + " tr:gt(0)").removeClass("click");
        $(this).addClass("click");
      });
    }*/
  }

  function getBaseData(id) {
    $.ajax({
      type: "get",
      async: false,
      url: $.serviceHttp() + 'helpPerson/helpPersonInterface.shtml?act=getHelpingPersonInfo&id=' + id,
      success: function(data) {
        var arr = $.parseJSON(data);
        var obj = arr.obj;
        var helpedPersons = obj.helpedPersons;
        var dxtableinfo = "",
          photoDownLoadPath = obj.photoDownLoadPath;

        //var personnaeme = decodeURI(obj.name);
        // var namePY = codefans_net_CC2PY(personnaeme);
        /*var pinYin = require("../../core/getNamePinYin.js");
        var namePY = pinYin.codefans(personnaeme);*/
        var dataObj = new Object();
        dataObj.name = obj.name;
        dataObj.contactPhone = obj.contactPhone;
        dataObj.orgName = obj.orgName;
        dataObj.position = obj.position;
        dataObj.orgRelation = obj.orgRelation;
        dataObj.orgType = obj.orgType;
        dataObj.startTime = obj.startTime;
        dataObj.endTime = obj.endTime;
        dataObj.remarks = obj.remarks;
        dataObj.manPic = $.serviceHttp() + photoDownLoadPath;
        $("#pkfbDiv").hide();
        $("#tpcxDiv").html('');
        $("#tpcxDiv").setTemplateURL("./htmltemplate/bfPersonInfo.html").processTemplate(dataObj);
        setDiv('tpcxDiv');
        rid = id;
        dataBfdx(helpedPersons);
      },
      error: function(e) {
        alert(e);
      }
    });
  }

  function dataBfdx(helpedPersons) {
    var helppersonlen = helpedPersons.length;
    var povertyreason = '';
    helppersonlen = helpedPersons.length;
    var dataList = new Array();
    for (var n = 0; n < helppersonlen; n++) {
      switch (helpedPersons[n].povertyreason) {
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
          povertyreason = "缺劳力";
          break;
        case '8':
          povertyreason = "缺资金";
          break;
        case '9':
          povertyreason = "交通条件落后";
          break;
        case '10':
          povertyreason = "自身发展力不足";
          break;
        default:
          povertyreason = "其他";
          break;
      }
      var bfdxObj = new Object();
      bfdxObj.id = n + 1;
      bfdxObj.name = helpedPersons[n].name;
      bfdxObj.tel = helpedPersons[n].tel;
      bfdxObj.povertyreason = povertyreason;
      bfdxObj.visitnum = helpedPersons[n].visitnum;
      bfdxObj.personId = helpedPersons[n].id;
      dataList.push(bfdxObj);
    }
    $("#bftableinfo").setTemplateURL("./htmltemplate/bfdxList.html").processTemplate(dataList);
    getRzData(rid);
    loadPangination1();
  }

  //帮扶日志
  function getRzData(id) {
    $.ajax({
      type: "get",
      async: false,
      url: $.serviceHttp() + 'helpPerson/helpPersonInterface.shtml?act=listHelpingPersonLog&id=' + id + '&pageSize=' + paramPkc1.sizePkc + '&pageNow=' + paramPkc1.pagePkc,
      success: function(data) {
        var brr = $.parseJSON(data);
        cntPkc1 = brr.count;
        var abj = brr.list;
        var bfrzinfo = "";
        var len = abj.length;
        var bfjg = require('js/modules/right/bfjgChart.js');
        bfjg.init(id);
        var dataList = [];
        for (var n = 0; n < len; n++) {
          var holdname = decodeURI(abj[n].holdname);
          var content = abj[n].content;
          var bfdxObj = {};
          bfdxObj.index = n + 1;
          bfdxObj.holdname = holdname;
          bfdxObj.servicetime = abj[n].servicetime;
          if (content.length > 18) {
            bfdxObj.content = content.substr(0, 18) + '...';
          } else {
            bfdxObj.content = content;
          }
          bfdxObj.id = abj[n].id;
          dataList.push(bfdxObj);
        }
        $("#bfrztable").setTemplateURL("./htmltemplate/bfrzList.html").processTemplate(dataList);
        getJhData(rid);
        loadPangination2();
      },
      error: function(e) {
        alert(e);
      }
    });
  }
  //日志分页
  var loadPangination1 = function() {
    if (cntPkc1 > 0) {
      $("#rzlist").css('height', '175px');
      $("#rzPagenav").geokpagination({
        items: cntPkc1,
        itemsOnPage: paramPkc1.sizePkc,
        prevText: "上一页",
        nextText: "下一页",
        cssStyle: 'light-theme',
        onPageClick: function(pageNumber, event) {
          paramPkc1.pagePkc = pageNumber;
          getRzData(rid);
        }
      });
    } else {
      $("#rzPagenav").html("");
    }
  };
  //帮扶计划列表
  function getJhData(id) {
    $.ajax({
      type: "get",
      async: false,
      url: $.serviceHttp() + 'assistResult/assistPeoplMoblieInterface.shtml?act=listPlanQuery&id=' + id + '&pageSize=' + paramPkc1.sizePkc + '&pageNow=' + paramPkc1.pagePkc,
      success: function(data) {
        var brr = $.parseJSON(data);
        cntPkc2 = brr.count;
        var abj = brr.list;
        var bfrzinfo = "";
        var len = abj.length;
        var bfjg = require('js/modules/right/bfjgChart.js');
        bfjg.init(id);
        var dataList = [];
        for (var n = 0; n < len; n++) {
          var xmName = decodeURI(abj[n].year);
          var description = abj[n].assistplan;
          var bfdxObj = {};
          bfdxObj.index = n + 1;
          bfdxObj.xmName = xmName;
          bfdxObj.description = abj[n].description;
          if (description.length > 18) {
            bfdxObj.description = description.substr(0, 18) + '...';
          } else {
            bfdxObj.description = description;
          }
          bfdxObj.id = abj[n].id;
          bfdxObj.money = abj[n].assistprecaution;
          dataList.push(bfdxObj);
        }
        $("#bfjhtable").setTemplateURL("./htmltemplate/bfjhList.html").processTemplate(dataList);
      },
      error: function(e) {
        alert(e);
      }
    });
  }
  //帮扶计划表分页
  var loadPangination2 = function() {
    if (cntPkc2 > 0) {
      $("#jhlist").css('height', '175px');
      $("#jhPagenav").geokpagination({
        items: cntPkc2,
        itemsOnPage: paramPkc2.sizePkc,
        prevText: "上一页",
        nextText: "下一页",
        cssStyle: 'light-theme',
        onPageClick: function(pageNumber, event) {
          paramPkc2.pagePkc = pageNumber;
          getJhData(rid);
        }
      });
    } else {
      $("#jhPagenav").html("");
    }
  };
  //获取帮扶成效
  function getBfcx(id) {
    var nullList = [{
      assistAfter: '',
      assistAfterPath: '',
      assistBefore: '',
      assistBeforePath: '',
      code: '',
      createTime: '',
      createUserId: '',
      dataAreaCode: '',
      delFlag: '',
      id: '',
      orderNumber: '',
      povertyHouseId: '',
      povertyHouseName: '',
      projectEffect: '',
      projectId: '',
      projectName: '',
      projectProfit: '',
      projectType: '',
      remark: '',
      updateTime: '',
      updateUserId: ''
    }];
    $("#bfcxDiv").setTemplateURL("./htmltemplate/bfcxTable.html");
    $.ajax({
      type: "get",
      async: false,
      url: $.serviceHttp() + 'assistResult/assistResultInterface.shtml?act=loadAssistResult&pageSize=' + paramPkc.sizePkc + '&pageNow=' + paramPkc.pagePkc + '&id=' + id,
      success: function(data) {
        if (data !== '') {
          var brr = $.parseJSON(data);
          var dataList = brr.list;
          cntPkc = brr.count;
          if (dataList.length === 0) {
            dataList = nullList;
          }
          $("#bfcxDiv").processTemplate(dataList);
        } else {
          $("#bfcxDiv").processTemplate(nullList);
        }
      },
      error: function(e) {
        alert(e);
      }
    });
  }
  //帮扶成效分页
  var loadPangination = function() {
    if (cntPkc > 0) {
      $("#pkfbPagenav").geokpagination({
        items: cntPkc,
        itemsOnPage: paramPkc.sizePkc,
        prevText: "上一页",
        nextText: "下一页",
        cssStyle: 'light-theme',
        onPageClick: function(pageNumber, event) {
          paramPkc.pagePkc = pageNumber;
          getBfcx(rid);
        }
      });
    } else {
      $("#pkfbPagenav").html("");
    }
  };

  function closeDetailDiv() {
    $("#tpcxDiv").hide();
  }

  function openDetailDiv(obj) {
    var e = $(obj).attr('id');
    var rzInfo = require('js/modules/right/journalInfo.js');
    rzInfo.init(e);
    setDiv('journal');
  }
  //帮扶计划详情
  function openjhDetailDiv(obj) {
    var e = $(obj).attr('id');
     var rzInfo = require('js/modules/right/helpProDetail.js');
     rzInfo.init(e);
     setDiv('helpPro');
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
});
