import React from "react";
import { compose, lifecycle } from "recompose";
import * as THREE from "three";
var OrbitControls = require("three-orbit-controls")(THREE);

// function that get all the scene cube
const getCubes = scene => {
  return scene.children.reduce((acc, curr) => {
    if (curr.name.includes("cube")) {
      acc.push(curr);
    }
    return acc;
  }, []);
};

const ThreeContainer = () =>
  compose(
    lifecycle({
      componentDidMount() {
        let angle = 0;
        let cubeHeight = 0.1;
        let cubeNumber = 6;
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
        camera.position.set(50, 50, 100);
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

        for (let x = 0; x < cubeNumber*2; x += 2) {
          //first argument is width second is height and third is z axes
          var geometry = new THREE.BoxBufferGeometry(1, cubeHeight, 1);
          var material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            dithering: true
          });
          var cube = new THREE.Mesh(geometry, material);
          cube.position.set(x + 0.2, 0, 0);
          cube.name = "cube" + x;
          scene.add(cube);
        }
        var ambient = new THREE.AmbientLight(0xffffff, 0.1);
        scene.add(ambient);

        // white spotlight shining from the side, casting a shadow

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(100, 1000, 100);

        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 30;

        scene.add(spotLight);
console.log(Math.sin(2))
        function animate() {
          angle += 0.05;
          cubeHeight = Math.pow(Math.sin(angle), 2) * 100 + 5;
            getCubes(scene).forEach(cube=>{
              cube.scale.y = cubeHeight;
                }
            )
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        }
        animate();
      }
    })
  );

export default ThreeContainer;
