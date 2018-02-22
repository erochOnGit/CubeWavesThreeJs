import React from "react";
import { compose, lifecycle } from "recompose";
import THREELib from "three-js";

const ThreeContainer = () =>
  compose(
    lifecycle({
      componentDidMount() {
          var THREE = THREELib(); // return THREE JS
          // Our Javascript will go here.
          var scene = new THREE.Scene();
          var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

          var renderer = new THREE.WebGLRenderer();
          renderer.setSize( window.innerWidth, window.innerHeight );
          document.body.appendChild( renderer.domElement );

          var geometry = new THREE.BoxGeometry( 1, 1, 1 );
          var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
          var cube = new THREE.Mesh( geometry, material );
          scene.add( cube );

          camera.position.z = 5;
          function animate() {
              requestAnimationFrame( animate );
              renderer.render( scene, camera );
          }
          animate();
      }
    })
  );

export default ThreeContainer;
