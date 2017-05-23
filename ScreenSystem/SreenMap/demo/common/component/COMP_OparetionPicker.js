/*
 * @author 宋伍星
 * @deprecated 操作项组件（新增、编辑、查看操作）
 */

function COMP_OparetionPicker(){
	formId=null;
	transferId = null;
	winObject = null;
	dialogOption = {};
}

COMP_OparetionPicker.setTransferId =function($transferId){
	transferId = $transferId;
};
COMP_OparetionPicker.getTransferId =function(){
	return transferId;
};

COMP_OparetionPicker.setWinObjec =function($winObject){
	winObject = $winObject;
};
COMP_OparetionPicker.getWinObjec =function(){
	return winObject;
};

COMP_OparetionPicker.setDialogOption =function($dialogOption){
	dialogOption = $.extend({
		title: '', // 标题
		href: '', // 链接
		datagridDivId: '', // 弹出框里放置列表的Div的ID
		clickId: '', // 触发对象的ID
		leave: 2, // 该弹出窗打开后属于第几层
		parent: null, // 父窗体
		selectCallBack: null, // 自定义回调方法的方法名
		isSingleSelect: true, // 是否单选
		filterCondition: [], // 列表数据过滤条件
		width: 800, // 弹窗宽度
		height: 400, // 弹窗高度
		top: '50%', // 
		left: '50%' // 
	}, $dialogOption || {});
	
	// 追加单多选条件
	dialogOption.href = COMP_OparetionPicker.beforeAddParam(dialogOption.href); // 追加条件前进行判断是否有"?"
	dialogOption.href = dialogOption.href + 'isSingleSelect=' + dialogOption.isSingleSelect;
	
	// 追加过滤条件
	if(dialogOption.filterCondition.length >0){
		var conditionStr = JSON.stringify(dialogOption.filterCondition);
		dialogOption.href = dialogOption.href + '&' + 'filterCondition=' + conditionStr; // 如果有条件，就传到后台进行转换
	}
	
	// 配置窗体参数
	if(dialogOption.leave == 2){
		dialogOption.parent = frameElement.api; 
		COMP_OparetionPicker.setWinObjec(dialogOption.parent.content);
	}
	
	// 动态变更回调方法
	if(dialogOption.selectCallBack != null){
		COMP_OparetionPicker.selectCallBack = dialogOption.selectCallBack; 
	}
};
COMP_OparetionPicker.getDialogOption =function(){
	return dialogOption;
};

// 追加条件前进行判断是否有"?"
COMP_OparetionPicker.beforeAddParam = function(str){
	if(str.indexOf("?") >0){  // 如果字符串里面已经有问号
		str = str + '&';
	} else{
		str = str + '?';
	}
	return str;
};

/**
 * @author songwuxing
 * @deprecated 通用列表选择弹出框
 */
COMP_OparetionPicker.dataGridSelector = function($dialogOption){
	COMP_OparetionPicker.setDialogOption($dialogOption);
	var dialogOption = COMP_OparetionPicker.getDialogOption();
	
	var win = window; 
	if(dialogOption.leave == 2){
		win = dialogOption.parent.opener;	
	}
	
	var dow = win.$.dialog({
		title: dialogOption.title,
		content: 'url:' + dialogOption.href,
		width: dialogOption.width, 
		height: dialogOption.height,
		parent: dialogOption.parent,
		lock: true,
		cache: false,
		button: [{
			name: '确认', 
			callback: function () {
				var rows = dow.content.$("#" + dialogOption.datagridDivId).datagrid('getChecked'); // 取得弹出框中列表的选中行
				COMP_OparetionPicker.selectCallBack(rows, dialogOption.clickId);  // 执行自定义回调方法
			}, 
			focus: true                
		}],
		cancelVal: '关闭',
		cancel: true 
	});  		
};

/**
 * @author songwuxing
 * @deprecated 通用列表选择弹窗框的默认回调方法
 */
COMP_OparetionPicker.selectCallBack = function(rows, clickId){
	if(typeof selectCallBack != 'undefined' && selectCallBack instanceof Function) {        
		selectCallBack(rows, clickId);
	} 
};

/**
 * @author songwuxing
 * @deprecated 选择组件用弹出框
 */
