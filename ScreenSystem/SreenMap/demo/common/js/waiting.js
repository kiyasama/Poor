//等候对象
function Waiting() {//等候对象
    var div=document.createElement("Div");
    div.style.position="absolute";
    div.style.background="#919699";
    div.style.filter="alpha(opacity=10)";
    div.style.opacity="0.1";
    div.style.left="0px";
    div.style.top="0px";
    div.style.width="100%";
    div.style.height="100%";
    div.Visible=false;
    div.icon=document.createElement("span");
    div.icon.className="largewait";
    div.show=function (obj) {
        if(!div.Visible) {
            if(!obj) {
                obj=document.body;
            }
            div.icon.style.left=obj.offsetWidth/2+"px";
            div.icon.style.top=obj.offsetHeight/2+"px";
            obj.appendChild(div.icon);
            //            obj.appendChild(div);
            div.Visible=true;
        }
    }
    div.hide=function (obj) {
        if(div.Visible) {
            if(!obj) {
                obj=document.body;
            }
            obj.removeChild(div.icon);
            //            obj.removeChild(div);
            div.Visible=false;
        }
    }
    return div;
}


