function  validateForm(){
	lab = "";
}


validateForm.setLab=function($id){
	lab = "<br><label id='"+$id+"Label' style='color: red'></label>";
	return lab;
};

/**
 * @deprecated 表单字段输入长度控件
 * @param objId 表单字段输入框ID
 * @param propertyLength 该字段允许输入长度
 * @autho songwuxing
 */
validateForm.MeMo = function(objId,propertyLength){
	if($("#"+objId).val() != "" ){
		var id = $("#"+objId+"Label").attr("id");
		if(!(id !=null)){
			$("#"+objId).after(validateForm.setLab(objId));
		}
	var size = $("#"+objId).val().length;
	if(propertyLength < size){
		$("#"+objId).val($("#"+objId).val().substring(0,propertyLength));
		$("#"+objId+"Label").text("最大可以输入"+propertyLength+"个字，现已经输入:"+propertyLength+"个字，还可以输入0个字");	
		$("#"+objId).focus();
		return false;
	}else{
		$("#"+objId+"Label").text("最大可以输入"+propertyLength+"个字，现已经输入:"+size+"个字，还可以输入"+(propertyLength-size)+"个字");
		return true;
	}	
	}else{
		$("#"+objId+"Label").text("");	
		return true;
	}
	
};

/**
 * @deprecated 表单数字输入长度控件
 * @param objId 表单字段输入框ID
 * @param propertyLength 该数字最多输入位数 decimalLength最多输入小数位数
 * @autho huanghanxin
 */
validateForm.DecimalCheck = function(objId,propertyLength,decimalLength){
	if($("#"+objId).val() != "" ){
		var id = $("#"+objId+"Label").attr("id");
		if(!(id !=null)){
			$("#"+objId).after(validateForm.setLab(objId));
		}
		var size = $("#"+objId).val().length;
		var decimalSize=0;
		var integerSize=0;
		var all=$("#"+objId).val();
		if($("#"+objId).val().toString().split(".").length>1){
			decimalSize = $("#"+objId).val().toString().split(".")[1].length;
			integerSize = $("#"+objId).val().toString().split(".")[0].length;
		}else{
			integerSize = propertyLength+1;
		}
		if(propertyLength < size-1){
			if(decimalLength<decimalSize && propertyLength-decimalLength<integerSize){
				$("#"+objId).val(all.substring(0,propertyLength-decimalLength)+all.substring(integerSize,integerSize+5));
				$("#"+objId+"Label").text("最多可输入"+(propertyLength-decimalLength)+"位整数，"+decimalLength+"位小数");	
			}else if(propertyLength-decimalLength<integerSize){
				$("#"+objId).val(all.substring(0,propertyLength-decimalLength)+all.substring(integerSize));
				$("#"+objId+"Label").text("最多可输入"+(propertyLength-decimalLength)+"位整数，"+decimalLength+"位小数");	
			}else if(decimalLength<decimalSize){
				$("#"+objId).val(all.substring(0,integerSize)+all.substring(integerSize,integerSize+5));
				$("#"+objId+"Label").text("最多可输入"+(propertyLength-decimalLength)+"位整数，"+decimalLength+"位小数");	
			}
			$("#"+objId).focus();
			return false;
		}else{
			if(decimalLength<decimalSize){
				$("#"+objId).val(all.substring(0,integerSize)+all.substring(integerSize,integerSize+5));
				$("#"+objId+"Label").text("最多可输入"+(propertyLength-decimalLength)+"位整数，"+decimalLength+"位小数");		
				$("#"+objId).focus();
				return false;
			}else if(propertyLength-decimalLength<integerSize){
				$("#"+objId).val(all.substring(0,propertyLength-decimalLength)+all.substring(integerSize));
				$("#"+objId+"Label").text("最多可输入"+(propertyLength-decimalLength)+"位整数，"+decimalLength+"位小数");	
				$("#"+objId).focus();
				return false;
			}else{
				$("#"+objId+"Label").text("");	
				return true;
			}
		}	
	}else{
		$("#"+objId+"Label").text("");	
		return true;
	}
	
};

