<script setup>
import ColorPickerInput from './ColorPickerInput.vue';
import { colorPalette, updateColor,  colorPalette2} from '@/colorPalette';

const maxColors = 8;
console.log(colorPalette2[0].color);

// const testColorPicker2 = ()=> {
    // console.log("string ", colorPalette2[0].color);
    // console.log("boolean", colorPalette2[0].show);
    // console.log("värin vaihto!", changeColorTest());
    // console.log("string should be ffffff", colorPalette2[0].color);
// loopArray();    
// }

// const loopArray = () => {
//     console.log("array len:", colorPalette2.length)
//     console.log("Start loop");
//     for (let i = 0; i < colorPalette2.length; i++){
//         console.log(i, colorPalette2[i].color);
//     }
// }

// const changeColorTest = () => {
//     colorPalette2[0].mainColor = "#ffffff";
// }

const handleAddColorPicker = () => {
    // Find the first empty color slot
    const emptySlotKey = Object.keys(colorPalette).find(
        key => colorPalette[key] === ''
    );

    if (emptySlotKey) {
        // Reuse the empty slot
        updateColor(emptySlotKey, 'ffffff');
    } else {
        // Check which color slot is empty, if any
        const filledColors = Object.values(colorPalette).filter(value => value !== '').length;

        if (filledColors < maxColors) {
            const newColorKey = `color${filledColors}`; 
            // Adds next available slot
            updateColor(newColorKey, 'ffffff');
        } else {
            alert("You can't add more than 8 colors!");
        }
    }
    for (const color in colorPalette){
        console.log(`${color}: ${colorPalette[color]}`);
    }
};

</script>
<template>
    <div>
        <p>Pick colors!</p>
         <!-- <div v-for="(value, key, index) in colorPalette" :key="index" v-show="value">
            <ColorPickerInput 
            :title="index === 0 ? 'Main color' : `Color ${index}`" 
            :colorKey="key" 
            :index="index"
            />
        </div> -->
        <br/>
        <button @click="handleAddColorPicker">+</button>
        <button @click="testColorPicker2">Testi</button>
    </div>



    <div>
        <p>colorPalette2 trial</p>
         <!-- <div v-for="(value, key, index) in colorPalette" :key="index" v-show="value">
            <ColorPickerInput 
            :title="index === 0 ? 'Main color' : `Color ${index}`" 
            :colorKey="key" 
            :index="index"
            />
        </div> -->
        <div v-for="(colorObject, index ) in colorPalette2" :key="index" v-show="colorPalette2[index].show">
            <ColorPickerInput 
            :index="index"
            />
        </div>
    </div>

</template>

<style>
input {
  width: 58px; 
  border: none;
  border-bottom: 1px solid #000000;
  outline: none;
  padding: 2px;
  
}

.p-colorpicker-preview {
  width: 20px !important;
  height: 20px !important; 
  border-radius: 4px !important;
  border: 1px solid #ccc !important; 
  margin-right: 6px;
}
</style>

