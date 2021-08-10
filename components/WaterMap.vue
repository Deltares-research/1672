<template>
    <div id="container"></div>
</template>

<script>
import * as THREE from '../node_modules/three/build/three.module.js';

import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js';

import { GUI } from '../node_modules/three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { Water } from '../node_modules/three/examples/jsm/objects/Water.js';
import { Sky } from '../node_modules/three/examples/jsm/objects/Sky.js';

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
    }
  },
  methods: {
    updateSun: function(){
      const phi = THREE.MathUtils.degToRad( 90 - this.parameters.elevation );
          const theta = THREE.MathUtils.degToRad( this.parameters.azimuth );

          this.sun.setFromSphericalCoords( 1, phi, theta );

          this.sky.material.uniforms[ 'sunPosition' ].value.copy( this.sun );
          this.water.material.uniforms[ 'sunDirection' ].value.copy( this.sun ).normalize();

          this.scene.environment = this.pmremGenerator.fromScene(this.sky ).texture;

    },
    onWindowResize: function() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( window.innerWidth, window.innerHeight );
    },
    init: function() {
        this.container = document.getElementById('container' );

        //

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.container.appendChild( this.renderer.domElement );

        //

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
        this.camera.position.set( 30, 30, 2000 );
        const a = new THREE.Vector3( 0, 0, 0 );
        this.camera.lookAt(a)
        //

        this.sun = new THREE.Vector3();

        // Water

        //const heartShape = new THREE.Shape();
        //const x = 0, y = 0;
        //heartShape.moveTo( x + 5, y + 5 );
        //heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
        //heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
        //heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
        //heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
        //heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
        //heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

        //const waterGeometry = new THREE.ShapeGeometry( heartShape );

        const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

        this.water = new Water(
          waterGeometry,
          {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( '/waternormals.jpg', function ( texture ) {

              texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            } ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: this.scene.fog !== undefined
          }
        );

        this.water.rotation.x = - Math.PI / 2;

        this.scene.add( this.water );

        // Skybox

        this.sky = new Sky();
        this.sky.scale.setScalar( 10000 );
        this.scene.add( this.sky );

        const skyUniforms = this.sky.material.uniforms;

        skyUniforms[ 'turbidity' ].value = 10;
        skyUniforms[ 'rayleigh' ].value = 2;
        skyUniforms[ 'mieCoefficient' ].value = 0.005;
        skyUniforms[ 'mieDirectionalG' ].value = 0.8;

        this.parameters = {
          elevation: 2,
          azimuth: 180
        };

        this.pmremGenerator = new THREE.PMREMGenerator( this.renderer );

        // add texture map
        //const geometry = new THREE.PlaneGeometry(1000, 1000);
        //const loader = new THREE.TextureLoader();
        //const texture = loader.load( '/waternormals.jpg')
        //const material = new THREE.MeshBasicMaterial( { map: texture } );
        //this.mesh = new THREE.Mesh( geometry, material );
        //this.mesh.rotation.x = - Math.PI / 2;
        //this.mesh.position.z = 1000;
        //this.mesh.position.y  = 12;
//
        // 
        //
        //this.scene.add( this.mesh );
        

        // spinning box
        if (false){
        const geometry = new THREE.BoxGeometry( 30, 30, 30 );
        const material = new THREE.MeshStandardMaterial( { roughness: 0 } );

        this.mesh = new THREE.Mesh( geometry, material );
        this.scene.add( this.mesh );
        }

        // Controls (mouse movement)
        if (false){
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.maxPolarAngle = Math.PI * 0.495;
        this.controls.target.set( 0, 10, 0 );
        this.controls.minDistance = 40.0;
        this.controls.maxDistance = 200.0;
        this.controls.update();
        }

        // Stats (show fps)
        this.stats = new Stats();
        if (false){
        this.container.appendChild( this.stats.dom );
        }
        // GUI
        if (false){
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
        }
        //
        this.updateSun()

        window.addEventListener( 'resize', this.onWindowResize );

    },
    animate: function() {
        requestAnimationFrame( this.animate );
        this.render();
        this.stats.update();

    },
    render: function(){
      const time = performance.now() * 0.001;

      //this.mesh.position.y = Math.sin( time ) * 20 + 5;
      //this.mesh.rotation.x = time * 0.5;
      //this.mesh.rotation.z = time * 0.51;

      this.water.material.uniforms[ 'time' ].value += 1.0 / 120.0;

      this.renderer.render( this.scene, this.camera );

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