/**
 * 地图初始化、切换
 */
 var mapDivs = ['mapDiv','map1','map2'];
var map0, map1, map2; // OCN2.5D、天地图、影像图
var measure0, measure1, measure2; // 地图测量工具对象
var popomap0 = new MapManager(); // OCN2.5D地图管理对象
var popomap1 = new MapManager(); // 天地图地图管理对象
var popomap2 = new MapManager(); // 影像图地图管理对象
var trans = new Transformation(45,45,49); // 坐标转换对象
var zoomNum = 4;
var jsPath, resourcePath, YXPath; // 2.5D地图资源路径
var tdtMapPath; // 矢量图资源路径
var tdtImgMapPath; // 影像图资源路径

// 动态变更
var map = map0;
var popomap = popomap0;
var measure = measure0;

$(function() {
	if(mapConfig != null && typeof(mapConfig) != 'undefined') zoomNum = mapConfig.z;
	nui.init();
	nui.resize();
	setMapResurcePath(); // 设置地图资源路径
	mapLoader(); // 加载2.5D地图
	initMapSearch(); // 初始化地图查询功能
	nui.initLayerUI();
});

/**
 * 设置地图资源路径
 */
function setMapResurcePath(){
	// 2.5D地图资源路径配置
	jsPath = mapConfig.hsPath;
	resourcePath = mapConfig.resourcePath;
	YXPath = mapConfig.resourcePath + "yx";
	jsPath = "http://61.185.20.73:58888/resource/js/";
	resourcePath = "http://61.185.20.73:58888/resource/";
	YXPath = "http://61.185.20.73:58888/resource/yx";

	// 矢量图资源路径配置
	tdtMapPath = mapConfig.tdtMapPath;  
//	tdtMapPath = 'http://210.74.129.78:8399/arcgis/rest/services/tdtNewMap/MapServer';

	// 影像图资源路径配置
	tdtImgMapPath = mapConfig.tdtImgMapPath; 
//	tdtImgMapPath = 'http://61.185.20.73:8808/TDTAggreMapXY/rest/services/tdtsximg/MapServer';
}

/**
 * 初始化OCN2.5D地图
 */
function mapLoader() {
	if(map0 != null && typeof(map0) != 'undefined') return; // 若已经初始化过就不再往下执行
	var mapDiv = document.getElementById('mapDiv');
	if(mapDiv == null || typeof(mapDiv) == 'undefined') return; // 若没有指定容器就不再往下执行
	
	var config = new OMAP.Config({
		imagePath : mapConfig.imagePath,
		jsPath : jsPath, 
		mapId : mapConfig.mapid,
		scale : 0.353,
		hotFileLevel : 5,
		overlook : Math.PI / 4,
		rotate : Math.PI / 4
	});
	var ext = new OMAP.Bounds(-56255400.354765005,-56255400.354765005,56255400.354765005,56255400.354765005);
	
	var layerYX = new OMAP.Layer.NOGISLayer("YX", YXPath ,{
		isBaseLayer:true,
		defaultImage : mapConfig.apiPath + 'img/nopic.jpg',
		loadHotspot: false
	});
	var layer25D = new OMAP.Layer.NOGISLayer("25D", resourcePath ,{
		isBaseLayer:false,
		transparent:true,
		defaultImage : mapConfig.apiPath + '/img/transparent.png',
		loadHotspot: true
	});
	// 地图配置
	var mapOptions = {
		extent : ext,
		center:[mapConfig.x, mapConfig.y],
		zoom: zoomNum,
		//restrictedExtent : new OMAP.Bounds(7662081.779113,4658244.0444917,7666715.740033,4662267.7442775),
		config: config,
		resolutions : [
               107.29866095498084608,
               53.64933047749042304,
               26.82466523874521152,
               13.41233261937260576,
			   6.70616630968630288,
			   3.35308315484315144,
			   1.67654157742157572,
			   0.83827078871078786,
			   0.41913539435539393
		],
		numZoomLevels: 9, // mapConfig.maxLevel = 9
		layers:[layer25D, layerYX],
		controls : [ 
	           new OMAP.Control.MousePosition(),  // 鼠标位置
	           new OMAP.Control.Navigation(),  // 导航条
	           new OMAP.Control.LayerSwitcher(),//图层切换
	           new OMAP.Control.LTOverviewMap() // 鹰眼图
		]
	};
	// 初始化地图
	map0 = new OMAP.Map("mapDiv", mapOptions);
 	var control2 = new OMAP.Control.PanZoomBar();
 	map0.addControl(control2, new OMAP.Pixel(mapUiParams.zoomBarLeft,mapUiParams.zoomBarTop));
	measure0 = new Measure(map0);
	popomap0.init(map0, $('#viewType').val(), {label : ''});
	map0.events.register("click", map0, onMapClick);
	// 动态变更各个对象
	map = map0;
	popomap = popomap0;
	measure = measure0;
	// 执行回调方法
	if(typeof loadCusControl != 'undefined' && loadCusControl instanceof Function) {
		loadCusControl(); // 地图加载完后的回调方法
	}
}

