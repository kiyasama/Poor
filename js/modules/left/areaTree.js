//行政区划树
define(function(require, exports, module) {
    require("jquery");
    require("pagination");
    require("jquery-jtemplates");
    require('js/core/UICore.js')($);
    require("css/pkfbLeft.css");

    function setMinHeight() {
        var minHeight = document.documentElement.clientHeight - 121 - 115;
        $("#treeHight").css('height', minHeight);
    }
    exports.init = function(name) {
        $("#tabLeft").css("display", "block");
        $("#tabLeft").setTemplateURL("./htmltemplate/pkfbTree.html").processTemplate();
        $(".year-select").attr('id', 'year_bfzt')
        setMinHeight();
        setYear();
        var xzqh = require("js/modules/left/xzqhTree.js");
        var jsName = 'js/modules/right/' + name + '.js';
        var clicks = function(event, treeId, treeNode) {
            var xzqhchanges = require(jsName);
            xzqhchanges.xzqhchange(treeNode);
        }
        var url = '/poorPeople/poorPeopleInterface.shtml?act=town',
            divId = "#treeDemo";
        var setting = {
            data: {
                /*key: {
                    title: "t"
                },*/
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "pid",
                    rootPId: 0
                }
            },
            /*view: {
              fontCss: getFontCss,

            },*/
            callback: {
                onClick: clicks
            }
        };
        xzqh.init(url, divId, setting);
        $("#showLeftDiv1").click(function() {
            $(this).hide();
            $('#tree').show();
        });
        $("#hideLeftDiv2").click(function() {
            $('#tree').hide();
            $("#showLeftDiv1").show();
        });
    };

    function setYear() {
        var day = new Date(),
            year = day.getFullYear();
        var fy = parseInt($(".year-select option").first().val());
        if (year > fy) {
            for (var i = fy + 1; i < year; i++) {
                $(".year-select option").removeAttr('selected');
                $(".year-select").prepend('<option value="' + i + '" >' + i + '年</option>');
            }
            $(".year-select").prepend('<option value="' + year + '" selected="selected">' + year + '年</option>');
        }
        $(".year-select").attr('value', year);
    }
});
