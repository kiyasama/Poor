$(function() {
	mapLoader();
	// 加载2.5D地图
});

/**
 * 初始化OCN2.5D地图
 */
var map;
var editlayer;
//编辑图层  画点、线、面
function mapLoader() {
	var mapDiv = document.getElementById('mapDiv');
	if (mapDiv == null || typeof (mapDiv) == 'undefined')
		return;
	// 若没有指定容器就不再往下执行

	var config = new OMAP.Config({
		imagePath : "/image",
		jsPath : "http://61.185.20.73:58888/resource/js/",
		mapId : 2, // 2鼠标移动到上面有气泡 ， 5 没有气泡
		scale : 0.353,
		hotFileLevel : 5,
		overlook : Math.PI / 4,
		rotate : Math.PI / 4
	});
	var ext = new OMAP.Bounds(-56255400.354765005, -56255400.354765005, 56255400.354765005, 56255400.354765005);

	var layerYX = new OMAP.Layer.NOGISLayer("YX", "http://61.185.20.73:58888/resource/yx", {
		isBaseLayer : true,
		defaultImage : '/api/img/nopic.jpg',
		loadHotspot : false
	});
	var layer25D = new OMAP.Layer.NOGISLayer("25D", "http://61.185.20.73:58888/resource", {
		isBaseLayer : false,
		transparent : true,
		defaultImage : '/api/img/transparent.png',
		loadHotspot : true
	});
	// 地图配置
	var mapOptions = {
		extent : ext,
		center : [7656389.8598, 4714460.4098],
		zoom : 4,
		//restrictedExtent : new OMAP.Bounds(7662081.779113,4658244.0444917,7666715.740033,4662267.7442775),
		config : config,
		resolutions : [107.29866095498084608, 53.64933047749042304, 26.82466523874521152, 13.41233261937260576, 6.70616630968630288, 3.35308315484315144, 1.67654157742157572, 0.83827078871078786, 0.41913539435539393],
		numZoomLevels : 15, // mapConfig.maxLevel = 9
		layers : [layer25D, layerYX],
		controls : [new OMAP.Control.MousePosition(), // 鼠标位置
		new OMAP.Control.Navigation(), // 导航条
		new OMAP.Control.LayerSwitcher(), //图层切换
		new OMAP.Control.LTOverviewMap() // 鹰眼图
		]
	};
	// 初始化地图
	map = new OMAP.Map("mapDiv", mapOptions);
	editlayer = new OMAP.Layer.Vector("drawLayer");
	map.addLayer(editlayer);
}

//定位
function locate() {
	var pt = new OMAP.LonLat(7656389.8598, 4714460.4098);
	map.setCenter(pt, 4, false, false);
}

//加图标
var markers;
function addMarker() {
	markers = new OMAP.Layer.Markers("Markers");
	map.addLayer(markers);
	var pt = new OMAP.LonLat(7656389.8598, 4714460.4098);
	var size = new OMAP.Size(21, 25);
	var offset = new OMAP.Pixel(-(size.w / 2), -size.h);
	var icon = new OMAP.Icon('http://61.185.20.73:58888/api/img/marker.png', size, offset);
	var marker = new OMAP.Marker(pt, icon);
	marker.id = "asfddsf";
	markers.addMarker(marker);
	var pt = new OMAP.LonLat(7656389.8598, 4714460.4098);
	map.setCenter(pt, 4, false, false);
	marker.events.register('mousedown', marker, function(evt) {
		var id = evt.object.id;
		alert(id);
	});
}

//删除markers
function delMarker() {
	if(markers){
		map.removeLayer(markers);
	}
}

//删除

function delEditLayer(){
	if(editlayer){
		map.removeLayer(markers);
	}
}

//画线
var drawHandle;
function drawLine() {
	 draw("point");
}

function draw(type) {
	switch(type) {
	case "point":
		drawHandle = new OMAP.Control.DrawFeature(editlayer, OMAP.Handler.Point);
		break;
	case "line":
		drawHandle = new OMAP.Control.DrawFeature(editlayer, OMAP.Handler.Path);
		break;
	case "poly":
		drawHandle = new OMAP.Control.DrawFeature(editlayer, OMAP.Handler.Polygon);
		break;
	case "rect":
		drawHandle = new OMAP.Control.DrawFeature(editlayer, OMAP.Handler.RegularPolygon, {
			handlerOptions : {
				sides : 4,
				irregular : true
			}
		});
		break;
	}
	map.addControl(drawHandle);
	drawHandle.activate();
	//激活画图工具
	drawHandle.events.on({
		"featureadded" : function(eventArgs) {
			// 去激活画图工具
			drawHandle.deactivate();
			var geometry = eventArgs.feature.geometry;

			var url = "";
			if (type == "poly") {
				var coord = geometry.toString().replace("POLYGON((", "");
				coord = coord.replace("))", "");
				$.ajax({
					url : "http://localhost:8089/front/layer/layerLabelList.shtml?act=listLayersByPolygon&callback=?",
					data : {
						layerIds : 6, //图层id
						coord : coord
					},
					dataType : "json",
					success : function(layerData) {
						for (var j = 0; j < layerData.length; j++) {
							var features = layerData[j].features;
							for (var i = 0; i < features.length; i++) {
								var geom = null;
								if (layerData[j].type == 1) {
									//创建点
									geom = new OMAP.Geometry.Point(features[i].x, features[i].y);
								} else if (layerData[j].type == 2) {
									//创建线
									geom = OMAP.MapLib.createPolyline(features[i].xs, features[i].ys);
								} else if (layerData[j].type == 3) {
									//创建面
									geom = OMAP.MapLib.createPolygon(features[i].xs, features[i].ys);
								}

								var f = new OMAP.Feature.Vector(geom, features[i], style);
								editlayer.addFeatures([f]);
							};
						};

					}
				});
			} else if (type == "rect") {
				$.ajax({
					url : "http://localhost:8089/front/layer/layerLabelList.shtml?act=listByExtent&callback=?",
					data : {
						layerId : 6, //图层id
						xmin : geometry.getBounds().left,
						ymin : geometry.getBounds().bottom,
						xmax : geometry.getBounds().right,
						ymax : geometry.getBounds().top
					},
					dataType : "json",
					success : function(layerData) {
						var features = layerData.features;
						for (var i = 0; i < features.length; i++) {
							var geom = null;
							if (layerData.type == 1) {
								//创建点
								geom = new OMAP.Geometry.Point(features[i].x, features[i].y);
							} else if (layerData.type == 2) {
								//创建线
								geom = OMAP.MapLib.createPolyline(features[i].xs, features[i].ys);
							} else if (layerData.type == 3) {
								//创建面
								geom = OMAP.MapLib.createPolygon(features[i].xs, features[i].ys);
							}

							var f = new OMAP.Feature.Vector(geom, features[i], style);
							editlayer.addFeatures([f]);
						};
					}
				});
			}
		}
	});
}

