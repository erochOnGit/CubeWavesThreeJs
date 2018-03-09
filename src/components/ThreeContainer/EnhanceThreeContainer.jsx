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

function getDistance(mesh1, mesh2) {
  var dx = mesh1.position.x - mesh2.position.x;
  var dy = mesh1.position.y - mesh2.position.y;
  var dz = mesh1.position.z - mesh2.position.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
const ThreeContainer = () =>
  compose(
    lifecycle({
      componentDidMount() {
        let angle = 0;
        let cubeHeight = 0.1;
        let width = 21;
        let height = 21;
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

        for (let y = 0; y < height * 2; y += 2) {
          for (let x = 0; x < width * 2; x += 2) {
            //first argument is width second is height and third is z axes
            var geometry = new THREE.BoxBufferGeometry(1, cubeHeight, 1);
            var material;
            if (y == 20 && x == 20) {
              material = new THREE.MeshPhongMaterial({
                color: 0xffc0cb,
                dithering: true
              });
            } else if (y == 0 && x == 40) {
              material = new THREE.MeshPhongMaterial({
                color: 0xff0000,
                dithering: true
              });
            } else if (y == 40 && x == 0) {
              material = new THREE.MeshPhongMaterial({
                color: 0x00ffff,
                dithering: true
              });
            } else if (y == 0 && x == 0) {
              material = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                dithering: true
              });
            } else {
              material = new THREE.MeshPhongMaterial({
                color: 0x00ff00,
                dithering: true
              });
            }
            var cube = new THREE.Mesh(geometry, material);

            cube.position.set(x * 0.7, 0, y * 0.7);
            cube.name = "cube" + x;
            scene.add(cube);
          }
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

        console.log(getDistance(getCubes(scene)[0], getCubes(scene)[20]));
        console.log(getCubes(scene)[20]);
        function animate() {
          angle += 0.04;
          let offset = 0;
          let cubeIndex = 0;
          getCubes(scene).forEach(cube => {
            // if (cubeIndex % height === 0) {
            //   offset = 0;
            //   cubeIndex = 0;
            // }
            offset = getDistance(cube, getCubes(scene)[220]);
            let angleAndOffset = angle + (offset*0.15);
            cubeHeight = (Math.pow(Math.sin(angleAndOffset), 2) * -200) - 50;
            cube.scale.y = cubeHeight;
            // offset += 0.03;
            // cubeIndex++;
          });

          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        }
        animate();
      }
    })
  );

export default ThreeContainer;
