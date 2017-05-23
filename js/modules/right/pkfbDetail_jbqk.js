//贫困户详细信息-基本情况
define(function(require, exports, module) {
	exports.init = function(id) {
		var url = "poorPeople/poorPeopleInterface.shtml?act=getPeopleInfo&id=" + id;
		var data = $.getMethod2(url);
		var obj;
		if (data != "") {
			data = JSON.parse(data);
			if (data.success) {
				obj = data.obj;
				var IDENTIFYSTANDARD = obj.IDENTIFYSTANDARD,
					POORPROPERTY = obj.POORPROPERTY,
					POVERTYREASON = obj.POVERTYREASON,
					povertyFamily = obj.povertyFamily,
					ADDRESS = obj.ADDRESS,
					NAME = obj.NAME,
					TEL = obj.TEL,
					BANK = obj.BANK,
					ACCOUNT = obj.ACCOUNT;
					/*replaceStr = ACCOUNT.substring(4, ACCOUNT.length - 4).replace(/./g, "*");//截取卡号加密*/
				obj.BUILDINGTIME = obj.BUILDINGTIME.substring(0, 10);
				/*obj.ACCOUNT = ACCOUNT.substring(0, 4) + replaceStr + ACCOUNT.substring(ACCOUNT.length - 4);*/
				for (var i = 0; i < povertyFamily.length; i++) {
					var CARDID = povertyFamily[i].CARDID;
					var replaceStr1 = CARDID.substring(4, CARDID.length - 4).replace(/./g, "*");
					povertyFamily[i].CARDID = CARDID.substring(0, 4) + replaceStr1 + CARDID.substring(CARDID.length - 4);
				}
				obj.povertyFamily = povertyFamily;
				switch (IDENTIFYSTANDARD) {
					case '0':
						IDENTIFYSTANDARD = "国家标准";
						break;
					case '1':
						IDENTIFYSTANDARD = "省定标准";
						break;
					case '2':
						IDENTIFYSTANDARD = "市定标准";
						break;
					default:
						IDENTIFYSTANDARD = "";
						break;
				}
				obj.IDENTIFYSTANDARD = IDENTIFYSTANDARD;

				switch (POORPROPERTY) {
					case '0':
						POORPROPERTY = "一般贫困户";
						break;
					case '1':
						POORPROPERTY = "低保户";
						break;
					case '2':
						POORPROPERTY = "五保户";
						break;
					case '3':
						POORPROPERTY = "低保贫困户";
						break;
					case '4':
						POORPROPERTY = "一般农户";
						break;
					default:
						POORPROPERTY = "";
						break;
				}
				obj.POORPROPERTY = POORPROPERTY;

				var ISLIFEPOWER;
				switch (obj.ISLIFEPOWER) {
					case "01":
						ISLIFEPOWER = "是";
						break;
					default:
						ISLIFEPOWER = "否";
						break;
				}
				obj.ISLIFEPOWER = ISLIFEPOWER;

				var FUELTYPE;
				switch (obj.FUELTYPE) {
					case "01":
						FUELTYPE = "柴草（农作物秸秆,干畜类）";
						break;
					case "02":
						FUELTYPE = "煤炭";
						break;
					case "03":
						FUELTYPE = "清洁能源";
						break;
					case "04":
						FUELTYPE = "无饮用行为";
						break;
					default:
						FUELTYPE = "其他";
						break;
				}
				obj.FUELTYPE = FUELTYPE;

				var BUILDSTRUCTURE = obj.BUILDSTRUCTURE;
				switch (BUILDSTRUCTURE) {
					case "01":
						BUILDSTRUCTURE = "钢筋混凝土";
						break;
					case "02":
						BUILDSTRUCTURE = "砖混材料";
						break;
					case "03":
						BUILDSTRUCTURE = "砖瓦砖木、砖、石窑洞";
						break;
					case "04":
						BUILDSTRUCTURE = "竹草土坯、土窑洞";
						break;
					default:
						BUILDSTRUCTURE = "其他";
						break;
				}
				obj.BUILDSTRUCTURE = BUILDSTRUCTURE;

				var RELOCATIONS;
				switch (obj.RELOCATIONS) {
					case "01":
						RELOCATIONS = "已搬迁";
						break;
					case "02":
						RELOCATIONS = "需搬迁";
						break;
					default:
						RELOCATIONS = "其他";
						break;
				}
				obj.RELOCATIONS = RELOCATIONS;

				var ISDRINKING;
				switch (obj.ISDRINKING) {
					case "01":
						ISDRINKING = "是";
						break;
					default:
						ISDRINKING = "否";
						break;
				}
				obj.ISDRINKING = ISDRINKING;

				var POVERTYREASON = getZpyy(POVERTYREASON);
				obj.POVERTYREASON = POVERTYREASON;

				var pinYin = require("../../core/getNamePinYin.js");
				var namePY = pinYin.codefans();
				var preHeadImg = "";
				var sufHeadImg = "";
				if (obj.NAME == "王喜存" || obj.NAME == "王全福" || obj.NAME == "王文栓" || obj.NAME == "张玉海" || obj.NAME == "王满年" || obj.NAME == "王相民" || obj.NAME == "张锁处" || obj.NAME == "陈小荣" || obj.NAME == "陆群" || obj.NAME == "马武" || obj.NAME == "岳四怪" || obj.NAME == "许荣倡" || obj.NAME == "杨相根" || obj.NAME == "肖孝锋" || obj.NAME == "陈醒民" || obj.NAME == "任金玉" || obj.NAME == "任金财" || obj.NAME == "王竹莲" || obj.NAME == "张志民" || obj.NAME == "杨金有") {
					preHeadImg = "images/pkhPic/" + namePY + ".jpg";
					sufHeadImg = "images/pkhPic/" + namePY + ".jpg";
				}
				obj.preHeadImg = preHeadImg;
				obj.sufHeadImg = sufHeadImg;

			}
		}
		return obj;
		//$("#pk1").setTemplateURL("./htmltemplate/pkfbDetail_jbqk.html").processTemplate(obj);
	};

	function getZpyy(POVERTYREASON) {
		var zhipinrenason = "";
		var renson = POVERTYREASON.split(",");
		for (var n = 0; n < renson.length; n++) {
			switch (renson[n]) {
				case '1':
					zhipinrenason = "因病";
					break;
				case '2':
					zhipinrenason = "因残";
					break;
				case '3':
					zhipinrenason = "因学";
					break;
				case '4':
					zhipinrenason = "因灾";
					break;
				case '5':
					zhipinrenason = "缺土地";
					break;
				case '6':
					zhipinrenason = "缺技术";
					break;
				case '7':
					zhipinrenason = "缺劳力";
					break;
				case '8':
					zhipinrenason = "缺资金";
					break;
				case '9':
					zhipinrenason = "交通条件落后";
					break;
				case '10':
					zhipinrenason = "自身发展动力不足";
					break;
				case '11':
					zhipinrenason = "其他";
					break;
				default:
					zhipinrenason = "";
					break;
			}
			if (n == renson.length - 1)
				zhipinrenason = zhipinrenason;
			else
				zhipinrenason += "，";
		}
		return zhipinrenason;
	}

});
