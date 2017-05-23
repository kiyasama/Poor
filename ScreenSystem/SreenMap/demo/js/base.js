//浏览器判断
var SysType=2;//-1为IE6,1为IE，2为Mozilla内核，3为ipad版safari，4为Opera内核,5为Firefox，6为Firefox,7为Chrome
var ua=navigator.userAgent.toLowerCase();
if(window.ActiveXObject) {
    SysType=1;
    if(! -[1,]&&!window.XMLHttpRequest) {
        SysType=-1;
    }
}else if(ua.indexOf("opera")>0) {
    SysType=4;
} else if(ua.indexOf("safari")>0) {
    if(ua.indexOf("ipad")>0) {
        SysType=3;
    } else {
        SysType=6;
    }
} else if(ua.indexOf("firefox")>0) {
    SysType=5;
} else if(ua.indexOf("chrome")>0) {
    SysType=7;
};

function e(id) { return document.getElementById(id); };

function getQueryString(para) {//解析参数
    var retval="";
    var s=location.search.replace("?","");
    if(s=="") return "";s=s.split("&");
    for(var i=0;i<s.length;i++)
        if(s[i].toUpperCase().indexOf(para.toUpperCase()+"=")==0)
            retval+=((retval==""?"":", ")+s[i].substr(s[i].indexOf("=")+1,s[i].length));
    return retval;
};
function getUrlValue(para,str) {//解析参数
    var retval="";
    var s=str;
    if(s=="") return "";s=s.split("&");
    for(var i=0;i<s.length;i++)
        if(s[i].toUpperCase().indexOf(para.toUpperCase()+"=")==0)
            retval+=((retval==""?"":", ")+s[i].substr(s[i].indexOf("=")+1,s[i].length));
    return retval;
};

function addEvent(obj,evtype,fn,useCapture) {
    if(obj.addEventListener) {
        obj.addEventListener(evtype,fn,useCapture);
    } else {
        obj.attachEvent("on"+evtype,fn);//IE不支持事件捕获  
    }
};
function removeEvent(obj,evtype,fn,useCapture) {
    if(obj.removeEventListener) {
        obj.removeEventListener(evtype,fn,useCapture);
    } else {
        obj.detachEvent("on"+evtype,fn);
    }
};

//操作cookie相关
function getCookie(name) {
    var mycookie=document.cookie;
    var start1=mycookie.indexOf(name+'=');
    var value=null;
    if(start1== -1) {
        return null;
    } else {
        var start=mycookie.indexOf('=',start1)+1;
        var end=mycookie.indexOf(';',start);
        if(end== -1) {
            end=mycookie.length;
        }
        value=unescape(mycookie.substring(start,end));
    }
    return value;
};
function setCookie(name,value,expireseconds) {
    var expireDate=new Date();
    if(expireseconds) {
        expireDate.setTime(expireDate.getTime()+expireseconds*24*60*60*1000);  //计算出一天的毫秒数
    }
    document.cookie=name+'='+escape(value)+';expires='+expireDate.toGMTString();
};
function delCookie(name) {
    var value=getCookie(name);
    if(value) {
        var expireDate=new Date();
        expireDate.setTime(expireDate.getTime()-1);
        document.cookie=name+'='+value+';expires='+expireDate.toGMTString();
    }
};

function Extends(ChildClass,BaseClass) {
    if(arguments.length>=7) {
        throw new Error('Only can supprot at most 5 parameters.');
    }
    var base;
    if(arguments.length>1) {
        var arg01=arguments[2];
        var arg02=arguments[3];
        var arg03=arguments[4];
        var arg04=arguments[5];
        base=new BaseClass(arg01,arg02,arg03,arg04);
    } else {
        if(BaseClass) {
            base=new BaseClass();
        }
    }
    for(var key in base) {
        if(!ChildClass[key]) {
            ChildClass[key]=base[key];
            if(typeof (base[key])!='function') {
                delete base[key];
            }
        }
    }
    ChildClass.base=base;
};

function bindingEnumToSelect(selectID,enumObj) {
    if(enumObj) {
        var objSelect=document.getElementById(selectID);
        for(var n in enumObj) {
            if(typeof (enumObj[n])!="function") {
                var Item=new Option(enumObj[n],n);
                Item.title=enumObj[n];
                objSelect.options.add(Item);
            }
        }
    }
};

//基本函数
function getLength(s) {//获取字符串的真实长度，用于计算一段文字的像素长度
    var arr=s.match(/[^\x00-\xff]/ig);
    return s.length+(arr==null?0:arr.length);
};

function trim(str) { return str.replace(/[ ]/g,"").replace(/[　]/g,""); };

function clearSelectItem(id) {//为select添加内容，需要传入select的id和内容数组
    var objSelect=document.getElementById(id);
    if(objSelect) {
        objSelect.options.length=0;
//        for(var i=0;i<Items.length;i++) {
//            var Item=new Option(Items[i][1],Items[i][0]);
//            objSelect.options.add(Item);
//            objSelect.options[i].title=Items[i][1];
//        }
    }
};

function addSelectItem(id,Items) {//为select添加内容，需要传入select的id和内容数组
    if(Items) {
        var objSelect=document.getElementById(id);
        for(var i=0;i<Items.length;i++) {
            var Item=new Option(Items[i][1],Items[i][0]);
            objSelect.options.add(Item);
            objSelect.options[i].title=Items[i][1];            
        }
    }
};

function getInitMapCenterX() {
    return InitMapCenterX;
    
}
function getInitMapCenterY() {
     return InitMapCenterY;
    
}

function getInitMapLevel() {
    
    return InitMapLevel;
   
}
