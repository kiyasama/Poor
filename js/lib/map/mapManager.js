/*
 * 公用地图展示方法类
 * author:tangxuefeng
 * date:2015年7月3日09:47:16
 */
var MapManager = function() {
	this.map = null; // 地图对象
	this.mapLayerType = null; // 地图对象类型
	this.markers = null; // markers标注图层
	this.showlayer = null; // features标注图层
	this.markerOption = null; // 图片标注配置项
	this.popupOption = null; // 弹窗配置项
	this.styleMapOption = null; // 地图样式配置项
	this.drawControls = null; // 标注绘制处理器集合
	this.modifyControl = null; // 拖拽处理器
	this.drawlayer = null; // 绘制图层
	this.isHovered = true; // 是否能后期处理
	this.circleGeo=null;//绘制圆返回的对象
};

MapManager.prototype.setMap = function($map) {
	this.map = $map;
}

MapManager.prototype.getMap = function() {
	return this.map;
}

MapManager.prototype.setMapLayerType = function($mapLayerType) {
	this.mapLayerType = $mapLayerType;
}

MapManager.prototype.getMapLayerType = function() {
	return this.mapLayerType;
}

MapManager.prototype.setShowlayer = function($showlayer) {
	this.showlayer = $showlayer;
}

MapManager.prototype.getShowlayer = function() {
	return this.showlayer;
}

MapManager.prototype.setMarkerOption = function($markerOption) {
	this.markerOption = $.extend({
		id:'' ,//id
		title: '', // 标注名称
		x: '', // 标注x坐标
		y: '', // 标注y坐标
		iconUrl: '', // 图标资源地址
		width: 50, // 图标宽度
		height: 50 // 图标高度
	}, $markerOption || {});
}

MapManager.prototype.getMarkerOption = function() {
	return this.markerOption;
}

MapManager.prototype.setPopupOption = function($popupOption) {
	var size = new OMAP.Size(24, 33);
	var offset = new OMAP.Pixel(-(size.w/2), -size.h);
	var icon = new OMAP.Icon('/gis/images/front/common/pin.png', size, offset);
	var popupClass = OMAP.Class(OMAP.Popup.CSSFramedCloud, { 'autoSize': true });
	
	this.popupOption = $.extend({
		id: '', //id
		title: '', // 标注名称
		x: '',
		y: '',
		width: '',
		height: '',
		popupClass: popupClass,
		icon: icon,
	    contentHTML: '',
		closeBox: true,
		overflow: true
	}, $popupOption || {});
}

MapManager.prototype.getPopupOption = function() {
	return this.popupOption;
}

MapManager.prototype.setStyleMapOption = function($styleMapOption) {
	this.styleMapOption = $.extend({
		// 线条
		stroke : true,
        strokeColor: "#ee9900",
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeLinecap: "round",
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        
        // 填充
        fill : true,
        fillColor: "#ee9900",
        fillOpacity: 0.4,
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        
        //
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "inherit",
        
        // 图片
        graphic: true,
        graphicName: '',
        graphicTitle: '',
        graphicWidth: 18,
        graphicHeight: 22,
        graphicOpacity: 1,
        graphicXOffset: -9,
        graphicYOffset: -22,
        externalGraphic : '/gis/images/front/common/pin.png',
        
        // 文字
        label : "${title}",
	    fontColor: "#000000",
	    fontSize: "20px",
	    labelAlign:"lb",
    	labelOutlineColor: "white",
    	labelOutlineWidth: 3
	}, $styleMapOption || {});
}

MapManager.prototype.getStyleMapOption = function() {
	return this.styleMapOption;
}

MapManager.prototype.setDrawControls = function($drawControls) {
	if(this.map == null || typeof(this.map) == 'undefined') return;
	if(this.showlayer == null || typeof(this.showlayer) == 'undefined') return;
	if($drawControls == null || typeof($drawControls) == 'undefined' || $drawControls.length == 0){
		// 创建控制器
		this.drawControls = {
	        point: new OMAP.Control.DrawFeature(this.showlayer, OMAP.Handler.Point),
	        line: new OMAP.Control.DrawFeature(this.showlayer, OMAP.Handler.Path),
	        polygon: new OMAP.Control.DrawFeature(this.showlayer, OMAP.Handler.Polygon)
	    };
	} else {
		this.drawControls = $drawControls;
	}
}

MapManager.prototype.getDrawControls = function() {
	return this.drawControls;
}

MapManager.prototype.setModifyControl = function($modifyControl) {
	if(this.map == null || typeof(this.map) == 'undefined') return;
	if(this.showlayer == null || typeof(this.showlayer) == 'undefined') return;
	if($modifyControl == null || typeof($modifyControl) == 'undefined'){
		// 创建控制器
		this.modifyControl = new OMAP.Control.ModifyFeature(this.showlayer);
	} else {
		this.modifyControl = $modifyControl;
	}
}

MapManager.prototype.getModifyControl = function() {
	return this.modifyControl;
}

