/*
 * @author 宋伍星
 * @deprecated 数据列表组件（新增、编辑、修改、删除等操作）
 */

function COMP_DataGridataPicker(){
	tableId= null;// 页面显示列表table id 
	formId = null;// 表单form id
	listOptions={}; //列表页面参数
	delOptions = {};//列表删除数据参数
	addOptions = {};//跳转新增页面参数
	editOptions= {};//跳转编辑页面参数
	detailOptions = {};//跳转查看详情参数	
	columnOptions={}; //列表显示值参数
	columnOption={}; //列表显示值参数	
	operating =[];
	options = {};
	winObject =null;
	api=null;
	type=null;
	optionButtonArray=[];
	optionAlinkArray=[];
	treeNodeOption={};
	conditionsDivId = null; // 放置查询区的div的ID
	conditionsFormId = null; // 查询区form的ID
	conditionsOptions = {}; // 所有查询区条件参数
	conditionsOption = {}; // 单条查询区条件参数
	advancedQueryOptions = {}; // 单条查询区条件参数
	handleFieldArr = []; // 指定MenuFunction的哪些字段需要转换为JS代码
	optionKeys = []; // 操作项key
	dictKeyAttributes = [] // 数据字典属性数组
}

COMP_DataGridataPicker.setTreeNodeOption=function($treeNodeOption){
	treeNodeOption = $.extend({
		rTree:false,
		treeNodeId:null
	}, $treeNodeOption || {});
};

COMP_DataGridataPicker.getTreeNodeOption=function(){
	return treeNodeOption;
};

COMP_DataGridataPicker.setFormId=function($formId){
	formId = $formId;
};

COMP_DataGridataPicker.getFormId=function(){
	return formId;
};

COMP_DataGridataPicker.setTableId=function($tableId){
	tableId = $tableId;
};

COMP_DataGridataPicker.getTableId=function(){
	return tableId;
};
COMP_DataGridataPicker.getConditionsOption=function(){
	return conditionsOption;
};
COMP_DataGridataPicker.setConditionsOption=function($conditionsOption){
	conditionsOption = $.extend({
		name : 'undefined',
		width : 150,
		style : 'width:150px;',
		elementClass : '',
		type : 'text',
		id : 'undefined',
		dictKey : '',
		keyType : '2',
		value : '',
		selectIndex : '0',
		disabled : false,
		readonly : false,
		nullable : true,
		wdateRule : 'skin:\"default\"',
		onchange : '',
		onclick : '',
		onselect : '',
		onblur : '',
		onfocus : '',
		options : {} // 下拉框选项
	}, $conditionsOption || {});
};
COMP_DataGridataPicker.getColumnOptions=function($columnOptions){
	columnOptions = $.extend({
		name: "",
		width: 120,
		sortable: true,
		dictKey : '',
		keyType : '2',
		formatter: null,
		isHidden:false,
		editor:null
	}, $columnOptions || {});
	if(columnOptions.formatter == null && columnOptions.dictKey != null && columnOptions.dictKey != '') {
		// 调用数据字典回填列表值方法
		columnOptions.formatter = COMP_DataGridataPicker.dictKeyFormatter;
	}
	return columnOptions;
};
COMP_DataGridataPicker.setColumnOption=function($columnOption){
	columnOption = $columnOption;
};

COMP_DataGridataPicker.getColumnOption=function(){
	return columnOption;
};
COMP_DataGridataPicker.getListOptions=function(){
	return listOptions;
};
COMP_DataGridataPicker.setListOptions=function($listOptions){
	listOptions = $.extend({
		iconCls: '',
		title :'',
		url:'',
		sortName:'id',
		sortOrder:'asc',
		isTree:false,
		width:0,
		height:0,
		isMax:false,
		data:{}
	}, $listOptions || {});
};
COMP_DataGridataPicker.setOperating=function($operating){
	operating = $operating;
};

COMP_DataGridataPicker.getOperating=function(){
	return operating;
};


COMP_DataGridataPicker.setOption=function(option){
	var op = [];
	var alik =[];
    var list = [];
    var tree = [];
	var opAlike = COMP_DataGridataPicker.getOperating();
	if(option != null && opAlike !=null && opAlike.length >0){
		for(var i=0;i<opAlike.length;i++){
			var key = opAlike[i].key;
			var name =  opAlike[i].name;
			if(option[key]!=null){
				var options = null;
				if(opAlike[i].type =="A"){
					options ={key:key,value:option[key][0],name:name};
					alik.push(options);
				}else if(opAlike[i].type =="B"){
					options ={key:key,value:option[key][0],name:name,icon:opAlike[i].icon};
					op.push(options);
				}else{
					if(opAlike[i].key=="list"){
						list.push(option[key][0]);
	
					}
					if(opAlike[i].key=="tree"){
						tree.push(option[key][0]);
					}
				}
			}
		}
	}
	COMP_DataGridataPicker.setOptionButtonArray(op);
	COMP_DataGridataPicker.setOptionAlinkArray(alik);
	if(list.length>0){
		COMP_DataGridataPicker.setListOptions(list[0]);
	}else{
		COMP_DataGridataPicker.setListOptions(null);
	}
	if(tree.length>0){
		COMP_DataGridataPicker.setTreeNodeOption(tree[0]);
	}else{
		COMP_DataGridataPicker.setTreeNodeOption(null);
	}
};

COMP_DataGridataPicker.setOptions=function($options){
	options = $options;
};

COMP_DataGridataPicker.getOptions=function(){
	return options;
};

COMP_DataGridataPicker.setOptionButtonArray=function(op){
	optionButtonArray = op;
};

COMP_DataGridataPicker.getOptionButtonArray=function(){
	return optionButtonArray;
};

COMP_DataGridataPicker.setOptionAlinkArray=function(op){
	optionAlinkArray = op;
};

COMP_DataGridataPicker.getOptionAlinkArray=function(){
	return optionAlinkArray;
};

COMP_DataGridataPicker.setHandleFieldArr=function(hf){
	if(hf != null && typeof(hf) != 'undefined' && hf.length >0) {
		handleFieldArr = hf;
	}
	else {
		handleFieldArr = [];
		var data = {
				'category.categoryCode': 'MenuFunction_HandleFieldArr'
		};
		$.ajax({
			type: 'post',
			async: false,
			dataType: 'json',
			url: 'commonAjax_getSystemCategoryAttr.html',
			data: data,
			success: function(result){
				for(var key in result){
					handleFieldArr.push(result[key]);
				}
			},
			error: function(result){
				
			}
		});
	}
};

COMP_DataGridataPicker.getHandleFieldArr=function(){
	return handleFieldArr;
};

COMP_DataGridataPicker.setOptionKeys=function(ok){
	if(ok != null && typeof(ok) != 'undefined' && ok.length >0) {
		optionKeys = ok;
	}
	else {
		var data = {};
		$.ajax({
			type: 'post',
			async: false,
			dataType: 'json',
			url: 'menu_loadFunctionKey.html',
			data: data,
			success: function(result){
				optionKeys = result;
			},
			error: function(result){
				
			}
		});
	}
};

COMP_DataGridataPicker.getOptionKeys=function(){
	return optionKeys;
};

COMP_DataGridataPicker.setDictKeyAttributes=function(da){
	dictKeyAttributes = da;
};

COMP_DataGridataPicker.getDictKeyAttributes=function(){
	return dictKeyAttributes;
};

/**
 * @author： songwuxing
 * @description： list列表控件
 * @param $formId ：表单form id
 * @param $divId 添加修改弹出层id
 * @param $columnOption：列表显示值参数数组
 * @param $operationButton：列表头部按钮操作项数组
 * @param $operationAlike：数据项操作A链接操作项
 * @param options：列表、新增、编辑、删除、查看等操作页面参数json格式字符串
 * @version V1.0
 */
var searchHigeth = 0;
var doWidth = 0;
COMP_DataGridataPicker.loadData= function($formId,$tableId,$columnOptions,$operating,$option){
	COMP_DataGridataPicker.setFormId($formId);
	COMP_DataGridataPicker.setTableId($tableId);
	COMP_DataGridataPicker.setColumnOption($columnOptions);
	COMP_DataGridataPicker.setOperating($operating);
	COMP_DataGridataPicker.setOptions($option);
	COMP_DataGridataPicker.setOption($option);
	var listOption = COMP_DataGridataPicker.getListOptions();
	COMP_DataGridataPicker.isMax = listOption.isMax;
	if(listOption.isTree == true){
		width = 210;
	}else{
		width = 18;
	}
	
	if(listOption.width ==0){
		doWidth = $(window).width()-width;
	}else{
		doWidth = listOption.width;	
	}
	
	if(listOption.height ==0){
		doHeight = $(window).height() - 95;
	}else{
		doHeight = listOption.height;
	}
	
	$('#'+COMP_DataGridataPicker.getTableId()).datagrid({
		title:listOption.title,
		iconCls:listOption.iconCls,
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		collapsible:true,
		width:doWidth,
		height:doHeight ,
		url:listOption.url,
		datatype : "json",
		mtype : 'POST',
		sortName: listOption.sortName,
		sortOrder: listOption.sortOrder,
		remoteSort: false,
		idField:'id',
		frozenColumns:[[
            {field:'ck',checkbox:true},
            {title:'id',field:'id',width:80,hidden: true}
		]],
		columns:[eval("(" + COMP_DataGridataPicker.columTable() + ")")],
        queryParams: listOption.data,
		pagination:true,
		rownumbers:true,//显示行号
		altRows:true,//隔行变色
		//selectOnCheck:false,
		altclass:'altclass',//隔行变色样式
		toolbar:eval("(" + COMP_DataGridataPicker.operationButton() + ")"),
		onCheckAll: COMP_DataGridataPicker.addcheckItem,
		onCheck: COMP_DataGridataPicker.addcheckItem,
		onUncheckAll: COMP_DataGridataPicker.removeAllItem,
		onUncheck: COMP_DataGridataPicker.removeSingleItem ,
		onLoadSuccess: COMP_DataGridataPicker.onLoadSuccess,//去掉点击行选中checkbox
		view: COMP_DataGridataPicker.fileview//初始化选中checkbox
	
	});

};

