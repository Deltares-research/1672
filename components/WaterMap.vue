<template>
    <div id="container"></div>
</template>

<script>
import * as THREE from '../node_modules/three/build/three.module.js';

import { SVGLoader } from '../node_modules/three/examples/jsm/loaders/SVGLoader.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js';

import { GUI } from '../node_modules/three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { Water } from '../js/Water.js';
import { Sky } from '../node_modules/three/examples/jsm/objects/Sky.js';

import { EffectComposer } from '../node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../node_modules/three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from '../node_modules/three/examples/jsm/postprocessing/BokehPass.js';


export default {
  name: "WaterMap",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      container: null,
      stats: null,
      controls: null,
      water: null,
      sun: null,
      mesh: null,
      parameters: null,
      sky: null,
      pmremGenerator: null,
      postProcessing: {}
    }
  },
  computed: {
    cameraPosition: function(){
      return [this.$store.state.camerax, this.$store.state.cameray, this.$store.state.cameraz] 
    }
  },
  methods: {
    updateSun: function(){
      const phi = THREE.MathUtils.degToRad( 90 - this.parameters.elevation );
          const theta = THREE.MathUtils.degToRad( this.parameters.azimuth );

          this.sun.setFromSphericalCoords( 1, phi, theta );

          this.sky.material.uniforms[ 'sunPosition' ].value.copy( this.sun );
          if (this.water){
            this.water.material.uniforms[ 'sunDirection' ].value.copy( this.sun ).normalize();
          }
          this.scene.environment = this.pmremGenerator.fromScene(this.sky ).texture;

    },
    onWindowResize: function() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
    },
    loadGLB: function(gltf){
      var meshes = []
        gltf.scene.traverse((object) => {
          if (object.isMesh) meshes.push(object);
        });
        meshes.forEach((mesh) => {
          mesh.position.y=1

          if (mesh.name=="Water"){
            this.loadWater(mesh);
          } else if (mesh.name=="Masp") {
            //
          }else{
          mesh.castShadow = true; 
          mesh.receiveShadow = false; 
          this.scene.add(mesh);
          }
        });

 
    },
    loadWater: function(data){
      
      //const path = data.paths[0]
      //const shape = SVGLoader.createShapes ( path )
      //const waterGeometry = new THREE.ShapeGeometry( shape );
      const waterGeometry = data.geometry;
      
      //const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );
      

      this.water = new Water(
        waterGeometry,
        {
          textureWidth: 512,
          textureHeight: 512,
          waterNormals: new THREE.TextureLoader().load( 'waternormals.jpg', function ( texture ) {

            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

          } ),
          sunDirection: new THREE.Vector3(),
          sunColor: 0xF0420B, //0xffffff,
          waterColor: 0x050520, //0x001e0f, // 0x131378,  // 0x001e0f 
          distortionScale: 2,
          fog: this.scene.fog !== undefined
        }
      );
      
      //this.water.rotation.x = -Math.PI / 2;     
      this.water.position.y = 0.4
      //this.water.position.z = 1
      this.scene.add( this.water)
    },
    reportPositionCamera: function(){
      
      // location
      console.log(this.camera.position)
      
      // direction
      var dirvector = new THREE.Vector3();
      this.camera.getWorldDirection(dirvector)
      console.log(dirvector)
        
    },
    loadMap: function() {
      const loader = new THREE.TextureLoader();
      
      // map png
      const texture = loader.load( 'kom_map.png')
      texture.encoding = THREE.sRGBEncoding;
      
      //const material = new THREE.MeshBasicMaterial( { map: texture } );
      const material2 = new THREE.MeshLambertMaterial( { map: texture } )

      
      var map = new THREE.Mesh( new THREE.PlaneGeometry(1061, 1404), material2 );
      
      map.rotation.x =  - Math.PI / 2;
      map.rotation.z =  0//Math.PI ;
      map.position.z = -320;
      map.position.x = -60;
      map.position.y  = 0;
      map.receiveShadow = true;

      this.scene.add( map );
    },
    addSky: function(){
      this.sky = new Sky();
      this.sky.scale.setScalar( 10000 );
      this.scene.add( this.sky );

      const skyUniforms = this.sky.material.uniforms;

      skyUniforms[ 'turbidity' ].value = 10;
      skyUniforms[ 'rayleigh' ].value = 2;
      skyUniforms[ 'mieCoefficient' ].value = 0.005;
      skyUniforms[ 'mieDirectionalG' ].value = 0.8;

      this.parameters = {
        elevation: 15,
        azimuth: 120
      };

      this.pmremGenerator = new THREE.PMREMGenerator( this.renderer );
      },
    addGUI: function() {
      const gui = new GUI();

      const folderSky = gui.addFolder( 'Sky' );
      folderSky.add( this.parameters, 'elevation', 0, 90, 0.1 ).onChange( this.updateSun );
      folderSky.add( this.parameters, 'azimuth', - 180, 180, 0.1 ).onChange( this.updateSun );
      folderSky.open();

      const waterUniforms = this.water.material.uniforms;

      const folderWater = gui.addFolder( 'Water' );
      folderWater.add( waterUniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' );
      folderWater.add( waterUniforms.size, 'value', 0.1, 20, 0.1 ).name( 'size' );
      folderWater.open();
    },
    addStats: function(){
      this.stats = new Stats();
        if (false){
          this.container.appendChild( this.stats.dom );
        }
    },
    addControls: function(){
      this.controls = new OrbitControls( this.camera, this.renderer.domElement );
      this.controls.maxPolarAngle = Math.PI * 0.495;
      this.controls.target.set( -0.02246, -0.268235, 60  );
      this.controls.minDistance = 40.0;
      this.controls.maxDistance = 300.0;
      this.controls.update();
      this.controls.addEventListener( 'change', this.reportPositionCamera);
    },
    addLights: function() {

        // Ambient light illuminates all objects equally
        var ambientLight = new THREE.AmbientLight(0xD3E8E9, 0.4);
        this.scene.add(ambientLight);

        // SpotLight casts shadows
        var spotLight = new THREE.SpotLight( 0x6193AD , 1);
        //var spotLightHelper = new THREE.SpotLightHelper( spotLight );
        spotLight.position.set( 22, 1200, 35 );
        spotLight.castShadow = true;
        //spotLight.shadow.mapSize.width = 4000;
        //spotLight.shadow.mapSize.height = 4000;
        //spotLight.shadow.camera.near = 10;
        //spotLight.shadow.camera.far = 3000;
        //spotLight.shadow.camera.fov = 30;
        spotLight.intensity = 0.8;
        this.scene.add( spotLight);

        // Hemisphere is a light source positioned directly above the scene, with color fading from the sky color to the ground color.
        var hemisphereLight = new THREE.HemisphereLight(0xFFBA98, 0x080820, 0.6  )//0x69696A, 0x69696A, 0.8 );
        this.scene.add( hemisphereLight );

    },
    initPostprocessing: function() {
        
        let width = window.innerWidth;
        let height = window.innerHeight;
        const renderPass = new RenderPass( this.scene, this.camera );

        const bokehPass = new BokehPass( this.scene, this.camera, {
          focus: 120.0,
          aperture: 0.00002,
          maxblur: 0.01,

          width: width,
          height: height,
        } );

        const composer = new EffectComposer( this.renderer );

        composer.addPass( renderPass );
        composer.addPass( bokehPass );

        this.postProcessing.composer = composer;
        this.postProcessing.bokeh = bokehPass;

      },
    init: function() {
        this.container = document.getElementById('container' );

        //

        this.renderer = new THREE.WebGLRenderer( { antialias: true});
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.container.appendChild( this.renderer.domElement );

        //
        
        this.scene = new THREE.Scene();

        
        // Add camera
        this.camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 20000 );
        
        let position = 5
        

        if (position==1){
          this.camera.position.set(70, 300, 472);  //447.49262,1336.4336
          const a = new THREE.Vector3(70, 0, 200 );
          this.camera.lookAt(a)
        } else if (position == 2) {
          this.camera.position.set(70, 40, 420 );  //447.49262,1336.4336
          const a = new THREE.Vector3(70, 0, 100 );
          this.camera.lookAt(a)
        } else if (position==3){
          this.camera.position.set(70, 106, 500 );  //447.49262,1336.4336
          var a = new THREE.Vector3(70, 0, 200 );
          this.camera.lookAt(a)
        }
        else if (position==4){
          this.camera.position.set(130, 90, 430 );  //447.49262,1336.4336
          var a = new THREE.Vector3(60, 0, 250 );
          this.camera.lookAt(a)
        }
        else if (position==5){
          this.camera.position.set(-60, 30, 380 );  //447.49262,1336.4336
          var a = new THREE.Vector3(300, 0, 140 );
          this.camera.lookAt(a)
        }


        //const axesHelper = new THREE.AxesHelper( 500 );
        //this.scene.add( axesHelper );

        // Sun
        this.sun = new THREE.Vector3();

        
        this.addLights()
        
        // Skybox
        //this.addSky()
  
        var skyLoader = new THREE.TextureLoader();
        var skyBg
        skyBg = skyLoader.load("https://i.ibb.co/8bzn2nX/sky-hdr-img.jpg");
        skyBg.offset.y = 1000
        skyBg.mapping = THREE.EquirectangularReflectionMapping;
        skyBg.encoding = THREE.sRGBEncoding;
        
        this.scene.background = skyBg;
        

        

        // assets
        const glbloader = new GLTFLoader();
        glbloader.load('assets.glb', this.loadGLB)

        // add texture map
        this.loadMap()

        // Controls (mouse movement)
        //this.addControls()

        // Stats (show fps)
        //this.addStats()

        // GUI
        //this.addGUI()

        //this.updateSun()

        this.initPostprocessing()
        window.addEventListener( 'resize', this.onWindowResize );

    },
    animate: function() {
        requestAnimationFrame( this.animate );
        this.render();
        if (this.stats){
          this.stats.update();
        }

    },
    render: function(){
      const time = performance.now() * 0.001;

      //this.mesh.position.y = Math.sin( time ) * 20 + 5;
      //this.mesh.rotation.x = time * 0.5;
      //this.mesh.rotation.z = time * 0.51;
      if (this.water){
        this.water.material.uniforms[ 'time' ].value += 1.0 / 120.0;
      }
      this.renderer.render( this.scene, this.camera );
      //console.log(this.camera.position)
      this.postProcessing.composer.render( 0.1 );
    }
  },
  mounted() {
      this.init();
      this.animate();
  }
}
</script>

<style scoped>
    #container{
      width:  100%;
      height:  100%;
    }
</style>