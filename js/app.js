// var start_date = 0;
//
// function am_i_current_track(element, time_start, time_end){
//   var time_current = new Date();
//   if(time_start <= time_current && time_end > time_current){
//     element.addClass("current-slot");
//   }
// }

function initOSM(map) {
  var center_conference = ol.proj.transform([8.40182,49.00770], 'EPSG:4326', 'EPSG:3857');
  var center_evening_event = ol.proj.transform([8.39374,49.01206], 'EPSG:4326', 'EPSG:3857');
  var center = center_conference; // default

  if(map == "Evening Event"){
    center = center_evening_event;
  }


  var vectorSource = new ol.source.Vector({
      //create empty vector
    });

  var iconFeature_conference = new ol.Feature({
    geometry: new ol.geom.Point(center_conference),
    name: 'German OWASP Day'
  });
  vectorSource.addFeature(iconFeature_conference);

  var iconFeature_evening_event = new ol.Feature({
    geometry: new ol.geom.Point(center_evening_event),
    name: 'Vorabendveranstaltung'
  });
  vectorSource.addFeature(iconFeature_evening_event);

  //create the style
  var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(({
      anchor: [0.5, 0.5],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      opacity: 1.0,
      src: '/img/icons/owasp_icon_small_filled.png'
    }))
  });

  //add the feature vector to the layer vector, and apply a style to whole layer
  var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: iconStyle
  });

  var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    vectorLayer
  ],
  target: document.getElementById('map'),
  view: new ol.View({
    center: center,
    zoom: 16,
    minZoom: 2,
    maxZoom: 19
  })
});
}