/**
 * @deprecated 表单字段输入长度控件
 * @param objId 表单字段输入框ID
 * @param propertyLength 该字段允许输入长度
 * @autho gongjingfeng
 */
validateForm.equalLength = function(objId,propertyLength){
	if($("#"+objId).val() != "" ){
		var id = $("#"+objId+"Label").attr("id");
		if(!(id !=null)){
			$("#"+objId).after(validateForm.setLab(objId));
		}
		var size = $("#"+objId).val().length;
		if(propertyLength == size){
			return true;
		} else if(propertyLength < size){
			$("#"+objId).val($("#"+objId).val().substring(0,propertyLength));
			$("#"+objId+"Label").text("只允许输入"+propertyLength+"个字");	
			
			return true;
		} else{
			$("#"+objId+"Label").text("不能少于"+propertyLength+"个字");	
			$("#"+objId).focus();
			return false;
		}	
	}else{
		$("#"+objId+"Label").text("");	
		return true;
	}
	
};

/**@deprecated 表单字段非空判断
 * @param objId 表单字段输入框ID
 * @param propertyName 表单属性显示名称
 * @autho songwuxing
 */
validateForm.isNull = function(objId,propertyName){
	var id = $("#"+objId+"Label").attr("id");
	if(!(id !=null)){
		$("#"+objId).after(validateForm.setLab(objId));
	}
	var propertys = $("#"+objId).val();
	var regu = "^[ ]+$"; 
	var re = new RegExp(regu); 
	if (propertys == ""){
		$("#"+objId+"Label").text(propertyName+"不能为空！");
		$("#"+objId).focus();
		return false; 
	}else{
		$("#"+objId+"Label").text(""); 
		return true;
	}
	if(re.test(propertys)){
		$("#"+objId+"Label").addClass("label_tip");
		$("#"+objId+"Label").text(propertyName+"不能为空！");
		$("#"+objId).focus();
		return false;
	}else{
		$("#"+objId+"Label").text(""); 
		return true;
	}
};
/**
 * @deprecated 判断表单字段非法字符输入（只能输入数字、英文和汉字）
 * @param objId 表单字段输入框ID
 * @param propertyName 表单属性显示名称
 * @autho songwuxing
 */
validateForm.isIllegalCharacter = function(objId,propertyName){
	var id = $("#"+objId+"Label").attr("id");
	if(!(id !=null)){
		$("#"+objId).after(validateForm.setLab(objId));
	}
	var propertys = $("#"+objId).val();
	var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$"; 
	var re = new RegExp(regu); 
	if (!re.test(propertys)) { 
		$("#"+objId+"Label").text(propertyName+"不能输入非法字符！");
		$("#"+objId).focus();
		return false;
	}else{
		$("#"+objId+"Label").text(""); 
		return true;
	}
		
};


/**
 * @deprecated 判断表单字段数字输入（只能输入数字）
 * @param objId 表单字段输入框ID
 * @param propertyName 表单属性显示名称
 * @autho songwuxing
 */
validateForm.isNoN = function(objId,propertyName){
	var id = $("#"+objId+"Label").attr("id");
	if(!(id !=null)){
		$("#"+objId).after(validateForm.setLab(objId));
	}
	var propertys = $("#"+objId).val(); 
	 var reg = /^\d+$/;
	if (!reg.test(propertys)) { 
		$("#"+objId+"Label").text(propertyName+"只能输入数字！");
		$("#"+objId).focus();
		return false;
	} else{
		$("#"+objId+"Label").text("");
		return true;
	}
};

/**
 * @deprecated 判断表单字段数字或小数输入（只能输入数字或小数）
 * @param objId 表单字段输入框ID
 * @param propertyName 表单属性显示名称
 * @autho songwuxing
 */
