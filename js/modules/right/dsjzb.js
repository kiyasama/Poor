define(function(require, exports, module) {
	exports.init = function(id) {
		var url = 'poorPeople/poorPeopleInterface.shtml?act=getPeopleInfo&id='+id;
		var data = $.getMethod2(url);
		var obj;
		if (data != "") {
			data = JSON.parse(data);
			$("#dsjzb").css("display", "block");
			$("#dsjzb").setTemplateURL("./htmltemplate/dsjzb.html").processTemplate(data.obj);

		}else{
			alert("无大数据信息");
		}

		$("#dsjzbClose").live("click",function(){
			$("#dsjzb").css("display", "none");
		});

	};


});
