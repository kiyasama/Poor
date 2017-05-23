//脱贫资金管理详情
define(function(require, exports, module) {
    exports.init = function(id) {
        require("css/bfMoneyInfo.css");
        require("drag");
        getData(id);
        $("#closeButton").click(closeDetailDiv);
        $(".pdfLink").click(function() {
            searchpdf('');
        });
        //显示更多
        $(".moreDiv").live('click', function() {
            var content = $(this).find('span').html();
            $("#zjDetail").html(content);
            $("#tpzjDetail").hide();
            $("#ZJSYQKmsg").show();
        });
        $("#goback2").live('click', function() {
            $("#ZJSYQKmsg").hide();
            $("#tpzjDetail").show();
        });
    };

    function getData(id) {
        $.ajax({
            type: "get",
            async: false,
            url: $.serviceHttp() + 'helpMoney/helpMoneyInterface.shtml?act=getHelpMoneyInfo&id=' + id,
            success: function(data) {
                var info = "";
                var arr = $.parseJSON(data);
                var obj = arr.obj;
                var moneytype;
                switch (obj.MONEYTYPE) {
                    case '1':
                        moneytype = "发展资金";
                        break;
                    case '2':
                        moneytype = "以工代赈资金";
                        break;
                    case '3':
                        moneytype = "少数民族发展资金";
                        break;
                }
                var ZJXBQK;
                switch (obj.ZJXBQK) {
                    case '1':
                        ZJXBQK = "中央提前下达";
                        break;
                    case '2':
                        ZJXBQK = "当年新增资金";
                        break;
                }
                var dataObj = new Object();
                dataObj.moneytype = moneytype;
                dataObj.MONEYNUM = obj.MONEYNUM;
                dataObj.YEARS = obj.YEARS + "年";
                dataObj.PC = obj.PC;
                dataObj.FWBH = obj.FWBH;
                dataObj.XBSJ = obj.XBSJ;
                dataObj.ZJXBQK = ZJXBQK;
                dataObj.WJNAME = obj.WJNAME;
                dataObj.FILEPATH = obj.FILEPATH;
                dataObj.fileUrl = obj.fileUrl;
                dataObj.fileName = obj.fileName;
                var workData = obj.poorWorkUses;
                var dataList = new Array();
                for (var i = 0; i < workData.length; i++) {
                    var obj = new Object();
                    obj.JD = workData[i].JD;
                    obj.JHJE = workData[i].JHJE;
                    obj.ZJSYQK = workData[i].ZJSYQK;
                    if (workData[i].ZJSYQK.length > 20) {
                        obj.shortCut = workData[i].ZJSYQK.substr(0, 20) + '...';
                    } else {
                        obj.shortCut = workData[i].ZJSYQK;
                    }
                    dataList.push(obj);
                }
                dataObj.poorWorkUses = dataList;
                $("#pkfbDiv").hide();
                $("#tpcxDiv").html();
                $("#tpcxDiv").setTemplateURL("./htmltemplate/bfMoneyInfo.html").processTemplate(dataObj);
                setDiv('tpcxDiv');
            },
            error: function(e) {
                alert(e);
            }
        });
    }

    function searchpdf(e) {
        //            var url = decodeURI("咸阳市扶贫开发办公室关于省扶贫办同意咸阳市2015年扶贫计划备案的通知");
        window.open($.serviceHttp() + "Poor/fileNmae/pdfFile.pdf");
    }

    function closeDetailDiv() {
        $("#tpcxDiv").hide();
    }

    function tabSwitch(parentDivId, tabDivClass, switchDivClass) { //tab切换
        var tabLeft = $("#" + parentDivId),
            index;
        tabLeft.find("." + tabDivClass + " span").click(function() {
            if (!$(this).hasClass()) {
                index = $(this).index();
                $(this).addClass("current");
                $(this).siblings("span").removeClass("current");
                tabLeft.find("." + switchDivClass).hide();
                tabLeft.find("." + switchDivClass).eq(index).show();
            }
        });
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
