<script setup>
import { onMounted, onBeforeUnmount, watch } from "vue";
import p5 from "p5";
import { colorPalette, selectedColorIndex } from "@/colorPalette";

let p5Instance;
const columns = 8;
const rows = 45;
const rowLengthsS = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
// Size S grid
  // 3 rows, 3 cols
  // 4 rows, 4 columns
  // Third grid: 5 rows, 5 columns
  // Fourth grid: 9 rows, 6 columns
  // Fifth grid: 7 rows, 7 columns
  // Sixt grid: 17 rows, 8 columns 

const squareWidth = 20;

// squares 2D taulukko, johon tallennettu indeksipaikka, josta väri haetaan; default fill kaikkiin 0-indeksi
let squares = Array.from({ length: rows }, () => Array(columns).fill(0));
console.log('squares array 0 indeksipaikan 0 element: ', squares[0][0]);

const sketch = (p) => {
  p.setup = () => {
      p.createCanvas(600, 1000);
      p.background("#EDF9EB"); // canvas background color
      p.noLoop();
    };

    p.draw = () => {
      // rectangles bordercolor either black or white depending on mainColor
      let rectBorderColor = p.color(colorPalette[0].color);
      p.stroke(p.brightness(rectBorderColor) < 50 ? 255 : 0);

      for (let y = 0; y < rows; y++){
        for (let x = 0; x < rowLengthsS[y]; x++){
          p.fill(colorPalette[squares[y][x]].color);
          console.log("p5 draw", colorPalette[squares[y][x]].color);
          p.square(x * squareWidth, y * squareWidth, squareWidth);
        }
      }        
    };

      p.mouseClicked = (event) => {
        if (p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height ){
          return
        }
        let x = p.floor(event.offsetX / squareWidth);
        let y = p.floor(event.offsetY / squareWidth);
        
        if (squares[y][x] == 0){
          squares[y][x] = selectedColorIndex.value;
        } else {
          squares[y][x] = 0;
        }

        // squares[y][x] = 1;
        p.redraw();
      }
    }

watch(colorPalette, () => {
  p5Instance.redraw();
})

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
