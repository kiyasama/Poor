/*
 * @author songwuxing
 * @deprecated 选择公用组件
 */
function COMP_SelectPicker(){

}
/**
 * @author songwuxing
 * @deprecated 选择组件选择值方法
 */
COMP_SelectPicker.addRange=function(option) {
	 var options = $.extend({
			iscode:false,
			type:null
		}, option || {});
		var currentSelectedNode;
		var selectNodes = COMP_TreeUtilsPicker.getTree().getSelectedNodes();
		if(selectNodes!=null && selectNodes.length>0) {
			currentSelectedNode = selectNodes[0];
			
					if($("#rangeSelect>option").length>0 && options.iscode){
						COMP_OparetionPicker.autoMessage("只能选择一个");
					}else{
						if($("#rangeSelect>option[value='"+currentSelectedNode.id+"']").length==0){
							if(options.iscode){	
								var array = COMP_SelectPicker.parentNote(currentSelectedNode.id,currentSelectedNode.level);
								$("#address").val(array[0]);
								$("#code").val(array[1]);
								$("#rangeSelect").append("<option value='"+currentSelectedNode.code+"' type='"+currentSelectedNode.type+"'>"+currentSelectedNode.name+"</option>");
							}else{
								if(options.type =="org" || options.type =="dept" || options.type =="post"){
									if(options.type==currentSelectedNode.type){
										$("#rangeSelect").append("<option code='"+currentSelectedNode.code+"' value='"+currentSelectedNode.id+"' type='"+currentSelectedNode.type+"'>"+currentSelectedNode.name+"</option>");
										//自动移到下一个节点
										COMP_SelectPicker.autoFocusToNextNode(currentSelectedNode);
									}else{
										if(options.type =="org"){
											COMP_OparetionPicker.autoMessage("请选择机构数据！");
										}
										if(options.type == "dept"){
											COMP_OparetionPicker.autoMessage("请选择科室数据！");
										}
										if(options.type == "post"){
											COMP_OparetionPicker.autoMessage("请选择岗位数据！");
										}
									}
								}
								else if(options.type =="sysaccount"){
									if(currentSelectedNode.type=="3"){
										$("#rangeSelect").append("<option value='"+currentSelectedNode.id+"' type='"+currentSelectedNode.type+"'>"+currentSelectedNode.name+"</option>");
										//自动移到下一个节点
										COMP_SelectPicker.autoFocusToNextNode(currentSelectedNode);
									}
									else if(currentSelectedNode.type=="post"){
										//加载当前节点所有子节点
										for(var i=0;i<currentSelectedNode.children.length;i++) {
											var childNode = currentSelectedNode.children[i];
											if($("#rangeSelect>option[value='"+childNode.id+"']").length==0){
											    $("#rangeSelect").append("<option value='"+childNode.id+"' type='"+childNode.type+"'>"+childNode.name+"</option>");
											}
											else{
												COMP_OparetionPicker.autoMessage("已选择！请选择其它值！");
											}
										}
									}
									else if(currentSelectedNode.type=="org"){
										//异步获取当前org下挂靠的所有账号(适用于网格员的选取)
										var url = "account_getORGAccounts.html";
										$.ajax({
											type : 'post',
											async:false,
											dataType : 'json',
											url: url,
											data:{orgID:currentSelectedNode.id},
											success : function(result){
												var accountList = eval(result);
												if(accountList!=null&&accountList.length>0){
													for(var i=0;i<accountList.length;i++){
														var account=accountList[i];
														if($("#rangeSelect>option[value='"+account.id+"']").length==0){
															$("#rangeSelect").append("<option value='"+account.id+"' type=3'>"+account.accountName+"</option>");
														}else{
															COMP_OparetionPicker.autoMessage("已选择！请选择其它值！");
														}
													}
												}
											},
											error : function(result){
												//alert(0);
											}
										});
									}
									else{
										COMP_OparetionPicker.autoMessage("请选择账号数据！");
									}
								}
								else{
									$("#rangeSelect").append("<option code='"+currentSelectedNode.code+"'  value='"+currentSelectedNode.id+"' type='"+currentSelectedNode.type+"'>"+currentSelectedNode.name+"</option>");
									//自动移到下一个节点
									COMP_SelectPicker.autoFocusToNextNode(currentSelectedNode);	
								}
							}
						}else{
							COMP_OparetionPicker.autoMessage("已选择！请选择其它值！");
						}
					}			
		 } else {
			 COMP_OparetionPicker.autoMessage("请选择一个节点！");
		 }
};

