<script setup>
import { onMounted, onBeforeUnmount, watch } from "vue";
import p5 from "p5";
import { colorPalette, selectedColorIndex } from "@/colorPalette";
import { ref } from 'vue';

const chosenSize = ref("S");
let p5Instance;
const columns = 8;

const templates = [
  { size: "XS",
    rows: 44,
    rowLengths: [3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5,  6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
  },
  { size: "S",
    rows: 45,
    rowLengths: [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
  },
  { size: "M",
    rows: 46,
    rowLengths: [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
  },
  { size: "L",
    rows: 47,
    rowLengths: [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
  },
  { size: "XL",
    rows: 48,
    rowLengths: [3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
  },
  { size: "XXL",
    rows: 50,
    rowLengths: [3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
  }
]

const test = () => {
  console.log(chosenSize.value);
}

const squareWidth = 20;
let selectedTemplate;
let squares;

const resizeGrid = () => {
  selectedTemplate = templates.find(template => template.size === chosenSize.value);
  // 2D array squares, stores index for colorPalette
  squares = Array.from(
    { length: selectedTemplate.rows },
    () => Array(columns).fill(0)
  );
}

const sketch = (p) => {
  p.setup = () => {
      p.createCanvas(180, 1010);
      p.background("#EDF9EB"); // canvas background color
      p.noLoop();
    };
    
    p.draw = () => {
      p.background("#EDF9EB"); // canvas background color
      // rectangles bordercolor either black or white depending on mainColor
      let rectBorderColor = p.color(colorPalette[0].color);
      p.stroke(p.brightness(rectBorderColor) < 50 ? 255 : 0);

      for (let y = 0; y < selectedTemplate.rows; y++){
        for (let x = 0; x < selectedTemplate.rowLengths[y]; x++){
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
        p.redraw();
      }
    }

watch(colorPalette, () => {
  p5Instance.redraw();
})

watch(chosenSize, () => {
  resizeGrid();
  p5Instance.redraw();
})

onMounted(() => {
  resizeGrid();
  p5Instance = new p5(sketch, document.getElementById("p5-container"));
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
