<script setup>
import { defineProps, ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
import p5 from "p5";

let p5Instance;
let rects = ref([]);

const props = defineProps({
  mainColor: String,
  color1: String
});

// TODO: Check the rest of the grid works!
// TODO: Add pre-made grid options
// TODO: if the mainColor is dark, change the rectangle lines light ( stroke() )

const normalizedMainColor = computed(() => props.mainColor.startsWith("#") ? props.mainColor : `#${props.mainColor}`);
const normalizedColor1 = computed(() => props.color1.startsWith("#") ? props.color1 : `#${props.color1}`);
function updateCanvas(){
  if (p5Instance){
    p5Instance.redraw();
  }
}


const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(600, 1000);
    p.background("#EDF9EB"); // canvas background color
    p.noLoop();
    
    rects.value = [];

    let startX = 0;
    let startY = 0;
    let rectWidth = 20;
    let rectHeight = 20;

    // Size S grid
    // 3 rows, 3 cols
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        let x = startX + col * rectWidth;
        let y = startY + row * rectHeight;
        rects.value.push({ x, y, w: rectWidth, h: rectHeight, color: normalizedMainColor.value });
      }
    } 
    // 4 x 4
    for (let row = 0; row < 4; row++){
      for (let col = 0; col < 4; col++) {
        let x = startX + col * rectWidth;
        let y = startY + 3 * rectHeight + row * rectHeight;
        rects.value.push({ x, y, w: rectWidth, h: rectHeight, color: normalizedMainColor.value });
      }
    }
    /* 
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
        } */
  };

  p.draw = () => {
    p.background("#EDF9EB"); // canvas background color
    rects.value.forEach(({ x, y, w, h, color }) => {
      console.log(rects.value[0].color);
      p.fill(color);
      p.rect(x, y, w, h);
    });
  };

  p.mousePressed = () => {
  // Check if the mouse is inside the canvas
  if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
    // Find the index of the clicked rectangle in the rects array
    const clickedRectIndex = rects.value.findIndex(({ x, y, w, h }) =>
      p.mouseX >= x && p.mouseX <= x + w && p.mouseY >= y && p.mouseY <= y + h
    );

    if (clickedRectIndex !== -1) {
      console.log("Clicked on a rectangle at:", rects.value[clickedRectIndex].x, rects.value[clickedRectIndex].y);
      console.log("received clicky click color is ", normalizedColor1.value);

      // Toggle the color of the clicked rectangle directly in the rects array
      rects.value[clickedRectIndex].color =
          rects.value[clickedRectIndex].color === normalizedMainColor.value
            ? normalizedColor1.value
            : normalizedMainColor.value;

      updateCanvas();
    } else {
      console.log("Clicked outside the rectangles");
    }
  }
  return false;
};

};

onMounted(() => {
  p5Instance = new p5(sketch, document.getElementById("p5-container"));

  document.getElementById("p5-container").addEventListener("contextmenu", (e) => {
    e.preventDefault();

  });
});

watch(() => [normalizedMainColor.value, normalizedColor1.value], ([newMainColor, newColor1], [oldMainColor, oldColor1]) => {
  console.log("Detected color change:", { newMainColor, oldMainColor, newColor1, oldColor1 });

  rects.value.forEach((rect) => {
    if (rect.color === oldMainColor) {
      rect.color = newMainColor;
    } else if (rect.color === oldColor1) {
      rect.color = newColor1;
    }
  });

  updateCanvas();
  console.log("Updated rect colors:", rects.value.map(r => r.color));
});



onBeforeUnmount(() => {
  p5Instance.remove();
});
</script>

<template>
  <p>p5 saama propsi taustalle, mainColor: {{ normalizedMainColor }} ja color1: {{ normalizedColor1 }}</p>
  <div id="p5-container"></div>
</template>
