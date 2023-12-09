import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//import dat from "dat.gui";
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(
  60,
  sizes.width / sizes.height,
  0.1,
  100
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg3d"),
});
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
camera.position.set(42, -19, 0);
const axesHelper = new THREE.AxesHelper(30, 10);
const gridHelper = new THREE.GridHelper(30);
scene.add(axesHelper);
scene.add(gridHelper);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const geometry = new THREE.ConeGeometry(10, 27, 30);
// const geometry2 = new THREE.SphereGeometry(8);
// const geometry3 = new THREE.BoxGeometry(13, 13, 13);
// const geometry4 = new THREE.PlaneGeometry(120, 120);
const basicMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  wireframe: true,
});

const cone = new THREE.Mesh(geometry, basicMaterial);
// const sphere = new THREE.Mesh(geometry2, basicMaterial);
// const box = new THREE.Mesh(geometry3, basicMaterial);
// const plane = new THREE.Mesh(geometry4, planeMaterial);

// plane.receiveShadow = true;
// sphere.castShadow = true;
cone.castShadow = true;

scene.add(cone);
// scene.add(sphere);
// scene.add(box);
//scene.add(plane);

cone.rotation.x = 2.5;
// sphere.rotation.x = 2.5;
// box.rotation.x = 2.5;
cone.position.set(0, 0, 0);
// sphere.position.set(-20, 14, 15);
// box.position.set(20, -14, -15);
//plane.position.set(0, 0, -30);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// const gui = new dat.GUI();

// const options = {
//   color: "#d14d4d",
//   wireframe: false,
//   speed: 0.01,
//   "plane z-position": 0,
//   "plane x-position": 0,
//   "plane x-rotation": 0,
//   "plane y-rotation": 0,
// };

// gui.addColor(options, `color`).onChange(function (e) {
//   sphere.material.color.set(e);
// });
// gui.add(options, "wireframe").onChange(function (e) {
//   sphere.material.wireframe = e;
// });
// gui.add(options, "speed", 0, 0.1);
// gui.add(options, "plane z-position", -100, 100).onChange(function (e) {
//   plane.position.z = e;
// });
// gui.add(options, "plane x-position", -100, 100).onChange(function (e) {
//   plane.position.x = e;
// });
// gui.add(options, "plane x-rotation", -5, 5).onChange(function (e) {
//   plane.rotation.x = e;
// });
// gui.add(options, "plane y-rotation", -5, 5).onChange(function (e) {
//   plane.rotation.y = e;
// });

const directionalLight = new THREE.DirectionalLight(0xfcfcfc, 0.8);
directionalLight.castShadow = true;
directionalLight.position.set(80, 40, 89);
scene.add(directionalLight);

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(
//   directionalLight.shadow.camera
// );
// scene.add(dLightShadowHelper);

function animate() {
  requestAnimationFrame(animate);
  cone.rotation.y -= 0.001;
  //sphere.rotation.y += 0.001;
  //step += options.speed;
  //sphere.position.y = 10 * Math.abs(Math.sin(step));
  //box.rotation.y += 0.001;
  renderer.render(scene, camera);
}

animate();

$(document).ready(function () {
  $("#project-carousel").carousel({
    interval: 4000,
  });
});

window.addEventListener("scroll", function () {
  const canvas = document.getElementById("bg3d");
  const scrolled = -window.scrollY;
  canvas.style.transform = `translateY(${scrolled}px)`;
});

//spent 4 hours trying to get canvas to resize. We need to resize the camera after we resize the width and height of the browser!! my god
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth; //update the fucking sizes
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height; //reset the camera based on new sizes so it keeps it centered and proportional
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height); //resizes renderer to match the new
});
