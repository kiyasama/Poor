//帮扶日志详情
define(function(require, exports, module) {
  require("jquery-rebox");
  require("css/jquery-rebox.css");
  exports.init = function(id) {
    //$("#bfry").hide();
    getData(id);
    $("#goback").live('click', function() {
      $("#journal").hide();
      //$("#bfry").show();
    });
  };

  function getData(id) {
    $.ajax({
      type: "get",
      async: false,
      url: $.serviceHttp() + 'assistPoverty/assistPovertyLogInterface.shtml?act=detailAssistLog&id=' + id,
      success: function(data) {
        var arr = $.parseJSON(data);
        var obj = arr.obj;
        var holdname = decodeURI(obj.holdName);
        var content = obj.content;
        var remark = obj.remark;
        var dataObj = {};
        dataObj.holdname = holdname;
        dataObj.content = content;
        dataObj.cardId = obj.cardId;
        dataObj.remark = remark;
        $("#journal").html();
        $("#journal").setTemplateURL("./htmltemplate/journalInfo.html").processTemplate(dataObj);
        var photoPath = obj.photoPath;
        getPicture(photoPath);
        $('#rzimg').rebox({
          selector: 'a'
        });
      },
      error: function() {}
    });

  }

  function getPicture(photoPath) {
    var imgUrl = photoPath.split(",");
    var srcImg;
    var info = "";
    for (var x = 0; x < imgUrl.length; x++) {
      if (imgUrl[x] != "") {
        srcImg = $.serviceHttp() + "upload/" + imgUrl[x];
        $("#rzimg").append('<a href="' + srcImg + '" title=""><img src="' + srcImg + '"onerror="javascript:this.src=\'./images/bfrzDefult.png\'" />');
      }
    }
  }

  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
});
