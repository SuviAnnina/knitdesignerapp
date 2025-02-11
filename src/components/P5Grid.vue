<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import p5 from "p5";

let p5Instance;

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(600, 1000);
    p.background(254, 238, 237);
  };

  p.draw = () => {
    let startX = 0;
    let startY = 0;
    let rectWidth = 20;
    let rectHeight = 20;
    
    // Size S grid
    // Grid (3 rows, 3 cols)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        let x = startX + col * rectWidth;
        let y = startY + row * rectHeight;
        p.rect(x, y, rectWidth, rectHeight);
      }
    }
    
    // Second grid: 4 rows, 4 columns
    let secondGridStartY = startY + 3 * rectHeight;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        let x = startX + col * rectWidth;
        let y = secondGridStartY + row * rectHeight;
        p.rect(x, y, rectWidth, rectHeight);
      }
    }

    // Third grid: 5 rows, 5 columns
    let thirdGridStartY = startY + 7 * rectHeight;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        let x = startX + col * rectWidth;
        let y = thirdGridStartY + row * rectHeight;
        p.rect(x, y, rectWidth, rectHeight);
      }
    }

    // Fourth grid: 9 rows, 6 columns
    let fourthGridStartY = startY + 12 * rectHeight;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 6; col++) {
        let x = startX + col * rectWidth;
        let y = fourthGridStartY + row * rectHeight;
        p.rect(x, y, rectWidth, rectHeight);
      }
    }

    // Fifth grid: 7 rows, 7 columns
    let fifthGridStartY = startY + 21 * rectHeight;
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 7; col++) {
        let x = startX + col * rectWidth;
        let y = fifthGridStartY + row * rectHeight;
        p.rect(x, y, rectWidth, rectHeight);
      }
    }

    // Sixt grid: 17 rows, 8 columns
    let sixthGridStartY = startY + 28 * rectHeight;
    for (let row = 0; row < 17; row++) {
      for (let col = 0; col < 8; col++) {
        let x = startX + col * rectWidth;
        let y = sixthGridStartY + row * rectHeight;
        p.rect(x, y, rectWidth, rectHeight);
      }
    }
  };
};

onMounted(() => {
  p5Instance = new p5(sketch, document.getElementById("p5-container"));
});

onBeforeUnmount(() => {
  p5Instance.remove();
});
</script>

<template>
  <div id="p5-container"></div>
</template>
