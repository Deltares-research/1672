<template>
  <div class="section">
  <h1>De kaart van 1672</h1>
  <div class="mapContainer">
  <l-map ref="map"
         :zoom="zoom" 
         :center="center" 
         :crs="crs">
    <l-tile-layer :url="url" 
                  :attribution="attribution">
    </l-tile-layer>
    <l-geo-json :geojson="waterways" :optionsStyle="waterwayStyle"></l-geo-json>
    <l-geo-json :geojson="dikes" :optionsStyle="dikeStyle"></l-geo-json>
    <l-geo-json :geojson="structures" :optionsStyle="structureStyle"></l-geo-json>
    <l-geo-json :geojson="inundations" :optionsStyle="inundationStyle"></l-geo-json>
  </l-map>
</div>
</div>
</template>

<script>
    /* eslint-disable */
import {LMap, LTileLayer, LMarker, LGeoJson} from 'vue2-leaflet';
import {Util, Proj} from "leaflet";
import L from "leaflet";
import axios from "axios";
import "proj4leaflet";
import proj4 from "proj4";

var res = [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420]

const RD = new L.Proj.CRS('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs', { // eslint-disable-line no-undef
    transformation: L.Transformation(-1, -1, 0, 0), // eslint-disable-line no-undef
    resolutions: res,
    origin: [-285401.920, 903401.920],
    bounds: L.bounds([-285401.920, 903401.920], [595401.920, 22598.080]) // eslint-disable-line no-undef
  })

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
    Util,
    Proj
  },
  async created () {
    let response = await fetch(this.getRequest(this.openEarth, 'hydrology:waterway'));
    this.waterways = await response.json();

    //response = await fetch(this.getRequest(this.openEarth, 'hydrology:structure'));
    //this.structures = await response.json();

    response = await fetch(this.getRequest(this.openEarth, 'hydrology:dike'));
    this.dikes = await response.json();

    response = await fetch(this.getRequest(this.linieRCE, 'liniestellingen:inundaties'));
    this.inundations = await response.json();
  },
  data () {
    return {
      url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/water/EPSG:28992/{z}/{x}/{y}.png',
      openEarth:'https://waterlinie1672.openearth.nl/geoserver/ows',
      linieRCE: "https://services.rce.geovoorziening.nl/liniesenstellingen/wfs",
      attribution: 'BRRRRT',
      zoom: 6,//18,
      center: L.latLng(52.155, 5.3877),// L.latLng(47.56, 7.59), //
      markerLatLng: [51.504, 4.58],
      waterways: null,
      structures: null,
      dikes: null,
      inundations: null,
      crs: RD,
      options: {continuousWorld: true},
    };
  },
  methods:{
    getRequest(baseURL, featureName){
      var defaultParams = {
              service: 'WFS',
              version: '1.1.0',
              request: 'GetFeature',
              typeName: featureName,
              outputFormat: 'application/json',
              srsname: 'EPSG:4326'
      };

      var request = (baseURL + Util.getParamString(defaultParams));
      console.log(request)
      return request
      // https://waterlinie1672.openearth.nl/geoserver/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=hydrology%3Awaterway&outputFormat=application%2Fjson&srsname=EPSG:4326
      //return 'https://service.pdok.nl/prorail/spoorwegen/wfs/v1_0?request=GetFeature&service=WFS&version=2.0.0&outputFormat=application/json&srsname=EPSG:4326&count=100&typename=spoorwegen:station'
    },
    waterwayStyle(feature) {
        if (feature.properties.type == 1){
          // Rivers
          return {
            "color":  '#4141C9',
            "weight": 3
          };
        } else if (feature.properties.type==2){
          // Ditch
          return {
            "color":  '#262ED3',
            "weight": 1
          };
        } else if (feature.properties.type==3){
          // Canal
          return {
            "color":  '#1620A0',
            "weight": 2
          };
        }
    },
    dikeStyle(feature) {
      if (feature.properties.type == 1){
        // Riverdike
        return {
          "color":  '#2D280F',
          "weight": 2
        };
      } else if (feature.properties.type==2){
        return {
          "color":  '#5C542E',
          "weight": 1
        };
      } 
    },
    structureStyle(feature) {
      if (feature.properties.type == 1){
        // Riverdike
        return {
          "color":  '#2D280F',
          "weight": 2
        };
      } else if (feature.properties.type==2){
        // Embankment
        return {
          "color":  '#545037',
          "weight": 1
        };
      } 
    },
    inundationStyle(feature) {
      if (feature.properties.periode == "1629-1787"){
        // 
        return {
          "color": "#2EA0A7",
          "fillColor": "#2EA0A7",
          "fill-opacity": "0.2"
        };
      } else {
        return {
          "color":  '#ffffffff',
          "fillOpacity": "0",
          "strokeWidth": "0",
          "stroke": "false",
          "weight": "0",
        };
      } 
    },
}}


</script>

<style scoped>
.mapContainer{
  width:  calc(100vw - 100px);
  height: 70vh;
  text-align: center;
  display: block;
  margin: auto;
  top:  4em;
  }

l-map{
  height: 100%;
}

.leaflet-tile { border: solid black 5px; }
</style>


