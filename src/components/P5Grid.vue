<script setup>
import { defineProps, ref, reactive, watch, computed, onMounted, onBeforeUnmount } from "vue";
import p5 from "p5";

let p5Instance;
let rects = ref([]);

const props = defineProps({
  mainColor: String,
  color1: String
});

// TODO: Check the rest of the grid works!
// TODO: Add pre-made grid options

const normalizedMainColor = computed(() => props.mainColor.startsWith("#") ? props.mainColor : `#${props.mainColor}`);
const normalizedColor1 = computed(() => props.color1.startsWith("#") ? props.color1 : `#${props.color1}`);

function updateCanvas(){
  if (p5Instance){
    p5Instance.redraw();
  }
}

const patternColors = reactive({
  "mainColor": normalizedMainColor,
  "color1": normalizedColor1,
});

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
          rects.value.push({ x, y, w: rectWidth, h: rectHeight, colorKey: "mainColor" });
        }
      } 
      // 4 x 4
      for (let row = 0; row < 4; row++){
        for (let col = 0; col < 4; col++) {
          let x = startX + col * rectWidth;
          let y = startY + 3 * rectHeight + row * rectHeight;
          rects.value.push({ x, y, w: rectWidth, h: rectHeight, colorKey: "mainColor" });
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
      rects.value.forEach(({ x, y, w, h, colorKey }) => {
        //console.log(rects.value[0].colorKey);
        p.fill(patternColors[colorKey]);
        p.rect(x, y, w, h);

        // rectangles bordercolor either black or white depending on mainColor
        let rectBorderColor = p.color(patternColors["mainColor"]);
        p.stroke(p.brightness(rectBorderColor) < 50 ? 255 : 0);
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
        // console.log("Clicked on a rectangle at:", rects.value[clickedRectIndex].x, rects.value[clickedRectIndex].y);
        // console.log("received accent color is ", normalizedColor1.value);

        // Toggle the colorKey of the clicked rectangle
        const clickedRect = rects.value[clickedRectIndex];
        clickedRect.colorKey = 
          clickedRect.colorKey === "mainColor" 
          ? "color1" 
          : "mainColor";
        // re-render grid with correct colors
        updateCanvas();
      } else {
        console.log("Clicked outside the rectangles");
      }
    }
  }; 
};

onMounted(() => {
  p5Instance = new p5(sketch, document.getElementById("p5-container"));

    //document.getElementById("p5-container").addEventListener("contextmenu", (e) => {
  //  e.preventDefault();
  //});
});

// if the chosen colors change, update canvas
watch(
  () => [patternColors],
  () => {
    updateCanvas();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  p5Instance.remove();
});
</script>

<template>
  <div id="p5-container"></div>
</template>
