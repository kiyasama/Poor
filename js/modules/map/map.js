define(function(require, exports, module) {
    require("jquery");
    require("ogis");
    require("popomap");
    require("mapSource");
    require("css/style.css");
    require("trans");
    
    //自适应高度
    function setMinHeight() {
        var minHeight = document.documentElement.clientHeight - 121;
        $("#main_containerMap").css('height', minHeight + "px");
    }
    //初始化
    exports.initMap = function(option) {
        $("#main_containerMap").setTemplateURL("./htmltemplate/map.html").processTemplate();
        setMinHeight();
        mapLoader();
      //地图滑动效果
        $("#dn25DTypeDiv").mouseover(function(){
        	$("#xb25DTypeDiv").css('margin-left','80px');
        	$("#sltTypeDiv").css('margin-left','152px');
        	$("#yxtTypeDiv").css('margin-left','224px');
        });
        
        $("#mapTypeDiv").mouseleave(function(){
        	$("#xb25DTypeDiv").css('margin-left','');
        	$("#sltTypeDiv").css('margin-left','');
        	$("#yxtTypeDiv").css('margin-left','');
        });
        
    	$("#dn25DTypeDiv").click(function(){
    		MapSwitch(0);
    	});
    	$("#sltTypeDiv").click(function(){
    		MapSwitch(1);
    	});
    	$("#yxtTypeDiv").click(function(){
    		MapSwitch(2);
    	});
    	$("#xb25DTypeDiv").click(function(){
    		MapSwitch(3);
    	});
    };
    var map;
    var popomap;
    var map0;
    var map1;
    var map2;
    var map3;
    var markers;
    var poorPersons;
    var popomap0 = new MapManager();
    var popomap1 = new MapManager();
    var popomap2 = new MapManager();
    var popomap3 = new MapManager();
	var trans=new Transformation(45,45,49);
	 exports.initMarkerLayer = function(featureclick, featureover, featureout) {
        if (markers != null)
            return;
        markers = new OMAP.Layer.Vector("Markers", {
            eventListeners: { // ͼ���¼�
                featureclick: featureclick, // �����¼�
                featureover: featureover, // �����¼�,
                featureout: featureout // �Ƴ��¼�
            }
        });
        map.addLayer(markers);
    };
    function mapLoader() {
        var zoomNum = 4;
        var config = new OMAP.Config({
           // imagePath: "http://219.144.129.201:5999/image",
		   imagePath: "http://61.160.70.170:5666/image",
		   jsPath: "http://61.160.70.170:5666/resource/js",
          //  jsPath: "http://219.144.129.201:5999/resource/js",
            mapId: LoginAccount.mapId,

            scale: 0.353,
            hotFileLevel: 5,
            overlook: Math.PI / 4,
            rotate: Math.PI / 4
        });
		
		var isLoadHots = true;
		var loadHotspot = isLoadHots != null ? isLoadHots : true;
		var layerOptions = {
		/* 天津项目添加，自定义热区，并修改了源码，在源码中注释“天津项目添加” */
		defineHotspot : true,
		loadHotspot : loadHotspot, 	// 是否加载热区
		startLevel : 0,     		// 开始级别
		startHoverLevel : 3,		// 热区最高显示级别
		projection : 'EPSG:3857',
		format : "jpg",
		//url : "http://219.144.129.201:5999/resource/mappic/1/3",//瓦片地址
		url : "http://61.160.70.170:82/resource/zbdn",//瓦片地址
		tileSize : new OMAP.Size(256, 256),
		onImageLoadError:function(e){
			e.src = '/api/' + 'img/nopic.jpg';
		}
	};

        var layer25D = new OMAP.Layer.NOGISLayer("25D", "http://61.160.70.170:82/resource", {
            isBaseLayer: true,
            transparent: true,
            //defaultImage: 'http://219.144.129.201:5999/api/img/transparent.png',
			defaultImage: 'http://61.160.70.170:5666/api/img/transparent.png',
            loadHotspot: true
        });
		
		var layer = new OMAP.Layer.OGISLayer(layerOptions);
        // 地图配置
        var mapOptions = {
           // extent: ext,
            center: ['211910.51', '291917.2'],
            zoom: zoomNum,
            //restrictedExtent : new OMAP.Bounds(7662081.779113,4658244.0444917,7666715.740033,4662267.7442775),
            config: config,
            resolutions: [6.304, 3.152, 1.576, 0.788, 0.394, 0.197],
            numZoomLevels: 6, // mapConfig.maxLevel = 9
            layers: [layer],
            controls: [new OMAP.Control.Navigation()]
        };
        // 初始化地图
        map0 = new OMAP.Map("mapDiv", mapOptions);
        popomap0.init(map0, null, {
            label: ''
        });
        markers = new OMAP.Layer.Markers("Markers");
        map0.addLayer(markers);
        poorPersons = new OMAP.Layer.Markers("poorPersons");
        map0.addLayer(poorPersons);
        getPopomap(popomap0);
		map=map0;
		popomap=popomap0;
    }


	function initMap3() {
	if(map3 != null && typeof(map3) != 'undefined') return; // 若已经初始化过就不再往下执行
	var mapDiv = document.getElementById('map3');
	if(mapDiv == null || typeof(mapDiv) == 'undefined') return; // 若没有指定容器就不再往下执行
        var zoomNum = 4;
		var config = new OMAP.Config({
		//imagePath:'http://219.145.222.101:58888/image',
		imagePath:'http://61.160.70.170:5666/image',
		//jsPath:'http://219.145.222.101:58888/resource/js',
		jsPath:'http://61.160.70.170:5666/resource/js',
		mapId:1,
		scale:1,
		overlook:Math.PI / 4,	// 俯视角度
		rotate:Math.PI / 4				// 旋转角度
		});
		
		var isLoadHots = true;
		var loadHotspot = isLoadHots != null ? isLoadHots : true;
		var layerOptions = {
		/* 天津项目添加，自定义热区，并修改了源码，在源码中注释“天津项目添加” */
		defineHotspot : true,
		loadHotspot : loadHotspot, 	// 是否加载热区
		startLevel : 0,     		// 开始级别
		startHoverLevel : 3,		// 热区最高显示级别
		projection : 'EPSG:3857',
		format : "jpg",
		//url : "http://219.145.222.101:58888/resource/mappic/1/3",//瓦片地址
		url : "http://61.160.70.170:86/resource/",//瓦片地址
		tileSize : new OMAP.Size(256, 256),
		onImageLoadError:function(e){
			e.src = '/api/' + 'img/nopic.jpg';
		}
	};

        var layer25D = new OMAP.Layer.NOGISLayer("25D", "http://61.160.70.170:86/resource", {
            isBaseLayer: true,
            transparent: true,
           // defaultImage: 'http://219.145.222.101:58888/api/img/transparent.png',
		   defaultImage: 'http://61.160.70.170:5666/api/img/transparent.png',
            loadHotspot: true
        });
		
		var layer = new OMAP.Layer.OGISLayer(layerOptions);
        // 地图配置
        var mapOptions = {
           // extent: ext,
            center: [208851.9889, 289546.4677],
            zoom: zoomNum,
            //restrictedExtent : new OMAP.Bounds(7662081.779113,4658244.0444917,7666715.740033,4662267.7442775),
            config: config,
            resolutions: [6.304, 3.152, 1.576, 0.788, 0.394, 0.197],
            numZoomLevels: 6, // mapConfig.maxLevel = 9
            layers: [layer],
            controls: [new OMAP.Control.Navigation()]
        };
        // 初始化地图
        map3 = new OMAP.Map("map3", mapOptions);
        popomap3.init(map3, null, {
            label: ''
        });
    }
	
/**
 * 初始化矢量图
 */
function initMap1() {
	if(map1 != null && typeof(map1) != 'undefined') return; // 若已经初始化过就不再往下执行
	var mapDiv = document.getElementById('map1');
	if(mapDiv == null || typeof(mapDiv) == 'undefined') return; // 若没有指定容器就不再往下执行
	var centerPoint = trans.OCN2WGS84(208851.9889, 289546.4677);
	var mirrorUrls = [ "http://t0.tianditu.com/DataServer",
	   				   "http://t1.tianditu.com/DataServer",
	   				   "http://t2.tianditu.com/DataServer",
	   				   "http://t3.tianditu.com/DataServer",
	   				   "http://t4.tianditu.com/DataServer",
	   				   "http://t5.tianditu.com/DataServer",
	   				   "http://t6.tianditu.com/DataServer" ];
	   	var maxExt = (new OMAP.Bounds(-180, -90, 180, 90));
	   	vectorLayerGJ = new OMAP.Layer.TDTLayer("Vec", "/maptile", {
	   			mapType :     'vec_c',
	   			topLevel :    1,
	   			bottomLevel : 20,
	   			visibility :  true,
	   			isBaseLayer : true,
	   			maxExtent :   maxExt,
	   			mirrorUrls :  mirrorUrls
	   	});
	   	vecLabelLayerGJ = new OMAP.Layer.TDTLayer("vecLabel", "/maptile", {
	   			mapType :     'cva_c',
	   			topLevel :    1,
	   			bottomLevel : 20,
	   			visibility :  true,
	   			isBaseLayer : false,
	   			maxExtent :   maxExt,
	   			mirrorUrls :  mirrorUrls
	   	});
	   	var mapOptions = {
	   			zoom :           13,
	   			numZoomLevels :  15,
	   			fallThrough :    true,
	   			layers :         [ vecLabelLayerGJ,vectorLayerGJ ],
	   			center :         [centerPoint.x,centerPoint.y] ,// [ 106.93416, 33.00273 ],
	   			controls :       [  new OMAP.Control.MousePosition(),
	   			                    new OMAP.Control.Navigation({
	   				                     //zoomWheelEnabled : 0  //禁止鼠标滚轴缩放
	   			                 })]
	   	};
	map1 = new OMAP.Map("map1", mapOptions);
	var control2 = new OMAP.Control.PanZoomBar();
	map1.addControl(control2, new OMAP.Pixel(36, 45));
	popomap1.init(map1, $('#viewType').val(), {label : ''});
}

/**
 * 初始化影像图
 */
function initMap2() {
	if(map2 != null && typeof(map2) != 'undefined') return; // 若已经初始化过就不再往下执行
	var mapDiv = document.getElementById('map2');
	if(mapDiv == null || typeof(mapDiv) == 'undefined') return; // 若没有指定容器就不再往下执行
	var centerPoint = trans.OCN2WGS84(208851.9889, 289546.4677);
	var mirrorUrls = [ "http://t0.tianditu.com/DataServer",
	   				   "http://t1.tianditu.com/DataServer",
	   				   "http://t2.tianditu.com/DataServer",
	   				   "http://t3.tianditu.com/DataServer",
	   				   "http://t4.tianditu.com/DataServer",
	   				   "http://t5.tianditu.com/DataServer",
	   				   "http://t6.tianditu.com/DataServer" ];
	   	var maxExt = (new OMAP.Bounds(-180, -90, 180, 90));
	   	imgtorLayerGJ = new OMAP.Layer.TDTLayer("img", "/maptile", {
	        mapType : 'img_c',
	        topLevel : 1,
	        bottomLevel : 18,
	        visibility : true,
	        isBaseLayer : true,
	        maxExtent : maxExt,
	        mirrorUrls : mirrorUrls
       	});
    	imgLabelLayerGJ = new OMAP.Layer.TDTLayer("imgLabel", "/maptile", {
	    	mapType : 'cia_c',
    		topLevel : 1,
    		bottomLevel : 18,
	    	visibility : true,
	    	isBaseLayer : false,
    		maxExtent : maxExt,
    		mirrorUrls : mirrorUrls
    	});
	   	var mapOptions = {
	   			zoom :           13,
	   			numZoomLevels :  15,
	   			fallThrough :    true,
	   			layers :         [ imgtorLayerGJ,imgLabelLayerGJ ],
	   			center :         [centerPoint.x,centerPoint.y] ,// [ 106.93416, 33.00273 ],
	   			controls :       [  new OMAP.Control.MousePosition(),
	   			                    new OMAP.Control.Navigation({
	   				                     //zoomWheelEnabled : 0  //禁止鼠标滚轴缩放
	   			                 })]
	   	};
	map2 = new OMAP.Map("map2", mapOptions);
	var control2 = new OMAP.Control.PanZoomBar();
	map2.addControl(control2, new OMAP.Pixel(36, 45));
	popomap2.init(map2, $('#viewType').val(), {label : ''});
}
var mapType=0;
var isLYMap=false;
function map0Show(){
		    $('#mapDiv').show();
		    $('#map1').hide();
		    $('#map2').hide();
		    $('#map3').hide();
			isLYMap=false;
			var zoomNum;
	var oldPoint=map.getCenter();
	var newPoint;
			if(mapType > 0){
            	zoomNum = map.getZoom()-5;
				newPoint = trans.WGS842OCN(oldPoint.lon,oldPoint.lat);
			}
			else{
            	zoomNum = map.getZoom();
				newPoint={
					x:oldPoint.lon,
					y:oldPoint.lat
				}
			}
			map0.setCenter([newPoint.x,newPoint.y],zoomNum);
			map=map0;
			popomap=popomap0;
			mapType=0;
}
function map1Show(){
		    $('#mapDiv').hide();
		    $('#map1').show();
		    $('#map2').hide();
		    $('#map3').hide();
			isLYMap=false;
	initMap1();
	var zoomNum;
	var oldPoint=map.getCenter();
	var newPoint;
			if(mapType == 0){
            	zoomNum = map.getZoom()+5;
				newPoint = trans.OCN2WGS84(oldPoint.lon,oldPoint.lat);
			}
			else{
            	zoomNum = map.getZoom();
				newPoint={
					x:oldPoint.lon,
					y:oldPoint.lat
				}
			}
			map1.setCenter([newPoint.x,newPoint.y],zoomNum);
			map=map1;
			popomap=popomap1;
			mapType=1;
}
function map2Show(){
		    $('#mapDiv').hide();
		    $('#map1').hide();
		    $('#map2').show();
		    $('#map3').hide();
			isLYMap=false;
	initMap2();
	var zoomNum;
	var oldPoint=map.getCenter();
	var newPoint;
			if(mapType == 0){
            	zoomNum = map.getZoom()+5;
				newPoint = trans.OCN2WGS84(oldPoint.lon,oldPoint.lat);
			}
			else{
            	zoomNum = map.getZoom();
				newPoint={
					x:oldPoint.lon,
					y:oldPoint.lat
				}
			}
			map2.setCenter([newPoint.x,newPoint.y],zoomNum);
			map=map2;
			popomap=popomap2;
			mapType=2;
}
function MapSwitch(type){
	switch(type){
		case 0:
			map0Show();
			break;
		case 1:
			map1Show();
			break;
		case 2:
			map2Show();
			break;
		case 3:
		    $('#mapDiv').hide();
		    $('#map1').hide();
		    $('#map2').hide();
		    $('#map3').show();
			isLYMap=true;
			initMap3();
			break;
	}
}

	
    exports.addPoorPersonMarker = function(e) {
        poorPersons.clearMarkers();

    };

    exports.addMarker = function(x, y, feature, img, code) {
        if (!img || img == "") {
            img = "images/icon_project.png";
        }
        var pt = null;
        if (x == 0 || y == 0) {
           
                pt = new OMAP.LonLat(211910.51, 291917.2);
                //旬邑
            
        } else {
            pt = new OMAP.LonLat(x, y);
        }

        var size = new OMAP.Size(30, 40);
        var offset = new OMAP.Pixel(-(size.w / 2), -size.h);
        var icon = new OMAP.Icon(img, size, offset);
        var marker = new OMAP.Marker(pt, icon);
        marker.feature = feature;
        markers.addMarker(marker);
        map.setCenter(pt, 5, false, false);
        return marker;
    };
    exports.removeMarkers = function() {
        markers.clearMarkers();
    };

    exports.locate = function(x, y, zoom) {
        var pt = null;
        if (x != 0 && y != 0) {
            pt = new OMAP.LonLat(x, y);
        } else {
            pt = new OMAP.LonLat(211910.51, 291917.2);
        }
        if (!zoom && !isNaN(zoom))
            zoom = 8;
        map.setCenter(pt, zoom);
    };

    exports.addPop = function(x, y, field, code, flag) {
        popomap.removePop("person");
        var pt = null;
        if (x != 0 && y != 0) {
            pt = new OMAP.LonLat(x, y);
        } else {
            //彬县
           
                pt = new OMAP.LonLat(211910.51, 291917.2);
                //旬邑
           
        }
        map.setCenter(pt, 6);
        var html2 = '';
        if (flag === 'bfdw') {
            html2 = '<div id="pkhimg" style="position: relative;width: 170px;height: 46px;"><img src="images/box_dw.png" ><a style="font-family:微软雅黑;font-size:12px;color:#FFF; position: absolute;width: 170px;height: 30px;left: 0px;top: 7px;z-index: 2;text-align: center;">' + field + '</a></img></div>';
        } else {
            html2 = '<div id="pkhimg" style="position: relative;width: 86px;height: 46px;"><img src="images/box.png" ><a style="font-family:微软雅黑;font-size:12px;color:#FFF; position: absolute;width: 86px;height: 46px;left: 25px;top: 7px;z-index: 2;">' + field + '</a></img></div>';
        }
        popomap.createPop("person", html2, pt.lon, pt.lat, -42, -80, 100);
        //return popomap;
    };
    exports.removePop = function() {
        popomap.removePop("person");
    };


});
