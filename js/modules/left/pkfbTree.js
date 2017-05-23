//贫困分布-左侧树
define(function(require, exports, module) {
    require("jquery");
    require("pagination");
    require("jquery-jtemplates");
    require('js/core/UICore.js')($);
    require("css/pkfbLeft.css");
    exports.init = function() {
        $("#tabLeft").css("display", "block");
        $("#tabLeft").setTemplateURL("./htmltemplate/pkfbTree.html").processTemplate();
        var xzqh = require("js/modules/left/xzqhTree.js");
        var xzqhchanges = require("js/modules/right/pkfb.js");
        setMinHeight();
        setYear();
        var clicks = function(event, treeId, treeNode) {
            xzqhchanges.xzqhchange(treeNode);
        }
        var url = '/poorPeople/poorPeopleInterface.shtml?act=town';
        var divId = "#treeDemo";
        var setting = {
            data: {
                /*key: {
                    title: "t"
                },*/
                check: {
                    enable: true
                },
                simpleData: {

                    enable: true,
                    idKey: "id",
                    pIdKey: "pid",
                    rootPId: 0
                },
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


        function setMinHeight() {
            var minHeight = document.documentElement.clientHeight - 121 - 115;
            $("#treeHight").css('height', minHeight);
        }
    };

    function setYear() {
        var day = new Date(),
            year = day.getFullYear();
        var fy = parseInt($("#year option").first().val());
        if (year > fy) {
            for (var i = fy + 1; i < year; i++) {
                $("#year option").removeAttr('selected');
                $("#year").prepend('<option value="' + i + '" >' + i + '年</option>');
            }
            $("#year").prepend('<option value="' + year + '" selected="selected">' + year + '年</option>');
        }
        $("#year").attr('value', year);
    }
});