/** 初始化地图管理控件 */
MapManager.prototype.init = function($map, $marktype, $styleMapOpt) {
	this.setMap($map); // 设置地图对象
	this.setMapLayerType($map.layers[0].CLASS_NAME); // 保存地图的基础图层的类型
	this.setStyleMapOption($styleMapOpt); // 设置标注样式
	if(typeof($marktype) != 'undefined' && $marktype != null && $marktype != ''){ // 如果指定了标注绘制类型
		// 加入图层
		this.checkAndSetShowLayer(); // Feature标注层
		this.checkAndSetMarkersLayer(); // Marker标注层
		// 加入图层控制器
		this.setDrawControls(); // 设置标注绘制控制器
		this.setModifyControl(); // 设置标注拖拽控制器
		this.addDrawControls(); // 标注绘制控制器
		this.addModifyControl(); // 标注拖拽控制器
		// 设置地图操作模式
		this.choiceLayerView($marktype); 
	}
	else {
		var style = {
				fill : true,
				fillColor : 'green',
				fillOpacity : 0.5,
				strokeOpacity : 1,
				stroke : true,
				strokeColor : 'green',
				graphic : false
		};
		// 加入图层
		this.checkAndSetShowLayer(style);
		this.checkAndSetDrawLayer();
	}
};

MapManager.prototype.checkAndSetMarkersLayer = function() {
	if(this.map == null || typeof(this.map) == 'undefined') return;
	if (this.markers == null || typeof(this.markers) == 'undefined') {
		this.markers = new OMAP.Layer.Markers("标注");
		this.map.addLayer(this.markers);
	}
}

MapManager.prototype.checkAndSetShowLayer = function($styleMapOption) {
	if(this.map == null || typeof(this.map) == 'undefined') return;
	if (this.showlayer == null || typeof(this.showlayer) == 'undefined') {
		if($styleMapOption == null || typeof($styleMapOption) == 'undefined'){
			this.showlayer = new OMAP.Layer.Vector("标注图层", { 
//				style: this.styleMapOption 
				styleMap: new OMAP.StyleMap({'default': this.styleMapOption})
			});
		}
		else {
			this.showlayer = new OMAP.Layer.Vector("标注图层", { 
//				style: $styleMapOption 
				styleMap: new OMAP.StyleMap({'default': $styleMapOption})
			});
		}
		this.map.addLayer(this.showlayer);
	}
}

MapManager.prototype.checkAndSetDrawLayer = function($styleMapOption) {
	if(this.map == null || typeof(this.map) == 'undefined') return;
	if(this.drawlayer == null){
		if($styleMapOption == null || typeof($styleMapOption) == 'undefined'){
			var context = {  
	                getFillColor: function (feature) {  
	                    return feature.attributes["fillcolor"];  
	                },  
	                getStrokeWidth: function (feature) {  
	                    return feature.attributes["strokeweight"];  
	                },
	                getStrokeColor: function (feature) {  
	                    return feature.attributes["strokecolor"];  
	                },
	                getFillOpacity: function (feature) {  
	                    return feature.attributes["fillopacity"];  
	                }
	            }; 
	        var template = {  
	                strokeWidth: "${getStrokeWidth}",  
	                fillColor: "${getFillColor}",
	                strokeColor: "${getStrokeColor}",
	                fillOpacity : "${getFillOpacity}",
	                strokeOpacity : 1,
	                label : "${title}",
	                fontColor: "#000000"
	        }; 
	        var style = new OMAP.Style(template, { context: context });  
	        this.drawlayer = new OMAP.Layer.Vector("drawLayer", { 
//	        	style: style 
	        	styleMap: new OMAP.StyleMap({'default': style})
	        });
		}
		else {
			this.drawlayer = new OMAP.Layer.Vector("drawLayer", { 
//				style: $styleMapOption 
				styleMap: new OMAP.StyleMap({'default': $styleMapOption})
			});
		}
		this.map.addLayer(this.drawlayer); 
	}
}

/** 添加标注绘制控制 */
MapManager.prototype.addDrawControls = function() {
	if(this.map == null || typeof(this.map) == 'undefined') return;
	if(this.showlayer == null || typeof(this.showlayer) == 'undefined') return;
	if(this.drawControls == null || typeof(this.drawControls) == 'undefined') return;
	// 遍历处理控制器，并加载到地图中
	for(var key in this.drawControls) {
		var control = this.drawControls[key];
		this.map.addControl(control);
		this.handleControl(control);
    }
}

/** 处理控制器 */
MapManager.prototype.handleControl = function($control) {
	if($control == null || typeof($control) == 'undefined') return;
	var me = this;
	$control.events.on({
		"featureadded" : function(evt) { // 画完标注后的处理
			me.showlayer.removeAllFeatures();
			var geometry = evt.feature.geometry;
			me.setLabelCoord(geometry);
			this.deactivate();  // 禁用对应处理器
			me.modifyControl.activate(); // 激活拖拽处理器
		}
	});
}

