<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { fillerTexture, filledYokeTexture } from '@/textureStore';
import { onBeforeUnmount, onMounted, watch, watchEffect } from 'vue';

let scene, camera, controls, renderer;
let cube, geometry, texture, filler, material;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(66, window.innerWidth / window.innerHeight, 0.1, 1000);
renderer = new THREE.WebGLRenderer();
controls = new OrbitControls(camera, renderer.domElement);
// const loader = new GLTFLoader();
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0xe0e0e0);
// scene.add(directionalLight);

camera.position.set(0, 0, 3);
controls.update();  

geometry = new THREE.BoxGeometry();


async function loadFiller() {
  while (!fillerTexture.value) {
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  filler = fillerTexture.value.canvas;
  texture = new THREE.CanvasTexture(filler);
  material = new THREE.MeshBasicMaterial({map: texture});
  cube = new THREE.Mesh(geometry, material);
}

const updateTexture = () => {
  if (fillerTexture.value && texture) {
    texture.image = fillerTexture.value.canvas;
    texture.needsUpdate = true;
  }
};

watchEffect(updateTexture);

function animate() {
  requestAnimationFrame(animate);
  
  if (cube) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }
  
  controls.update();
  // texture.needsUpdate is checked during render()
  renderer.render(scene, camera);
}

watch(fillerTexture, () => {
  updateTexture();
})

onMounted(() => {
  document.getElementById("lookies").appendChild(renderer.domElement);
  loadFiller().then(() => {
    if (cube) scene.add(cube);
    animate();
  });
})

onBeforeUnmount(() => {
    scene.traverse((object) => {
    if (object.geometry) object.geometry.dispose();
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach((mat) => mat.dispose());
      } else {
        object.material.dispose();
      }
    }
    if (object.texture) object.texture.dispose();
  });

  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  renderer.dispose();

  if (renderer.domElement) {
    renderer.domElement.remove();
  }
})

// async function load() {
//     let canvas = document.getElementById("p5canvas");
//     let fs = document.getElementById("fs");


//     while (!canvas) {
//         await new Promise(resolve => setTimeout(resolve, 50));
//         canvas = document.getElementById("p5canvas");
//     }

//     while (!fs) {
//         await new Promise(resolve => setTimeout(resolve, 50));
//         fs = document.getElementById("fs");
//     }
//     // console.log('fs? ', fs);

//     console.log('loaded successfully');
//     let texture = new THREE.CanvasTexture(window.p5canvas);
//     let textureFS = new THREE.CanvasTexture(window.fs);

//     //  greater than 1 repeats, 0-1 shrink
//     // note to self: innerRadius, offset, center and repeat all impact the position. + canvas size
//     // texture.offset.set(0.28, -0.24); // moves texture left/right (U) and up/down (V)
//     texture.offset.set(0.785, -0.785); // moves texture left/right (U) and up/down (V)
//     texture.center.set(0.5, 0.5);
//     texture.repeat.set(2.8, 2.8); // scale the texture along uv map - repeats texture in U and V direction;
//     texture.wrapS = THREE.RepeatWrapping; // repeat horizontally
//     texture.wrapT = THREE.RepeatWrapping; // repeat vertically

//     // texture.wrapS = THREE.ClampToEdgeWrapping;  // Prevents tiling on the sides
//     // texture.wrapT = THREE.ClampToEdgeWrapping;


//     textureFS.offset.set(0.785, -0.785);
//     textureFS.center.set(0.5, 0.5);
//     textureFS.repeat.set(2.8, 2.8);
//     textureFS.rotation = Math.PI / 2;
//     textureFS.wrapS = THREE.RepeatWrapping; // repeat horizontally
//     textureFS.wrapT = THREE.RepeatWrapping; // repeat vertically

//     const material = new THREE.MeshBasicMaterial({ map: texture });
//     const materialFS = new THREE.MeshBasicMaterial({ map: textureFS });
//     // const materialFS = new THREE.MeshBasicMaterial({ color: 0xba9cba })


//     leftCube = new THREE.Mesh(geometry, material);
//     // scene.add(leftCube);

//     // loader.load('./public/knitModelTest.glb', function (gltf) { // so far this one works quite well but buggy
//     // loader.load('./public/knit_uvmap_trial1_test1.glb', function (gltf) { // might work but needs adjusting
//     // loader.load('./public/knit_uvmap_trial1_test_materialnames_all.glb', function (gltf) {
//     // loader.load('./public/knitModelMaterials.glb', function (gltf) {
//     loader.load('./public/knitAngleBased.glb', function (gltf) {
//         // gltf.scene.material = material;
//         // knit = new THREE.Mesh(gltf, material);

//         // gltf.scene.traverse((child) => {
//         //     if (child.isMesh) {
//         //         child.material = material;  // Apply texture material to each mesh
//         //     }
//         // });
//         gltf.scene.traverse((child) => {
//             if (child.isMesh) {
//                 if (child.material.name === "Yoke") {
//                     // child.material.map = texture;
//                     child.material = material;  // Apply texture material to each mesh
//                 } else if (child.material.name === "Sleeves") {
//                     child.material = materialFS;
//                 } else if (child.material.name === "Body") {
//                     child.material = materialFS;
//                 }
//             }
//         });
//         // gltf.scene.traverse((child) => {
//         //     if (child.isMesh) {
//         //         console.log(child.material.name); // Log material name to check
//         //     }
//         // });

//         scene.add(gltf.scene);
//     }, undefined, function (error) {
//         console.error(error);
//     });
// }
</script>

<template>
    <div id="3d-model"></div>
</template>

<style>
</style>

