import React from "react";
import { compose, lifecycle } from "recompose";
import * as THREE from "three";
var OrbitControls = require("three-orbit-controls")(THREE);

const ThreeContainer = () =>
  compose(
    lifecycle({
      componentDidMount() {
        // var THREE = THREELib(); // return THREE JS
        // Our Javascript will go here.
        var scene = new THREE.Scene();
        // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        var camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          1,
          500
        );
        camera.position.set(0, 0, 100);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        window.addEventListener("resize", () => {
          var width = window.innerWidth;
          var height = window.innerHeight;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        });

          var controls = new OrbitControls(camera);

          var geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
          var vertices = new Float32Array( [
              -1.0, -1.0,  1.0,
              1.0, -1.0,  1.0,
              1.0,  1.0,  1.0,

              1.0,  1.0,  1.0,
              -1.0,  1.0,  1.0,
              -1.0, -1.0,  1.0
          ] );

// itemSize = 3 because there are 3 values (components) per vertex
          geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
          var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
          var mesh = new THREE.Mesh( geometry, material );
          scene.add(mesh)


        function animate() {

          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        }
        animate();
      }
    })
  );

export default ThreeContainer;