COMP_DataGridataPicker.onLoadSuccess=function(){
	  setTimeout(function(){
		  COMP_DataGridataPicker.bindRowsEvent();
      }, 10);
	
};

COMP_DataGridataPicker.bindRowsEvent=function(){
    var panel = $('#'+COMP_DataGridataPicker.getTableId()).datagrid('getPanel');
    var rows = panel.find('tr[datagrid-row-index]');
    rows.unbind('click').bind('click',function(e){
        return false;
    });
    rows.find('div.datagrid-cell-check input[type=checkbox]').unbind().bind('click', function(e){
        var index = $(this).parent().parent().parent().attr('datagrid-row-index');
        if ($(this).attr('checked')){
            $('#'+COMP_DataGridataPicker.getTableId()).datagrid('selectRow', index);
        } else {
            $('#'+COMP_DataGridataPicker.getTableId()).datagrid('unselectRow', index);
        }
        e.stopPropagation();
    });
};
COMP_DataGridataPicker.fileview = $.extend(
		{}, 
		$.fn.datagrid.defaults.view,{ 
			onAfterRender: function (target) {
			COMP_DataGridataPicker.ischeckItem(); 
			} 
		});
/**
 * @author songwuxing
 * @deprecated 全局选中值变量
 */
COMP_DataGridataPicker.checkedItems =[];
COMP_DataGridataPicker.checkedItemsJson={};
COMP_DataGridataPicker.fieldName =[];
COMP_DataGridataPicker.index =[];
/**
 * @author songwuxing
 * @deprecated扩展数组完成去重复
 * @return
 */
Array.prototype.deleteEle=function(){
    var arr=this,o={},newArr=[],i,n;
    for( i=0;i<arr.length;i++){
        n=arr[i]+typeof(arr[i]);//如果不需要类型判断，直接将后面的去掉即可
        if(typeof(o[n])==="undefined"){
            newArr[newArr.length]=arr[i];
            o[n]=1;//缓存
        }
    }
    return newArr;
};
/**
 * @author songwuxing
 * @deprecated 翻页回填选中值
 * @return
 */
COMP_DataGridataPicker.ischeckItem=function() {
	var fielNameKey = COMP_DataGridataPicker.fieldName;
	var fileNameValue = COMP_DataGridataPicker.checkedItemsJson;
	var tableId = COMP_DataGridataPicker.getTableId();
	if (fielNameKey != null && fielNameKey.length > 1) {
		 var row = $('#'+tableId).datagrid('getRows');
		   if(row != null && row.length>0){
					var key =fielNameKey[0];
					var values = fileNameValue[key];
					if(!(values == undefined) && values.length>0){
						 for (var i = 0; i < values.length; i++) {
								 for(var k =0;k<row.length;k++){
									if(values[i] ==row[k].id){
										$('#'+tableId).datagrid('selectRecord',values[i]); 
										var selectKey =fielNameKey[1];
										var selectValues = fileNameValue[selectKey];
										var idx = $('#'+tableId).datagrid('getRowIndex',row[k]);
										  $('#'+selectKey+idx).val(selectValues[i]);	
									}
								 }
						}
				}
		}
	}else{
	   for (var i = 0; i < COMP_DataGridataPicker.checkedItems.length; i++) {
	       $('#'+COMP_DataGridataPicker.getTableId()).datagrid('selectRecord', COMP_DataGridataPicker.checkedItems[i]); //根据id选中行 
	   }
	}
	
	
};
/**
 * @author songwuxing
 * @deprecated 根据ID查找否存在checkbox的值，存在则返回id值，不存在则返回-1
 * @return
 */
COMP_DataGridataPicker.findCheckedItem=function(valeu) {
	
   for (var i = 0; i < COMP_DataGridataPicker.checkedItems.length; i++) {
       if (COMP_DataGridataPicker.checkedItems[i] == valeu){
    	   return i;
       }
   }

   return -1;
};
/**
 * @author songwuxing
 * @deprecated 根据ID查找否存在checkbox的值，存在则返回id值，不存在则返回-1
 * @return
 */
COMP_DataGridataPicker.findCheckedItemJson=function(key,valeu) {
	var values = COMP_DataGridataPicker.checkedItemsJson[key];
	if(!(values == undefined)){
		 for (var i = 0; i < values.length; i++) {
			if (values[i] == valeu){
			   return valeu;
		    }
		 }
	}
  return -1;
};
/**
 * @author songwuxing
 * @deprecated 获取选中值存放全局变量
 * @return
 */
COMP_DataGridataPicker.addcheckItem=function() {
	var tableId = COMP_DataGridataPicker.getTableId();
   var row = $('#'+tableId).datagrid('getChecked');
   var fielName = COMP_DataGridataPicker.fieldName;
   for (var i = 0; i < row.length; i++) {
	   if(fielName !=null && fielName.length>1){
		   var fielValue = row[i][fielName[0]];
		   if (COMP_DataGridataPicker.findCheckedItemJson(fielName[0],fielValue) == -1) {
			   for(var j=0;j<fielName.length;j++){
				    fielValue = row[i][fielName[j]];
				    if("extendval"==fielName[j]){
				    	var index = $('#'+tableId).datagrid('getRowIndex',row[i]);//获取某行的行号
					    fielValue = $('#extendval'+index).val();
				    }
				   if(COMP_DataGridataPicker.checkedItemsJson[fielName[j]]== undefined){
						  COMP_DataGridataPicker.checkedItemsJson[fielName[j]]=[fielValue];
					}else{
						var values = COMP_DataGridataPicker.checkedItemsJson[fielName[j]];
						 values.push(fielValue);
						 COMP_DataGridataPicker.checkedItemsJson[fielName[j]]=values;
					}
			      }
			  }
		   
	   }else{
		   if (COMP_DataGridataPicker.findCheckedItem(row[i].id) == -1) {
	    	   COMP_DataGridataPicker.checkedItems.push(row[i].id);
	       }
	   }
   }
   //回调方法
   if(row.length>0 && typeof afterCheckItem != 'undefined' && afterCheckItem instanceof Function) {
	   afterCheckItem();
   }
};

/**
 * @author songwuxing
 * @deprecated 下框值改变的时候修改已经拼接好的字符
 * @param e
 * @param rowId
 * @return
 */
COMP_DataGridataPicker.onChangeSlectValue = function(e, rowId) {
	var tableId = COMP_DataGridataPicker.getTableId();
	var row = $('#' + tableId).datagrid('getRows');
	var fielName = COMP_DataGridataPicker.fieldName;
	if (fielName != null && fielName.length > 1) {
		var id = row[rowId][fielName[0]];
		var fielValue = e.value;
		if (!(COMP_DataGridataPicker.findCheckedItemJson(fielName[0], id) == -1)) {
			var values = COMP_DataGridataPicker.checkedItemsJson[fielName[1]];
			var valer = COMP_DataGridataPicker.checkedItemsJson[fielName[0]];
			for(var l=0;l<valer.length;l++){
				if(valer[l]==id){
					values[l]=fielValue;
				}
			}
			COMP_DataGridataPicker.checkedItemsJson[fielName[1]] = values;
			//回调方法
			   if(typeof afterCheckItem != 'undefined' && afterCheckItem instanceof Function) {
				   afterCheckItem();
			   }
		}
	}
};
/**
 * @author songwuxing
 * @deprecated 删除所有选中值并且移除全局变量值
 * @return
 */