/**
 * 初始化天地图
 */
/*function mapLoader() {
	if(map0 != null && typeof(map0) != 'undefined') return; // 若已经初始化过就不再往下执行
	var mapDiv = document.getElementById('mapDiv');
	if(mapDiv == null || typeof(mapDiv) == 'undefined') return; // 若没有指定容器就不再往下执行
	/!*var bounds = new OMAP.Bounds();
	 bounds.extend(new OMAP.LonLat(mapConfig.x, mapConfig.y));
	 bounds.extend(new OMAP.LonLat(mapConfig.x, mapConfig.y));*!/
	var bounds = new OMAP.Bounds(-56255400.354765005,-56255400.354765005,56255400.354765005,56255400.354765005);
	bounds.toBBOX();
	// 使用默认选项创建一个在一个元素id 为"map"的地图
	map0 = new OMAP.Map('mapDiv', {
		controls : [
			new OMAP.Control.MousePosition(),  // 鼠标位置
			new OMAP.Control.Navigation(),  // 导航条
			new OMAP.Control.LayerSwitcher()//图层切换
		]});
	var wmts_Vector_Note = new OMAP.Layer.WMTS({
		name : "标注(矢量)",
		url : "http://t0.tianditu.com/cva_c/wmts", //中国底图
		layer : "cva",
		style : "default",
		matrixSet : "c",
		format : "tiles",
		isBaseLayer : false
	});
	var wmts_Vector_BaseMap = new OMAP.Layer.WMTS({
		name : "中国底图(矢量)",
		url : "http://t0.tianditu.com/vec_c/wmts", //中国底图
		layer : "vec",
		style : "default",
		matrixSet : "c",
		format : "tiles",
		isBaseLayer : true
	});
	var wmts_Image_BaseMap = new OMAP.Layer.WMTS({
		name : "中国底图(影像)",
		url : "http://t0.tianditu.com/img_c/wmts", //中国底图
		layer : "img",
		style : "default",
		matrixSet : "c",
		format : "tiles",
		isBaseLayer : true
	});
	var wmts_Image_Note = new OMAP.Layer.WMTS({
		name : "标注(影像)",
		url : "http://t0.tianditu.com/cia_c/wmts", //中国底图
		layer : "cia",
		style : "default",
		matrixSet : "c",
		format : "tiles",
		isBaseLayer : false,
		visibility: false
	});
	var wmts_Terrain_BaseMap = new OMAP.Layer.WMTS({
		name : "中国地形图(渲染)",
		url : "http://t0.tianditu.com/ter_c/wmts", //中国底图
		layer : "ter",
		style : "default",
		matrixSet : "c",
		format : "tiles",
		isBaseLayer : true
	});
	var wmts_Terrain_Note = new OMAP.Layer.WMTS({
		name : "标注(地形图)",
		url : "http://t0.tianditu.com/cta_c/wmts", //中国底图
		layer : "cta",
		style : "default",
		matrixSet : "c",
		format : "tiles",
		isBaseLayer : false,
		visibility: false
	});
	var wms_BaseMap = new OMAP.Layer.WMS('中国底图(行政)',
			'http://gisserver.tianditu.com/TDTService/region/wms', {
				layers : '030100'
			}, {
				isBaseLayer : true
			});
	//将地图添加到map对象当中
	map0.addLayer(wmts_Vector_Note);
	map0.addLayer(wmts_Vector_BaseMap);
	map0.addLayer(wmts_Image_Note);
	map0.addLayer(wmts_Image_BaseMap);
	map0.addLayer(wmts_Terrain_Note);
	map0.addLayer(wmts_Terrain_BaseMap);
	//map0.addLayer(wms_BaseMap);
	var control2 = new OMAP.Control.PanZoomBar();
	map0.addControl(control2, new OMAP.Pixel(mapUiParams.zoomBarLeft,mapUiParams.zoomBarTop));

	//map0.addControl(new OMAP.Control.LTOverviewMap());
	var center = new OMAP.LonLat(mapConfig.x, mapConfig.y);
	map0.zoomToExtent(bounds, true);
	map0.setCenter(center, 13, false, false)
	//map0.zoomToExtent(bounds, true);
	/!*	var overview = new OMAP.Control.OverviewMap({
	 maximized : true,
	 maximizeTitle : 'Show the overview map',
	 minimizeTitle : 'Hide the overview map'
	 });
	 map0.addControl(overview);*!/
	// 初始化地图

	measure0 = new Measure(map0);
	popomap0.init(map0, $('#viewType').val(), {label : ''});
	map0.events.register("click", map0, onMapClick);
	// 动态变更各个对象
	map = map0;
	popomap = popomap0;
	measure = measure0;
	// 执行回调方法
	if(typeof loadCusControl != 'undefined' && loadCusControl instanceof Function) {
		loadCusControl(); // 地图加载完后的回调方法
	}
}*/