/** 添加标注拖拽控制 */
MapManager.prototype.addModifyControl = function() {
	if(this.map == null || typeof(this.map) == 'undefined') return;
	if(this.showlayer == null || typeof(this.showlayer) == 'undefined') return;
	if(this.modifyControl == null || typeof(this.modifyControl) == 'undefined') return;
	this.map.addControl(this.modifyControl);
	this.modifyControl.mode = OMAP.Control.ModifyFeature.RESHAPE | OMAP.Control.ModifyFeature.DRAG;

	var me = this;
	this.showlayer.events.on({
		"afterfeaturemodified" : function(evt) {
			var geometry = evt.feature.geometry;
			me.setLabelCoord(geometry);
		}
	});
	this.modifyControl.activate();
}

/** 激活拖拽处理器 */
MapManager.prototype.activateModifyControl = function() {
	this.modifyControl.activate();
}

/** 禁用拖拽处理器 */
MapManager.prototype.deactivateModifyControl = function() {
	this.modifyControl.deactivate(); 
}

/** 变更标注形式 */
MapManager.prototype.choiceLayerView = function($value) {
	if(this.modifyControl != null) this.deactivateModifyControl(); // 禁用拖拽控制器
	this.removeAllFeatures(); // 清除所有标注
	
	// 转换对应类型
	var marktype = '';
	if($value == 1){
		marktype = 'point';
	}
	else if($value == 2){
		marktype = 'line';
	}
	else if($value == 3){
		marktype = 'polygon';
	}
	
	// 遍历处理控制器，只激活对应控制器
    for(key in this.drawControls) {
        var control = this.drawControls[key];
        if(marktype == key) {
            control.activate();
        } 
        else {
            control.deactivate();
        }
    }
}

/** 设置地图的缩放级别和中心点 */
MapManager.prototype.zoomAndCenter = function(x, y, lvl) {
	if(this.map == null || typeof(this.map) == 'undefined' ) return;
	if(x == '' || y == '') return;
	var xys = this.isNeedTransform(x, y);
	x = xys[0];
	y = xys[1];
	
	x = parseFloat(x);
	y = parseFloat(y);
	if (lvl == null) {
		lvl = 4;
	} 
	else {
		lvl = parseInt(lvl);
	}
	var center = new OMAP.LonLat(x, y);
	this.map.setCenter(center, lvl, false, false);
};

MapManager.prototype.zoomTo = function(lvl) {
	if (lvl == null) {
		lvl = 4;
	} 
	this.map.zoomTo(lvl);
};

/** 标注位置信息处理 */
MapManager.prototype.setLabelCoord = function(geometry) {
	if(geometry == null || typeof(geometry) == 'undefined') return;
	
	if(geometry.CLASS_NAME == "OMAP.Geometry.Point") {
		this.setMarkerCoord(geometry);
	}
	else if(geometry.CLASS_NAME == "OMAP.Geometry.LineString"){
		this.setPolylineCoord(geometry);
	}
	else if(geometry.CLASS_NAME == "OMAP.Geometry.Polygon" || geometry.CLASS_NAME == "OMAP.Geometry.LineRing") {
		this.setPolygonCoord(geometry);
	}
}
	
/** 处理点标注 */
MapManager.prototype.setMarkerCoord = function(geometry){
	this.removeShowLayerAllFeatures();
	if(geometry == null || typeof(geometry) == 'undefined') return;
	
	var x = geometry.x.toFixed(7); // 保留小数点后7位
	var y = geometry.y.toFixed(7);
	this.drawFeaturesByCoord(x, y, 1);
	
	if(typeof setPointCoord != 'undefined' && setPointCoord instanceof Function) {
		setPointCoord(x, y); 
	}
}

/** 处理线标注 */
MapManager.prototype.setPolylineCoord = function(geometry){
	this.removeShowLayerAllFeatures();
	if(geometry == null || geometry.components == null || geometry.components.length == 0) return;
	
	var x = "", y = "", xss = "", yss = "";
	var centerPt = geometry.getCentroid();
	x = centerPt.x.toFixed(7);
	y = centerPt.y.toFixed(7);
	
	var pts = geometry.components;
	if(pts == null) return;
	for(var i=0; i< pts.length; i++){
		var pt = pts[i];
		if(i == 0){
			xss = pt.x.toFixed(7);
			yss = pt.y;
		}
		else {
			xss += "," + pt.x.toFixed(7);
			yss += "," + pt.y.toFixed(7);
		};
	}
	this.drawFeaturesByCoord(xss, yss, 2);
	
	if(typeof setLineCoord != 'undefined' && setLineCoord instanceof Function) {        
		setLineCoord(x, y, xss, yss, pts); 
	}
}

