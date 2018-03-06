import React from "react";
import { compose, lifecycle } from "recompose";
import * as THREE from "three";
var OrbitControls = require('three-orbit-controls')(THREE)

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

        // controls = new THREE.OrbitControls(camera, renderer.domElement)

        //create a blue LineBasicMaterial
        var materialLine = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        var geometryLine = new THREE.Geometry();
        geometryLine.vertices.push(new THREE.Vector3(-12, 0, 0));
        geometryLine.vertices.push(new THREE.Vector3(0, 10, 0));
        geometryLine.vertices.push(new THREE.Vector3(10, 0, 0));
        // Note that lines are drawn between each consecutive pair of
        var line = new THREE.Line(geometryLine, materialLine);
        scene.add(line);
        //
        // //create a cube
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({
          color: 0x00ff00,
          wireframe: true
        });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // var light = new THREE.AmbientLight( 0x00ff00 ); // soft white light
        // scene.add( light );
        //
        // // White directional light at half intensity shining from the top.
        // var directionalLight = new THREE.DirectionalLight( 0x00ff00, 0.5 );
        // scene.add( directionalLight );
        //
        // var light2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        // scene.add( light2 );

        camera.position.z = 20;

        // function tick() {
        //   controls.update();
        //   controls.copyInto(camera.position, camera.direction, camera.up);
        // }

         var controls = new OrbitControls(camera)

        function animate() {
          requestAnimationFrame(animate);

          // cube.rotation.x += 0.01;
          // cube.rotation.y += 0.01;
          //
          // line.rotation.z += 0.01;

          renderer.render(scene, camera);
        }
        animate();
      }
    })
  );

export default ThreeContainer;