/**
 * 初始化矢量图
 */
function initMap1() {
	if(map1 != null && typeof(map1) != 'undefined') return; // 若已经初始化过就不再往下执行
	var mapDiv = document.getElementById('map1');
	if(mapDiv == null || typeof(mapDiv) == 'undefined') return; // 若没有指定容器就不再往下执行
	
	var tdtLayer = new OMAP.Layer.XYTDTLayer("TDTMap", tdtMapPath);
	// 地图配置
	var mapOptions = {
		resolutions:[
			0.08789062500000003,
			0.043945312500000014,
			0.021972656250000007,
			0.010986328125000003,
			0.005493164062500002,
			0.002746582031250001,
			0.0013732910156250004,
			6.866455078125002E-4,
			3.433227539062501E-4,
			1.7166137695312505E-4,
			8.583068847656253E-5,
			4.2915344238281264E-5,
			2.1457672119140632E-5,
			1.0728836059570316E-5,
			5.364418029785158E-6
		],
		layers:[tdtLayer],
		numZoomLevels:15,
		zoom:13,
		center:[108.7239051043,34.328985370913],
		controls : [ 
		    new OMAP.Control.MousePosition(),  // 鼠标位置
		    new OMAP.Control.Navigation(),  // 导航条
		    new OMAP.Control.LTOverviewMap() // 鹰眼图
		]
	};
	// 初始化地图
	map1 = new OMAP.Map("map1", mapOptions);
	var control2 = new OMAP.Control.PanZoomBar();
	map1.addControl(control2, new OMAP.Pixel(mapUiParams.zoomBarLeft,mapUiParams.zoomBarTop));
	measure1 = new Measure(map1);
	popomap1.init(map1, $('#viewType').val(), {label : ''});
	map1.events.register("click", map1, onMapClick);
	// 动态变更各个对象
	map = map1;
	popomap = popomap1;
	measure = measure1;
	// 执行回调方法
//	if(typeof loadCusControl != 'undefined' && loadCusControl instanceof Function) {
//		loadCusControl(); // 地图加载完后的回调方法
//	}
}

/**
 * 初始化影像图
 */
function initMap2() {
	if(map2 != null && typeof(map2) != 'undefined') return; // 若已经初始化过就不再往下执行
	var mapDiv = document.getElementById('map2');
	if(mapDiv == null || typeof(mapDiv) == 'undefined') return; // 若没有指定容器就不再往下执行
	
	var tdtLayer = new OMAP.Layer.XYTDTLayer("TDTMap", tdtImgMapPath);
	// 地图配置
	var mapOptions = {
		resolutions:[
			0.703125,
			0.3515625,
			0.17578125,
			0.08789062500000003,
			0.043945312500000014,
			0.021972656250000007,
			0.010986328125000003,
			0.005493164062500002,
			0.002746582031250001,
			0.0013732910156250004,
			6.866455078125002E-4,
			3.433227539062501E-4,
			1.7166137695312505E-4,
			8.583068847656253E-5,
			4.2915344238281264E-5,
			2.1457672119140632E-5,
			1.0728836059570316E-5,
			5.364418029785158E-6,
			2.6822090148925781E-6,
			1.3411045074462891E-6,
		],
		numZoomLevels:20,
		layers:[tdtLayer],
		zoom:16,
		center:[108.7239051043, 34.328985370913],
		controls : [ 
		    new OMAP.Control.MousePosition(),  // 鼠标位置
		    new OMAP.Control.Navigation(),  // 导航条
		    new OMAP.Control.LTOverviewMap() // 鹰眼图
		]
	};
	// 初始化地图
	map2 = new OMAP.Map("map2", mapOptions);
	var control2 = new OMAP.Control.PanZoomBar();
	map2.addControl(control2, new OMAP.Pixel(mapUiParams.zoomBarLeft,mapUiParams.zoomBarTop));
	measure2 = new Measure(map2);
	popomap2.init(map2, $('#viewType').val(), {label : ''});
	map2.events.register("click", map2, onMapClick);
	// 动态变更各个对象
	map = map2;
	popomap = popomap2;
	measure = measure2;
	// 执行回调方法
//	if(typeof loadCusControl != 'undefined' && loadCusControl instanceof Function) {
//		loadCusControl(); // 地图加载完后的回调方法
//	}
}

