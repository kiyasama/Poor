//窗体相关函数
function MaskDiv() {//遮罩对象
    var div=document.createElement("Div");
    div.style.position="absolute";
    div.style.background="#919699";
    div.style.filter="alpha(opacity=50)";
    div.style.opacity="0.5";
    div.style.left="0px";
    div.style.top="0px";
    div.style.zIndex="100";
    //    div.style.width = document.documentElement.clientWidth+"px";
    //    div.style.height = document.documentElement.clientHeight + "px";
    div.style.width="100%";
    div.style.height="100%";
    div.Visible=false;
    div.show=function (obj) {
        if(!div.Visible) {
            if(obj) {
                obj.appendChild(div);
            } else {
                document.body.appendChild(div);
            }
            div.Visible=true;
            if(SysType== -1) {//判断是否IE6
                div.style.height=document.documentElement.clientHeight+"px";
            }
        }
    }
    div.hide=function (obj) {
        if(div.Visible) {
            div.parentNode.removeChild(div);
            div.Visible=false;
        }
    }
    return div;
}

var WindowIdNum = 0;
function BaseWindow(title,con,w,h) {//非模态弹出窗体对象
    this.cusId="cw"+WindowIdNum++;
    eval("document.body."+this.cusId+"=this");
    this.OffsetX=12;
    this.OffsetY=12;
    this.titleStr=title;
    this.content=con;
    this.width=w;
    this.height=h;
    var div=document.createElement("Div");
    this.div=div;
    this.div.style.position="absolute";
    this.div.style.filter="alpha(opacity=100)";
    this.div.className="hiwindow";

    this.titleDiv=document.createElement("Div");
    div.appendChild(this.titleDiv);
    div.titleDiv=this.titleDiv;
    this.titleDiv.innerHTML="<table width='100%' cellspacing='0' cellpadding='0' style='cursor:move;'><tr><td style='width:100%;'><div class='hiwindow_title'>"+title+"</div></td>"
                            +"<td><a class='btn btn_max' href='javascript:void(0)'></a></td>"
                            +"<td><a class='btn btn_close' href='javascript:void(0)'></a></td></tr></table>";

    this.titleTxtDiv=this.titleDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
    this.contentDiv=document.createElement("Div");
    this.contentDiv.className="hiwindow_content";
    this.div.appendChild(this.contentDiv);
    div.contentDiv=this.contentDiv;
    this.contentDiv.innerHTML=this.content;
    this.setSize=function (w,h) {
        this.div.style.left=(document.documentElement.clientWidth-w)/2+"px";
        this.div.style.top=(document.documentElement.clientHeight-h)/2+"px";
        this.div.style.width=w-this.OffsetX+"px";
        this.div.style.height=h-this.OffsetY+"px";
        this.contentDiv.style.height=h-36+"px";
    }
    this.setContent=function (str) {
        this.contentDiv.innerHTML=str;
    }
    this.setTitle=function (str) {
        this.titleTxtDiv.innerHTML=str;
    }
    this.show=function () {
        this.setSize(this.width,this.height);
        if(!document.body.contains(this.div)) {
            document.body.appendChild(this.div);
        }
        this.div.style.display="block";
        div.maxBtn.className="btn btn_max";
        this.isMax=false;
    }
    this.hide=function () {
        this.div.style.display="none";
    }
    this.isMax=false;
    div.maxBtn=this.titleDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
    div.closeBtn=this.titleDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0];
    div.root=this;
    this.max=function (p) {
        if(this.isMax) {
            div.root.setSize(div.root.width,div.root.height);
            div.maxBtn.className="btn btn_max";
        } else {
            div.root.setSize(document.documentElement.clientWidth,document.documentElement.clientHeight);
            div.maxBtn.className="btn btn_restore";
        }
        this.isMax=!this.isMax;
    }
    this.close=function () {
        div.parentNode.removeChild(div);
    }
    addEvent(div.titleDiv,"dblclick",div.root.max);
    addEvent(div.maxBtn,"click",div.root.max);
    addEvent(div.closeBtn,"click",div.root.close);

    div.ismove=false;
    div.pElment=document.body;
    div.startDrag=function (evt) {
        div.ismove=true;
        evt=evt?evt:window.event;
        div.tx=evt.clientX-parseInt(div.style.left);
        div.ty=evt.clientY-parseInt(div.style.top);

        addEvent(div.pElment,"mousemove",div.draging);
        addEvent(div.pElment,"mouseup",div.endDrag);
        if (window.event) {
        	evt.cancelBubble=true;
        } else {
        	//在基于firefox内核的浏览器中支持做法stopPropagation  
        	evt.stopPropagation();
        }
    }
    div.draging=function (evt) {
        if(evt.clientX>20&&evt.clientY>20&&evt.clientX<div.pElment.offsetWidth-20&&evt.clientY<div.pElment.offsetHeight-20) {
            div.style.left=evt.clientX-div.tx+"px";
            div.style.top=evt.clientY-div.ty+"px";
            div.x=div.style.left;
            div.y=div.style.top;
        } else {
            div.endDrag(evt);
        }
    }
    div.endDrag=function (evt) {
        div.ismove=false;
        removeEvent(div.pElment,"mousemove",div.draging);
        removeEvent(div.pElment,"mouseup",div.endDrag);
    }
    addEvent(div.childNodes[0].childNodes[0].childNodes[0].childNodes[0],"mousedown",div.startDrag);

}

function ModalWindow(title,con,w,h) {
    BaseWindow.call(this,title,con,w,h);
    var mask=new MaskDiv();
    this.mask=mask;
    this.show=function (obj) {
        if(obj) { this.obj=obj; }
        this.mask.show(this.obj);
        this.setSize(this.width,this.height);
        if(!this.obj.contains(this.div)) {
            this.obj.appendChild(this.div);
        }
        this.div.style.display="block";
        this.div.maxBtn.className="btn btn_max";
        this.isMax=false;
    }
    this.hide=function () {
        this.mask.hide(this.obj);
        this.div.style.display="none";
    }
    this.obj=document.body;
    this.close=function () {
        this.mask.hide(this.obj);
        this.obj.removeChild(this.div);

        if(this.onClose) {
            this.onClose();
        }
    }
    this.onClose=null;
    var root=this;
    addEvent(this.div.closeBtn,"click",function () {
        mask.hide();
        if(root.onClose) {
            root.onClose();
        }
    });

}