COMP_OparetionPicker.dialog = function(dialogOption,w){
	dialogOption = $.extend({
			title :null,
			href:null,
			parent:null,
			width:400,
			height: 400,
			transferId:null,
			isCallback:false,
			leave:2,
			top:'50%',
			left:'50%'
		}, dialogOption || {});
	
	if(dialogOption.leave==2){
		
		var win =dialogOption.parent.content;
		COMP_OparetionPicker.setWinObjec(win);
		COMP_OparetionPicker.setTransferId(dialogOption.transferId);
		var dow = w.$.dialog({
			title:dialogOption.title,
		    content: 'url:'+dialogOption.href,
		    width: dialogOption.width, 
		    height: dialogOption.height,
		    lock: true,
		    parent:dialogOption.parent,
		    top:dialogOption.top,
			left:dialogOption.left,
		    button: [ 
			    	    { 
			    	        name: '确定', 
			    	        callback: function () { 
			    	    	if(dialogOption.transferId!=null){
				    	    	var options = dow.content.$("#rangeSelect>option");
								
								var names = "";
								var ids = "";
									if(options.length>0)
										{
										for(var i=0; i<options.length; i++)
										{
											names+=$(options[i]).text()+",";
											ids+=$(options[i]).val()+",";
										}
										
										names = names.substring(0, names.length-1);
										ids = ids.substring(0, ids.length-1);
										}
									win.$("#"+dialogOption.transferId+"Names").val(names).blur();
									win.$("#"+dialogOption.transferId).val(ids);
									if(dialogOption.isCallback){
										if(dow.content.$("#typePick").val() =='city'){	
											COMP_OparetionPicker.callback3($("#"+dialogOption.transferId).val(),$("#"+dialogOption.transferId+"Names").val(),dow.content.$("#address").val(),dow.content.$("#code").val());
										}else if(dow.content.$("#typePick").val() =='sjzd'){
											COMP_OparetionPicker.callback2(ids,dialogOption.transferId,names);
										}else if(dow.content.$("#typePick").val() =='usercityorg2'){
											var codes = "";
											for(var i=0; i<options.length; i++)
											{
												codes +=$(options[i]).attr("code")+",";
											}
											codes = codes.substring(0, codes.length-1);
											COMP_OparetionPicker.callback1(ids,dialogOption.transferId,names,codes);
										}else{
											//返回选中的Entity英文名和中文名称，通过父容器回调函数callbackEntity进行返回，回调函数名称已固定
											COMP_OparetionPicker.callback(win,this.content.entityId,this.content.entityName);
										}
									}
			    	    	}
			    	    	close(); 
			    	    	
			    	        }, 
			    	        focus: true 
	
			    	    } ] ,
			    cancelVal: '关闭',
			    cancel: true ,
			    init:function(){ 
					COMP_OparetionPicker.loadRange(COMP_OparetionPicker.getTransferId(),COMP_OparetionPicker.getWinObjec(),dow);
	    		}
	
		});
	}else{
		COMP_OparetionPicker.setTransferId(dialogOption.transferId);
		var dow = $.dialog({
			title:dialogOption.title,
		    content: 'url:'+dialogOption.href,
		    width: dialogOption.width, 
		    height: dialogOption.height,
		    lock: true,
		    parent:dialogOption.parent,
		    top:dialogOption.top,
			left:dialogOption.left,
		    button: [ 
			    	    { 
			    	        name: '确定', 
			    	        callback: function () { 
			    	    	if(dialogOption.transferId!=null){
				    	    	var options = dow.content.$("#rangeSelect>option");
								var names = "";
								var ids = "";
									if(options.length>0)
									{
										for(var i=0; i<options.length; i++)
										{
											names+=$(options[i]).text()+",";
											ids+=$(options[i]).val()+",";
										}
										
										names = names.substring(0, names.length-1);
										ids = ids.substring(0, ids.length-1);
										}
									var name =$("#"+dialogOption.transferId+"Names").val(names).blur();
									var id = $("#"+dialogOption.transferId).val(ids);
									if(dialogOption.isCallback){
										if(dow.content.$("#typePick").val() =='city'){	
											
											COMP_OparetionPicker.callback3($("#"+dialogOption.transferId).val(),$("#"+dialogOption.transferId+"Names").val(),dow.content.$("#address").val(),dow.content.$("#code").val());
										}else{
											COMP_OparetionPicker.callback2($("#"+dialogOption.transferId).val(),$("#"+dialogOption.transferId+"Names").val());
											
										}
									}
			    	    	}
			    	    	close(); 
			    	    	
			    	        }, 
			    	        focus: true 
	
			    	    } ] ,
			    cancelVal: '关闭',
			    cancel: true ,
			    init:function(){ 
					COMP_OparetionPicker.loadRange2(COMP_OparetionPicker.getTransferId(),dow);
	    		}
	
		});
	}
	
};

/**
 * @deprecated clickId:点击元素的id; isSingleSelect;true单选 false多选 默认单选 ；returnnames 返回人口名字
 */
COMP_OparetionPicker.populationSelect=function(clickId,isSingleSelect,filterCondition){
	var api = frameElement.api, W = api.opener;	
	var dod =W.$.dialog({
		title:'人口选择窗口控件',
	    content: 'url:population_populationSelectWindow.html?isSingleSelect='+isSingleSelect+'&filterCondition='+filterCondition,
	    width: 730, 
	    height: 380,
	    lock: true,
	    cache:false,
	    button:[{
	            name: '确认', 
    	        callback: function () {
    	        	var rows =dod.content.$("#populationList").datagrid('getChecked');
    	        	var ids = '';
    	        	var returnnames = '';  	        		
    	        	for(var r in rows){
    	        		if(rows[r].id != null){
    	        			ids += rows[r].id + ',';
    	        			returnnames += rows[r].name + ',';
    	        		}
    	        	}
    	        	ids = ids.substr(0, ids.length-1);
    	        	returnnames = returnnames.substr(0, returnnames.length-1);    	        
	    	    	COMP_OparetionPicker.callback2(ids,clickId,returnnames);
    	        }, 
    	        focus: true                
				}],
	    cancelVal: '关闭',
	    cancel: true 
	});  	
};

/**
* 弹出框选择控件
*/
COMP_OparetionPicker.publicSelectControl = function($dialogOption){
	dialogOption = $.extend({
		title :'人口选择窗口控件',
		href:'population_populationSelectWindow.html',
		width:730,
		height: 380,
		isCallback:false,
		isHaveOpener: true,
		isSingleSelect: true,
		parent:null,
		filterCondition:null,
		transferId:null,
		top:'50%',
		left:'50%',
		needToReturnFieldNames:null,
		datagridId:'populationList'
	}, $dialogOption || {});
	if(dialogOption.isSingleSelect==false){
		if(dialogOption.href.split("?").length>1){
			dialogOption.href = dialogOption.href+'&isSingleSelect=false';
		}else{
			dialogOption.href = dialogOption.href+'?isSingleSelect=false';
		}
	}
	if(dialogOption.filterCondition){
		if(dialogOption.href.split("?").length>1){
			dialogOption.href = dialogOption.href+'&filterCondition='+dialogOption.filterCondition;
		}else{
			dialogOption.href = dialogOption.href+'?filterCondition='+dialogOption.filterCondition;
		}
	}
	if(dialogOption.isHaveOpener==true){
		var api = frameElement.api, W = api.opener;	
		var dod = W.$.dialog({
			title:dialogOption.title,
			content: 'url:'+dialogOption.href,
			width: dialogOption.width, 
			height: dialogOption.height,
			top:dialogOption.top,
			left:dialogOption.left,
			lock: true,
			cache:false,
			button:[{
					name: '确认', 
					callback: function () {
						COMP_OparetionPicker.publicSelectControlOnclickOk(dod.content,dialogOption.datagridId,dialogOption.needToReturnFieldNames,dialogOption.transferId,dialogOption.isCallback);
					}, 
					focus: true                
					}],
			cancelVal: '关闭',
			cancel: true 
		});
	}else{
		var dod =$.dialog({
			title:dialogOption.title,
			content: 'url:'+dialogOption.href,
			width: dialogOption.width, 
			height: dialogOption.height,
			top:dialogOption.top,
			left:dialogOption.left,
			lock: true,
			cache:false,
			button:[{
					name: '确认', 
					callback: function () {					
						COMP_OparetionPicker.publicSelectControlOnclickOk(dod.content,dialogOption.datagridId,dialogOption.needToReturnFieldNames,dialogOption.transferId,dialogOption.isCallback);
					}, 
					focus: true                
					}],
			cancelVal: '关闭',
			cancel: true 
		});
	}
};