COMP_DataGridataPicker.removeAllItem=function(rows) {
	var fielName = COMP_DataGridataPicker.fieldName;
	var index = 0;
	for (var i = 0; i < rows.length; i++) {
	   if(fielName !=null && fielName.length>1){
		   var k = COMP_DataGridataPicker.findCheckedItemJson(fielName[0],rows[i][fielName[0]]);
		   if (k != -1) {
			  
			   for(var j=0;j<fielName.length;j++){
				   if(COMP_DataGridataPicker.checkedItemsJson[fielName[j]]== undefined){

					}else{
						//COMP_DataGridataPicker.checkedItemsJson[fielName[j]].splice(k, 1);
						//勾选项所在位置
						if(fielName[j] == 'id'){
							index = COMP_DataGridataPicker.checkedItemsJson[fielName[j]].indexOf(rows[i][fielName[j]]);
						}
						//var index = COMP_DataGridataPicker.checkedItemsJson[fielName[j]].indexOf(rows[i][fielName[j]]);
						//从数组里删除勾选项
						COMP_DataGridataPicker.checkedItemsJson[fielName[j]].splice(index,1);
					}
			   }
			   
		}
	   }else{
	       var k = COMP_DataGridataPicker.findCheckedItem(rows[i].id);
	       if (k != -1) {
	    	   COMP_DataGridataPicker.checkedItems.splice(k, 1);
	       }
	   }
   }
	//回调方法
	   if(fielName.length > 0 && typeof afterCheckItem != 'undefined' && afterCheckItem instanceof Function) {
		   afterCheckItem();
	   	}
};
/**
 * @author songwuxing
 * @deprecated 删除单个选中值并且移除全局变量值
 * @return
 */
COMP_DataGridataPicker.removeSingleItem=function(rowIndex, rowData) {
   var fielName = COMP_DataGridataPicker.fieldName;
	   if(fielName !=null && fielName.length>1){
		   var k = COMP_DataGridataPicker.findCheckedItemJson(fielName[0],rowData.id);
		   if (k != -1) {
			   for(var j=0;j<fielName.length;j++){
				   if(COMP_DataGridataPicker.checkedItemsJson[fielName[j]]== undefined){

					}else{
						//勾选项所在位置
						var index = COMP_DataGridataPicker.checkedItemsJson[fielName[j]].indexOf(rowData[fielName[j]]);
						//从数组里删除勾选项
						COMP_DataGridataPicker.checkedItemsJson[fielName[j]].splice(index,1);
						//console.log(COMP_DataGridataPicker.checkedItemsJson);
					}
			      }
			   //回调方法
			   if(fielName.length > 0 && typeof afterCheckItem != 'undefined' && afterCheckItem instanceof Function) {
				   afterCheckItem();
			   	}
			 }
	   }else{
		   var k = COMP_DataGridataPicker.findCheckedItem(rowData.id);
		   if (k != -1) {
			   COMP_DataGridataPicker.checkedItems.splice(k, 1);
		   }
	   }
  
};




COMP_DataGridataPicker.isMax= false;



/**
 * @author songwuxing	
 * @deprecated 获取选中ID
 * @return
 */
COMP_DataGridataPicker.selectCheck=function(){
	var checkedItems = $('#'+COMP_DataGridataPicker.getTableId()).datagrid('getChecked');
	var names = [];
	$.each(checkedItems, function(index, item){
		
		names.push(item.id);
	});               
	return names.join(",");
	
};
/**
 * @author songwuxing
 * @deprecated 列表按钮操作处理
 */
COMP_DataGridataPicker.operationButton=function(){
	var button = null;
	var buttonArr = COMP_DataGridataPicker.getOptionButtonArray();
	if(buttonArr !=null && buttonArr.length>0){
		for(var i=0;i<buttonArr.length;i++){
			var optionAliks = encodeURI(JSON.stringify(buttonArr[i].value));
			if(button == null){
				button ="[{id:'btnadd',text:'"+buttonArr[i].name+"',iconCls:'"+buttonArr[i].icon+"',handler:function(){COMP_DataGridataPicker.optionAlik(null,\""+optionAliks+"\");}}";
				
			}else{
				button +=",{id:'btnadd',text:'"+buttonArr[i].name+"',iconCls:'"+buttonArr[i].icon+"',handler:function(){COMP_DataGridataPicker.optionAlik(null,\""+optionAliks+"\");}}";	
			}
		}
		if(COMP_DataGridataPicker.classFullNmae != null && COMP_DataGridataPicker.classFullNmae != '' && typeof(COMP_DataGridataPicker.classFullNmae) != "undefined" && button != null){
			button +=",{id:'btnadd',text:'导出',iconCls:'icon-add',handler:function(){COMP_DataGridataPicker.exportData();}}";
			button +=",{id:'btnadd',text:'导入',iconCls:'icon-remove',handler:function(){COMP_DataGridataPicker.importData();}}";
		}else if(COMP_DataGridataPicker.classFullNmae != null && COMP_DataGridataPicker.classFullNmae != '' && typeof(COMP_DataGridataPicker.classFullNmae) != "undefined"){
			button =",{id:'btnadd',text:'导出',iconCls:'icon-add',handler:function(){COMP_DataGridataPicker.exportData();}}";
			button +=",{id:'btnadd',text:'导入',iconCls:'icon-remove',handler:function(){COMP_DataGridataPicker.importData();}}";
		}

		button+="]";
	}
	return button;
};

/**
 * @author songwuxing
 * @deprecated 列表展示处理
 */
COMP_DataGridataPicker.columTable=function(){
	var columeFild = null;
	var cont = 0;
   var columnOption = COMP_DataGridataPicker.getColumnOption();
	if(columnOption !=null ){
		for(var key in columnOption){
			columnOptions =COMP_DataGridataPicker.getColumnOptions(columnOption[key][0]) ;
			var fieldKey = key;
			if(key.indexOf(".") > -1){ // 如果指定了模块名
				fieldKey = key.split('.')[1];
			}
	  	  if(key == 'opt'){
	  		columeFild+=",{field:'"+fieldKey+"',title:'"+columnOptions.name+"',width:"+columnOptions.width+",align:'center',formatter:COMP_DataGridataPicker.optn,sortable:"+columnOptions.sortable+",hidden:"+columnOptions.isHidden+",editor:"+columnOptions.editor+"}]";
	  		cont = 1;
	  	  } 
	  	  else{
			if(columeFild == null){
				if(columnOptions.formatter == null){
					columeFild ="[{field:'"+fieldKey+"',title:'"+columnOptions.name+"',sortable:"+columnOptions.sortable+",align:'center',width:"+columnOptions.width+",hidden:"+columnOptions.isHidden+",editor:"+columnOptions.editor+"}";
				} else{
					columeFild ="[{field:'"+fieldKey+"',title:'"+columnOptions.name+"',sortable:"+columnOptions.sortable+",formatter:"+columnOptions.formatter+",align:'center',width:"+columnOptions.width+",hidden:"+columnOptions.isHidden+",editor:"+columnOptions.editor+"}";
				}	
			} else{
				if(columnOptions.formatter == null){
					columeFild+=",{field:'"+fieldKey+"',title:'"+columnOptions.name+"',sortable:"+columnOptions.sortable+",align:'center',width:"+columnOptions.width+",hidden:"+columnOptions.isHidden+",editor:"+columnOptions.editor+"}";	
				} else{
					columeFild+=",{field:'"+fieldKey+"',title:'"+columnOptions.name+"',sortable:"+columnOptions.sortable+",formatter:"+columnOptions.formatter+",align:'center',width:"+columnOptions.width+",hidden:"+columnOptions.isHidden+",editor:"+columnOptions.editor+"}";	
				}
			}
	  	  }	
	    }
		if(cont<1){
			columeFild += "]";
		}
	}
	return columeFild;
};
/**
 * @author songwuxing
 * @deprecated 列表中A链接操作项处理
 */
COMP_DataGridataPicker.optn =function(value,rec){ 
	var optn = null;
	var operationAlike = COMP_DataGridataPicker.getOptionAlinkArray();
	if(operationAlike !=null && operationAlike.length>0){
		for(var i=0;i<operationAlike.length;i++){
			var optionAliks = JSON.stringify(operationAlike[i].value);
			var opa=JSON.parse(decodeURI(optionAliks));
			if(optn == null){
				if(rec.receiveStatus!='0' &&   opa.title=='编辑订单管理'){ //专门处理订单管理过滤掉编辑A标签定制
					
				}else{
			  		optn = "<a href='#' onclick=COMP_DataGridataPicker.optionAlik('" + rec.id+ "',\""+encodeURI(optionAliks)+"\") >"+operationAlike[i].name+"</a>";
				}
			}else{
				if(rec.receiveStatus!='0' &&   opa.title=='编辑订单管理'){

				}else{
					optn += "&nbsp;&nbsp;<a href='#' onclick=COMP_DataGridataPicker.optionAlik('" + rec.id+ "',\""+encodeURI(optionAliks)+"\") >"+operationAlike[i].name+"</a>";
				}
			}	
	    }
	}
  return optn;   
};
/**
 * @author songwuxing
 * @deprecated 重新加载数据列表
 */
COMP_DataGridataPicker.reload=function(){
	
	$('#'+COMP_DataGridataPicker.getTableId()).datagrid('reload');//重新加载列表
	$('#'+COMP_DataGridataPicker.getTableId()).datagrid('clearSelections');//删除缓存选中的项
	
};

/**
 * @author songwuxing
 * @deprecated 重新加载数据列表
 */
