//帮扶计划详情
define(function(require, exports, module) {
  require("jquery-rebox");
  require("css/jquery-rebox.css");
  exports.init = function(id) {
    //$("#bfry").hide();
    getData(id);
    $("#goback_hp").live('click', function() {
      $("#helpPro").hide();
      //$("#bfry").show();
    });
  };

  function getData(id) {
    $.ajax({
      type: "get",
      async: false,
      url: $.serviceHttp() + 'assistResult/assistPeoplMoblieInterface.shtml?act=listPlanDetailQuery&id=' + id,
      success: function(data) {
        var arr = $.parseJSON(data);
        var obj = arr.obj;
        var xmName = obj.year;
        var description = obj.assistplan;
        var money = obj.assistprecaution;
        var dataObj = {};
        dataObj.xmName = xmName;
        dataObj.description = description;
        dataObj.money = money;
        $("#helpPro").html();
        $("#helpPro").setTemplateURL("./htmltemplate/helpProDetail.html").processTemplate(dataObj);
       /* var photoPath = obj.photoPath;
        getPicture(photoPath);
        $('#rzimg').rebox({
          selector: 'a'
        });*/
      },
      error: function() {}
    });

  }

  /*function getPicture(photoPath) {
    var imgUrl = photoPath.split(",");
    var srcImg;
    var info = "";
    for (var x = 0; x < imgUrl.length; x++) {
      if (imgUrl[x] != "") {
        srcImg = $.serviceHttp() + "upload/" + imgUrl[x];
        $("#rzimg").append('<a href="' + srcImg + '" title=""><img src="' + srcImg + '"onerror="javascript:this.src=\'./images/bfrzDefult.png\'" />');
      }
    }
  }*/

  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
});
