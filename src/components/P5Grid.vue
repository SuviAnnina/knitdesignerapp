<script setup>
import { onMounted, onBeforeUnmount, watch } from "vue";
import p5 from "p5";
import { colorPalette, selectedColorIndex } from "@/colorPalette";
import {ref} from 'vue';

const chosenSize = ref("S");

let p5Instance;
const columns = 8;
const rows = 45;

// const rowLengthsXS = [3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5,  6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
// const rowLengthsS = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
const rowLengthsM = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
const rowLengthsL = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
const rowLengthsXL = [3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
const XXL = [3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];

const templates = [
  { size: "XS",
    rows: 44,
    rowLengths: [3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5,  6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
  },
  { size: "S",
    rows: 45,
    rowLengths: [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
  }
]

const test = () => {
  console.log(chosenSize.value);
  // console.log('s pituus', rowLengthsS.length);
  // console.log('xs pituus', rowLengthsXS.length);
  console.log('m pituus', rowLengthsM.length);
  console.log('l pituus', rowLengthsL.length);
  console.log('xl pituus', rowLengthsXL.length);
  console.log('xxl pituus', XXL.length);
  // console.log('xxl pituus', rowLengthsXXL.length);
}

const squareWidth = 20;

// squares 2D taulukko, johon tallennettu indeksipaikka, josta väri haetaan; default fill kaikkiin 0-indeksi
// let squares = Array.from({ length: rows  }, () => Array(columns).fill(0));

let selectedTemplate;
let squares;

const resizeGrid = () => {
  selectedTemplate = templates.find(template => template.size === chosenSize.value);
  squares = Array.from(
    { length: selectedTemplate.rows },
    () => Array(columns).fill(0)
  );
  console.log("ResizeGrid function called!")
}

const sketch = (p) => {
  p.setup = () => {
      p.createCanvas(600, 1000);
      p.background("#EDF9EB"); // canvas background color
      p.noLoop();
    };
    
    p.draw = () => {
      p.background("#EDF9EB"); // canvas background color
      // rectangles bordercolor either black or white depending on mainColor
      console.log('p.draw: ', selectedTemplate);
      let rectBorderColor = p.color(colorPalette[0].color);
      p.stroke(p.brightness(rectBorderColor) < 50 ? 255 : 0);

      for (let y = 0; y < rows; y++){
        for (let x = 0; x < selectedTemplate.rowLengths[y]; x++){
          p.fill(colorPalette[squares[y][x]].color);
          console.log("p5 draw", colorPalette[squares[y][x]].color);
          p.square(x * squareWidth, y * squareWidth, squareWidth);
        }
      }        
      // for (let y = 0; y < rows; y++){
      //   for (let x = 0; x < rowLengthsS[y]; x++){
      //     p.fill(colorPalette[squares[y][x]].color);
      //     console.log("p5 draw", colorPalette[squares[y][x]].color);
      //     p.square(x * squareWidth, y * squareWidth, squareWidth);
      //   }
      // }        
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


watch(chosenSize, () => {
  console.log("chosenSize change detected!")
  resizeGrid();
  p5Instance.redraw();
})

onMounted(() => {
  p5Instance = new p5(sketch, document.getElementById("p5-container"));
  resizeGrid();
});

onBeforeUnmount(() => {
  p5Instance.remove();
});
</script>

<template>
      <div>
        <label for="size">Choose size template</label>
        <select name="size" id="size" v-model="chosenSize">
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
        </select>
        <button @click="test">Testi</button>
    </div>
  <div id="p5-container"></div>
</template>
