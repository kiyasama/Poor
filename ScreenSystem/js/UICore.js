$(function() {
	$
			.extend({
				serviceHttp : function() {
					//return "http://192.168.2.199:8080/";
					//return "http://61.160.70.170:9080/";
					//return "http://61.185.20.73:58888/";
					return "http://61.160.70.170:8893/";
					
					//return "http://localhost:8080/";
				},
				serviceHttpImg : function() {// 图片
					return "http://182.254.141.32/LP/";
				},
				serviceHttpUploadImg : function() {// 富文本中的图片
					return "http://192.168.1.203:8080/xtdj-web/filePath/infoPublishPath/";
				},
				setLocalStorage : function(name, value) {
					localStorage[name] = value;
				},
				getLocalStorage : function(name) {
					var tval = localStorage.getItem(name);
					if (tval == null)
						tval = "";
					return tval;
				},
				getMethod : function(url) {
					var url = $.serviceHttp() + url + "&_d=" + new Date();
					var par_data = "";
					$.ajax({
						type : "get",
						cache : false,
						async : false,
						url : encodeURI(url),
						error : function() {
							  //alert("查询出错");
						},
						success : function(data) {
							if (data.errorcode == "-99") {
							} else {
								par_data = data;
							}
						}
					});
					return par_data;
				},
				getAsyncMethod : function(url, callback, errorback) {// 异步
					var url = $.serviceHttp() + url + "&_d=" + new Date();
					$.ajax({
						type : "get",
						cache : false,
						url : encodeURI(url),
						error : function() {
							  //alert("查询出错");
							if (errorback)
								errorback();
						},
						success : function(data) {
							if (callback)
								callback(data);
						},
						complete : function(data) {
							 
						}
					});
				},
				postMethod : function(url, postJson, callback, errorback) {// 异步
					var url = $.serviceHttp() + url + "&_d=" + new Date();
					$.ajax({
						type : "post",
						cache : false,
						url : encodeURI(url),
						data : postJson,
						error : function() {
							if (errorback)
								errorback();
						},
						success : function(data) {
							if (callback)
								callback(data);
						},
						complete : function(data) {
							if ($(".loading").length != 0) {
								$(".loading").hide();
							}
						}
					});
				},
				postSyncMethod : function(url, postJson) { // 同步
					var url = $.serviceHttp() + url + "&_d=" + new Date();
					var par_data = "";
					$.ajax({
						type : "post",
						cache : false,
						async : false,
						url : encodeURI(url),
						data : postJson,
						error : function() {
							//alert("查询出错");
						},
						success : function(data) {
							par_data = data;
						}
					});
					return par_data;
				},
				getQueryString : function getQueryString(name) {
					var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
					var r = window.location.search.substr(1).match(reg);
					if (r != null)
						return decodeURI(r[2]);
					return null;
				}
			});
	String.prototype.replaceAll = function(s1, s2) {
		return this.replace(new RegExp(s1, "gm"), s2);
	};

});
