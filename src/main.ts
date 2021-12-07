import * as THREE from "three";
import gsap from "gsap";

import globeVertex from "./shaders/globe.vertex.glsl?raw";
import globeFragment from "./shaders/globe.fragment.glsl?raw";

import glowVertex from "./shaders/glow.vertex.glsl?raw";
import glowFragment from "./shaders/glow.fragment.glsl?raw";

const width = window.innerWidth;
const height = window.innerHeight;

const CAMERA_DISTANCE = 2.1;

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

const mouse = {
  x: 0,
  y: 0,
};

document.addEventListener("mousemove", function (e) {
  mouse.x = (e.clientX / width) * 2 - 1;
  mouse.y = (e.pageY / height) * 2 - 1;
});

window.requestAnimationFrame(function renderFrame() {
  window.requestAnimationFrame(renderFrame);

  clock.getDelta();

  globe.rotation.y += 0.004;

  camera.position.x = Math.cos(clock.elapsedTime * 0.01) * CAMERA_DISTANCE;
  camera.position.z = Math.sin(clock.elapsedTime * 0.01) * CAMERA_DISTANCE;

  gsap.to(group.rotation, {
    y: mouse.x * Math.PI,
    z: -mouse.y * (Math.PI / 2),
    duration: 1,
  });

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  globe.material.uniforms.time.value = clock.elapsedTime;

  renderer.render(scene, camera);
});

function createGlobe(): THREE.Mesh {
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