COMP_DataGridataPicker.reloadParam=function(gridataId,data){
	$('#'+COMP_DataGridataPicker.getTableId()).datagrid('reload',data);//重新加载列表
	$('#'+COMP_DataGridataPicker.getTableId()).datagrid('clearSelections');//删除缓存选中的项
	
};


/**
 * @author gongjingfeng
 * @param formId
 * @deprecated 带条件加载数据列表    
 */
COMP_DataGridataPicker.loadConditions=function($formId){
	var frm = document.getElementById($formId);
	var conditions = COMP_DataGridataPicker.getFormJson(frm);
	if(conditions != null){
		$('#'+COMP_DataGridataPicker.getTableId()).datagrid('load', conditions);//带条件查找
	}else{
		$('#'+COMP_DataGridataPicker.getTableId()).datagrid('load');//重新加载列表
	}
	$('#'+COMP_DataGridataPicker.getTableId()).datagrid('clearSelections');//删除缓存选中的项
};

COMP_DataGridataPicker.setWinObject=function(win){
	winObject = win;
};
COMP_DataGridataPicker.getWinObject=function(){
	return winObject ;
};

COMP_DataGridataPicker.setApi=function($api){
	api = $api;
};
COMP_DataGridataPicker.getApi=function(){
	return api ;
};
COMP_DataGridataPicker.setType=function($type){
	COMP_DataGridataPicker.type= $type;
};
COMP_DataGridataPicker.getType=function(){
	var types = null;
	if(COMP_DataGridataPicker.type !=null){
		types = COMP_DataGridataPicker.type;
	}
	return types ;
};


/**
 * @author songwuxing
 * @deprecated 共用跳转操作方法
 */

COMP_DataGridataPicker.optionAlik = function(id,$optionAliks){	 

	optionAliks = $.extend({
		title :'',
		jumpUrl:'',
		operationUrl:'',
		type:"1",
		width:400,
		height: 300
	}, JSON.parse(decodeURI($optionAliks)) || {});

		if((optionAliks.type =="0" || optionAliks.type =="19") && optionAliks.operationUrl !="" && optionAliks.operationUrl !=null){
			if(optionAliks.type =="0"){
				COMP_DataGridataPicker.remove(optionAliks.operationUrl);
			}else if(optionAliks.type =="19"){
				COMP_DataGridataPicker.recover(optionAliks.operationUrl);
			}
		}else{
			var editButton = null;
			if(optionAliks.type =="1"){
				editButton = [{ 
	          	    	        name: '保存', 
	          	    	        callback: function () { 
	          	    	    	var frm  = dod.content.document.getElementById(COMP_DataGridataPicker.getFormId());
	          	    	    	var falg = COMP_DataGridataPicker.submit(dod.content,frm,optionAliks.operationUrl);
	          	    	    	return falg;
	          	    	        }, 
	          	    	        disabled: false ,
	          	    	        focus: true
	          	    	    }];
				
			}else if(optionAliks.type =="2"){
				var operationAlike = COMP_DataGridataPicker.getOptionAlinkArray();
				var oper = null;
				for(var i=0;i<operationAlike.length;i++){
					if(operationAlike[i].name=="编辑"){
						oper = operationAlike[i].value;
						break;
					}
				}
				editButton=[{ 
				     name: '编辑', 
				     callback: function () { 
						var ops = encodeURI(JSON.stringify(oper));
				 		COMP_DataGridataPicker.optionAlik(id,ops);
				 	    
				     }, 
				     disabled: false ,focus: true
				 }];	
			}else if(optionAliks.type =="3"){
				editButton = [{ 
  	    	        name: '保存', 
  	    	        callback: function () { 
  	    	    	var frm  = dod.content.document.getElementById(COMP_DataGridataPicker.getFormId());
  	    	    	var rows =dod.content.$('#'+COMP_DataGridataPicker.getTableId()).datagrid('getChecked');
  	    	    	var ids = '';
  	    	    	for(var r in rows){
    	        		if(rows[r].id != null){
    	        			ids += rows[r].id + ',';
    	        		}
    	        	}
    	        	ids = ids.substr(0, ids.length-1);
  	    	    	var falg = COMP_DataGridataPicker.save(frm,optionAliks.operationUrl+'&ids='+ids);
  	    	    	return falg;
  	    	        }, 
  	    	        disabled: false ,
  	    	        focus: true
  	    	    }];
	
			}else{
				editButton=null;
			}
			var url =null;
			if(optionAliks.jumpUrl.split("?").length>1){
				if(id != null){
					url = 'url:'+optionAliks.jumpUrl+'&ids='+id;
				}else{
					url = 'url:'+optionAliks.jumpUrl;
				}
			}else{
				if(id != null){
					url = 'url:'+optionAliks.jumpUrl+'?ids='+id;
				}else{
					url = 'url:'+optionAliks.jumpUrl;
				}
			}

			if(COMP_DataGridataPicker.getType()=="1"){
				if(COMP_DataGridataPicker.isMax == true || COMP_DataGridataPicker.isMax == 'true'){
					var dod = COMP_DataGridataPicker.getWinObject().$.dialog({
						title:optionAliks.title,
					    content: url,
					    width: optionAliks.width, 
					    height: optionAliks.height,
					    lock: true,
					    cache:false,
					    parent:COMP_DataGridataPicker.getApi(),
					    button:editButton,
				
					    cancelVal: '关闭',
					    cancel: true
					}).max(); 
				}else{
					var dod = COMP_DataGridataPicker.getWinObject().$.dialog({
						title:optionAliks.title,
					    content: url,
					    width: optionAliks.width, 
					    height: optionAliks.height,
					    lock: true,
					    cache:false,
					    parent:COMP_DataGridataPicker.getApi(),
					    button:editButton,
				
					    cancelVal: '关闭',
					    cancel: true
					}); 
				}
			}else{
				if(optionAliks.type == 10){
					
					var doAlt = $.dialog.confirm('你确定要' + optionAliks.title + '选中数据吗？', function(){ 
							$.ajax({
								type : 'post',
								async:true,
								dataType : 'text',
								url: optionAliks.operationUrl,
								data:{ids:id},
								success : function(result){
										COMP_DataGridataPicker.autoMessage(result);	
										COMP_DataGridataPicker.reload();
								},
								error : function(result){
									COMP_DataGridataPicker.autoMessage(result);			
								}
							});
							
						}, function(){ 
						    
						});
				}else if(optionAliks.type == 11){//只提供打开关闭功能
						var dod = $.dialog({
							title:optionAliks.title,
						    content: url,
						    width: optionAliks.width, 
						    height: optionAliks.height,
						    lock: true,
						    cache:false,
						    cancelVal: '关闭',
						    cancel: true
						}); 
				}else if(optionAliks.type == 12){//不提供关闭功能
					$.ajax({
						type : 'post',
						async:false,
						dataType : 'json',
						url: '/businessStart_checkAdd.html?code='+code,
						success : function(result){
							if(result.result=='true'){
								var vod = $.dialog({
									title:optionAliks.title,
								    content: url,
								    width: optionAliks.width, 
								    height: optionAliks.height,
								    lock: true,
								    cache:false
								}); 
							}else{
								COMP_DataGridataPicker.autoMessage(result.msg);	
							}
						},
						error : function(result){
							COMP_DataGridataPicker.autoMessage('系统出错！');			
						}
					});
				}else if(optionAliks.type == 13){
					var remAlt = parent.$.messager.confirm('确认','你确定要删除吗？', function(r){ 
						if(r){
						$.ajax({
							type : 'post',
							async:false,
							dataType : 'text',
							url: optionAliks.jumpUrl,
							data:{ids:id},
							success : function(result){
									COMP_DataGridataPicker.autoMessage(result);	
									COMP_DataGridataPicker.reload();
							},
							error : function(result){
								COMP_DataGridataPicker.autoMessage(result);			
							}
						});
					}});
				}else if(optionAliks.type == 14){//转移
					var ids = COMP_DataGridataPicker.getChecked();
					if(ids==''||ids==null){
						$.dialog.alert('请选择需要转移的数据！',function(){})
					}else{
						var dow = $.dialog({
							title:optionAliks.title,
							content: "url:/common/wf/jsp/catalogTree.jsp",
							width: 210, 
							height: 430,
							lock: true,
							cache:false,
							cancelVal: '关闭',
							cancel: true,
							button: [{ 
							        	 name: '确定', 
							        	 callback: function () {
							        		var catalogId = dow.content.document.getElementById("catalogId").value;
							        		if(catalogId==''||catalogId==null){
							        			$.dialog.alert('请选择需要转移的目录分类！',function(){});
							        			return false;	
							        		}else{
							        			$.ajax({
													type : 'post',
													async:false,
													dataType : 'text',
													url: optionAliks.operationUrl+"?ids="+ids+"&catalogId="+catalogId,
													success : function(result){
															COMP_DataGridataPicker.autoMessage(result);	
															COMP_DataGridataPicker.reload();
													},
													error : function(result){
														COMP_DataGridataPicker.autoMessage('系统出错！');			
													}
												});
							        		}
							        	 }, 
							        	 focus: true 
							         }] 
						}); 
					}
				}else if(optionAliks.type == 16){//基础信息迁移
					var ids = COMP_DataGridataPicker.getChecked();
					if(ids==''||ids==null){
						$.dialog.alert('请选择需要转移的数据！',function(){})
					}else{
						var dow = $.dialog({
							title:optionAliks.title,
							content: 'url:tree_toDataAreaCodeTree.html?ids='+ids,
							width: optionAliks.width, 
							height: optionAliks.height,
							lock: true,
							cache:false,
							cancelVal: '关闭',
							cancel: true,
							button: [{ 
							        	 name: '确定', 
							        	 callback: function () {
							        		var data_Area_Code = dow.content.document.getElementById("data_Area_Code").value;
							        		if(data_Area_Code==''||data_Area_Code==null){
							        			$.dialog.alert('请选择需要转移的行政区划！',function(){});
							        			return false;	
							        		}else{
							        			$.ajax({
													type : 'post',
													async:false,
													dataType : 'text',
													url: optionAliks.operationUrl+"&ids="+ids+"&data_Area_Code="+data_Area_Code,
													success : function(result){
															COMP_DataGridataPicker.autoMessage(result);	
															COMP_DataGridataPicker.reload();
													},
													error : function(result){
														COMP_DataGridataPicker.autoMessage('系统出错！');			
													}
												});
							        		}
							        	 }, 
							        	 focus: true 
							         }] 
						}); 
					}
				}else if(optionAliks.type == 15){
					var dow = $.dialog({
						title:optionAliks.title,
						content: "url:/common/wf/jsp/copyFlow.jsp",
						width: 340, 
						height: 160,
						lock: true,
						cache:false,
						cancelVal: '关闭',
						cancel: true,
						button: [{ 
							 name: '确定', 
				        	 callback: function () {
				        		 var flowName = dow.content.document.getElementById("flowName").value;
				        		 var flowAliasName = dow.content.document.getElementById("flowAliasName").value;
				        		 var description = dow.content.document.getElementById("description").value;
				        		 if(flowName==""||flowName==null){
				        			 $.dialog.alert('请输入流程名称！',function(){})
				        		 }else{
				        			 $.ajax({
											type : 'post',
											async:false,
											dataType : 'text',
											url: optionAliks.operationUrl+"?id="+id+"&flowName="+flowName+"&flowAliasName="+flowAliasName+"&description="+description,
											success : function(result){
													COMP_DataGridataPicker.autoMessage(result);	
													COMP_DataGridataPicker.reload();
											},
											error : function(result){
												COMP_DataGridataPicker.autoMessage('系统出错！');			
											}
										});
				        		 }
				        	 },
				        	 focus: true 
				        }] 
					}); 
				}else if(optionAliks.type == 17){//组装的表单页面重新生成
					var ids = COMP_DataGridataPicker.getChecked();
					var remAlt = parent.$.messager.confirm('确认','你确定重新生成组装页面吗？', function(r){ 
						if(r){
						$.ajax({
							type : 'post',
							async:false,
							dataType : 'text',
							url: optionAliks.operationUrl,
							data:{ids:ids.toString()},
							success : function(result){
									COMP_DataGridataPicker.autoMessage(result);	
							},
							error : function(result){
								COMP_DataGridataPicker.autoMessage(result);			
							}
						});
						}});
				}else if(optionAliks.type == 18){//不提供关闭功能
						var vod = $.dialog({
							title:optionAliks.title,
						    content: url,
						    width: optionAliks.width, 
						    height: optionAliks.height,
						    lock: true,
						    cache:false
						}); 
				}else if(optionAliks.type == 20){//导出数据为excel
					var remAlt = parent.$.messager.confirm('确认','你确定导出数据为Excel吗？', function(r){ 
						if(r){
						/*$.ajax({
							type : 'post',
							async:false,
							dataType : 'text',
							url: optionAliks.operationUrl,
							success : function(result){
								COMP_DataGridataPicker.autoMessage("导出成功！");	
							},
							error : function(result){
								COMP_DataGridataPicker.autoMessage("导出失败！");			
							}
						});*/
							window.location.href = optionAliks.operationUrl;
						}});
				}else{
					if(COMP_DataGridataPicker.isMax == true || COMP_DataGridataPicker.isMax == 'true'){
						var dod = $.dialog({
							title:optionAliks.title,
						    content: url,
						    width: optionAliks.width, 
						    height: optionAliks.height,
						    lock: true,
						    cache:false,
						    button:editButton,
					
						    cancelVal: '关闭',
						    cancel: true
						}).max(); 	
					}else{
						var dod = $.dialog({
							title:optionAliks.title,
						    content: url,
						    width: optionAliks.width, 
						    height: optionAliks.height,
						    lock: true,
						    cache:false,
						    button:editButton,
					
						    cancelVal: '关闭',
						    cancel: true
						}); 	
					}
				}
			}
		}

};
/**
 * @deprecated 数据表格列显示隐藏
 * @param e 
 * @param field 表头
 * @return
 * @author songwuxing
 */
