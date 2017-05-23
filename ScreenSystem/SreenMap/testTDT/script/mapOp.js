
function addMap(){
	var emap_url='http://t0.tianditu.com/vec_c/wmts';
	var emapanno_url='http://t0.tianditu.com/cva_c/wmts';
	var img_url='http://t0.tianditu.com/img_c/wmts';
	var imganno_url='http://t0.tianditu.com/cia_c/wmts';
	
	//电子地图
	var emap_layer = new L.TileLayer.WMTS( emap_url ,
                               {
								   tileSize:256,
                                   layer: 'vec',
                                   style: "default",
                                   tilematrixSet: "c",
                                   format: "tile",
                                   //attribution: "<a href='https://github.com/mylen/leaflet.TileLayer.WMTS'>GitHub</a>&copy; <a href='http://www.ign.fr'>IGN</a>"
                               }
                              );
	//电子地图注记
    var emapanno_layer = new L.TileLayer.WMTS( emapanno_url,
                               {
								   tileSize:256,
                                   layer: 'cva',
                                   style: "default",
                                   tilematrixSet: "c",
                                   format: "tile",
                                   //attribution: "<a href='https://github.com/mylen/leaflet.TileLayer.WMTS'>GitHub</a>&copy; <a href='http://www.ign.fr'>IGN</a>"
                               }
                              );
	//影像地图						  
	var img_layer = new L.TileLayer.WMTS( img_url,
                               {
								   tileSize:256,
                                   layer: 'img',
                                   style: "default",
                                   tilematrixSet: "c",
                                   format: "tile",
                                   //attribution: "<a href='https://github.com/mylen/leaflet.TileLayer.WMTS'>GitHub</a>&copy; <a href='http://www.ign.fr'>IGN</a>"
                               }
                              );
	//影像地图注记						  
	var imganno_layer = new L.TileLayer.WMTS( imganno_url,
                               {
								   tileSize:256,
                                   layer: 'cia',
                                   style: "default",
                                   tilematrixSet: "c",
                                   format: "tile",
                                   //attribution: "<a href='https://github.com/mylen/leaflet.TileLayer.WMTS'>GitHub</a>&copy; <a href='http://www.ign.fr'>IGN</a>"
                               }
                              );						  
	var map = L.map('map',{crs:L.CRS.EPSG4326,center: {lon:112 , lat:40},zoom: 13});
	var dlgLayer=L.layerGroup().addLayer(emap_layer,emapanno_layer);
	var imgLayer=L.layerGroup().addLayer(img_layer,imganno_layer);
	map.addLayer(dlgLayer);
	//map.addLayer(imgLayer);
	
	var marker1=L.marker([42,112]).addTo(map);
	var marker2=L.marker([40,110]).addTo(map);
	var bounds=new L.Bounds([
		[42, 112],
		[40, 110]
	]);
	console.log(map.getSize());
	
	var popup1 = L.popup()
		.setLatLng([42, 112])
		.setContent('<p><h3>Hello world!</h3><br />This is a nice popup.</p>');
	
	var popup2=marker1.bindPopup(popup1).getPopup();
	marker2.bindPopup(popup2);
	marker2.setPopupContent("dahong");
	
	var polygon = L.polygon([
		[42, 112],
		[40, 110]
	],{color:"#FFF"}).addTo(map);
	polygon.bindPopup(popup1)
	
	var circlemarker1=new L.CircleMarker([42.5,111.5],{radius:100,weight:30});
	circlemarker1.addTo(map).bindPopup(popup1)
	
	 var circlemarker2=new L.CircleMarker([43.5,110.5],{radius:100,weight:30});
	 circlemarker2.addTo(map).bindPopup(popup1)
	
	function onMapClick(e) {
		alert("You clicked the map at " + e.latlng);
	}
	marker1.on('click', onMapClick);
	
	marker2.on("click",function(){alert("0")});
}