validateForm.isFloat = function(objId,propertyName){
	var id = $("#"+objId+"Label").attr("id");
	if(!(id !=null)){
		$("#"+objId).after(validateForm.setLab(objId));
	}
	var propertys = $("#"+objId).val(); 
	 var reg = /^(-?\d+)(\.\d+)?$/;
	if (!reg.test(propertys)) { 
		$("#"+objId+"Label").text(propertyName+"只能输入数字！");
		$("#"+objId).focus();
		return false;
	} else{
		$("#"+objId+"Label").text("");
		return true;
	}
};

/**
 * @deprecated 判断表单字段整数输入（只能输入整数字）
 * @param objId 表单字段输入框ID
 * @param propertyName 表单属性显示名称
 * @author songwuxing
 */
validateForm.isNum = function(objId,propertyName){
	var id = $("#"+objId+"Label").attr("id");
	if(!(id !=null)){
		$("#"+objId).after(validateForm.setLab(objId));
	}
	var propertys = $("#"+objId).val(); 
	var regu = /^[-]{0,1}[0-9]{1,}$/; 
	if (!regu.test(propertys)) { 
		$("#"+objId+"Label").text(propertyName+"只能输入整数字！");
		$("#"+objId).focus();
		return false;
	} else{
		$("#"+objId+"Label").text(""); 
		return true;
	}
};

/**
 * @deprecated 判断表单字段正整数输入（只能输入正整数字,不可以用零开头）
 * @param objId 表单字段输入框ID
 * @param propertyName 表单属性显示名称
 * @author songwuxing
 */
validateForm.isNumber = function(objId,propertyName){
	var id = $("#"+objId+"Label").attr("id");
	if(!(id !=null)){
		$("#"+objId).after(validateForm.setLab(objId));
	}
	var propertys = $("#"+objId).val(); 
	var regu = "^[0-9]+$"; 
	var no = propertys.substring(0,1);
	var re = new RegExp(regu); 
	if(no==0){
		$("#"+objId+"Label").text(propertyName+"不能以零开头！");
		$("#"+objId).focus();
		return false;
	}else{
		if (!(propertys.search(re) != -1)) { 
			$("#"+objId+"Label").text(propertyName+"只能输入正整数字！");
			$("#"+objId).focus();
			return false;
		} else{
			$("#"+objId+"Label").text(""); 
			return true;
		}
	}
	
};

/**
 * @deprecated 判断表单字段零或正整数输入（只能输入正整数字）
 * @param objId 表单字段输入框ID
 * @param propertyName 表单属性显示名称
 * @author gongjingfeng
 */
validateForm.isNumberOrZero = function(objId,propertyName){
	var id = $("#"+objId+"Label").attr("id");
	if(!(id !=null)){
		$("#"+objId).after(validateForm.setLab(objId));
	}
	var propertys = $("#"+objId).val(); 
	var regu = "^[0-9]+$"; 
	var no = propertys.substring(0,1);
	var re = new RegExp(regu); 
	if (!(propertys.search(re) != -1)) { 
		$("#"+objId+"Label").text(propertyName+"只能输入0或正整数字！");
		$("#"+objId).focus();
		return false;
	}
	else{
		$("#"+objId+"Label").text(""); 
		return true;
	}
};

/**
 * @deprecated 判断表单字段手机号输入
 * @param objId 表单字段输入框ID
 * @param propertyName表单属性显示名称
 * @author songwuxing
 */
validateForm.checkMobile = function(objId,propertyName){
	var id = $("#"+objId+"Label").attr("id");
	if(!(id !=null)){
		$("#"+objId).after(validateForm.setLab(objId));
	}
	var propertys = $("#"+objId).val(); 
	if(propertys != "" && propertys != null){
		var regu = /^[1][0-9][0-9]{9}$/; 
		var re = new RegExp(regu); 
		if (!re.test(propertys)) { 
			$("#"+objId+"Label").text(propertyName+"格式不正确！");
			$("#"+objId).focus();
			return false;
		} else{
			$("#"+objId+"Label").text(""); 
			return true;
		}
	}else{
		$("#"+objId+"Label").text(""); 
		return true;
	}
};



