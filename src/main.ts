import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import globeVertex from "./shaders/globe.vertex.glsl?raw";
import globeFragment from "./shaders/globe.fragment.glsl?raw";

import glowVertex from "./shaders/glow.vertex.glsl?raw";
import glowFragment from "./shaders/glow.fragment.glsl?raw";

const width = window.innerWidth;
const height = window.innerHeight;

const CAMERA_DISTANCE = 2;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas")!,
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(width, height);

const fov = 75;
const aspect = width / height;
const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
camera.position.z = CAMERA_DISTANCE;

const controls = new OrbitControls(camera, renderer.domElement);

const scene = new THREE.Scene();

const group = new THREE.Group();
scene.add(group);

const clock = new THREE.Clock();
clock.start();

const globe = createGlobe();
group.add(globe);

const glow = createGlow();
scene.add(glow);

const stars = createStars();
scene.add(stars);

const people = [
  {
    name: "Denchik",
    lat: 52.5144,
    lng: 4.9641,
  },
  {
    name: "Katrusya",
    lat: 41.3874,
    lng: 2.1686,
  },
  {
    name: "Chub",
    lat: 49.423,
    lng: 26.9871,
  },
  {
    name: "Mr X",
    lat: 49.75996,
    lng: 27.19903,
  },
  {
    name: "Wroclaw",
    lat: 51.107883,
    lng: 17.038538,
  },
  {
    name: "Ancona",
    lat: 43.616943,
    lng: 13.516667,
  },
];

for (const p of people) {
  const pin = createPin();

  let r = 1.001;
  let theta = ((180 - (p.lat + 90)) * Math.PI) / 180;
  let phi = ((p.lng + 90) * Math.PI) / 180;

  const spherePos = new THREE.Spherical(r, theta, phi);

  pin.position.setFromSpherical(spherePos);

  const newUp = new THREE.Vector3()
    .setFromSpherical(spherePos)
    .multiplyScalar(2);

  pin.lookAt(newUp);
  pin.rotation.x = Math.PI / 2;
  pin.rotation.z = Math.PI / 2;

  scene.add(pin);
}

controls.update();

window.requestAnimationFrame(function renderFrame() {
  window.requestAnimationFrame(renderFrame);

  clock.getDelta();

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  globe.material.uniforms.time.value = clock.elapsedTime;

  controls.update();

  renderer.render(scene, camera);
});

function createGlobe(): THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial> {
  const geometry = new THREE.SphereGeometry(1, 256, 256);
  const material = new THREE.ShaderMaterial({
    vertexShader: globeVertex,
    fragmentShader: globeFragment,
    uniforms: {
      globeTextureDay: {
        value: new THREE.TextureLoader().load("./img/8k_earth_daymap.jpg"),
      },
      globeTextureNight: {
        value: new THREE.TextureLoader().load("./img/8k_earth_nightmap.jpg"),
      },
      globeHeightTexture: {
        value: new THREE.TextureLoader().load("./img/8081_earthbump4k.jpg"),
      },
      time: {
        value: clock.elapsedTime,
      },
    },
  });

  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
}

function createGlow(): THREE.Mesh<THREE.SphereGeometry> {
  const geometry = new THREE.SphereGeometry(1, 16, 16);
  const material = new THREE.ShaderMaterial({
    vertexShader: glowVertex,
    fragmentShader: glowFragment,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  });

  const mesh = new THREE.Mesh(geometry, material);

  mesh.scale.set(1.2, 1.2, 1.2);

  return mesh;
}

function createStars(): THREE.Points {
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
  });

  const pointsCount = 5000;
  const points = new Array(pointsCount * 3);
  for (let i = 0; i < pointsCount; i++) {
    const x = (Math.random() - 0.5) * width;
    const y = (Math.random() - 0.5) * width;
    const z = (Math.random() - 0.5) * 2000;

    points[i * 3 + 0] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(points, 3)
  );

  const mesh = new THREE.Points(geometry, material);

  return mesh;
}

function createPin(): THREE.Mesh<
  THREE.BufferGeometry,
  THREE.MeshBasicMaterial
> {
  const geometry = new THREE.BoxGeometry(0.001, 0.1, 0.001);
  const material = new THREE.MeshBasicMaterial({
    color: "white",
  });

  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
}