COMP_OparetionPicker.publicSelectControlOnclickOk =function (winObj,datagridId,needToReturnFieldNames,transferId,isCallback){
	var rows = winObj.$("#" + datagridId).datagrid('getChecked');
	var ids = '';
	var returnnames = '';
	if(needToReturnFieldNames){
		for(var r in rows){
			if(rows[r].id != null){
				ids += rows[r].id + ',';
				returnnames += eval('rows[r][needToReturnFieldNames]') + ',';
			}    	        		
		}
	}else{
		for(var r in rows){
			if(rows[r].id != null){
				ids += rows[r].id + ',';
				returnnames += rows[r].name + ',';
			}    	        		
		}
	}
	ids = ids.substr(0, ids.length-1);
	returnnames = returnnames.substr(0, returnnames.length-1);
	if(isCallback==true){
		publicSelectControlCallBack(ids,transferId,returnnames);
	}else if(transferId != null){
		$('#'+transferId+'Names').val(returnnames);
		$('#'+transferId).val(ids);
	}
};

/**
 * 弹出框选择控件
 */
COMP_OparetionPicker.publicSelector = function(dialogOption,clickId){
	dialogOption = $.extend({
		title :'企业单位选择窗口控件',
		href:'enterprise_enterpriseSelectWindow.html',
		width:730,
		height: 380,
		transferId:'enterpriseList'
	}, dialogOption || {});
	var api = frameElement.api, W = api.opener;	
	var dod = W.$.dialog({
		title:dialogOption.title,
	    content: 'url:'+dialogOption.href,
	    width: dialogOption.width, 
	    height: dialogOption.height,
	    lock: true,
	    cache:false,
	    button:[{
	            name: '确认', 
    	        callback: function () {
    	        	var rows = dod.content.$("#" + dialogOption.transferId).datagrid('getChecked');
    	        	var ids = '';
    	        	var returnnames = '';
    	        	for(var r in rows){
    	        		if(rows[r].id != null){
    	        			ids += rows[r].id + ',';
    	        			returnnames += rows[r].unitName + ',';
    	        		}    	        		
    	        	}
    	        	ids = ids.substr(0, ids.length-1);
    	        	returnnames = returnnames.substr(0, returnnames.length-1);
	    	    	COMP_OparetionPicker.setSelectInfo(ids,clickId,returnnames);
    	        }, 
    	        focus: true                
				}],
	    cancelVal: '关闭',
	    cancel: true 
	});  	
};

/**
 * 安全生产企业弹出框选择控件
 */
COMP_OparetionPicker.ajEnterpriseSelector = function(dialogOption,clickId){
	dialogOption = $.extend({
		title :'安全生产企业单位选择窗口控件',
		href:'ajEnterprise_ajEnterpriseSelectWindow.html',
		width:730,
		height: 380,
		transferId:null
	}, dialogOption || {});
	var api = frameElement.api, W = api.opener;	
	var dod = W.$.dialog({
		title:dialogOption.title,
		content: 'url:' + dialogOption.href,
		width: dialogOption.width, 
		height: dialogOption.height,
		lock: true,
		cache:false,
		button:[{
			name: '确认', 
			callback: function () {
			var rows = dod.content.$("#" + dialogOption.transferId).datagrid('getChecked');
			var ids = '';
			for(var r in rows){
				if(rows[r].id != null){
					ids += rows[r].id + ',';
				}    	        		
			}
			ids = ids.substr(0, ids.length-1);
			COMP_OparetionPicker.setSelectInfo(ids,clickId);
		}, 
		focus: true                
		}],
		cancelVal: '关闭',
		cancel: true 
	});  	
};

/**
 * 城市部件弹出框选择控件
 */
COMP_OparetionPicker.cityComponentSelector = function(dialogOption,clickId){
	dialogOption = $.extend({
		title :'城市部件单位选择窗口控件',
		href:'cityComponent_cityComponentSelectWindow.html',
		width:730,
		height: 380,
		transferId:null
	}, dialogOption || {});
	var api = frameElement.api, W = api.opener;	
	var dod = W.$.dialog({
		title:dialogOption.title,
		content: 'url:' + dialogOption.href,
		width: dialogOption.width, 
		height: dialogOption.height,
		lock: true,
		cache:false,
		button:[{
			name: '确认', 
			callback: function () {
			var rows = dod.content.$("#" + dialogOption.transferId).datagrid('getChecked');
			var ids = '';
			for(var r in rows){
				if(rows[r].id != null){
					ids += rows[r].id + ',';
				}    	        		
			}
			ids = ids.substr(0, ids.length-1);
			COMP_OparetionPicker.setCityComponentInfo(ids,clickId);
		}, 
		focus: true                
		}],
		cancelVal: '关闭',
		cancel: true 
	});  	
};

/**
 * GPS设备信息弹出框选择控件
 */