/** 处理面标注 */
MapManager.prototype.setPolygonCoord = function(geometry){
	this.removeShowLayerAllFeatures();
	if(geometry == null || geometry.components == null || geometry.components.length == 0) return;
	
	var x = "", y = "", xss = "", yss = "";
	var centerPt = geometry.getCentroid();
	x = centerPt.x.toFixed(7);
	y = centerPt.y.toFixed(7);
	
	var lingRing = geometry.components[0];
	var pts = lingRing.components;
	if(pts == null) return;
	for(var i=0; i< pts.length; i++){
		var pt = pts[i];
		if(i == 0){
			xss = pt.x.toFixed(7);
			yss = pt.y;
		}
		else {
			xss += "," + pt.x.toFixed(7);
			yss += "," + pt.y.toFixed(7);
		};
	}
	this.drawFeaturesByCoord(xss, yss, 3);

	if(typeof setPolygonCoord != 'undefined' && setPolygonCoord instanceof Function) {        
		setPolygonCoord(x, y, xss, yss, pts); 
	}
}

/**
   定制型创建标注
 * **/
MapManager.prototype.addUserPop = function(arr,type){
	var html ='';
	if(type=='numberSign'){   //数字型标注
		if(arr != null && arr.length>0){
			for(var i=0; i<arr.length;i++){
				var html ='<div style="height:60px;;width:70px;background-image:url(\'/api/img/cloudNum.png\');'
					+' background-repeat:no-repeat;position:relative;">'
					+'<div style="cursor:pointer;width:70px;height:60px;color:#ffffff;font-size:15px;line-height:60px;text-align:center;"'
					+' onclick =""><strong>'
					+arr[i].num+'</strong></div></div>';
				var pop = this.createPop(arr[i].id ,html,arr[i].x,arr[i].y,-58,-60,0);
			}
			this.go2xy(arr[0].x,arr[0].y);
		}
	}
}

/**绘制圆**/
MapManager.prototype.drawCircle = function(mycallback){
	var me = this;
	var gPolygon = null;
	if (!me.drawlayer.circlehandler) {
	    var layerCircleControl = new OMAP.Control();  
	    OMAP.Util.extend(layerCircleControl, {  
	        draw : function() {
	            me.drawlayer.circlehandler = new OMAP.Handler.Box(layerCircleControl, null, {  
	                startBox: null,  
	                moveBox:function(xy){  
	                    var start = me.map.getLonLatFromPixel(this.dragHandler.start);  
	                    var last = me.map.getLonLatFromPixel(xy);  
	                    var width = Math.abs(start.lon-last.lon);  
	                    var height = Math.abs(start.lat-last.lat);  
	                    var radius,originX,originY;  
	                    if(width <= height){  
	                        radius = width/2;  
	                        originX = start.lon+(last.lon-start.lon)/2;  
	                        if(start.lat - last.lat <= 0){  
	                            originY = start.lat + radius;  
	                        }else{  
	                            originY = start.lat - radius;  
	                        }  
	                    }else{  
	                        radius = height/2;  
	                        if(start.lon - last.lon <=0){  
	                            originX = start.lon + radius;  
	                        }else{  
	                            originX = start.lon - radius;  
	                        }  
	                        originY = start.lat+(last.lat-start.lat)/2;  
	                    }  
	                    var origin = new OMAP.Geometry.Point(originX,originY);  
	                    var feature = OMAP.Geometry.Polygon.createRegularPolygon(origin, radius, 40, 0);  
	                    if(gPolygon){  
	                        me.drawlayer.destroyFeatures(gPolygon);  
	                        gPolygon = null;  
	                    }                       
	                    gPolygon = new OMAP.Feature.Vector(feature, null,{
							fill : true,
							fillColor : '#ffff99',
							fillOpacity : 0.5,
							strokeOpacity : 1,
							stroke : true,
							strokeColor : '#7272ff',
							graphic : false
						});  
	                    if(!gPolygon){  
	                        return;  
	                    }  
	                    me.drawlayer.addFeatures([gPolygon]);  
	                },  
	                endBox: function(){  
	                    //将gPolygon作为参数执行业务方法    
//		                	if(typeof setCircleCoor != 'undefined' && setCircleCoor instanceof Function) {
	                	    if(mycallback) {        
	                	    	mycallback(gPolygon.geometry); 
	                		}
		                	me.drawlayer.circlehandler.deactivate();
						},  
	                removeBox: function(){  
	                    if(gPolygon){  
	                        me.drawlayer.destroyFeatures(gPolygon);  
	                        gPolygon = null;  
	                    }  
	                }  
	            });  
	        }  
	    });  
	    me.map.addControl(layerCircleControl);  
	    var handler = me.drawlayer.circlehandler.dragHandler;  
	            handler.dragstart = function(evt){  
	                var propagate = true;  
	                handler.dragging = false;  
	                if (handler.checkModifiers(evt) && (OMAP.Event.isLeftClick(evt) ||  
	                        OMAP.Event.isSingleTouch(evt))) {  
	                    handler.started = true;  
	                    handler.start = evt.xy;
	                    handler.last = evt.xy;
	                        OMAP.Element.addClass(handler.map.viewPortDiv, "olDragDown");  
	                        handler.down(evt);  
	                        handler.callback("down", [evt.xy]);  
	                        OMAP.Event.preventDefault(evt);  
	                        if(!handler.oldOnselectstart) {  
	                        handler.oldOnselectstart = document.onselectstart ? document.onselectstart : OMAP.Function.True;  
	                        }  
	                        document.onselectstart = OMAP.Function.False;  
	                        propagate = !handler.stopDown;  
	                }  
	                return propagate;  
	            }  
	}
//	me.drawlayer.events.on({
//		"afterfeaturemodified" : function(evt) {
//			alert('34234');
//			me.setCircleCoor(gPolygon.geometry);
//			me.drawlayer.circlehandler.deactivate();
//		}
//	});
	me.drawlayer.circlehandler.activate();
}

