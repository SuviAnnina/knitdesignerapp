<script setup>
import ColorPickerInput from './ColorPickerInput.vue';
import { colorPalette, updateColor} from '@/colorPalette';

const maxColors = 8;
console.log(colorPalette[0].color);

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
        <p>colorPalette trial</p>
        <div v-for="(colorObject, index ) in colorPalette" :key="index" v-show="colorPalette[index].show">
            <ColorPickerInput 
            :index="index"
            />
        </div>
        <button @click="handleAddColorPicker">+</button>
        <button @click="testColorPicker2">Testi</button>
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