/**
 * @deprecated 判断表单字段电话号码输入
 * @param objId 表单字段输入框ID
 * @param propertyName 表单属性显示名称
 * @author songwuxing
 */
validateForm.isTel = function(objId,propertyName){
	var id = $("#"+objId+"Label").attr("id");
	if(!(id !=null)){
		$("#"+objId).after(validateForm.setLab(objId));
	}
	var propertys = $("#"+objId).val(); 
	if(propertys != "" && propertys != null){
	var reg=/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/; 
	var re = new RegExp(reg); 
	var tel =new Array();
	tel = propertys.split(",");
	if(tel.length > 1){
		for(var i =0;i<tel.length;i++){
			if (!re.test(tel[i])) { 
				$("#"+objId+"Label").text(propertyName+"输入格式不正确！");
				$("#"+objId).focus();
				return false;
			} else{
				$("#"+objId+"Label").text(""); 
				return true;
			}
		}
	}else{
		if (!re.test(propertys)) { 
			$("#"+objId+"Label").text(propertyName+"输入格式不正确！");
			$("#"+objId).focus();
			return false;
		} else{
			$("#"+objId+"Label").text(""); 
			return true;
		}
	}
	}else{
		$("#"+objId+"Label").text(""); 
		return true;
	}
};



/**
 * @deprecated 判断表单字段身份证号输入
 * @param objId 表单字段输入框ID
 * @author songwuxing
 */
validateForm.isIDno = function(objId){
	var id = $("#"+objId+"Label").attr("id");
	if(!(id !=null)){
		$("#"+objId).after(validateForm.setLab(objId));
	}
		var propertys = $("#"+objId).val();   
		var fale =false;
	    var aCity={
	    		11:"北京", 12:"天津", 13:"河北", 14:"山西", 15:"内蒙古",
	    		21:"辽宁", 22:"吉林", 23:"黑龙江", 31:"上海", 32:"江苏",
	    		33:"浙江", 34:"安徽", 35:"福建", 36:"江西", 37:"山东",
	    		41:"河南", 42:"湖北", 43:"湖南", 44:"广东", 45:"广西",
	    		46:"海南", 50:"重庆", 51:"四川", 52:"贵州", 53:"云南",
	    		54:"西藏", 61:"陕西", 62:"甘肃", 63:"青海", 64:"宁夏",
	    		65:"新疆", 71:"台湾", 81:"香港", 82:"澳门", 91:"国外"
	    };  
	   
	    var iSum = 0;  
	    var idCardLength = propertys.length;    
	    if(!/^\d{17}(\d|x)$/i.test(propertys)&&!/^\d{15}$/i.test(propertys))   
	    {
			$("#"+objId+"Label").text("非法身份证！"); 
			fale =false;
			$("#"+objId).focus();
	        return fale;  
	    }  
	   
	    //在后面的运算中x相当于数字10,所以转换成a  
	    propertys = propertys.replace(/x$/i,"a");  
	  
	    if(aCity[parseInt(propertys.substr(0,2))]==null)  
	    {  

			$("#"+objId+"Label").text("非法地区！");   
			fale =false;
			$("#"+objId).focus();
	        return fale;  
	    }  
	      
	    if (idCardLength==18)  
	    {  
	        sBirthday=propertys.substr(6,4)+"-"+Number(propertys.substr(10,2))+"-"+Number(propertys.substr(12,2));  
	        var d = new Date(sBirthday.replace(/-/g,"/"));
	        if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))  
	        {          
				$("#"+objId+"Label").text("非法生日！"); 
				fale =false;
				$("#"+objId).focus();
	            return fale;  
	        }  
	  
	        for(var i = 17;i>=0;i --)  
	            iSum += (Math.pow(2,i) % 11) * parseInt(propertys.charAt(17 - i),11);  
	        if(iSum%11!=1)  
	        {   
				$("#"+objId+"Label").text("非法身份证号！");  
				fale =false;
				$("#"+objId).focus();
	            return fale;  
	        }  
	    }  
	    else if (idCardLength==15)  
	    {  
	        sBirthday = "19" + propertys.substr(6,2) + "-" + Number(propertys.substr(8,2)) + "-" + Number(propertys.substr(10,2));  
	        var d = new Date(sBirthday.replace(/-/g,"/"));
	        var dd = d.getFullYear().toString() + "-" + (d.getMonth()+1) + "-" + d.getDate();     
	        if(sBirthday != dd)  
	        {  
				$("#"+objId+"Label").text("非法生日！"); 
				fale =false;
				$("#"+objId).focus();
	            return fale;  
	        }  
	    }  
	    fale =true;
	    if(fale){
	    	$("#"+objId+"Label").text(""); 
	    	 return fale;  
	    }
};