//初始化热区查询
function initMapSearch() {
	var parent = $g('smallSearchDiv');
	var option = {
		left : 100,
		top : 90
	};
	smallMapSearch.init(map, 1, parent, option);
}

// 显示地图屏幕坐标
function onMapClick(e){
	var mapLayerType = popomap.getMapLayerType();
    var b = map.getLonLatFromPixel(e.xy)
	var point = null;
    
    if(mapLayerType == 'OMAP.Layer.NOGISLayer'){
    	point = trans.OCN2WGS84(b.lon, b.lat);
    	$('#xBox').html('x：' + b.lon.toFixed(7));
    	$('#yBox').html('y：' + b.lat.toFixed(7));
    	$('#lonBox').html('经度：' + point.x.toFixed(7));
    	$('#latBox').html('纬度：' + point.y.toFixed(7));
    }
    else if(mapLayerType == 'OMAP.Layer.XYTDTLayer'){
    	point = trans.WGS842OCN(b.lon, b.lat);
    	$('#xBox').html('x：' + point.x.toFixed(7));
    	$('#yBox').html('y：' + point.y.toFixed(7));
    	$('#lonBox').html('经度：' + b.lon.toFixed(7));
    	$('#latBox').html('纬度：' + b.lat.toFixed(7));
    } else {
    	$('#xBox').html('x：');
    	$('#yBox').html('y：');
    	$('#lonBox').html('经度：');
    	$('#latBox').html('纬度：');
    }
}

function getOffsetTop( elements ){ 
    var top = elements.offsetTop; 
    var parent = elements.offsetParent; 
    while( parent !== null ){ 
        top += parent.offsetTop; 
        parent = parent.offsetParent; 
    }
    return top; 
}

function getOffsetLeft( elements ){ 
    var left = elements.offsetLeft; 
    var parent = elements.offsetParent; 
    while( parent !== null ){ 
        left += parent.offsetLeft; 
        parent = parent.offsetParent; 
    }
    return left; 
}

function switchLayerUIVisible() {
	if($('.menudiv').is(":visible")){
		$('.menudiv').hide();
	}else {
		$('.menudiv').show();
	}
}

function switchLayerVisible(ele) {
	var layerId = ele.layerId;
	if($('img',ele).is(":visible")){
		$('img',ele).hide();
		layerManager.hideLayer(layerId);
	}else {
		$('img',ele).show();
		layerManager.renderLayer(layerId);
	}
}

/**
 * 复制所有标注
 */ 
function cloneFeatures($features){
	var features = [];
	for(var f=0; f<$features.length; f++){
		if(typeof $features[f].clone == 'undefined' || !($features[f].clone instanceof Function)) continue; // 若该标注不可复制，则跳过
		var feature = $features[f].clone(); // 复制标注
		features.push(feature);
	}
	return features;
}

/**
 * 复制所有标注，并将OCN坐标转为WGS84坐标
 */ 