COMP_OparetionPicker.gpsEquipmentSelector = function(dialogOption){
	dialogOption = $.extend({
		title :null,
		href:null,
		width:730,
		height: 380,
		transferId:null
	}, dialogOption || {});
	var api = frameElement.api, W = api.opener;	
	var dod = W.$.dialog({
		title:dialogOption.title,
		content: 'url:' + dialogOption.href,
		width: dialogOption.width, 
		height: dialogOption.height,
		lock: true,
		cache:false,
		button:[{
			name: '确认', 
			callback: function () {
			var rows = dod.content.$("#" + dialogOption.transferId).datagrid('getChecked');
			var ids = '', codes='';
			for(var r in rows){
				if(rows[r].id != null){
					ids += rows[r].id + ',';
				}
				if(rows[r].equipCode != null){
					codes += rows[r].equipCode + ',';
				}
			}
			ids = ids.substr(0, ids.length-1);
			codes = codes.substr(0, codes.length-1);
			COMP_OparetionPicker.setGpsEquipmentInfo(ids, codes);
		}, 
		focus: true                
		}],
		cancelVal: '关闭',
		cancel: true 
	});  	
};
/**
 * 地图标注弹出框选择控件
 */
 COMP_OparetionPicker.MapLayerLabelSelector = function(dialogOption){
	dialogOption = $.extend({
		title :null,
		href:null,
		width:730,
		height: 380,
		transferId:null
	}, dialogOption || {});
	var api = frameElement.api, W = api.opener;	
	var dod = W.$.dialog({
		title:dialogOption.title,
		content: 'url:' + dialogOption.href,
		width: dialogOption.width, 
		height: dialogOption.height,
		lock: true,
		cache:false,
		button:[{
			name: '确认', 
			callback: function () {
			var rows = dod.content.$("#" + dialogOption.transferId).datagrid('getChecked');
			var ids = '';
			var relationIds = '';
			var  xss= '',yss = '',mx = '',my = '';
			for(var r in rows){
				if(rows[r].id != null){
					ids += rows[r].id + ',';
				}
				if(rows[r].relationId != null){
					relationIds += rows[r].relationId + ',';
				}
				if(rows[r].xs != null){
					xss += rows[r].xs + ',';
					yss += rows[r].ys + ',';
					mx += rows[r].x + ',';
					my += rows[r].y + ',';
				}
				
			}
			ids = ids.substr(0, ids.length-1);
			xss = xss.substr(0, xss.length-1);
			yss = yss.substr(0, yss.length-1);
			mx = mx.substr(0, mx.length-1);
			my = my.substr(0, my.length-1);
			relationIds = relationIds.substr(0, relationIds.length-1);
			COMP_OparetionPicker.setMapLayerLabelInfo(ids,relationIds,xss,yss,mx,my);
		}, 
		focus: true                
		}],
		cancelVal: '关闭',
		cancel: true 
	});  	
};

/**
 * @author songtong
 * @deprecated 修改用户密码信息弹出框
 */
COMP_OparetionPicker.changePassword=function(passwordOptions){
	passwordOptions = $.extend({
		title :null,
		href:null,
		saveUrl:null,
		width:400,
		height: 300,
		reload:true
	}, passwordOptions || {});
	var dod = $.dialog({
		title:passwordOptions.title,
	    content: 'url:'+passwordOptions.href,
	    width: passwordOptions.width, 
	    height: passwordOptions.height,
	    lock: true,
	    cache:false,
	    button: [ 
	    	    { 
	    	    	name: '保存', 
	    	        callback: function () { 
		    	    	var frm  = dod.content.document.getElementById("form1");
			    	    	if(dod.content.onSubmit()){
			    	    		COMP_OparetionPicker.save(frm,passwordOptions.saveUrl);
			    	    		close(); 
			    	    	}
		    	    	//return dod.content.onSubmit();	
		    	        },
	    	        focus: true 
	    	    } ] ,

	    cancelVal: '关闭',
	    cancel: true 
	});  	
};