var createGridHeaderContextMenu = function(e, field) {  
    e.preventDefault();  
    var grid = $(this);/* grid本身 */  
    var headerContextMenu = this.headerContextMenu;/* grid上的列头菜单对象 */  
    if (!headerContextMenu) {  
        var tmenu = $('<div style="width:100px;"></div>').appendTo('body');  
        var fields = grid.datagrid('getColumnFields');  
        for ( var i = 0; i < fields.length; i++) {  
            var fildOption = grid.datagrid('getColumnOption', fields[i]);  
            if (!fildOption.hidden) {  
                $('<div iconCls="icon-ok" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);  
            } else {  
                $('<div iconCls="icon-empty" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);  
            }  
        }  
        headerContextMenu = this.headerContextMenu = tmenu.menu({  
            onClick : function(item) {  
                var field = $(item.target).attr('field');  
                if (item.iconCls == 'icon-ok') {  
                    grid.datagrid('hideColumn', field);  
                    $(this).menu('setIcon', {  
                        target : item.target,  
                        iconCls : 'icon-empty'  
                    });  
                } else {  
                    grid.datagrid('showColumn', field);  
                    $(this).menu('setIcon', {  
                        target : item.target,  
                        iconCls : 'icon-ok'  
                    });  
                }  
            }  
        });  
    }  
    headerContextMenu.menu('show', {  
        left : e.pageX,  
        top : e.pageY  
    });  
};  
$.fn.datagrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;  
$.fn.treegrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;

/**
 * @author songwuxing
 * @deprecated 删除列表数据
 */
COMP_DataGridataPicker.remove = function(url){
	ids = COMP_DataGridataPicker.getChecked();
	if(ids!=null && ids !=""){
		if(COMP_DataGridataPicker.getType()=="1"){
			
			var remAlt = parent.$.messager.confirm('确认','你确定要删除选中数据吗？', function(r){ 
				if(r){
				$.ajax({
					type : 'post',
					async:false,
					dataType : 'text',
					url: url,
					data:{ids:ids.toString()},
					success : function(result){
							COMP_DataGridataPicker.autoMessage(result);	
							COMP_DataGridataPicker.reload();
					},
					error : function(result){
						COMP_DataGridataPicker.autoMessage(result);			
					}
				});
				
			}});
		}else{
			var remAlt = top.$.messager.confirm('确认','你确定要删除选中数据吗？', function(r){
				if(r){
				$.ajax({
					type : 'post',
					async:false,
					dataType : 'text',
					url: url,
					data:{ids:ids.toString()},
					success : function(result){
							COMP_DataGridataPicker.autoMessage(result);	
							COMP_DataGridataPicker.reload();
					},
					error : function(result){
						COMP_DataGridataPicker.autoMessage(result);			
					}
				});
				
			}});
		}
	}else{
		COMP_DataGridataPicker.autoMessage('请选择要删除数据！');	
	}

};
/**
 * @author wuweiyong
 * @deprecated 还原列表数据
 */
COMP_DataGridataPicker.recover = function(url){
	ids = COMP_DataGridataPicker.getChecked();
	if(ids!=null && ids !=""){
		if(COMP_DataGridataPicker.getType()=="1"){
			
			var remAlt = parent.$.messager.confirm('确认','你确定要还原选中数据吗？', function(r){ 
				if(r){
					$.ajax({
						type : 'post',
						async:false,
						dataType : 'text',
						url: url,
						data:{ids:ids.toString()},
						success : function(result){
							COMP_DataGridataPicker.autoMessage(result);	
							COMP_DataGridataPicker.reload();
						},
						error : function(result){
							COMP_DataGridataPicker.autoMessage(result);			
						}
					});
					
				}});
		}else{
			var remAlt = top.$.messager.confirm('确认','你确定要还原选中数据吗？', function(r){
				if(r){
					$.ajax({
						type : 'post',
						async:false,
						dataType : 'text',
						url: url,
						data:{ids:ids.toString()},
						success : function(result){
							COMP_DataGridataPicker.autoMessage(result);	
							COMP_DataGridataPicker.reload();
						},
						error : function(result){
							COMP_DataGridataPicker.autoMessage(result);			
						}
					});
					
				}});
		}
	}else{
		COMP_DataGridataPicker.autoMessage('请选择要还原数据！');	
	}
	
};


/**
 * @author songwuxing
 * @param frm 要提交表单对象
 * @return 返回表单对象里面key/valeu格式数据
 * @deprecated 格式化表单需要提交数据
 */
COMP_DataGridataPicker.getFormJson=function(frm) {
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

COMP_DataGridataPicker.save=function(frm,url){	
	var data = COMP_DataGridataPicker.getFormJson(frm);
	$.ajax({
		type : 'post',
		async:true,
		dataType : 'text',
		url: url,
		data:data,
		success : function(result){
				COMP_DataGridataPicker.autoMessage(result);	
				COMP_DataGridataPicker.reload();
		},
		error : function(result){
			COMP_DataGridataPicker.autoMessage(result);	

		}
	});
};
/**
 * @deprecated 表单校验提交
 * @param $falg 返回true 表单可以提交，。返回false表单不可以提交
 * @author songwuxing
 */
COMP_DataGridataPicker.submit=function(obj,frm,url){
	var falg = obj.onSubmit();
	if(falg){
		COMP_DataGridataPicker.save(frm,url);
	}
	return falg;
};

/**
 * @author songwuxing
 * @deprecated 异步保存列表数据
 */
COMP_DataGridataPicker.ajaxSave=function(obj){		
	obj.content.$('#'+formId).submit(function() {
	    $(this).ajaxSubmit();  // 提交表单
	    return false;  // 为了防止普通浏览器进行表单提交和产生页面导航（防止页面刷新？）
	});	
};
/**
 * @author songwuxing
 * @deprecated 右下角弹出小窗口，并且自动关闭
 */
COMP_DataGridataPicker.autoMessage=function(message){	
	if(COMP_DataGridataPicker.getType() !=null && COMP_DataGridataPicker.getType() !=""){
		/* 调用示例 */ 
		COMP_DataGridataPicker.getWinObject().$.dialog.notice({ 
		    title: '操作结果', 
		    width: 220,
		    height:50,
		    content: message, 
		    time: 5 
		});
		
	}else{
	
		$.dialog.notice({ 
		    title: '操作结果', 
		    width: 220,
		    height:50,
		    content: message, 
		    time: 5 
		});
	}
		
	
	var  treeNode = COMP_DataGridataPicker.getTreeNodeOption();
	if(treeNode.rTree == true){
		 var id = $('#'+treeNode.treeNodeId).val();
		 setTimeout( function(){COMP_TreeUtilsPicker.refreshTreeNodeById(id);} ,200);
	
	}			
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
        id: 'notice', 
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
         
    for(var i in opts) 
    { 
        if( config[i] === undefined ) config[i] = opts[i]; 
    } 
         
    return $.dialog( config ); 
}; 
/**
 * @author songwuxing
 * @deprecated 获取多选框选中ID
 */
COMP_DataGridataPicker.getChecked=function(){
	var ids = Array();
	var rows = $('#'+tableId).datagrid('getChecked');

	for(var i=0;i<rows.length;i++){
		ids.push(rows[i].id);
	}
	return ids;
};

COMP_DataGridataPicker.queryConditions=function($conditionsFormId, $conditionsDivId, $conditionsOptions, $advancedQueryOptions){
	if(typeof($conditionsDivId) == 'undefined' || $conditionsDivId == null || $conditionsDivId == '') return; // 没有查询区容器ID就不往下执行
	if(typeof($("#" + $conditionsDivId)) == 'undefined' || $("#" + $conditionsDivId) == null) return; // 找不到查询区容器就不往下执行
	if(typeof($conditionsOptions) == 'undefined' || $conditionsOptions == null) return; // 没有配置就不往下执行
	//高级查询条件
	if(typeof($advancedQueryOptions) != 'undefined' && $advancedQueryOptions != null){
		advancedQueryOptions = $advancedQueryOptions;
	}
	COMP_DataGridataPicker.beforeFormLoad(); // 查询区加载前的处理
	
	conditionsFormId = $conditionsFormId;
	conditionsDivId = $conditionsDivId;
	conditionsOptions = $conditionsOptions;
	
	var module = conditionsDivId.substring(0, conditionsDivId.length-5); // 从list页面中的Id为XXXQuery的元素取出XXX字符串
	var html = [];
	var times = 1; // 记录条件读取次数，用于排版
	var num = 3;   // 指定每行放置多少个条件
	var thWidth = 10; // 表头宽度（%）
	var tdWidth = 20; // 单元格宽度（%）
	
	html.push("<form action='' method='post' id='" + conditionsFormId + "' autocomplete='off' >");
	html.push("<fieldset>");
	html.push("<table class='table' style='width: 100%;'>");
	
	// 遍历配置项
	for(var key in conditionsOptions){
		if(key == "opt") continue;
		COMP_DataGridataPicker.setConditionsOption(conditionsOptions[key][0]) ;  // 对没赋值的属性赋予默认值
		var objId = key;
		var objName = module + "." + key;
//		var objName = key;
		if(key.indexOf(".") > -1){ // 如果指定了模块名
			objId = key.split('.')[1];
			objName = key;
		}
		
		if((times % num) == 1 || num == 1){
			html.push("<tr>");
		}
		// 隐藏属性
		if(conditionsOption.type == 'hidden'){  
			html.push("<input type='hidden' " + "id='" + objId + "' name='" + objName + "' value='" + conditionsOption.value + "' />");
			continue;
		}
		html.push("<th style='width: " + thWidth + "%;' >" + conditionsOption.name);
		html.push("</th>");
		html.push("<td style='width: " + tdWidth + "%;'>");
		html.push("<div id='" + key.split('.')[1] + "Div'>");
		// 文本框
		if(conditionsOption.type == 'text'){  
			html.push("<input type='text' class='" + conditionsOption.elementClass + "' " +
					"id='" + objId + "' name='" + objName + "' value='" + conditionsOption.value + "' ");
			
			if(conditionsOption.style.indexOf("width") <0 && conditionsOption.width){ //如果自定义的style不包含width设置
				conditionsOption.style += "width:" + conditionsOption.width + "px;";
			}
			if(conditionsOption.style){
				html.push("style='" + conditionsOption.style + "' ");
			}
			if(conditionsOption.disabled){
				html.push("disabled='disabled' ");
			}
			if(conditionsOption.readonly){
				html.push("readonly='readonly' ");
			}
			if(conditionsOption.onclick){   
				html.push("onclick='"+conditionsOption.onclick+"' ");
			}
			if(conditionsOption.onchange){   
				html.push("onchange='"+conditionsOption.onchange+"' ");
			}
			if(conditionsOption.onblur){   
				html.push("onblur='"+conditionsOption.onblur+"' ");
			}
			if(conditionsOption.onfocus){   
				html.push("onfocus='"+conditionsOption.onfocus+"' ");
			}
			html.push(" />");
		}
		// 时间控件
		else if(conditionsOption.type == 'date'){  
			html.push("<input type='text' class='Wdate' " +
					  "id='" + objId + "' name='" + objName + "' value='" + conditionsOption.value + "' ");
			
			if(conditionsOption.style.indexOf("width") <0 && conditionsOption.width){ //如果自定义的style不包含width设置
				conditionsOption.style += "width:" + conditionsOption.width + "px;";
			}
			if(conditionsOption.style){
				html.push("style='" + conditionsOption.style + "' ");
			}
			if(conditionsOption.disabled){
				html.push("disabled='disabled' ");
			}
			if(conditionsOption.readonly){
				html.push("readonly='readonly' ");
			}
			if(conditionsOption.onclick){   
				html.push("onclick='"+conditionsOption.onclick+"' ");
			}
			if(conditionsOption.onchange){   
				html.push("onchange='"+conditionsOption.onchange+"' ");
			}
			if(conditionsOption.wdateRule){
				html.push("onfocus='WdatePicker({"+conditionsOption.wdateRule+"})'");
			} 
			html.push(" />");
		}
		// 下拉框
		else if(conditionsOption.type == 'select'){  
			html.push("<select class='" + conditionsOption.elementClass + "' " +
					"id='" + objId + "' name='" + objName + "' ");
			
			if(conditionsOption.style.indexOf("width") <0 && conditionsOption.width){ //如果自定义的style不包含width设置
				conditionsOption.style += "width:" + conditionsOption.width + "px;";
			}
			if(conditionsOption.style){
				html.push("style='" + conditionsOption.style + "' ");
			}
			if(conditionsOption.disabled){
				html.push("disabled='disabled' ");
			}
			if(conditionsOption.onclick){   
				html.push("onclick='"+conditionsOption.onclick+"' ");
			}
			if(conditionsOption.onchange){   
				html.push("onchange='"+conditionsOption.onchange+"' ");
			}
			if(conditionsOption.onblur){   
				html.push("onblur='"+conditionsOption.onblur+"' ");
			}
			if(conditionsOption.onfocus){   
				html.push("onfocus='"+conditionsOption.onfocus+"' ");
			}
			html.push(" >");
			var selectedIndex = 0;
			for(var option in conditionsOption.options){
				html.push("<option value='" + conditionsOption.options[option] + "' ");
				if(selectedIndex == conditionsOption.selectIndex){
					html.push("selected='selected' ");
				}
				html.push(">" + option );
				html.push("</option>");
				selectedIndex++;
			}
			html.push("</select>");
		}
		// 下拉框标签
		else if(conditionsOption.type == 'selectTag'){ 
			if(conditionsOption.style.indexOf("width") <0 && conditionsOption.width){ //如果自定义的style不包含width设置
				conditionsOption.style += "width:" + conditionsOption.width + "px;";
			}
			var data = {
				'selectTag.id': objId,
				'selectTag.name': objName,
				'selectTag.dictKey': conditionsOption.dictKey,
				'selectTag.selectedValue': conditionsOption.value,
				'selectTag.nullable': conditionsOption.nullable,
				'selectTag.readOnly': conditionsOption.readonly,
				'selectTag.onchange': 'dataTypeOnchange(this.value);',
				'selectTag.onclick': conditionsOption.onclick,
				'selectTag.onselect': conditionsOption.onselect,
				'selectTag.onblur': conditionsOption.onblur,
				'selectTag.onfocus': conditionsOption.onfocus,
				'selectTag.type': conditionsOption.keyType,
				'selectTag.style': conditionsOption.style
			};
			$.ajax({
				type: 'post',
				async: false,
				dataType: 'text',
				url: 'commonSelectTag_getSelectTagHtml.html',
				data: data,
				success: function(result){
					html.push(result);
				},
				error: function(result){
					
				}
			});
		}
		html.push("</div>");
		html.push("</td>");
		if((times % num) == 0){   // || times == conditionsOptions.length
			html.push("</tr>");
		}
		times++;
	}
	html.push("</tr>");
	
	// 放置按钮
	html.push("<tr>");
	html.push("<th></th>");
	html.push("<td colspan='" + (num*2-1) + "'>");
	html.push("<input type='button' id='queryBtn' class='btn_Coor' value='查询' onclick='COMP_DataGridataPicker.customQuery(\"" + conditionsFormId + "\")' />");
	html.push("&nbsp;&nbsp;&nbsp;&nbsp;");
	if(typeof($advancedQueryOptions) != 'undefined' && $advancedQueryOptions != null){
		html.push("<input type='button' id='advancedQueryBtn' class='btn_Coor' value='高级查询' onclick='COMP_DataGridataPicker.advancedQuery(\""+ conditionsFormId +"\")' />");
		html.push("&nbsp;&nbsp;&nbsp;&nbsp;");
	}
	html.push("<input type='reset' id='resetBtn' class='btn_Coor' onclick='COMP_DataGridataPicker.customReset(this.id)' />");
	html.push("</td>");
	html.push("</tr>");
	
	html.push("</table>");
	html.push("</fieldset>");
	html.push("</form>");
	$('#' + conditionsDivId).html(html.join(""));
	
	COMP_DataGridataPicker.afterFormLoad(); // 查询区加载完成后的处理
};

//在list页面添加高级查询条件
COMP_DataGridataPicker.advancedQuery = function($formId){
	optionAliks = $.extend({
		advancedQueryFormId:'',
		title :'',
		jumpUrl:'',
		width:400,
		height: 300
	}, advancedQueryOptions || {});
	var dow = $.dialog({
		title:optionAliks.title,
		content: "url:"+optionAliks.jumpUrl,
		width: optionAliks.width, 
		height: optionAliks.height,
		lock: true,
		cache:false,
		cancelVal: '关闭',
		cancel: true,
		button: [{
			name: '确定',
			callback: function () {
    		 var formObj = dow.content.document.getElementById(optionAliks.advancedQueryFormId);
    		// console.log(formObj.elements);
    		 var inputArry = formObj.elements;
    		 for(var i = 0; i< inputArry.length;  i++){
    			var inputName = inputArry[i].name;
    			var inputValue =inputArry[i].value;
    			var inputId = inputName.split('.')[1];
    			if(inputValue != null && inputValue != "" && inputId != undefined && inputId != "undefined"){
    				//var s=document.getElementsByName(inputName);
    				var s = $('[name="'+inputName+'"]');
    				//var sss = $("*[name='"+inputName+"']");
    				if(s.length>0){
    					$('[name="'+inputName+'"]').val(inputValue);
    				}else{
        				var element = document.createElement("input");  
        				element.setAttribute("type", "hidden");  
        				element.setAttribute("name", inputName);  
        				element.setAttribute("value", inputValue); 
        				element.setAttribute("class", "addElement"); 
        				document.getElementById(conditionsFormId).appendChild(element);
    				}
    			}
    		 }
    		 //console.log($('#'+conditionsFormId).html());
    		 //alert($('#'+conditionsFormId).html());
    		 COMP_DataGridataPicker.customQuery($formId);
    	 }, 
    	 focus: true 
	     }] 
	}); 
}

// 查询区加载前的处理
COMP_DataGridataPicker.beforeFormLoad = function(){
	if(typeof beforeFormLoad != 'undefined' && beforeFormLoad instanceof Function) {        
		beforeFormLoad(); 
	}
};

// 查询区加载完成后的处理
COMP_DataGridataPicker.afterFormLoad = function(){
	if(typeof afterFormLoad != 'undefined' && afterFormLoad instanceof Function) {        
		afterFormLoad(); 
	}
};

// 点击“查询”按钮后的处理
COMP_DataGridataPicker.customQuery = function(formId){
	if(typeof doBeforeQuery != 'undefined' && doBeforeQuery instanceof Function) {        
		doBeforeQuery(formId);  // 查询前
	} 
	COMP_DataGridataPicker.loadConditions(formId); // 查询
	if(typeof doAfterQuery != 'undefined' && doAfterQuery instanceof Function) {        
		doAfterQuery(formId);   // 查询后
	} 
};

// 点击“重置”按钮后的处理
COMP_DataGridataPicker.customReset = function(id){
	$(".addElement").val(""); 
	if(typeof customReset != 'undefined' && customReset instanceof Function) {        
		customReset(id);  
	} 
};


// 导出数据方法
COMP_DataGridataPicker.exportData = function(){
	if(COMP_DataGridataPicker.classFullNmae == null || COMP_DataGridataPicker.classFullNmae == '' || typeof(COMP_DataGridataPicker.classFullNmae) == 'undefined'){
		alert('未设置实体类');
		return;
	}
	var values = '';
	var elementIds = '';
	var key = '';
	/*for(key in conditionsOptions){
		var id = key.split('.')[1];
		var value = document.getElementById(id).value;
		if(value != null && value != '' && id != null && id != ''){
			values = values + value + ',';
			elementIds = elementIds + id + ',';
		}
	}
	elementIds = elementIds.substr(0, elementIds.length-1);
	values = values.substr(0, values.length-1);*/
	window.location.href = 'importExport_exportExcel.html?className='+COMP_DataGridataPicker.classFullNmae+'&elementIds='+elementIds+'&values='+values;
	
};

// 导入数据方法
COMP_DataGridataPicker.importData = function(){
	if(COMP_DataGridataPicker.classFullNmae == null || COMP_DataGridataPicker.classFullNmae == '' || typeof(COMP_DataGridataPicker.classFullNmae) == 'undefined'){
		alert('未设置实体类');
		return;
	}
	var url = 'importExport_uploadExcel.html';
	if(COMP_DataGridataPicker.getType() == '1'){
		COMP_DataGridataPicker.getWinObject().$.dialog({
			title: '上传excel数据',
			content: 'url:' + url,
			width: 100, 
			height: 100,
			lock: true,
			cache: false,
			button: [{
				name: '确认', 
				callback: function () {
	    	    	var attachmentId  = dod.content.document.getElementById("attachmentId").value;
	    	    	if(attachmentId != null && attachmentId != ''){
		    	    	$.post('importExport_uploadExcelToDB.html', { className: COMP_DataGridataPicker.classFullNmae,attachmentId:attachmentId }, function (text, status) { 
		    	    		//COMP_DataGridataPicker.autoMessage();
		    	    		COMP_DataGridataPicker.reload();
		    	    	});
	    	    	}
	    	    
				}, 
				focus: true                
			}],
			cancelVal: '关闭',
			close: function(){
				var attachmentId  = dod.content.document.getElementById("attachmentId").value;
				COMP_DataGridataPicker.deletaAttachmentByIds(attachmentId);//删除附件
		    },
			cancel: true 
		});  		
   }else{
	  var dod = $.dialog({
			title: '上传excel数据',
			content: 'url:' + url,
			width: 100, 
			height: 100,
			lock: true,
			cache: false,
			button: [{
				name: '确认', 
				callback: function () {
	    	    	var attachmentId  = dod.content.document.getElementById("attachmentId").value;
	    	    	if(attachmentId != null && attachmentId != ''){
		    	    	$.post('importExport_uploadExcelToDB.html', { className: COMP_DataGridataPicker.classFullNmae,attachmentId:attachmentId }, function (text, status) { 
		    	    		//COMP_DataGridataPicker.autoMessage();
		    	    		COMP_DataGridataPicker.reload();
		    	    	});
	    	    	}
	    	    
				}, 
				focus: true                
			}],
			cancelVal: '关闭',
			close: function(){
				var attachmentId  = dod.content.document.getElementById("attachmentId").value;
				COMP_DataGridataPicker.deletaAttachmentByIds(attachmentId);//删除附件
		    },
			cancel: true 
		});  		
   }
};

// 删除附件
COMP_DataGridataPicker.deletaAttachmentByIds = function(attachmentId) {
	var r = 0;
	$.ajax({
		type : 'post',
		async:false,
		dataType : 'text',
		url: 'attachment_removeUpload.html',
		data:{'attachmentId':attachmentId},
		success : function(result){
 			if(result=='1'){
 				r = 1;
 			}
		},
		error : function(result){
		}
	});
	return r;
};

// 获取根据区划编码的新增弹窗标题
COMP_DataGridataPicker.getAddTitle = function(title){
	var titleUrl = "commonAjax_getAreaName.html"; // 获取区划编码
	$.ajax({
		type : 'post',
		async:false,
		dataType : 'text',
		url: titleUrl,
		success : function(result){
			if(result){
				title += "--数据将保存至" +result;
			}
		},
		error : function(result){
			COMP_DataGridataPicker.autoMessage('获取行政区划名称失败！');			
		}
	});
	return title;
};

// 根据账户权限获得对应操作项
COMP_DataGridataPicker.loadListBySecurity = function($module, $level, $formId) {
	var url = 'menu_loadMenuFunctionBySecurity.html';
	var menuId = top.currentMenuId;
	var data = {
			menuId : menuId
	};
	$.ajax({
		type: 'post',
		async: false,
		dataType: 'json',
		url: url,
		data: data,
		success: function(result){
			if(typeof(result) == 'undefined' || result == null || result.length <1) return;
			var mfKey = '', fKey = '';
			var mf = null, f = null;
			var operating = [];
			var options = {};
			var formId = 'form1';
			var level = 1;
			var conditionOptions = null;
			var columnOptions = null;
			var advancedQueryOptions = null;
			
			if(typeof($level) != 'undefined' && $level != null) 
				level = $level;
			if(typeof($formId) != 'undefined' && $formId != null) 
				formId = $formId;
			if(typeof(result['menu']['conditionOptions']) != 'undefined' && result['menu']['conditionOptions'] != null && result['menu']['conditionOptions'] != '') 
				conditionOptions = COMP_DataGridataPicker.splitOption(result['menu']['conditionOptions'], level);
			if(typeof(result['menu']['columnOptions']) != 'undefined' && result['menu']['columnOptions'] != null && result['menu']['columnOptions'] != '') 
				columnOptions = COMP_DataGridataPicker.splitOption(result['menu']['columnOptions'], level);
			if(typeof(result['menu']['advancedQueryOptions']) != 'undefined' && result['menu']['advancedQueryOptions'] != null && result['menu']['advancedQueryOptions'] != '') 
				advancedQueryOptions = COMP_DataGridataPicker.splitOption(result['menu']['advancedQueryOptions'], level);
			
			// 初始化需要处理字段的key
			COMP_DataGridataPicker.setHandleFieldArr(); 
			// 初始化操作项的key
			COMP_DataGridataPicker.setOptionKeys(); 
			// 清空数据字典属性数组
			if(typeof(dictKeyAttributes) == 'undefined' || dictKeyAttributes == null) dictKeyAttributes = [];
			else dictKeyAttributes.splice(0, dictKeyAttributes.length);
			
			// 根据列表的行配置中的数据字典Key获取对应值
			for(var key in columnOptions){
				var dictKey = columnOptions[key][0].dictKey;
				var keyType = columnOptions[key][0].keyType;
				if(dictKey != null && typeof(dictKey) != "undefined" && dictKey != '' &&
						keyType != null && typeof(keyType) != "undefined" && keyType != ''){
					COMP_DataGridataPicker.getAttrByDictKey(key, dictKey, keyType);
				}
			}

			if(typeof(optionKeys) == 'undefined' || optionKeys == null || optionKeys.length <1) return;
			var optionStr = "{";
			for(var i=0; i< optionKeys.length; i++){
				optionStr += (optionKeys[i] + ":[],");
			}
			optionStr = optionStr.substring(0, optionStr.length -1); // 去掉结尾的逗号
			optionStr += "}";
			options = eval("(" + optionStr + ")");
			
			// 组装 options 和 operating
			for(var i=0; i< optionKeys.length; i++){
				// 有Option结尾的是MeunFunction，否则为Function。只加载对应层级
				mfKey = optionKeys[i] + level + "Option";
				fKey = optionKeys[i] + level;
				// Function和MenuFunction是成对的，不允许缺失任意一个
 				if(result[mfKey] != null && typeof(result[mfKey]) != 'undefined' &&
 					result[fKey] != null && typeof(result[fKey]) != 'undefined'){
 	 				// 将部分字段转换成JS代码
 	 				mf = COMP_DataGridataPicker.evalField(result[mfKey]); 
 	 				f = COMP_DataGridataPicker.evalField(result[fKey]);
 				} else {
 					continue;
 				}
 				// 组装配置项
 				if(typeof(options[optionKeys[i]]) != 'undefined' || options[optionKeys[i]] != null) {
 					options[optionKeys[i]].push(mf);
 					operating.push(f);
 				}
 			}
			// 回调方法，对column、options和operating进行自定义处理
			if(typeof customOptions != 'undefined' && customOptions instanceof Function) {        
				customOptions(columnOptions, operating, options, conditionOptions, advancedQueryOptions);  
			}
			COMP_DataGridataPicker.queryConditions(formId, $module + 'Query', conditionOptions, advancedQueryOptions);
 			COMP_DataGridataPicker.loadData(formId, $module + 'List', columnOptions, operating, options);
		},
		error: function(result){
			
		}
	});
};

//将配置字符串转换成JS代码
COMP_DataGridataPicker.splitOption = function ($str, $level){
	var splitStr = '$$$';
	var option = {};
	
	if($str.indexOf(splitStr) > -1){ // 如果有分割符
		var optionStrs = $str.split(splitStr); // 分割字符串
		option = eval("(" + optionStrs[$level-1] + ")"); // 转换对应层级的字符串（层级从1开始）
	} 
	else{
		option = eval("(" + $str + ")");
	}
	return option;
}

//将部分字段转换成JS代码（在数据字典里面定义哪些字段要转换）
COMP_DataGridataPicker.evalField = function ($obj){
	var arr = COMP_DataGridataPicker.getHandleFieldArr();
	for(var o in $obj) {
		// 如果找到指定key
		if($.inArray(o, arr) > -1) {
			var str = $obj[o];
			// 对应字段没有值就跳过
			if(typeof str == 'undefined' || str == null || str == '') continue;
			if(typeof str == 'string' && str.indexOf("javascript:") > -1){ // 如果标明是JS代码
				var jsStr = str.substring(11, str.length); // 去掉标注字符
				$obj[o] = eval(jsStr); // 转换为JS代码
			} 
			else{
				if(!isNaN(str)){ // 如果只有数字
					$obj[o] = eval(str); // 转换为JS代码
				}
			}
		}
	}
	return $obj;
}

// 根据数据字典Key获取对应值
COMP_DataGridataPicker.getAttrByDictKey = function ($key, $value, $type){
	var url = 'commonAjax_getSystemCategoryAttr.html';
	if($type == 3 || $type == '3'){
		url = 'commonAjax_getBaseCategoryAttr.html';
	}
	var data = {
			'category.categoryCode': $value
	};
	$.ajax({
		type: 'post',
		async: false,
		dataType: 'json',
		url: url,
		data: data,
		success: function(result){
			if(typeof(result) == 'undefined' || result == null || result.length <1) return;
			if(typeof(dictKeyAttributes) == 'undefined' || dictKeyAttributes == null) dictKeyAttributes = [];
			var map = {
					key : $key,
					value : result
			};
			dictKeyAttributes.push(map); // [{}, {}, ... {}]
		},
		error: function(result){
			// 用于填充空缺位置，保证算法正常
			var map = {
					key : $key,
					value : null
			};
			dictKeyAttributes.push(map);
		}
	});
}

var dictCellIndex = 0; // dictKeyFormatter方法的执行次数
/**
 * methodName: dictKeyFormatter
 * description: 调用数据字典回填列表值
 * param: cellvalue为单元格的值，options为单元格所在的整行数据，rowObject为
 */ 
COMP_DataGridataPicker.dictKeyFormatter = function(cellvalue, options, rowObject){
	if(typeof(dictKeyAttributes) != 'undefined' && dictKeyAttributes != null && dictKeyAttributes.length >0){
		var i = (dictCellIndex%dictKeyAttributes.length); // 定位到指定的索引
		var attrMap = dictKeyAttributes[i]; // 取出对应的map
		if(typeof attrMap['value'] != 'undefined' && attrMap['value'] != null){
			cellvalue = attrMap['value'][cellvalue]; // 拿到对应key的中文名称
		}
	}
	dictCellIndex++;
	return cellvalue;
}