/** 根据传入的位置与标注类型创建标注 */
MapManager.prototype.drawFeaturesByCoord = function(objX, objY, marktype, pid){
	if (this.showlayer == null || typeof(this.showlayer) == 'undefined') return;
	var xys = this.isNeedTransform(objX, objY);
	objX = xys[0];
	objY = xys[1];
	
	var object = null;
	var typestr = '';
	if(marktype == '1'){
		object = new OMAP.Geometry.Point(objX, objY);
		typestr = 'Point_';
	}
	else if(marktype == '2'){
		object = OMAP.MapLib.createPolyline(objX, objY);
		typestr = 'Line_';
	}
	else if(marktype == '3'){
		object = OMAP.MapLib.createPolygon(objX, objY);
		typestr = 'Polygon_';
	}
	
	var feature = new OMAP.Feature.Vector(object);
	feature.attributes.pid = typestr + pid;
	feature.attributes.title = "";
	this.showlayer.addFeatures([feature]);
}

/** 创建文本Feature标注 */
MapManager.prototype.drawText = function(x, y, pid, title) {
	if (this.showlayer == null || typeof(this.showlayer) == 'undefined') return;
	x = parseFloat(x);
	y = parseFloat(y);
	var xys = this.isNeedTransform(x, y);
	x = xys[0];
	y = xys[1];
	var point = new OMAP.Geometry.Point(x, y);
	var feature = new OMAP.Feature.Vector(point);
	feature.attributes.pid = pid;
	feature.attributes.title = title;
	this.showlayer.addFeatures([feature]);
	return feature;
}

/** 创建图片Feature标注 */
MapManager.prototype.drawMarker = function(x, y, iconUrl, pid, title) {
	if (this.showlayer == null || typeof(this.showlayer) == 'undefined') return;
	if(iconUrl == null || iconUrl == '' || typeof(iconUrl) == 'undefined'){
		iconUrl = this.getStyleMapOption().externalGraphic;
	}
	x = parseFloat(x);
	y = parseFloat(y);
	var xys = this.isNeedTransform(x, y);
	x = xys[0];
	y = xys[1];
	var point = new OMAP.Geometry.Point(x, y);
	var style = {
		graphic: true,
		graphicWidth: 24,
		graphicHeight: 33,
		graphicOpacity: 1,
		graphicXOffset: -12,
		graphicYOffset: -33,
		graphicTitle: name,
		externalGraphic: iconUrl
	};
	var feature = new OMAP.Feature.Vector(point, null, style);
	feature.attributes.pid = pid;
	feature.attributes.title = title;
	this.showlayer.addFeatures([feature]);
//	this.zoomAndCenter(x, y,this.map.getZoom());
	return feature;
};

/** 创建弹窗 */
MapManager.prototype.drawPopup = function($popupOption) {
	if(this.map == null || typeof(this.map) == 'undefined') return;
	this.setPopupOption($popupOption);
	var xys = this.isNeedTransform(this.popupOption.x, this.popupOption.y);
	this.popupOption.x = xys[0];
	this.popupOption.y = xys[1];
	
	var lonLat = new OMAP.LonLat(this.popupOption.x, this.popupOption.y);
	var titleHTML = '<div class="popTitleDiv"><label class="popTitleText">' + this.popupOption.title + '</label></div>';
	var contentHTML = '<div class="popContectDiv"><label class="popContectText">' + this.popupOption.contentHTML + '</label></div>';
	var classDiv = '<div class="popFrameDiv" ';
	if(this.popupOption.width){
		classDiv += 'style="width:'+this.popupOption.width+';height:'+this.popupOption.height+';" ';
	}
	classDiv += '>';
	
	var popup = new OMAP.Popup.CSSFramedCloud(
			"popup_" + this.popupOption.id, lonLat, null,
			classDiv + titleHTML + contentHTML + '</div>',
            null, this.popupOption.closeBox, 
            function(evt){ this.destroy(); }
	);
	this.map.addPopup(popup);
	return popup;
}

/** 设置并返回iframe内容 */
MapManager.prototype.createIFrameContent = function($iframeOption) {
	return '<iframe frameborder="0" class="popIFrame" style="width:' 
			+ $iframeOption.width + 'px;height:' + $iframeOption.height + 'px;" '
			+ 'src="' + $iframeOption.url + '"></iframe>';
}