COMP_OparetionPicker.popMapDialog = function(dialogOption, w){
	dialogOption = $.extend({
			title :'三维地图弹窗',
			href:null,
			parent:null,
			width:600,
			height: 400,
			transferId:null,
			isCallback:false,
			optType:1, // 地图操作类型：0、选择实体；1、只获取位置坐标信息x和y值；2线 3多边形
			selectBuilding: 0, // 选房模式：0否；1加载Unit；2加载House；
			isShowMiniMap: false, // 鹰眼图的显示与隐藏：true-显示，false-隐藏
			isShowZoomBar: false, // 缩放工具栏的显示与隐藏：true-显示，false-隐藏
			leave:2,  // 弹出层级
			xCoor: null,  // HTML控件对象
			yCoor: null,  // HTML控件对象
			xsCoor: null,//Html控件对象
			ysCoor: null,//html控件对象
			mapType:1,//地图坐标类型   1 为OCN像素坐标  2为经纬度坐标
			entityId: null  // HTML控件对象
		}, dialogOption || {});
	if(dialogOption.leave == 2){
		var win = dialogOption.parent.content;
		COMP_OparetionPicker.setWinObjec(win);
		COMP_OparetionPicker.setTransferId(dialogOption.transferId);
		
		var xCoorVal ='', yCoorVal ='', entityIdVal ='';
		var xsCoorVal = '', ysCoorVal = '';
		if(dialogOption.xCoor) xCoorVal = dialogOption.xCoor.val();
		if(dialogOption.yCoor) yCoorVal = dialogOption.yCoor.val();
		if(dialogOption.xsCoor) xsCoorVal = dialogOption.xsCoor.val();
		if(dialogOption.ysCoor) ysCoorVal = dialogOption.ysCoor.val();
		if(dialogOption.entityId) entityIdVal = dialogOption.entityId.val();
		
		var dow = w.$.dialog({
			title:dialogOption.title,
		    content: 'url:front_popMap.html?type=' + dialogOption.optType
		    			+'&selectBuilding=' + dialogOption.selectBuilding
		    			+'&isShowMiniMap=' + dialogOption.isShowMiniMap
		    			+'&isShowZoomBar=' + dialogOption.isShowZoomBar
		    			+'&xCoor=' + xCoorVal
		    			+'&yCoor=' + yCoorVal
		    			+'&xsCoor=' + xsCoorVal
		    			+'&ysCoor=' + ysCoorVal
		    			+'&entity_id=' + entityIdVal
		    			+'&mapType=' + dialogOption.mapType
		    			,
		    width: dialogOption.width, 
		    height: dialogOption.height,
		    lock: true,
		    parent:dialogOption.parent,
		    button: [ 
			    	    { 
			    	        name: '确定', 
			    	        callback: function () {
				    	    	if(dialogOption.optType == 0){
				    	    		if(dialogOption.entityId) dialogOption.entityId.val(dow.content.entity_id);
				    	    	}else if(dialogOption.optType == 1 && typeof(dow.content.x) != "undefined" &&　typeof(dow.content.y) != "undefined"){
				    	    		if(dialogOption.xCoor)dialogOption.xCoor.val(dow.content.x);
				    	    		if(dialogOption.yCoor)dialogOption.yCoor.val(dow.content.y);
				    	    	}else if(dialogOption.optType == 2 || dialogOption.optType == 3){
				    	    		if(typeof(dow.content.x) != "undefined" &&　typeof(dow.content.y) != "undefined"){
				    	    			if(dialogOption.xCoor)dialogOption.xCoor.val(dow.content.x);
					    	    		if(dialogOption.yCoor)dialogOption.yCoor.val(dow.content.y);
				    	    		}
				    	    		if(typeof(dow.content.xs) != "undefined" &&　typeof(dow.content.ys) != "undefined"){
					    	    		if(dialogOption.xsCoor)dialogOption.xsCoor.val(dow.content.xs);
					    	    		if(dialogOption.ysCoor)dialogOption.ysCoor.val(dow.content.ys);
				    	    		}
				    	    	
				    	    	}
				    	    	if(dialogOption.isCallback){
									//回调函数
				    	    		if(dialogOption.optType == '1'){//取xy坐标
				    	    			COMP_OparetionPicker.setInfo(dow.content.x+","+dow.content.y);
				    	    		}else if(dialogOption.optType == 2 || dialogOption.optType == 3){
				    	    			COMP_OparetionPicker.setInfo(dow.content.x+","
				    	    					+dow.content.y+","
				    	    					+dow.content.xs+","
				    	    					+dow.content.ys);
					    	    	}else{//取实体
				    	    			COMP_OparetionPicker.setInfo(dow.content.object);
				    	    		}
									
								}
				    	    	close(); 
			    	        }, 
			    	        focus: true 
			    	    },{
			    	    	name: '清除',
			    	    	callback: function(){
			    	    		if(dialogOption.xCoor)dialogOption.xCoor.val('');
			    	    		if(dialogOption.yCoor)dialogOption.yCoor.val('');
			    	    		if(dialogOption.xCoor)dialogOption.xsCoor.val('');
			    	    		if(dialogOption.yCoor)dialogOption.ysCoor.val('');
			    	    		if(dialogOption.entityId)dialogOption.entityId.val('');
			    	    		dow.content.removePops();
			    	    	}
			    	    } 
			] ,
			cancelVal: '取消',
			cancel: true ,
			init:function(){
				COMP_OparetionPicker.loadRange(COMP_OparetionPicker.getTransferId(),COMP_OparetionPicker.getWinObjec(),dow);
	    	}
		});
	}
	else{
		COMP_OparetionPicker.setTransferId(dialogOption.transferId);
		var dow = $.dialog({
			title:dialogOption.title,
		    content: 'url:'+dialogOption.href,
		    width: dialogOption.width, 
		    height: dialogOption.height,
		    lock: true,
		    parent:dialogOption.parent,
		    button: [ 
			    	    { 
			    	        name: '确定', 
			    	        callback: function () { 
			    	    	if(dialogOption.transferId!=null){
				    	    	var options = dow.content.$("#rangeSelect>option");
								var names = "";
								var ids = "";
									if(options.length>0)
										{
										for(var i=0; i<options.length; i++)
										{
											names+=$(options[i]).text()+",";
											ids+=$(options[i]).val()+",";
										}
										
										names = names.substring(0, names.length-1);
										ids = ids.substring(0, ids.length-1);
										}
									var name =$("#"+dialogOption.transferId+"Names").val(names).blur();
									var id = $("#"+dialogOption.transferId).val(ids);
									if(dialogOption.isCallback){
										if(dow.content.$("#typePick").val() =='city'){	
											
											COMP_OparetionPicker.callback3($("#"+dialogOption.transferId).val(),$("#"+dialogOption.transferId+"Names").val(),dow.content.$("#address").val(),dow.content.$("#code").val());
										}else{
											COMP_OparetionPicker.callback2($("#"+dialogOption.transferId).val(),$("#"+dialogOption.transferId+"Names").val());
											
										}
									}
			    	    	}
			    	    	close(); 
			    	    	
			    	        }, 
			    	        focus: true 
	
			    	    } ] ,
			    cancelVal: '关闭',
			    cancel: true ,
			    init:function(){ 
					COMP_OparetionPicker.loadRange2(COMP_OparetionPicker.getTransferId(),dow);
	    		}
	
		});
	}
	
};

/**
 * 加入网格判断
 * */