function cloneFeaturesOCN2WGS84($features){
	var features = [];
	for(var f=0; f<$features.length; f++){
		if(typeof $features[f].clone == 'undefined' || !($features[f].clone instanceof Function)) continue; // 若该标注不可复制，则跳过
		var feature = $features[f].clone(); // 复制标注
		var xs = '', ys = '', object = null;
		if(feature.geometry.CLASS_NAME == 'OMAP.Geometry.Point'){ // 如果是点
			var point = trans.OCN2WGS84($features[f].geometry.x, $features[f].geometry.y); // 转换坐标
			object = new OMAP.Geometry.Point(point.x, point.y); // 生成新的几何对象
		}
		else if(feature.geometry.CLASS_NAME == 'OMAP.Geometry.LineString'){ // 如果是线
			var points = feature.geometry.components;
			for(var p=0; p<points.length; p++){ // 遍历坐标
				point = trans.OCN2WGS84(points[p].x, points[p].y); // 转换坐标
				xs += point.x + ',';
				ys += point.y + ',';
			}
			xs = xs.substring(0, xs.length - 1);
			ys = ys.substring(0, ys.length - 1);
			object = OMAP.MapLib.createPolyline(xs, ys);
		}
		else if(feature.geometry.CLASS_NAME == 'OMAP.Geometry.Polygon'){ // 如果是面
			var points = feature.geometry.components[0].components;
			for(var p=0; p<points.length; p++){ // 遍历坐标
				point = trans.OCN2WGS84(points[p].x, points[p].y); // 转换坐标
				xs += point.x + ',';
				ys += point.y + ',';
			}
			xs = xs.substring(0, xs.length - 1);
			ys = ys.substring(0, ys.length - 1);
			object = OMAP.MapLib.createPolygon(xs, ys);
		}
		feature.geometry = object;
		features.push(feature);
	}
	return features;
}

/**
 * 复制所有标注，并将WGS84坐标转为OCN坐标
 */ 
function cloneFeaturesWGS842OCN($features){
	var features = [];
	for(var f=0; f<$features.length; f++){
		if(typeof $features[f].clone == 'undefined' || !($features[f].clone instanceof Function)) continue; // 若该标注不可复制，则跳过
		var feature = $features[f].clone(); // 复制标注
		var xs = '', ys = '', object = null;
		if(feature.geometry.CLASS_NAME == 'OMAP.Geometry.Point'){ // 如果是点
			var point = trans.WGS842OCN($features[f].geometry.x, $features[f].geometry.y); // 转换坐标
			object = new OMAP.Geometry.Point(point.x, point.y); // 创建新的几何对象
		}
		else if(feature.geometry.CLASS_NAME == 'OMAP.Geometry.LineString'){ // 如果是线
			var points = feature.geometry.components;
			for(var p=0; p<points.length; p++){ // 遍历坐标
				point = trans.WGS842OCN(points[p].x, points[p].y); // 转换坐标
				xs += point.x + ',';
				ys += point.y + ',';
			}
			xs = xs.substring(0, xs.length - 1);
			ys = ys.substring(0, ys.length - 1);
			object = OMAP.MapLib.createPolyline(xs, ys); // 创建新的几何对象
		}
		else if(feature.geometry.CLASS_NAME == 'OMAP.Geometry.Polygon'){ // 如果是面
			var points = feature.geometry.components[0].components;
			for(var p=0; p<points.length; p++){ // 遍历坐标
				point = trans.WGS842OCN(points[p].x, points[p].y); // 转换坐标
				xs += point.x + ',';
				ys += point.y + ',';
			}
			xs = xs.substring(0, xs.length - 1);
			ys = ys.substring(0, ys.length - 1);
			object = OMAP.MapLib.createPolygon(xs, ys); // 创建新的几何对象
		}
		feature.geometry = object;
		features.push(feature);
	}
	return features;
}

/**
 * 复制弹窗
 */ 
function clonePopups($popups){
	var popups = [];
	for(var p=0; p<$popups.length; p++){
		if(typeof $popups[p].clone == 'undefined' || !($popups[p].clone instanceof Function)) continue; // 若该弹窗不可复制，则跳过
		var popup = $popups[p].clone(); // 复制弹窗
		popup.setBackgroundColor("transparent");
        popup.autoSize=1;
		popups.push(popup);
	}
	return popups;
}

/**
 * 复制弹窗，并将弹窗的OCN坐标转为WGS84坐标
 */ 
function clonePopupsOCN2WGS84($popups){
	var popups = [];
	for(var p=0; p<$popups.length; p++){
		if(typeof $popups[p].clone == 'undefined' || !($popups[p].clone instanceof Function)) continue; // 若该弹窗不可复制，则跳过 
		var popup = $popups[p].clone(); // 复制弹窗
		var lonlat = trans.OCN2WGS84($popups[p].lonlat.lon, $popups[p].lonlat.lat); // 转换坐标
		popup.lonlat = new OMAP.LonLat(lonlat.x, lonlat.y); // 替换经纬度对象
		popup.setBackgroundColor("transparent");
        popup.autoSize=1;
		popups.push(popup);
	}
	return popups;
}

