<script setup>
import { onMounted, onBeforeUnmount, watch } from "vue";
import { colorPalette } from "@/colorStore";
import { grid } from "@/gridStore";
import { selectedTemplate } from "@/templateStore";
import p5 from "p5";

// Draws the "donut" .png 
let p5Instance;
const pi = 3.141592653589793;
const tau = 6.283185307179586;

let config = {
  stitch: {
    img: null, // set in setup: image setting p5 specific
    imgPath: '/stitch.png',
    get width() {
      return config.slice.outerRadius * config.slice.angle / 8;
    },
    get height() {
      return (config.slice.outerRadius - config.slice.innerRadius) / grid.length;
    }
  },
  canvas: {
    width: 900,
    height: 900,
  },
  slice: {
    count: 33,
    get innerRadius() {
      return this.count * selectedTemplate.value.rowLengths[0] * config.stitch.width / tau;
    },
    get outerRadius() {
      return config.canvas.width * 0.5;
    },
    get angle() {
      return tau / this.count;
    }
  },
  debug: false
}


const sketch = (p) => {
  let polarToX = (r, theta) => {
    return r * p.cos(theta);
  }
  
  let polarToY = (r, theta) => {
    return r * p.sin(theta);
  }
  p.preload = () => {
    config.stitch.img = p.loadImage(config.stitch.imgPath);
  }

  p.setup = () => {
    p.createCanvas(config.canvas.width, config.canvas.height);
    p.noLoop();
    p.imageMode(p.CENTER);
    config.stitch.img.resize(config.stitch.width, config.stitch.height);

    // Button
    // let button = p.createButton('Save canvas');
    // button.position(0, 950);
    // button.mousePressed(() => test());
    };
    
    p.draw = () => {
      p.background(172, 255);
      p.translate(p.width * 0.5, p.width * 0.5);

      if (config.debug) {
        p.stroke(255);
        p.fill(145);
        p.circle(0, 0, p.width);
      }

      drawSlice(1)

      // for (let i = 0; i < config.slice.count; i++) {
      //   drawSlice(i);
      // }
    };

    let drawStitch = (x, y, angle, colorCode) => {
      p.push();
      p.translate(x, y);
      p.rotate(angle);
      p.tint(p.color(colorCode));
      p.image(config.stitch.img, 0, 0);
      p.pop();
    }
    
    let drawSlice = (sliceNumber) => {
      const sliceAngle = config.slice.angle;
      const innerRadius = config.slice.innerRadius;
      const stitchHeight = config.stitch.height;
      const startAngle = sliceNumber * sliceAngle;
    
      for (let y = 0; y < selectedTemplate.value.rows; y++) {
        for (let x = 0; x < selectedTemplate.value.rowLengths[y]; x++) {
          let r = innerRadius + stitchHeight * y;
          let offsetAngle = x * sliceAngle / selectedTemplate.value.rowLengths[y];
          let theta = startAngle + offsetAngle;
    
          if (config.debug) {
            p.fill(colorPalette[grid[y][x]].color);
            p.circle(polarToX(r, theta), polarToY(r, theta), 5);
          } else {
            drawStitch(polarToX(r, theta), polarToY(r, theta), theta + pi * 1.5, colorPalette[grid[y][x]].color);
          }
        }
        if (config.debug) {
          const endAngle = startAngle + sliceAngle;
          const outerRadius = config.slice.outerRadius;
          p.line(polarToX(innerRadius, startAngle), polarToY(innerRadius, startAngle), polarToX(outerRadius, startAngle), polarToY(outerRadius, startAngle));
          p.line(polarToX(innerRadius, endAngle), polarToY(innerRadius, endAngle), polarToX(outerRadius, endAngle), polarToY(outerRadius, endAngle));
        }
      }
}
}

watch(colorPalette, () => {
  p5Instance.redraw();
})

watch(grid, () => {
  p5Instance.redraw();
})

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