/** 返回指定Feature标注 */
MapManager.prototype.getFeatureById = function($featureId) {
	if(this.showlayer == null || typeof(this.showlayer) == 'undefined') return null; 
	if($featureId == null || typeof($featureId) == 'undefined') return null;
	for(var i=0; i< this.showlayer.features.length; i++){
		var feature = this.showlayer.features[i];
		if(feature.attributes.pid == $featureId){
			return feature;
		}
	}
	return null;
}

/** 返回指定弹窗对象 */
MapManager.prototype.getPopupById = function($popupId) {
	if(this.map == null || typeof(this.map) == 'undefined') return null;
	if($popupId == null || typeof($popupId) == 'undefined') return null;
	for(var i=0; i< this.map.popups.length; i++){
		var popup = this.map.popups[i];
		if(popup.id == 'popup_' + $popupId){
			return popup;
		}
	}
	return null;
}

/** 移除所有Feature标注 */
MapManager.prototype.removeAllFeatures = function() {
	if(this.showlayer != null && typeof(this.showlayer) != 'undefined'){
		var features = this.showlayer.features;
		if(features != null && features.length>0){
			for(var i = features.length-1 ; i>=0; i--){
				features[i].destroy();
			}
		}
		this.showlayer.removeAllFeatures();
	}
	if(this.drawlayer != null && typeof(this.drawlayer) != 'undefined'){
		var features = this.drawlayer.features;
//		this.drawlayer.removeFeatures(features);
		if(features != null && features.length>0){
			for(var i = features.length-1 ; i>=0; i--){
				features[i].destroy();
			}
//			for(var index in features){
//				features[index].destroy();
//			}
		}
//		this.drawlayer.removeAllFeatures();
	}
	
	// 调用外部自定义清理坐标信息方法
	if(typeof cleanFeature != 'undefined' && cleanFeature instanceof Function) {        
		cleanFeature(); 
	}
}

/** 移除drawlayer所有Feature标注 */
MapManager.prototype.removeDrawLayerAllFeatures = function() {
	if(this.drawlayer != null && typeof(this.drawlayer) != 'undefined'){
		this.drawlayer.removeAllFeatures();
	}
}

/** 移除showlayer所有Feature标注 */
MapManager.prototype.removeShowLayerAllFeatures = function() {
	if(this.showlayer != null && typeof(this.showlayer) != 'undefined'){
		this.showlayer.removeAllFeatures();
	}
}

/** 移除所有Marker标注 */
MapManager.prototype.removeAllMarkers = function() {
	if(this.markers != null && typeof(this.markers) != 'undefined'){
		this.markers.clearMarkers();
	}

	// 调用外部自定义清理坐标信息方法
	if(typeof cleanMarker != 'undefined' && cleanMarker instanceof Function) {        
		cleanMarker(); 
	}
}

/** 移除所有弹窗 */
MapManager.prototype.removeAllPopups = function() {
	if(this.map != null && typeof(this.map) != 'undefined'){
		var popups = this.map.popups;
		if(popups != null && popups.length >0){
			for(var p = popups.length-1; p >= 0; p--){
//				popups[p].destroy();
				this.map.removePopup(popups[p]);
			}
		}
//		this.map.popups = [];
//		this.map.Renderer.Canvas.clear();
	}
	
	// 调用外部自定义清理坐标信息方法
	if(typeof cleanPopup != 'undefined' && cleanPopup instanceof Function) {        
		cleanPopup(); 
	}
}

/** 移除指定Feature标注 */
MapManager.prototype.removeFeature = function($feature) {
	if(this.showlayer != null && typeof(this.showlayer) != 'undefined' && $feature != null && typeof($feature) != 'undefined'){
		this.showlayer.removeFeatures([$feature]);
	}
}

/** 移除指定Marker标注 */
MapManager.prototype.removeMarker = function($marker) {
	if(this.markers != null && typeof(this.markers) != 'undefined' && $marker != null && typeof($marker) != 'undefined'){
		this.markers.removeMarker($marker);
	}
}

/** 移除指定弹窗 */
MapManager.prototype.removePopup = function($popup) {
	if(this.map != null && typeof(this.map) != 'undefined' && $popup != null && typeof($popup) != 'undefined'){
		this.map.removePopup($popup);
	}
}

/** 移除指定标注弹窗 */
MapManager.prototype.removeFeaturePopup = function($feature) {
	this.removePopup($feature.popup);
	this.removeMarker($feature.marker);
}

/** 移除所有标注 */
MapManager.prototype.allClean = function() {
	this.removeAllPopups();
	this.removeAllMarkers();
	this.removeAllFeatures();
	this.removeDrawLayerAllFeatures();
	this.removeShowLayerAllFeatures();
}