var gridID='';
COMP_OparetionPicker.popMapDialogWithGrid = function(dialogOption, w){
	dialogOption = $.extend({
			title :'三维地图弹窗',
			href:null,
			parent:null,
			width:600,
			height: 400,
			transferId:null,
			isCallback:false,
			optType:1, // 地图操作类型：0、选择实体；1、只获取位置坐标信息x和y值；
			selectBuilding: 0, // 选房模式：0否；1加载Unit；2加载House；
			isShowMiniMap: false, // 鹰眼图的显示与隐藏：true-显示，false-隐藏
			isShowZoomBar: false, // 缩放工具栏的显示与隐藏：true-显示，false-隐藏
			leave:2,  // 弹出层级
			xCoor: null,  // HTML控件对象
			yCoor: null,  // HTML控件对象
			entityId: null  // HTML控件对象
		}, dialogOption || {});
	if(dialogOption.leave == 2){
		var win = dialogOption.parent.content;
		COMP_OparetionPicker.setWinObjec(win);
		COMP_OparetionPicker.setTransferId(dialogOption.transferId);
		
		var xCoorVal ='', yCoorVal ='', entityIdVal ='';
		if(dialogOption.xCoor) xCoorVal = dialogOption.xCoor.val();
		if(dialogOption.yCoor) yCoorVal = dialogOption.yCoor.val();
		if(dialogOption.entityId) entityIdVal = dialogOption.entityId.val();
		var gridId = "";
		var dow = w.$.dialog({
			title:dialogOption.title,
		    content: 'url:/gis/popMap.shtml?type=' + dialogOption.optType
		    			+'&selectBuilding=' + dialogOption.selectBuilding
		    			+'&isShowMiniMap=' + dialogOption.isShowMiniMap
		    			+'&isShowZoomBar=' + dialogOption.isShowZoomBar
		    			+'&xCoor=' + xCoorVal
		    			+'&yCoor=' + yCoorVal
		    			+'&entity_id=' + entityIdVal
		    			,
		    width: dialogOption.width, 
		    height: dialogOption.height,
		    lock: true,
		    parent:dialogOption.parent,
		    button: [ 
			    	    { 
			    	        name: '确定', 
			    	        callback: function () {
			    	    	//查询选择的实体是否存在网格，网格不为空则返回相关信息，网格为空则不关闭窗口并提示
			    	    	//var url="commonAjax_getMapGridCode.html?entityId="+dow.content.entity_id;
		    	    		//$.post(url,function(data){
		    	    			//gridID=$.parseJSON(data);
		    	    			//alert(gridID);
		    	    			//if(gridID.length>0 &&　gridID !=null && gridID!=''){
					    	    	if(dialogOption.optType == 0){
					    	    		if(dialogOption.entityId) dialogOption.entityId.val(dow.content.entity_id);
					    	    	}
				    	    		else if(dialogOption.optType == 1){
					    	    		if(dialogOption.xCoor)dialogOption.xCoor.val(dow.content.xs);
					    	    		if(dialogOption.yCoor)dialogOption.yCoor.val(dow.content.ys);
					    	    	}
					    	    	if(dialogOption.isCallback){
										//回调函数
					    	    		if(dialogOption.optType == '1'){//取xy坐标
					    	    			COMP_OparetionPicker.setInfo(dow.content.xs+","+dow.content.ys);
					    	    		}else{//取实体
					    	    			COMP_OparetionPicker.setInfo(dow.content.object);
					    	    		}	
									}
					    	    	dow.close();
			    	    			//}else{
			    	    				//COMP_OparetionPicker.autoMessage('该建筑不在网格内，请先为该建筑添加网格或选择其他建筑！');	
			    	    				//alert('该建筑不在网格内，请先为该建筑添加网格或选择其他建筑！');	
			    	    			//}
		    	    		
			    	    		//})
			    	    		//return false;
			    	        }, 
			    	        focus: true 
			    	    },{
			    	    	name: '清除',
			    	    	callback: function(){
			    	    		if(dialogOption.xCoor)dialogOption.xCoor.val('');
			    	    		if(dialogOption.yCoor)dialogOption.yCoor.val('');
			    	    		if(dialogOption.entityId)dialogOption.entityId.val('');
			    	    		dow.content.removePops();
			    	    	}
			    	    } 
			] ,
			cancelVal: '取消',
			cancel: true ,
			init:function(){
				COMP_OparetionPicker.loadRange(COMP_OparetionPicker.getTransferId(),COMP_OparetionPicker.getWinObjec(),dow);
	    	}
		});
	}
	else{
		COMP_OparetionPicker.setTransferId(dialogOption.transferId);
		var dow = $.dialog({
			title:dialogOption.title,
		    content: 'url:'+dialogOption.href,
		    width: dialogOption.width, 
		    height: dialogOption.height,
		    lock: true,
		    parent:dialogOption.parent,
		    button: [ 
			    	    { 
			    	        name: '确定', 
			    	        callback: function () { 
			    	    	if(dialogOption.transferId!=null){
				    	    	var options = dow.content.$("#rangeSelect>option");
								var names = "";
								var ids = "";
									if(options.length>0)
										{
										for(var i=0; i<options.length; i++)
										{
											names+=$(options[i]).text()+",";
											ids+=$(options[i]).val()+",";
										}
										
										names = names.substring(0, names.length-1);
										ids = ids.substring(0, ids.length-1);
										}
									var name =$("#"+dialogOption.transferId+"Names").val(names).blur();
									var id = $("#"+dialogOption.transferId).val(ids);
									if(dialogOption.isCallback){
										if(dow.content.$("#typePick").val() =='city'){	
											
											COMP_OparetionPicker.callback3($("#"+dialogOption.transferId).val(),$("#"+dialogOption.transferId+"Names").val(),dow.content.$("#address").val(),dow.content.$("#code").val());
										}else{
											COMP_OparetionPicker.callback2($("#"+dialogOption.transferId).val(),$("#"+dialogOption.transferId+"Names").val());
											
										}
									}
			    	    	}
			    	    	close(); 
			    	    	
			    	        }, 
			    	        focus: true 
	
			    	    } ] ,
			    cancelVal: '关闭',
			    cancel: true ,
			    init:function(){ 
					COMP_OparetionPicker.loadRange2(COMP_OparetionPicker.getTransferId(),dow);
	    		}
	
		});
	}
	
};

COMP_OparetionPicker.callback =function(win,id,name){
	win.callbackLevel(id,name);
};

COMP_OparetionPicker.callback1 =function(ids,clickId,returnnames,codes){
	callbackCityOrg(ids,clickId,returnnames,codes);
};

COMP_OparetionPicker.callback2 =function(ids,clickId,returnnames){
	callback(ids,clickId,returnnames);
};

COMP_OparetionPicker.callback3 =function(id,name,addres,code){
	callbackCity(id,name,addres,code);
};

COMP_OparetionPicker.setInfo =function(json){
	setInfo(json);
};

COMP_OparetionPicker.setSelectInfo =function(json,clickId,returnnames){
	setSelectInfo(json,clickId,returnnames);
};