/**
 * 复制弹窗，并将弹窗的WGS84坐标转为OCN坐标
 */ 
function clonePopupsWGS842OCN($popups){
	var popups = [];
	for(var p=0; p<$popups.length; p++){
		if(typeof $popups[p].clone == 'undefined' || !($popups[p].clone instanceof Function)) continue;  // 若该弹窗不可复制，则跳过
		var popup = $popups[p].clone(); // 复制弹窗
		var lonlat = trans.WGS842OCN($popups[p].lonlat.lon, $popups[p].lonlat.lat); // 转换坐标
		popup.lonlat = new OMAP.LonLat(lonlat.x, lonlat.y); // 替换经纬度对象
		popup.setBackgroundColor("transparent");
        popup.autoSize=1;
		popups.push(popup);
	}
	return popups;
}

function showLayerUI() {
	$('.menudiv').show();
}

function hideLayerUI() {
	$('.menudiv').hide();
}

function toolbarClear() {
	measure.clear();
}

function $g(id) {
	return document.getElementById(id);
}

window.onresize = function() {
	nui.resize();
};

/**
 * 地图切换
 */
var mapType = 1; // 1：2.5D，2：矢量，3：影像
var mapTypeManager = {
	switchMapType : function(ele) {
		if (mapType == 1) {
			zoomNum = map0.getZoom()+6;
			this.setMapType(2);
		} else if(mapType == 2) {
			zoomNum = map1.getZoom()+5;
			this.setMapType(3);
		}else {
			if(zoomNum<11){
				zoomNum=0;
			}else{
				zoomNum = map2.getZoom()-11;
			}
			this.setMapType(1);
		}
	},
	setMapType : function(type) {
		var ele = $g('sl');
		if(ele == null || typeof(ele) == 'undefined') return; // 若没有指定容器就不再往下执行
		mapType = type; // 1.OCN2.5D地图；2.矢量图；3.影像图；
		if(type == 1){ // 加载OCN2.5D地图
			map = map0;
			popomap = popomap0;
			measure = measure0;
			$g('mapDiv').style.display = 'block';
			$g('map1').style.display = 'none';
			$g('map2').style.display = 'none';
			
			ele.src = '/img/mapType/sl.png';
			ele.title = '切换到矢量';
			
			var ctr = map2.getCenter();
			var ocn = trans.WGS842OCN(ctr.lon, ctr.lat);
			// 初始化OCN2.5D地图
			mapLoader(); 
			map0.setCenter([ocn.x, ocn.y], zoomNum);
			// 搬迁标注到OCN2.5D地图
			var features = cloneFeaturesWGS842OCN(popomap2.showlayer.features);
			for(var f=0; f<features.length; f++){
				popomap0.showlayer.addFeatures([features[f]]);
			}
			// 搬迁标注到OCN2.5D地图
			var features = cloneFeaturesWGS842OCN(popomap2.drawlayer.features);
			for(var f=0; f<features.length; f++){
				popomap0.drawlayer.addFeatures([features[f]]);
			}
			// 搬迁弹窗到OCN2.5D地图
			var popups = clonePopupsWGS842OCN(map2.popups);
			for(var p=0; p<popups.length; p++){
				map0.addPopup(popups[p]);
			}
			// 清除影像图中的标注
			popomap2.allClean();
		}
		else if (type == 2) { // 加载矢量图
			map = map1;
			popomap = popomap1;
			measure = measure1;
			$g('mapDiv').style.display = 'none';
			$g('map1').style.display = 'block';
			$g('map2').style.display = 'none';
			
			ele.src = '/img/mapType/yx.png';
			ele.title = '切换到影像';
			
			var ctr = map0.getCenter();
			var wgs84 = trans.OCN2WGS84(ctr.lon, ctr.lat);
			// 初始化矢量图
			initMap1();
			map1.setCenter([wgs84.x, wgs84.y], zoomNum);
			// 搬迁标注到矢量图
			var features = cloneFeaturesOCN2WGS84(popomap0.showlayer.features);
			for(var f=0; f<features.length; f++){
				popomap1.showlayer.addFeatures([features[f]]);
			}
			// 搬迁标注到矢量图
			var features = cloneFeaturesOCN2WGS84(popomap0.drawlayer.features);
			for(var f=0; f<features.length; f++){
				popomap1.drawlayer.addFeatures([features[f]]);
			}
			// 搬迁弹窗到矢量图
			var popups = clonePopupsOCN2WGS84(map0.popups);
			for(var p=0; p<popups.length; p++){
				map1.addPopup(popups[p]);
			}
			// 清除OCN2.5D地图中的标注
			popomap0.allClean();
		} 
		else if (type == 3) { // 加载影像图
			map = map2;
			popomap = popomap2;
			measure = measure2;
			$g('mapDiv').style.display = 'none';
			$g('map1').style.display = 'none';
			$g('map2').style.display = 'block';
			
			ele.src = '/img/mapType/25d.png';
			ele.title = '切换到2.5D';
			
			var ctr = map1.getCenter();
			// 初始化影像图
			initMap2(); 
			map2.setCenter([ctr.lon, ctr.lat], zoomNum);
			// 搬迁标注到影像图
			var features = cloneFeatures(popomap1.showlayer.features);
			for(var f=0; f<features.length; f++){
				popomap2.showlayer.addFeatures([features[f]]);
			}
			// 搬迁标注到影像图
			var features = cloneFeatures(popomap1.drawlayer.features);
			for(var f=0; f<features.length; f++){
				popomap2.drawlayer.addFeatures([features[f]]);
			}
			// 搬迁弹窗到影像图
			var popups = clonePopups(map1.popups);
			for(var p=0; p<popups.length; p++){
				map2.addPopup(popups[p]);
			}
			// 清除矢量图中的标注
			popomap1.allClean();
		}
	}
};

