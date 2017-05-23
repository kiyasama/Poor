//一表清详情
define(function(require, exports, module) {
	require("css/big_box.css");
	require("drag");
	var code = LoginAccount.code;
	var bxflag = false; //是否彬县
	exports.init = function(id) {
		var display = $("#tpcxDiv").css('display');
		if (display === 'none') { //是否隐藏
		} else {
			$("#fpxmDiv").hide();
			$("#pkfbDiv").hide();
		}
		var subcode = code.substr(0, 6);
		if (subcode === '610427') {
			bxflag = true;
		}
		getData(id);
		//关闭按钮
		$("#oneClose").live("click", function() {
			$("#oneTabDiv").hide();
		});
	};

	function getData(id) {
		var url = "poorPeople/poorPeopleInterface.shtml?act=getDimension&id=" + id;
		var datas = $.getMethod2(url);
		if (datas) {
			var obj = JSON.parse(datas);
			var family = obj.obj,
				day = new Date(),
				year = day.getFullYear();
			for (var i = 0; i < family.length; i++) {
				var birth = family[i].CARDID.substr(6, 4);
				family[i].age = year - birth;
				var cardId = family[i].CARDID;
				family[i].CARDID = cardId.replace(cardId.substr(4, 12), "***********");
			}
			obj.obj = family;
			var owner = obj.list[0], //隐藏账号关键字
				account = owner.ACCOUNT;
			owner.ACCOUNT = account.replace(account.substr(8, 10), "**********");
			obj.list[0] = owner;
			$("#oneTabDiv").setTemplateURL("./htmltemplate/oneTable.html").processTemplate(obj);
			//$("").setTemplateURL("./htmltemplate/oneTable_jtcy.html").processTemplate(jtcy);
			$("#hideSquare").hide(); //屏蔽所有空的项目
			setDiv('oneTabDiv');
		}

	}
	//设置弹出框拖动、放大缩小
	function setDiv(divId) {
		$("#xxdjb").css({
			"width": $(window).width(),
			"height": $(window).height()
		});
		var detailHight = $("#xxdjb").height() - 40;
		$("#tableDetail").css("height", detailHight);
		$("#" + divId).show();
		var initialWidth = 843;
		var initialHeight = 611;
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
