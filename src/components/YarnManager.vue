<script setup>
import ColorPickerInput from './ColorPickerInput.vue';
import { colorPalette, updateColor } from '@/colorPalette';

const maxColors = 8;

const handleAddColorPicker = () => {
    // Find the first empty color slot
    const emptySlotKey = Object.keys(colorPalette).find(
        key => colorPalette[key] === ''
    );

    if (emptySlotKey) {
        // Reuse the empty slot
        updateColor(emptySlotKey, 'ffffff');
    } else {
        // Check if all 8 color slots are filled
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
         <div v-for="(value, key, index) in colorPalette" :key="index" v-show="value">
            <ColorPickerInput 
            :title="index === 0 ? 'Main color' : `Color ${index}`" 
            :colorKey="key" 
            :index="index"
            />
        </div>
        <br/>
        <button @click="handleAddColorPicker">+</button>
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

