/**
 * Created by Lijiacheng on 2016/8/12.
 */
//脱贫户一张图列表信息
define(function(require, exports, module) {
    //require("css/zTree_new.css");
    var mapModule = require("../map/map.js");
    //var country = "610429109";
    var cntPkc = 0;
    var paramPkc = {
        pagePkc: "1",
        sizePkc: "4"
    };
    //行政区划
    var code1 = '';
    var address1 = '';
    //贫困人员模糊查询搜索框内容
    var pkryname1 = "";
    //年度
    var year1 = 2016;
    exports.init = function(code, address, year) {
        cntPkc = 0;
        paramPkc.pagePkc = '1';
        code1 = code;
        address1 = address;
        year1 = year;
        var tabLeft = $("#rightdiv"),
            index;
        tabLeft.find(".tabLeft span").click(function() {
            if (!$(this).hasClass()) {
                index = $(this).index(); //获取该元素在兄弟元素的位置
                $(this).addClass("current");
                $(this).siblings("span").removeClass("current");
                tabLeft.find(".tabRight").hide();
                tabLeft.find(".tabRight").eq(index).show();
            }
        });
        //脱贫人口入口
        getData();
        pkfbPangination();

        //点击搜索脱贫人员入口
        $("#tprycxbt").live("click", function() {
            cntPkc = 0;
            paramPkc.pagePkc = '1';
            mapModule.removeMarkers();
            mapModule.removePop();
            paramPkc.pagePkc = "1";
            pkryname1 = $("#tprycx").val();
            getData();
            pkfbPangination();
            event.stopPropagation();
        });

    };

    function getData() {
        //查询脱贫人口
        var url1 = 'poorPeople/poorPeopleInterface.shtml?act=poverlist&pageNow=' + paramPkc.pagePkc + '&pageSize=' + paramPkc.sizePkc + '&areacode=' + code1 + '&year=' + year1;
        //人员搜索模糊查询
        var url2 = "poorPeople/poorPeopleInterface.shtml?act=poverlike&pageNow=" + paramPkc.pagePkc + "&pageSize=" + paramPkc.sizePkc + "&areacode=" + code1 + "&name=" + pkryname1 + "&year=" + year1;
        var url = "";
        if (pkryname1.length > 0) {
            url = url2;
        } else {
            url = url1;
        }
        //jQuery.support.cors = true;
        $.ajax({
            type: "get",
            async: false,
            url: encodeURI($.serviceHttp() + url),
            success: function(data) {
                var arr = $.parseJSON(data); //json字符串转对象[数组]
                var obj = arr.list;
                var info = "";
                var count = arr.count;
                var povertyreason;
                $("#tpxzqhqh").text(address1);
                document.getElementById("tpallhushu").innerHTML = count;
                cntPkc = count;
                var pkfbList = [];
                mapModule.removeMarkers();
                mapModule.removePop();
                for (var n = 0; n < obj.length; n++) {
                    var zhipinrenason = "";
                    var perenson = obj[n].poorReason;
                    var renson = perenson.split(",");
                    for (var i = 0; i < renson.length; i++) {
                        var povertyreason = switchReason(renson[i]); //致贫原因转换
                        if (i == renson.length - 1) {
                            zhipinrenason += povertyreason;
                        } else {
                            zhipinrenason += povertyreason + "，";
                        }
                    }
                    var everyObj = {};
                    everyObj.name = obj[n].name;
                    var cardid = obj[n].cardId;
                    everyObj.cardId = cardid.replace(cardid.substr(3, 12), "************");
                    everyObj.zhipinrenason = zhipinrenason;
                    everyObj.tel = obj[n].tel;
                    everyObj.id = obj[n].id;
                    everyObj.x = obj[n].x;
                    everyObj.y = obj[n].y;
                    pkfbList.push(everyObj);
                    var pkfbDetail = require("./pkfbDetail.js");
                    var featureout = function(e) {
                        //$(".olAlphaImg").attr("src", "images/icon_household.png");
                        e.feature.style.externalGraphic = "images/icon_household.png";
                        e.feature.layer.drawFeature(e.feature);
                    };
                    var featureover = function(e) {
                        //var divId = "#" + e.feature.geometry.id;
                        //$(divId).attr("src", "images/icon_household_on.png");
                        e.feature.style.externalGraphic = "images/icon_household_on.png";
                        e.feature.layer.drawFeature(e.feature);
                    };
                    var featureclick = function(e) {
                        var idtemp = e.feature.data.id;
                        pkfbDetail.init(idtemp);
                    };
                    mapModule.initMarkerLayer(featureclick, featureover, featureout);
                    var marker = mapModule.addMarker(obj[n].x, obj[n].y, everyObj, "images/icon_household.png", code1);
                    /* marker.events.register('mouseover', marker, function(evt) {
                         var divId = "#" + evt.srcElement.id;
                         $(divId).attr("src", "images/icon_household_on.png");
                     });
                     marker.events.register('mouseout', marker, function(evt) {
                         //mapModule.removeMarkers();
                         $(".olAlphaImg").attr("src", "images/icon_household.png");
                     });
                     marker.events.register('mousedown', marker, function(evt) {
                         //var name = evt.object.feature.name;
                         //alert(name);坐标
                         var idtemp = evt.object.feature.id;
                         pkfbDetail.init(idtemp);
                     });*/
                }
                $("#tpfbListDiv").setTemplateURL("./htmltemplate/tpfb.html").processTemplate(pkfbList);
            },
            error: function() {}
        });
    }

    /*function getBaceData() {
        //加载基本情况
        var url3 = "poorPeople/poorPeopleInterface.shtml?act=summary&areacode=" + code + '&year=' + year;
        var jbxx = $.getMethod2(url3);
        if (jbxx) {
            var objjbxx = JSON.parse(jbxx).list[0];
            $("#summary").setTemplateURL("./htmltemplate/pkfbRight_jbqk.html").processTemplate(objjbxx);
        }
        //echarts
        charts.init(code, year);
    }*/

    var pkfbPangination = function() {
        if (cntPkc > 0) {
            $("#tpfbPagenav").geokpagination({
                items: cntPkc,
                itemsOnPage: paramPkc.sizePkc,
                prevText: "上一页",
                nextText: "下一页",
                cssStyle: 'light-theme',
                onPageClick: function(pageNumber, event) {
                    paramPkc.pagePkc = pageNumber;
                    getData();
                }
            });
        } else {
            $("#pkfbPagenav").html("");
        }
    };

    /*$("#select1").live("change", function(obj) {
     country = $(this).children('option:selected').val();
     getData(country);
     pkfbPangination();
     });
     */

    function switchReason(type) {
        var povertyreason = "";
        switch (type) {
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
                povertyreason = "缺资金";
                break;
            case '8':
                povertyreason = "交通条件落后";
                break;
            case '9':
                povertyreason = "自身发展力不足";
                break;
            case '10':
                povertyreason = "缺劳力";
                break;
            case '11':
                povertyreason = "其他";
                break;
            default:
                povertyreason = "";
                break;
        }
        return povertyreason;
    }
});