/**
 * @deprecated 判断表单字段电子邮件输入
 * @param objId 表单字段输入框ID
 * @param propertyName 表单属性显示名称
 * @author songwuxing
 */
validateForm.isEmail = function(objId,propertyName){
	var id = $("#"+objId+"Label").attr("id");
	if(!(id !=null)){
		$("#"+objId).after(validateForm.setLab(objId));
	}
		var propertys = $("#"+objId).val();   
		if(propertys != "" && propertys != null){
		var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/; 
		if (!myReg.test(propertys)){
			$("#"+objId+"Label").text(propertyName+"地址不正确！"); 
			$("#"+objId).focus();
			return false;
		} else{
			$("#"+objId+"Label").text(""); 
			 return true;  
		}
		}else{
			$("#"+objId+"Label").text(""); 
			 return true;  
		}

};
/**
 * @deprecated 检查开始日期是否小于等于结束日期
 * @param dateOneId 开始日期 格式：2001-5-4
 * @param dateTwoId 结束日期 格式：2002-5-4
 * @param dateOneName 开始日期名称
 * @param dateTwoName 结束日期名称
 * @author songwuxing
 */
validateForm.data_compare = function(dateOneId,dateTwoId,dateOneName,dateTwoName){
	var id = $("#"+objId+"Label").attr("id");
	if(!(id !=null)){
		$("#"+objId).after(validateForm.setLab(objId));
	}
	var dateOne =$('#dateOneId').val(); 
	var dateTwo =$('#dateTwoId').val(); 
	var arr=dateOne.split("-");
	var starttime=new Date(arr[0],arr[1],arr[2]);
	var starttimes=starttime.getTime();
 
	var arrs=dateTwo.split("-");
	var endtime=new Date(arrs[0],arrs[1],arrs[2]);
	var endtimes=endtime.getTime();
 
	 if(starttimes>=endtimes)
	 {
		 $("#"+objId+"Label").text(dateOneName+"不能大于"+dateTwoName+"！"); 
		 $("#"+objId).focus();
		 return false;
	 }else{
		 $("#"+objId+"Label").text(""); 
		 return true;  
	 }
};

/**
 * @deprecated 检查输入字符串是否符合金额格式 ,格式定义为带小数的正数，小数点后最多三位 
 * @param objId 表单字段输入框ID
 * @param objName 字段对应的名称
 * @author songwuxing
 * 
 */
validateForm.isMoney = function(objId,objName){
	var id = $("#"+objId+"Label").attr("id");
	if(!(id !=null)){
		$("#"+objId).after(validateForm.setLab(objId));
	}
	var propertys = $("#"+objId).val();  
	var regu = "^[0-9]+[\.][0-9]{0,3}$"; 
	var re = new RegExp(regu); 
	if (!re.test(propertys)) { 
		 $("#"+objId+"Label").text(objName+"格式不正确！(请输入1-3位小数的正数)"); 
		 $("#"+objId).focus();
		 return false; 
	} else { 
		$("#"+objId+"Label").text(""); 
		 return true;  
	} 
};