/**
 * 地图样式
 */
var nui = {
	init : function() {
		// 根据导航栏内容来决定是否隐藏导航栏
		this.leftW = mapUiParams.leftW;
		this.topH = mapUiParams.topH;
	},
	resize : function() {
		var width = document.documentElement.clientWidth;
		var height = document.documentElement.clientHeight;
		var $winW = $(window).width();
		var $winH = $(window).height();
//		if ($winW < 1024) {
//			$winW = 1024;
//			$('#o_head,#o_nav').css({
//				width : 1024 + 'px'
//			});
//		} else {
			$('#o_head,#o_nav').css({
				width : $winW + 'px'
			});
//		}
		var curLeftW = this.leftW; // parseInt($('#panelbtn').css('left'));
		var $mapW = $winW - curLeftW;
		var $mapH = $winH - this.topH; // winter
		//$('#o_rbox').css({width:$mapW + 'px',height:$mapH + 'px',top:(this.topH - 1) + 'px',left:curLeftW + 'px'});
		$('#mapDiv').css({
			width : $mapW + 'px',
			height : $mapH + 'px',
			top : (this.topH) + 'px',
			left : curLeftW + 'px'
		});
		
		$('#map1').css({
			width : $mapW + 'px',
			height : $mapH + 'px',
			top : (this.topH) + 'px',
			left : curLeftW + 'px'
		});
		
		$('#map2').css({
			width : $mapW + 'px',
			height : $mapH + 'px',
			top : (this.topH) + 'px',
			left : curLeftW + 'px'
		});
	},
	initLayerUI : function() {
		$.ajax({
			url : "/front/layer/layerList.shtml?act=listAllLayer",
			data : {},
			dataType : "json",
			success : function(layers) {
				var ulEle = document.createElement('ul');
				//ulEle.onmouseout = hideLayerUI;
				for ( var i = 0; i < layers.length; i++) {
					var layer = layers[i];
					var li = document.createElement('li');
					li.style.width = '108px';
					li.layerId = layer.id;
					li.onclick = function(){ 
						switchLayerVisible($(this)[0]);
					};
					var divImg = document.createElement('div');
					divImg.className = 'leftimg';
					var img = document.createElement('img');
					img.src = '/images/menu/selec_d.gif';
					img.style.display = 'none';
					divImg.appendChild(img);
					
					var nameEle = document.createElement('a');
					nameEle.innerHTML = layer.nameEn;
					li.appendChild(divImg);
					li.appendChild(nameEle);
					
					ulEle.appendChild(li);
				}
				$('.menudiv').append(ulEle);
			}
		});
	}
};