/** 页面等待 */
MapManager.prototype.pausePage = function(milliSeconds){    
    var resource;    
    var response;    
    if(typeof ActiveXObject == 'undefined'){        
        resource = new XMLHttpRequest();    
    } else{        
        resource = new ActiveXObject("Microsoft.XMLHTTP"); // IE   
    }     
    try{        
        resource.open('GET', 'comm_pausePage.html?sleepTime=' + milliSeconds, false);        
        resource.send(null);        
        response = resource.responseText;           
    } catch(e){        
//        alert(e);    
    }         
    return true;
}        

/** 随机生成颜色 */
MapManager.prototype.randomColor = function() {
    var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);
    if(rand.length == 6){
        return '#' + rand;
    }
    else{
        return this.randomColor();
    }
}

/** 坐标串转换 */
MapManager.prototype.XYSTransform = function($xs, $ys) {
	var xys = [], xs='', ys='';
	$xs += '';
	$ys += '';
	var xsArr = $xs.split(',');
	var ysArr = $ys.split(',');
	var point = null;
	
	for(var i=0; i< xsArr.length; i++){
		// 转换坐标
		if(parseFloat(xsArr[i]) > 1000) point = trans.OCN2WGS84(xsArr[i], ysArr[i]);
		else point = trans.WGS842OCN(xsArr[i], ysArr[i]);
		xs += point.x + ',';
		ys += point.y + ',';
	}
	xs = xs.substring(0, xs.length - 1); // 去掉结尾逗号
	ys = ys.substring(0, ys.length - 1);
	xys.push(xs);
	xys.push(ys);
	return xys;
}

/** 判断是否需要进行坐标串转换 */
MapManager.prototype.isNeedTransform = function($xs, $ys) {
	var xys = [];
	$xs += '';
	$ys += '';
	var xsArr = $xs.split(',');
	var ysArr = $ys.split(',');
	xys.push($xs);
	xys.push($ys);
	// 如果是OCN地图，但坐标是WGS84坐标系
	if(this.mapLayerType == 'OMAP.Layer.NOGISLayer' && parseFloat(xsArr[0]) < 1000){
		xys = this.XYSTransform($xs, $ys);
	}
	// 如果是天地图，但坐标是OCN坐标系
	if(this.mapLayerType == 'OMAP.Layer.XYTDTLayer' && parseFloat(xsArr[0]) > 1000){
		xys = this.XYSTransform($xs, $ys);
	}
	return xys;
}

/********************************  以下方法适应旧版操作  *****************************************/

// 得到地图当前中心点，返回值为 OMAP.LonLat 类型
MapManager.prototype.getCenter = function() {
	if(this.map == null || typeof(this.map) == 'undefined') return;
	return this.map.getExtent().getCenterLonLat();
};

//得到地图当前缩放等级
MapManager.prototype.getZoom = function() {
	if(this.map == null || typeof(this.map) == 'undefined') return;
	return this.map.getZoom();
};

MapManager.prototype.go2xy = function (x, y){
	if(this.map == null || typeof(this.map) == 'undefined') return;
	var xys = this.isNeedTransform(x, y);
	x = xys[0];
	y = xys[1];
	var zoom = this.map.getZoom();
	var center = new OMAP.LonLat(x, y);
	this.map.setCenter(center, zoom, false, false);
}

MapManager.prototype.createPop = function (id, html, x, y, xp, yp, zIndex){
	if(this.map == null || typeof(this.map) == 'undefined') return;
	var xys = this.isNeedTransform(x, y);
	x = xys[0];
	y = xys[1];
    var popup = new OMAP.Popup(id,
            new OMAP.LonLat(x, y),
            new OMAP.Size(100, 100),
            html,
            false,'',xp,yp);
    popup.setBackgroundColor("transparent");
    popup.autoSize=1;
    //popup.padding = new OMAP.Bounds(-50,0,0,-50);
    this.map.addPopup(popup);
    return popup;
}

MapManager.prototype.removeAllPop = function (){
	measure.clear();
	this.allClean();
}

MapManager.prototype.createIframePop = function (id, title , url, width, height, x, y){
	var iframe = this.createIFrameContent({
		url: url, 
		width: width, 
		height: height + 20
	});
	var xys = this.isNeedTransform(x, y);
	x = xys[0];
	y = xys[1];
	
	var popupOption = {
			id: id,
			x: x,
			y: y,
			width: width,
			height: height,
			title: title,
		    contentHTML: iframe
	}
	return this.drawPopup(popupOption);
}

MapManager.prototype.removePop = function (id){
	if(this.map != null && typeof(this.map) != 'undefined'){
		var popups = this.map.popups;
		for(var p in popups){
			var mypop = popups[p];
			if(mypop.id == id){
				this.map.removePopup(popups[p]);
			}
		}
	}
}