COMP_SelectPicker.parentNote=function(id,level){
	var addres = null;
	var code = null;
	var array = new Array();
	var noetParent = COMP_TreeUtilsPicker.getParentNodeById(id);
	if(noetParent!=null){
		addres = noetParent.name;
		code = noetParent.code;
	}
	
	for(var i=0;i<level;i++){
		noetParent = COMP_TreeUtilsPicker.getParentNodeById(noetParent.id);
		if(noetParent!=null){
			addres = noetParent.name+addres;
			code = noetParent.code+","+code;
		}
	}
	array.push(addres);
	array.push(code);
	return array;
};

/**
 * @author songwuxing
 * @deprecated 选择完一个自动跳到下一条记录选中
 */
COMP_SelectPicker.autoFocusToNextNode=function(node){
		//移动
		COMP_TreeUtilsPicker.getTree().selectNode(node.getNextNode());
};
/**
 * @author songwuxing
 * @deprecated 移除选中的信息
 */
COMP_SelectPicker.removeRange=function(){
		var options = $("#rangeSelect>option");
		var addre = $("#address");
		if(addre!=null){
			addre.val("");
		}
		var code = $("#code");
		if(code!=null){
			code.val("");
		}
		var selectedFlag = false;
		for(var i=0; i<options.length; i++){
			if(options[i].selected){
				$(options[i]).remove();
				selectedFlag = true;
			}
		}
		if(!selectedFlag){
			 COMP_OparetionPicker.autoMessage("请选择要移除的项！");
		}
};
	
var nums=0;
/**
 * @author songwuxing	
 * @deprecated 重新加载节点树
 */
COMP_SelectPicker.loadAllTreeData=function(roleName,url) {
        var zNodes;
        $.ajax({
            url: url, //url  action是方法的名称
            data: {name:roleName,async:false},
            type: 'POST',
            async:true,
            dataType: "text", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
            ContentType: "application/json; charset=utf-8",
            success: function(data) {
                zNodes = eval('(' + data + ')');
                //遍历json数组, 添加pId
            	$.fn.zTree.init($("#treeDemo"), COMP_TreePicker.setting(),zNodes);
               // getTree().expandAll(true);
                var treedata = $("#treeDemo").html();
        		if (treedata.length == 0) {
        			$('#loading').css('display', '');
        			//$('#loading').html("<img src='common/images/tree/loading.gif'/>&nbsp;正在加载...");
        			$('#loading').html("");
        			$('#treeDemo').css('display', 'none');
        		} else {
        			$('#loading').css('display', 'none');
        			$('#treeDemo').css('display', '');
        		}
        		nums=1;
            },
            error: function(msg) {
                alert("失败");
            }
        });
    };
    

/**
 * @author songwuxing
 * @deprecated 查询数据
 */   
COMP_SelectPicker.searchTreeNodes=function(url){
		
		if($('#searchText').val()=='')
			{
			 COMP_OparetionPicker.autoMessage("请输入要搜索的名称！");
			return;
		}
		if(nums==0){
			COMP_SelectPicker.loadAllTreeData($('#searchText').val(),url);
			
		}
		//延时加载tree
		setTimeout(function(){
			broNodes = [];
			$("#nextButton").attr("src", "/common/images/range/next.gif");
			$("#nextButton").hide();
			
			targetNodes = COMP_TreeUtilsPicker.getTree().getNodesByParamFuzzy('name', $('#searchText').val(), null);
			index = 0;
			
			if(targetNodes!=null)
				{
					
				if(targetNodes.length>0)
					{
					
						COMP_TreeUtilsPicker.getTree().selectNode(targetNodes[0]);
					
					}else{
						 COMP_OparetionPicker.autoMessage("没有匹配的数据，请重新搜索");
					}
					if(targetNodes.length>1){
							$("#nextButton").show();
					}
				}
		}, 300);
		
	};
/**
 * @author songwuxing
 * @deprecated 一次移除全部选择的信息
 */
COMP_SelectPicker.removeAllRange=function(){
		$("#rangeSelect>option").remove();
		var addre = $("#address");
		if(addre!=null){
			addre.val("");
		}
		var code = $("#code");
		if(code!=null){
			code.val("");
		}
};
/**
 * @author songwuxing
 * @deprecated 查找下一个位置
 */
COMP_SelectPicker.focusToNextTargetNode=function(){
		if(index<targetNodes.length-1)
			{
				index++;
				COMP_TreeUtilsPicker.getTree().selectNode(targetNodes[index]);
			}
		if(index==(targetNodes.length-1))
			{
				$("#nextButton").attr("src", "/common/images/range/nonext.gif");
				$("#nextButton").hide();
			}
};