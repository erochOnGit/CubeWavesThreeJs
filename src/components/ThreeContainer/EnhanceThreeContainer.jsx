import React from "react";
import { compose, lifecycle } from "recompose";
import * as THREE from "three";
import solN9 from "../../img/solN9.png";
import solN4 from "../../img/solN4.png";
import solN8 from "../../img/solN8.png";
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

        // controls = new THREE.OrbitControls(camera, renderer.domElement)

        //create a blue LineBasicMaterial
        var materialLine = new THREE.LineBasicMaterial({ color: 0xffffff });
        var geometryLine = new THREE.Geometry();
        geometryLine.vertices.push(new THREE.Vector3(-12, 0, 0));
        geometryLine.vertices.push(new THREE.Vector3(0, 10, 0));
        geometryLine.vertices.push(new THREE.Vector3(10, 0, 0));
        // Note that lines are drawn between each consecutive pair of
        var line = new THREE.Line(geometryLine, materialLine);
        scene.add(line);
        //
        // //create a cube
        // var geometry = new THREE.BoxGeometry(2, 2, 2);
        // var cubeMaterials = [
        //   new THREE.MeshLambertMaterial({
        //     color: 0xffffff,
        //     side: THREE.BackSide
        //   }), //right
        //   new THREE.MeshPhongMaterial({
        //     map: new THREE.TextureLoader().load(solN4),
        //     side: THREE.BackSide
        //   }), //left
        //   new THREE.MeshLambertMaterial({
        //     map: new THREE.TextureLoader().load(solN9),
        //     side: THREE.BackSide
        //   }), //top
        //   new THREE.MeshLambertMaterial({
        //     map: new THREE.TextureLoader().load(solN4),
        //     side: THREE.DoubleSide
        //   }), //bottom
        //   new THREE.MeshLambertMaterial({
        //     map: new THREE.TextureLoader().load(solN8),
        //     side: THREE.DoubleSide
        //   }), //front
        //   new THREE.MeshLambertMaterial({
        //     map: new THREE.TextureLoader().load(solN9),
        //     side: THREE.DoubleSide
        //   }) //back
        // ];
          var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
          for ( var i = 0; i < 200; i ++ ) {
              var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
              object.position.x = Math.random() * 800 - 400;
              object.position.y = Math.random() * 800 - 400;
              object.position.z = Math.random() * 800 - 400;
              object.rotation.x = Math.random() * 2 * Math.PI;
              object.rotation.y = Math.random() * 2 * Math.PI;
              object.rotation.z = Math.random() * 2 * Math.PI;
              object.scale.x = Math.random() + 0.5;
              object.scale.y = Math.random() + 0.5;
              object.scale.z = Math.random() + 0.5;
              scene.add( object );
          }

        // //color white for mesh skeleton
        // var material = new THREE.MeshLambertMaterial({
        //   color: 0xffffff,
        //   wireframe: true
        // });

        // var material = new THREE.MeshFaceMaterial(cubeMaterials);
        // var cube = new THREE.Mesh(geometry, material);
        // cube.name="jeanmichel"
        // scene.add(cube);

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

        var ambiantLight = new THREE.AmbientLight(0xffffff, 5.0);
        scene.add(ambiantLight);

        var controls = new OrbitControls(camera);
        // initialize object to perform world/screen calculations

        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        function onMouseMove(event) {
          // calculate mouse position in normalized device coordinates
          // (-1 to +1) for both components
          console.log("Click");

          mouse.x = event.clientX / window.innerWidth * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            // calculate objects intersecting the picking ray
            var intersects = raycaster.intersectObjects(scene.children);
            console.log(intersects);
            for (var i = 0; i < intersects.length; i++) {
                console.log(intersects[i].object.material.color)
                intersects[i].object.material.color.set(0xff00FF);
            }
        }

        function animate() {
          // update the picking ray with the camera and mouse position


          document.addEventListener("click", onMouseMove, false);
          requestAnimationFrame(animate);
          //
          // cube.rotation.x += 0.001;
          // cube.rotation.y += 0.001;
          //
          // line.rotation.z += 0.01;

          renderer.render(scene, camera);
        }
        animate();
      }
    })
  );

export default ThreeContainer;