MapManager.prototype.drawLine = function(drawOption){
	if(this.drawlayer == null || typeof(this.drawlayer) == 'undefined') return;
	var polyline = null;
	var polygon = null;
	var typestr = 'line';
	var opacity = 0.4;
	var xys = this.isNeedTransform(drawOption.xs, drawOption.ys);
	drawOption.xs = xys[0];
	drawOption.ys = xys[1];
	
	if(drawOption.opacity){
		opacity = drawOption.opacity;
	}
	if(drawOption.fillcolor){
		polygon = OMAP.MapLib.createPolygon(drawOption.xs, drawOption.ys);
		var feature = new OMAP.Feature.Vector(polygon, { 
	                strokeweight: drawOption.strokeweight,
	                fillcolor: drawOption.fillcolor,
	                strokecolor: drawOption.strokecolor,
	                fillopacity: opacity,
	                title: '',
	                pid: typestr + drawOption.id
	    });
		this.drawlayer.addFeatures([feature]);
	}
	else{
		polyline = OMAP.MapLib.createPolyline(drawOption.xs, drawOption.ys);
		var feature = new OMAP.Feature.Vector(polyline, { 
	                strokeweight: drawOption.strokeweight,
	                strokecolor: drawOption.strokecolor,
	                title: '',
	                pid: typestr + drawOption.id
	    });
		this.drawlayer.addFeatures([feature]);
	}
}

MapManager.prototype.destroyG = function(id){
	var feature = this.getFeatureById(id);
	if(feature != null){
		this.removeFeature(feature);
	}
	var feature1 = this.drawlayer.getFeaturesByAttribute('pid',id);
	if(feature1 != null && feature1.length>0){
		feature1[0].destroy();
	}
	var feature2 = this.drawlayer.getFeaturesByAttribute('pid',id);
	if(feature2 != null && feature2.length>0){
		feature2[0].destroy();
	}
}

MapManager.prototype.destroyAllG = function(){
	this.removeAllFeatures();
}

/********************************  以下方法为Beta方法，是未经修改、完成或充分测试的  *****************************************/

/** 返回指定Marker标注 */
MapManager.prototype.getMarker = function($markerId) {
	for(var i=0; i< markers.markers.length; i++){
		var marker = markers.markers[i];
		if(marker.attributes.pid == $markerId){
			return marker;
		}
	}
	return null;
}

/** 通过传入操作项创建标注 */
MapManager.prototype.drawMarkerByOption = function($markerOption) {
	this.setMarkerOption($markerOption);
	
	var size = new OMAP.Size(this.markerOption.width, this.markerOption.height);
	var offset = new OMAP.Pixel(-(size.w/2), -size.h);
	var jz = new OMAP.Icon(this.markerOption.iconUrl, size, offset);
	var feature = new OMAP.Feature(this.markers, new OMAP.LonLat(this.markerOption.x, this.markerOption.y), {'icon': jz});
	var marker = feature.createMarker();
	// 给标注注册事件
	//marker.events.register('mousedown', marker, function(evt) { 
		//alert(this.icon.url); 
	//});
	this.markers.addMarker(marker);
	
	var point = new OMAP.Geometry.Point(this.markerOption.x + 20, this.markerOption.y + 20);
	feature = new OMAP.Feature.Vector(point);
	feature.attributes.title = this.markerOption.title;
	feature.attributes.pid = this.markerOption.id;
	this.showlayer.addFeatures([feature]);
	//return marker;
	//return feature;
}

/** 创建弹窗标注 */
MapManager.prototype.drawFeaturePopup = function($popupOption) {
	if(map == null || typeof(map) == 'undefined') return;
	this.setPopupOption($popupOption);
	
	// 创建地图标注
	var lonLat = new OMAP.LonLat(this.popupOption.x, this.popupOption.y);
	var feature = new OMAP.Feature(this.markers, lonLat, {'icon': this.popupOption.icon}); 
	var marker = feature.createMarker();
	
	// 设置弹窗内容
	feature.attributes.pid = this.popupOption.id;
	feature.attributes.title = this.popupOption.title;
	feature.popupClass = this.popupOption.popupClass;
	var titleHTML = '<div class="popTitleDiv"><label class="popTitleText">' + this.popupOption.title + '</label></div>';
	var contentHTML = '<div class="popContectDiv"><label class="popContectText">' + this.popupOption.contentHTML + '</label></div>';
    feature.data.popupContentHTML = '<div class="popFrameDiv">' + titleHTML + contentHTML + '</div>'; // 弹窗内容
    feature.closeBox = this.popupOption.closeBox; // 是否有关闭按钮
    feature.data.overflow = (this.popupOption.overflow) ? "auto" : "hidden"; // 是否有滚动条
    
    // 设置标注点击事件（只在地图只读状态下有效）
    var me = this;
    var markerClick = function(evt) {
        if (this.popup == null) {
        	// 弹窗放入地图并显示
            this.popup = this.createCSSFramedPopup(this.closeBox, function(evt1){ this.feature.popup.hide(); });
            me.map.addPopup(this.popup);
            this.popup.show();  
        } else {
        	// 对应弹窗获得焦点
            this.popup.toggle();
        }
        OMAP.Event.stop(evt);
    };
    marker.events.register("mousedown", feature, markerClick);
    
    // 把标注放入地图标注层
    this.markers.addMarker(marker);
    return feature;
}
