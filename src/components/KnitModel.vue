<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { fillerTexture, filledYokeTexture} from '@/textureStore';
import { onBeforeUnmount, onMounted, watchEffect } from 'vue';

let texture, yokeTexture, filler, filledYoke, material, yokeMaterial;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(66, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
// renderer.setSize(window.innerWidth, window.innerHeight);
scene.background = new THREE.Color(0xe0e0e0);
scene.add(directionalLight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
controls.enablePan = true;

camera.position.set(0, 1, 2);
controls.update();  

const loadFiller = async () => {
  while (!fillerTexture.value && !filledYokeTexture.value) {
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  filler = fillerTexture.value.canvas;
  texture = new THREE.CanvasTexture(filler);
  material = new THREE.MeshBasicMaterial({map: texture});
  texture.offset.set(0.785, -0.785);
  texture.center.set(0.5, 0.5);
  texture.repeat.set(3.3, 3.3);
  texture.rotation = Math.PI / 2;
  texture.wrapS = THREE.RepeatWrapping; // repeat horizontally
  texture.wrapT = THREE.RepeatWrapping; // repeat vertically

  filledYoke = filledYokeTexture.value.canvas;
  yokeTexture = new THREE.CanvasTexture(filledYoke);
  yokeMaterial = new THREE.MeshBasicMaterial({map: yokeTexture});
  yokeTexture.offset.set(0.780, -0.790); // moves left/right (U) and up/down (V)
  yokeTexture.center.set(0.5, 0.5);
  yokeTexture.repeat.set(2.8, 2.8); // scale the yokeTexture along uv map - repeats yokeTexture in U and V direction;
  // yokeTexture.wrapS = THREE.RepeatWrapping; 
  // yokeTexture.wrapT = THREE.RepeatWrapping;

  loader.load('/knit3DModel/knitAngleBased.glb', function (gltf) {
    try {
      gltf.scene.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                  if (child.material.name === "Yoke") {
                      child.material = yokeMaterial; 
                  } else if (child.material.name === "Sleeves") {
                      child.material = material;
                  } else if (child.material.name === "Body") {
                      child.material = material;
                  }
              }
      });
      scene.add(gltf.scene);
    } catch (error){
      console.log('Error loading 3D model ', error);
    }
  }, undefined, function(error){
    console.log('error in gltf scene traverse')
    console.log(error);
  });
}

const updateTexture = () => {
  if (fillerTexture.value && texture) {
    texture.image = fillerTexture.value.canvas;
    texture.needsUpdate = true;
  }

  if (filledYokeTexture.value && yokeTexture){
    yokeTexture.image = filledYokeTexture.value.canvas;
    yokeTexture.needsUpdate = true;
  }
};

const animate = () => {
  requestAnimationFrame(animate);
    
  controls.update();
  renderer.render(scene, camera);
}

watchEffect(updateTexture);

onMounted(() => {
  document.getElementById("renderKnitModel").appendChild(renderer.domElement);
  loadFiller().then(() => {
    animate();
  });
})

onBeforeUnmount(() => {
  scene.traverse((object) => {
    if (object.isMesh) {
      if (object.geometry) object.geometry.dispose();
      
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => {
            if (mat.map) mat.map.dispose();
            mat.dispose();
          });
        } else {
          if (object.material.map) object.material.map.dispose();
          object.material.dispose();
        }
      }
    }
  });

  scene.children.forEach((child) => {
    if (child.type === "Scene") {
      scene.remove(child);
    }
  });

  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  renderer.dispose();

  if (renderer.domElement) {
    renderer.domElement.remove();
  }
});
</script>

<template>
    <div></div>
</template>

<style>
</style>