COMP_OparetionPicker.setCityComponentInfo =function(json,clickId,returnnames){
	setCityComponentInfo(json,clickId,returnnames);
};

COMP_OparetionPicker.setGpsEquipmentInfo =function(ids, codes){
	setGpsEquipmentInfo(ids, codes);
};

COMP_OparetionPicker.setMapLayerLabelInfo =function(ids,relationIds,xss,yss,mx,my){
	setMapLayerLabelInfo(ids,relationIds,xss,yss,mx,my);
};

COMP_OparetionPicker.loadRange=function(transferId,win,dow){
	var idStr = win.$("#"+transferId).val();
	var nameStr = win.$("#"+transferId+"Names").val();
	if(idStr!=undefined && idStr!=''){
		var ids = idStr.split(",");
		var names = nameStr.split(",");
		for(var i=0; i<ids.length; i++)
		{
			dow.content.$("#rangeSelect").append("<option value='"+ids[i]+"'>"+names[i]+"</option>");
		}
	}
};

COMP_OparetionPicker.loadRange2=function(transferId,dow){
	var idStr = $("#"+transferId).val();
	var nameStr = $("#"+transferId+"Names").val();
	if(idStr!=undefined && idStr!=''){
		var ids = idStr.split(",");
		var names = nameStr.split(",");
		for(var i=0; i<ids.length; i++)
		{
			dow.content.$("#rangeSelect").append("<option value='"+ids[i]+"'>"+names[i]+"</option>");
		}
	}
};

/**
 * @author songwuxing
 * @deprecated 跳转添加页面
 */
COMP_OparetionPicker.add = function(addOptions){
	 addOptions = $.extend({
			title :null,
			href:null,
			saveUrl:null,
			width:400,
			height: 300,
			reload:true
		}, addOptions || {});
	var dod = $.dialog({
		title:addOptions.title,
	    content: 'url:'+addOptions.href,
	    width: addOptions.width, 
	    height: addOptions.height,
	    lock: true,
	    cache:false,
	    button: [ { 
	    	        name: '保存', 
	    	        callback: function () { 
	    	    	var frm  = dod.content.document.getElementById(COMP_OparetionPicker.formId);
	    	    	if(dod.content.onSubmit()){
	    	    		COMP_OparetionPicker.save(frm,addOptions.saveUrl);
	    	    		close(); 
		    	    	if(addOptions.reload){
		    	    		window.location.reload();
		    	    	}
	    	    	}
	    	    	return dod.content.onSubmit();	    	    	
	    	        }, 
	    	        focus: true 

	    	    } ] ,
	    cancelVal: '关闭',
	    cancel: true 
	});
};

/**
 * @author songwuxing
 * @deprecated 在弹出窗口跳转添加页面
 */
COMP_OparetionPicker.addParentW = function(addOptions,w){
	 addOptions = $.extend({
			title :null,
			href:null,
			saveUrl:null,
			parent:null,
			width:400,
			height: 300,
			reload:true
		}, addOptions || {});
	var dod=w.$.dialog({
		title:addOptions.title,
	    content: 'url:'+addOptions.href,
	    width: addOptions.width, 
	    height: addOptions.height,
	    parent:addOptions.parent,
	    lock: true,
	    cache:false,
	    button: [ { 
	    	        name: '保存', 
	    	        callback: function () { 
	    	    	var frm  = dod.content.document.getElementById(COMP_OparetionPicker.formId);
	    	    	COMP_OparetionPicker.save(frm,addOptions.saveUrl);
	    	    	close(); 
	    	    	if(addOptions.reload){
	    	    		window.location.reload();
	    	    	}
	    	        }, 
	    	        focus: true 

	    	    } ] ,
	    cancelVal: '关闭',
	    cancel: true 
	});
};

/**
 * @author songwuxing
 * @deprecated 跳转查看详情页面
 */
COMP_OparetionPicker.detail=function(detailOptions){
	detailOptions = $.extend({
		title :null,
		href:null,
		width:400,
		height: 300
	}, detailOptions || {});
	var dod = $.dialog({
		title:detailOptions.title,
	    content: 'url:'+detailOptions.href,
	    width: detailOptions.width, 
	    height: detailOptions.height,
	    lock: true,
	    cache:false,
	    button: [  { 
	    	        name: '编辑', 
	    	        callback: function () { 
	    	    	COMP_OparetionPicker.edit(detailId);
	    	    
	    	        }, 
	    	        disabled: false ,focus: true
	    	    } ] ,

	    cancelVal: '关闭',
	    cancel: true 
	});  	
};

/**
 * @author songwuxing
 * @deprecated 跳转编辑页面
 */
COMP_OparetionPicker.edit=function(editOptions){
	editOptions = $.extend({
		title :null,
		href:null,
		editUrl:null,
		width:400,
		height: 300,
		reload:true
	}, editOptions || {});
	
	var dod = $.dialog({
		title:editOptions.title,
	    content: 'url:'+editOptions.href,
	    width: editOptions.width, 
	    height: editOptions.height,
	    lock: true,
	    cache:false,
	    button: [ { 
	    	        name: '保存', 
	    	        callback: function () { 
	    	    	var frm  = dod.content.document.getElementById(COMP_OparetionPicker.formId);
	    	    	if(dod.content.onSubmit()){
	    	    		COMP_OparetionPicker.save(frm,editOptions.editUrl);
		    	    	close(); 
		    	    	if(editOptions.reload){
		    	    		window.location.reload();
		    	    	}
	    	    	}
	    	    	return dod.content.onSubmit();
	    	        }, 
	    	        disabled: false ,focus: true
	    	    } ] ,

	    cancelVal: '关闭',
	    cancel: true 
	});      	
};

/**
 * @author songwuxing
 * @param frm 要提交表单对象
 * @return 返回表单对象里面key/valeu格式数据
 * @deprecated 格式化表单需要提交数据
 */
COMP_OparetionPicker.getFormJson=function(frm) {
    var o = {};
    var a = $(frm).serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });

    return o;
};
/**
 * @author songwuxing
 * @deprecated ajax提交表单保存列表数据
 */