/**
 * @deprecated 检查输入数字是否符合限制范围
 * @param objId 表单字段输入框ID
 * @param objName 字段对应的名称
 * @author gongjingfeng
 * 
 */
validateForm.numInRange = function(objId,objName,min,max){
	var id = $("#"+objId+"Label").attr("id");
	if(!(id != null)){
		$("#"+objId).after(validateForm.setLab(objId));
	}
	var propertys = $("#"+objId).val(); 
	var value = parseInt(propertys);
	var minvalue = parseInt(min);
	var maxvalue = parseInt(max);
	if(value < minvalue){
		 $("#"+objId+"Label").text(objName+"不能小于" + min + "！"); 
		 $("#"+objId).focus();
		 return false; 
	} else if(value > maxvalue){
		 $("#"+objId+"Label").text(objName+"不能大于" + max + "！"); 
		 $("#"+objId).focus();
		 return false; 
	} else { 
		$("#"+objId+"Label").text(""); 
		 return true;  
	} 
};

/**
 * @deprecated 唯一校验验证
 * @param objId 表单字段输入框ID
 * @param baseName 实体名称
 * @param columName 要比对属性名称
 * @param propertyName 表单属性显示名称
 * @author songwuxing
 */
validateForm.checkOnly = function(objId,baseName,columName,propertyName){
	var id = $("#"+objId+"Label").attr("id");
	if(!(id !=null)){
		$("#"+objId).after(validateForm.setLab(objId));
	}

	var columValue = $("#"+objId).val();
	var falg = false;
	$.ajax({
		type : 'post',
		async:false,
		dataType : 'html',
		url: "comm_checkOnly.html",
		data:{columName:columName,columValue:columValue,baseName:baseName},
		success : function(result){
			if(result==1){
				$("#"+objId+"Label").text("");
				falg= true;  
			}
			else if(result>1){
				$("#"+objId+"Label").text(propertyName+"已使用！");
				falg = false;
				$("#"+objId).focus();
				var api = frameElement.api, W = api.opener;	
				W.$.dialog.notice({ 
				    title: '操作结果', 
				    width: 220,
				    height:50,
				    content: propertyName+"已存在！", 
				    time: 2 
				});
			}
		},
		error : function(result){
			alert(result);
		}
	});
	return falg;
	
};

/**
 * @deprecated 多字段限制唯一校验验证（HQL）
 * @param objId 表单字段输入框ID
 * @param baseName 实体名称
 * @param jsonArray JSON数组：[{'name':x1, 'value':y1}, {'name':x2, 'value':y2}...]  // name指实体中的字段名
 * @param propertyName 表单属性显示名称
 * @author gongjingfeng
 */
validateForm.checkOnlyInScope = function(objId, baseName, jsonArray, propertyName){
	var falg = false;
	var id = $("#" + objId + "Label").attr("id");
	if(!(id != null)){
		$("#" + objId).after(validateForm.setLab(objId));
	}
	
	var data = {
			baseName: baseName, 
			json: JSON.stringify(jsonArray)
	};
	
	$.ajax({
		type: 'post',
		async: false,
		dataType: 'html',
		url: "comm_checkOnlyInScope.html",
		data: data,
		success: function(result){
			if(result == 1){
				$("#" + objId + "Label").text("");
				falg = true;
			}
			else if(result >1){
				$("#" + objId + "Label").text(propertyName+"已使用！");
				falg = false;
				$("#"+objId).focus();
				var api = frameElement.api, W = api.opener;	
				W.$.dialog.notice({ 
					title: '操作结果', 
					width: 220,
					height: 50,
					content: propertyName + "已存在！", 
					time: 2 
				});
			}
		},
		error : function(result){
			alert(result);
		}
	});
	return falg;
};
/**
 * @deprecated 多字段检验（HQL）,返回匹配存在数目
 * @param objId 表单字段输入框ID
 * @param baseName 实体名称
 * @param jsonArray JSON数组：[{'name':x1, 'value':y1}, {'name':x2, 'value':y2}...]  // name指实体中的字段名
 * @param propertyName 表单属性显示名称
 * @author wuwy
 */
