<script setup>
import { onMounted, onBeforeUnmount } from "vue";
// import { colorPalette } from "@/colorPalette";
// import { grid } from "@/gridStore";

// Draws the "donut" .png 

import p5 from "p5";

let p5Instance;

const sketch = (p) => {
  p.setup = () => {
      p.createCanvas(400, 400);
      p.background("#EDF9EB"); // canvas background color
      p.noLoop();
    };
    
    p.draw = () => {
      p.background("#EDF9EB"); // canvas background color
      p.circle(50, 50, 50);
    };
}


onMounted(() => {
  p5Instance = new p5(sketch, document.getElementById("2d-pattern-container"));
});

onBeforeUnmount(() => {
  p5Instance.remove();
});
</script>

<template>
      <div id="2d-pattern-container" class="2d-pattern-container"></div>
</template>

<style>
</style>