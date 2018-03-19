import React from "react";
import { compose, lifecycle } from "recompose";
import rgbHex from "rgb-hex";
const d3 = require("d3");
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
        let width = 61;
        let height = 61;
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
        // console.log(height / 2 - 1, width / 2 - 1);

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            //first argument is width second is height and third is z axes
            var geometry = new THREE.BoxBufferGeometry(1, cubeHeight, 1);
            var material;
            if (y == height / 2 - 0.5 && x == width / 2 - 0.5) {
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
            // console.log(y, x);

            if (y == height / 2 - 0.5 && x == width / 2 - 0.5) {
              // console.log(y, x, height, width);
              cube.name = "cube" + x + " centre";
            } else {
              cube.name = "cube" + x + y;
            }
            cube.position.set(x * 1.5, 0, y * 1.5);
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
        // console.log(getCubes(scene).map(cube => cube.name));
        const CenterCube = getCubes(scene)
          .filter(cube => cube.name.includes("centre"))
          .reduce((acc, curr) => {
            return curr;
          }, {});
        // console.log(getDistance(getCubes(scene)[0], getCubes(scene)[20]));
        // console.log(getCubes(scene)[20]);
        function animate() {
          angle += 0.02;
          let offset = 0;
          let cubeIndex = 0;
          requestAnimationFrame(animate);

          getCubes(scene).forEach(cube => {
            // if (cubeIndex % height === 0) {
            //   offset = 0;
            //   cubeIndex = 0;
            // }
            offset = getDistance(cube, CenterCube);
            let angleAndOffset = angle + offset * 0.15;
            cubeHeight = Math.pow(Math.sin(angleAndOffset), 2) * 200 + 50;
            cube.scale.y = cubeHeight;

            const scaleR = d3
              .scaleLinear()
              .domain([0, 251])
              .range([26, 183]);
            let R = scaleR(cubeHeight);

            const scaleG = d3
              .scaleLinear()
              .domain([0, 251])
              .range([29, 158]);
            let G = scaleG(cubeHeight);

            const scaleB = d3
              .scaleLinear()
              .domain([0, 251])
              .range([60, 127]);
            let B = scaleB(cubeHeight);

            //1a1d26    26,29,38
            //242f35    36,47,53
            //46585e    70,88,94
            //b79e7f    183,158,127
            //d0a980    208,169,128
            //f8cc9b    248,204,155

            let color = rgbHex(R, G, B);
            cube.material.color.setHex(parseInt(color, 16));
            // setHex()
            // offset += 0.03;
            // cubeIndex++;
          });
          renderer.render(scene, camera);
        }
        animate();
      }
    })
  );

export default ThreeContainer;
