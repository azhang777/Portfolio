import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import dat from "dat.gui";
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(
  70,
  sizes.width / sizes.height,
  0.1,
  100
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg3d"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const geometry = new THREE.ConeGeometry(10, 27, 30);
const geometry2 = new THREE.SphereGeometry(8);
const geometry3 = new THREE.BoxGeometry(13, 13, 13);
const basicMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  wireframe: true,
});

const cone = new THREE.Mesh(geometry, basicMaterial);
const sphere = new THREE.Mesh(geometry2, basicMaterial);
const box = new THREE.Mesh(geometry3, basicMaterial);

scene.add(cone);
scene.add(sphere);
scene.add(box);

cone.rotation.x = 2.5;
sphere.rotation.x = 2.5;
box.rotation.x = 2.5;

cone.position.set(-0, 0, 0);
//sphere.position.set(-1, 0, 0);
sphere.position.set(-28, 0, 1);
//box.position.set(-1,0,0)
box.position.set(32, -7, 1);
camera.position.set(-6, 26, 48);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

function isPlayground() {
  return window.location.pathname.includes("test.html");
}

let gui;

if (isPlayground()) {
  gui = new dat.GUI();
}

const options = {
  color: "#d14d4d",
  wireframe: false,
  speed: 0.001,
  cone: {
    x: 0,
    y: 0,
    z: 0,
  },
  sphere: {
    x: 0,
    y: 0,
    z: 0,
  },
  box: {
    x: 0,
    y: 0,
    z: 0,
  },
};

if (gui) {
  const axesHelper = new THREE.AxesHelper(30, 10);
  const gridHelper = new THREE.GridHelper(30);
  scene.add(axesHelper);
  scene.add(gridHelper);

  gui.addColor(options, `color`).onChange(function (e) {
    sphere.material.color.set(e);
  });
  gui.add(options, "wireframe").onChange(function (e) {
    sphere.material.wireframe = e;
  });
  gui.add(options, "speed", -0.5, 0.5);

  const coneFolder = gui.addFolder("Cone Position");
  const sphereFolder = gui.addFolder("Sphere Position");
  const boxFolder = gui.addFolder("Box Position");

  const maxValues = {
    negative: -30,
    positive: 30,
  };
  coneFolder
    .add(options.cone, "x", maxValues.negative, maxValues.positive)
    .onChange((value) => {
      cone.position.x = value;
    });
  coneFolder
    .add(options.cone, "y", maxValues.negative, maxValues.positive)
    .onChange((value) => {
      cone.position.y = value;
    });
  coneFolder
    .add(options.cone, "z", maxValues.negative, maxValues.positive)
    .onChange((value) => {
      cone.position.z = value;
    });

  sphereFolder
    .add(options.cone, "x", maxValues.negative, maxValues.positive)
    .onChange((value) => {
      sphere.position.x = value;
    });
  sphereFolder
    .add(options.cone, "y", maxValues.negative, maxValues.positive)
    .onChange((value) => {
      sphere.position.y = value;
    });
  sphereFolder
    .add(options.cone, "z", maxValues.negative, maxValues.positive)
    .onChange((value) => {
      sphere.position.z = value;
    });

  boxFolder
    .add(options.cone, "x", maxValues.negative, maxValues.positive)
    .onChange((value) => {
      box.position.x = value;
    });
  boxFolder
    .add(options.cone, "y", maxValues.negative, maxValues.positive)
    .onChange((value) => {
      box.position.y = value;
    });
  boxFolder
    .add(options.cone, "z", maxValues.negative, maxValues.positive)
    .onChange((value) => {
      box.position.z = value;
    });
}

function animate() {
  requestAnimationFrame(animate);
  cone.rotation.y -= options.speed;
  sphere.rotation.y += options.speed;
  box.rotation.y += options.speed;
  // console.log("dis a loop");
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

//camera pos for test in playground
orbit.addEventListener("change", () => {
  console.log(camera.position);
  const coordinatesDiv = document.getElementById("coordinates");
  coordinatesDiv.innerHTML = `<p>Camera Position X: ${camera.position.x}, Y: ${camera.position.y}, Z: ${camera.position.z}</p>`;
});