COMP_OparetionPicker.save=function(frm,url){	
	var data = COMP_OparetionPicker.getFormJson(frm);
	$.ajax({
		type : 'post',
		async:false,
		dataType : 'html',
		url: url,
		data:data,
		success : function(result){
			COMP_OparetionPicker.autoMessage('数据操作成功！');				
		},
		error : function(result){
			COMP_OparetionPicker.autoMessage('数据操作失败！');			
		}
	});
};


/**
 * @author songwuxing
 * @deprecated 异步保存列表数据
 */
COMP_OparetionPicker.ajaxSave=function(obj){		
	obj.content.$('#'+formId).submit(function() {
	    $(this).ajaxSubmit();  // 提交表单
	    return false;  // 为了防止普通浏览器进行表单提交和产生页面导航（防止页面刷新？）
	});	
};

/**
 * @author songwuxing
 * @deprecated 右下角弹出小窗口，并且自动关闭
 */
COMP_OparetionPicker.autoMessage=function(message){	 
	/* 调用示例 */ 
	$.dialog.notice({ 
	    title: '操作结果', 
	    width: 220,
	    height:50,
	    content: message, 
	    time: 3 
	});
};

/**
 * @author songwuxing
 * @deprecated 弹出框右下角滚动弹出
 */
$.dialog.notice = function( options ) 
{ 
    var opts = options || {}, 
        api, aConfig, hide, wrap, top, 
        duration = opts.duration || 800; 
         
    var config = { 
        id: 'Notice', 
        left: '100%', 
        top: '100%', 
        fixed: true, 
        drag: false, 
        resize: false, 
        init: function(here){ 
            api = this; 
            aConfig = api.config; 
            wrap = api.DOM.wrap; 
            top = parseInt(wrap[0].style.top); 
            hide = top + wrap[0].offsetHeight; 
                         
            wrap.css('top', hide + 'px') 
            .animate({top: top + 'px'}, duration, function(){ 
                opts.init && opts.init.call(api, here); 
            }); 
        }, 
        close: function(here){ 
            wrap.animate({top: hide + 'px'}, duration, function(){ 
                opts.close && opts.close.call(this, here); 
                aConfig.close = $.noop; 
                api.close(); 
            }); 
                         
            return false; 
        } 
    }; 
         
    for(var i in opts) { 
        if( config[i] === undefined ) config[i] = opts[i]; 
    } 
         
    return $.dialog( config ); 
}; 

/**
 * @author songwuxing
 * @deprecated checkbox获取选中值
 */
COMP_OparetionPicker.checked=function(checkboxName){
	var ids =null;
	 $("[name = "+checkboxName+"]:checkbox").each(function () {
         if ($(this).is(":checked")) {
        	 if(ids ==null){
        		 ids = $(this).attr("value");
        	 }else{
        		 ids +=","+$(this).attr("value");
        	 }
         }
     });
	return ids;
};

/**
 * @author tangxuefeng
 * @deprecated 获取选中的id,下拉框的值以及menuID
 */
COMP_OparetionPicker.checkedList=function(checkboxName,selectorId,fieldName){
	var obj ={};
	var tempIds=null,tempSelect=null,tempField=null,tempDom=null;
	 $("[name = "+checkboxName+"]:checkbox").each(function () {
		 tempDom = $(this).parent().parent().parent();
         if ($(this).is(":checked")) {
        	 if(tempIds ==null){
        		 tempIds = tempDom.find('.datagrid-cell').html();
        		 if(selectorId!=null){
        			 tempSelect = $("tr[datagrid-row-index="+tempDom.attr('datagrid-row-index')+"]").find('#'+selectorId).val();
        		 }
        		 if(fieldName!=null){
        			 tempField = $("tr[datagrid-row-index="+tempDom.attr('datagrid-row-index')+"]").find('.datagrid-cell-c1-'+fieldName).html();
        		 }
        	 }else{
        		 tempIds +=","+$(this).parent().parent().parent().find('.datagrid-cell').html();
        		 if(selectorId!=null){
        			 tempSelect += ","+$("tr[datagrid-row-index="+tempDom.attr('datagrid-row-index')+"]").find('#'+selectorId).val();
        		 }
        		 if(fieldName!=null){
        			 tempField += ","+$("tr[datagrid-row-index="+tempDom.attr('datagrid-row-index')+"]").find('.datagrid-cell-c1-'+fieldName).html();
        		 }
        	 }
         }
     });
	 obj.ids=tempIds;
	 obj.selects=tempSelect;
	 obj.fieldVal=tempField;
	 return obj;
};

/**
 * @author wuweiyong
 * 通过人口ID条件过滤人口
 * @deprecated clickId:点击元素的id; isSingleSelect;true单选 false多选 默认单选 ；filterCondition：条件名称,str:条件属性；
 * returnnames 返回人口名字
 */
COMP_OparetionPicker.populationSelectByCondiTion=function(clickId,isSingleSelect,filterCondition,str){
	var api = frameElement.api, W = api.opener;	
	//alert(str);
	var dod =W.$.dialog({
		title:'人口选择窗口控件',
		content: 'url:population_populationSelectWindow.html?isSingleSelect='+isSingleSelect+'&filterCondition='+filterCondition+'&pids='+str,
		width: 730, 
		height: 380,
		lock: true,
		cache:false,
		button:[{
			name: '确认', 
			callback: function () {
			var rows =dod.content.$("#populationList").datagrid('getChecked');
			var ids = '';
			var returnnames = '';  	        		
			for(var r in rows){
				if(rows[r].id != null){
					ids += rows[r].id + ',';
					returnnames += rows[r].name + ',';
				}
			}
			ids = ids.substr(0, ids.length-1);
			returnnames = returnnames.substr(0, returnnames.length-1);    	        
			COMP_OparetionPicker.callback2(ids,clickId,returnnames);
		}, 
		focus: true                
		}],
		cancelVal: '关闭',
		cancel: true 
	});  	
};