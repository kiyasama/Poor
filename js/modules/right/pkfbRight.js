//脱贫成效右侧菜单
define(function(require, exports, module) {
  require("jquery");
  require("pagination");
  require("jquery-jtemplates");
  require('js/core/UICore.js')($);
  require("css/right.css");
  require("js/lib/pagination/simplePagination.css");
  exports.init = function() {
    //$("#tabLeft").css("display", "none");
    $("#tabRight").css("display", "block");
    $("#tabRight").setTemplateURL("./htmltemplate/pkfbRight.html");
    var tpcx = require("./jdbf.js");
    tpcx.init();
  };

});
