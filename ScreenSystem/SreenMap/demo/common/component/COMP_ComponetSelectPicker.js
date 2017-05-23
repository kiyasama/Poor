/*
 * @author songwuxing
 * @deprecated 公用树工具类
 */
function COMP_ComponetSelectPicker(){
	treeId = null;
};
/**
 * @param leave 1：表示直接在页面弹出使用。2： 表示在弹出框上在弹出使用
 */
COMP_ComponetSelectPicker.orgDeptPostUser=function(type,idName,isCallBack,leave,$dialogOption){
	var dialogOptionA = $.extend({		
		width:400,
		title:null,
		code:null,
		top:'50%',
		left:'50%'
	}, $dialogOption || {});
	 var dialogOption = {};
	 var api =null;
	 var  W = null;	 
	var title = null;
	if(type=="org"){

		title ="机构控件";
	}
	if(type=="city"){

		title ="行政区划控件";
	}
	if(type=='dept'){
		title ="科室控件";
	}
    if(type=='post'){
		title ="岗位控件";
	}
   if(type=='user'){
		title ="用户控件";
   }
   if(type=='account'){
		title ="账号控件";
   }
   if(type=='sysaccount'){
		title ="系统账号控件";
  }
   if(type=='wgy'){
		title ="网格员控件";
   }
   if(type=='wg'){
		title ="网格控件";
   }
   if(type=='work'){
	   title ="保洁人员控件";
   }
   if(type=='dzzjg'){
	   title ="党组织机构控件";
   }
   if(type=='qydw'){
	   title ="企业单位控件";
   }
   if(type=='aqscqy'){
	   title ="安全生产企业控件";
   }
   if(type=='aqscqyry'){
	   title ="安全生产企业人员控件";
   }
   if(type=='sjzd'){
		title =dialogOptionA.title;
   }
   if(type=='map')
   {
	   title="地图配置控件";
   }
   if(type=='usercityorg')
   {
	   title ="用户组织机构控件";
   }
   if(type=='usercityorg2')
   {
	   title ="用户组织机构控件(多选)";
   }
   if(type==null || type==''){
		title ="组织机构控件";
	}

   var url = 'tree_getOrgDeptPostUserPicker.html?typePick='+type;
   if(dialogOptionA.install !=null && dialogOptionA.install!=""){
	   url = 'installSystem_getOrgDeptPostUserPicker.html?typePick='+type;
   }
   
   if(dialogOptionA.code !=null && dialogOptionA.code!=""){
	   url =url+"&code="+dialogOptionA.code;
   }

   if(leave ==2){
	    api = frameElement.api, W = api.opener;
	    dialogOption = {
			title: title,
			href:url,
			width:dialogOptionA.width,
			parent:api,
			transferId:idName,
			isCallback:false,
			leave:leave,
			top:dialogOptionA.top,
			left:dialogOptionA.left
		};
   }else{
	    dialogOption = {
			title: title,
			href:url,
			width:dialogOptionA.width,
			transferId:idName,
			isCallback:false,
			leave:leave,
			top:dialogOptionA.top,
			left:dialogOptionA.left
		};
	   
   }
   
   
	if(isCallBack!=null){
		dialogOption.isCallback = isCallBack;
	}
	var dialog = COMP_OparetionPicker.dialog(dialogOption,W);  
};

COMP_ComponetSelectPicker.role=function(idName){
	var api = frameElement.api, W = api.opener;
		var dialogOption = {
				title :'角色控件',
				href:'tree_getRolePicker.html',
				parent:api,
				transferId:idName
			};
			var dialog = COMP_OparetionPicker.dialog(dialogOption,W);  
};
COMP_ComponetSelectPicker.log=function(idName){
	var api = frameElement.api, W = api.opener;
		var dialogOption = {
				title :'日志配置控件',
				href:'tree_getLogPicker.html',
				parent:api,
				transferId:idName,
				width:700,
				height: 400,
				isCallback:true
			};
			var dialog = COMP_OparetionPicker.dialog(dialogOption,W);  
};
COMP_ComponetSelectPicker.table=function(idName){
	var api = frameElement.api, W = api.opener;
	var dialogOption = {
			title :'数据表配置控件',
			href:'tree_toEntitySelectWindow.html',
			parent:api,
			transferId:idName,
			width:700,
			height: 400,
			isCallback:true
	};
	var dialog = COMP_OparetionPicker.dialog(dialogOption,W);  
};
COMP_ComponetSelectPicker.group=function(idName){
	var api = frameElement.api, W = api.opener;
		var dialogOption = {
				title :'群组控件',
				href:'tree_getGroupPicker.html',
				parent:api,
				transferId:idName
			};
			var dialog = COMP_OparetionPicker.dialog(dialogOption,W);  
};