validateForm.checkObjAmount = function(objId, baseName, jsonArray, propertyName){
	var falg = 0;
	var id = $("#" + objId + "Label").attr("id");
	if(!(id != null)){
		$("#" + objId).after(validateForm.setLab(objId));
	}
	
	var data = {
			baseName: baseName, 
			json: JSON.stringify(jsonArray)
	};
	
	$.ajax({
		type: 'post',
		async: false,
		dataType: 'html',
		url: "comm_checkObjAmount.html",
		data: data,
		success: function(result){
			return result;
		},
		error : function(result){
			alert(result);
		}
	});
	return falg;
};
/**
 * @deprecated 多字段限制唯一校验验证（SQL）
 * @param objId 表单字段输入框ID
 * @param baseName 表名称
 * @param jsonArray JSON数组：[{'name':x1, 'value':y1}, {'name':x2, 'value':y2}...]  // name指表中的字段名
 * @param propertyName 表单属性显示名称
 * @author wuweiyong
 */
validateForm.checkOnlyInScopeBySQL = function(objId, baseName, jsonArray, propertyName){
	var falg = false;
	var id = $("#" + objId + "Label").attr("id");
	if(!(id != null)){
		$("#" + objId).after(validateForm.setLab(objId));
	}
	
	var data = {
			baseName: baseName, 
			json: JSON.stringify(jsonArray)
	};
	
	$.ajax({
		type: 'post',
		async: false,
		dataType: 'html',
		url: "comm_checkOnlyInScopeBySQL.html",
		data: data,
		success: function(result){
		if(result == 1){
			$("#" + objId + "Label").text("");
			falg = true;
		}
		else if(result >1){
			$("#" + objId + "Label").text(propertyName+"已使用！");
			falg = false;
			$("#"+objId).focus();
			var api = frameElement.api, W = api.opener;	
			W.$.dialog.notice({ 
				title: '操作结果', 
				width: 220,
				height: 50,
				content: propertyName + "已存在！", 
				time: 2 
			});
		}
	},
	error : function(result){
		alert(result);
	}
	});
	return falg;
};

/**
 * @deprecated 多字段检验（HQL）,返回匹配存在数目
 * @param objId 表单字段输入框ID
 * @param baseName 实体名称
 * @param jsonArray JSON数组：[{'name':x1, 'value':y1}, {'name':x2, 'value':y2}...]  // name指实体中的字段名
 * @param propertyName 表单属性显示名称
 * @author wuwy
 */
validateForm.isOnly = function(objId, baseName, jsonArray, propertyName){
	var falg = false;
	var id = $("#" + objId + "Label").attr("id");
	if(!(id != null)){
		$("#" + objId).after(validateForm.setLab(objId));
	}
	
	var data = {
			baseName: baseName, 
			json: JSON.stringify(jsonArray)
	};
	
	$.ajax({
		type: 'post',
		async: false,
		dataType: 'html',
		url: "comm_checkObjAmount.html",
		data: data,
		success: function(result){
			if(result == 0){
				$("#" + objId + "Label").text("");
				falg = true;
			}
			else if(result >0){
				$("#" + objId + "Label").text(propertyName+"已使用！");
				falg = false;
				$("#"+objId).focus();
				var api = frameElement.api, W = api.opener;	
				W.$.dialog.notice({ 
					title: '操作结果', 
					width: 220,
					height: 50,
					content: propertyName + "已存在！", 
					time: 2 
				});
			}
		
		},
		error : function(result){
			alert(result);
		}
	});
	return falg;
};