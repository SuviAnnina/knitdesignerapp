<script setup>
import ColorPickerInput from './ColorPickerInput.vue';
import { colorPalette, updateColor, updateShow } from '@/colorPalette';

const handleAddColorPicker = () => {
    // Find empty color slot
    const emptySlotIndex = Object.keys(colorPalette).find(
        index => colorPalette[index].color === ''
    );
    // console.log('empty slot key? ', emptySlotKey);

    if (emptySlotIndex) {
        // console.log('found empty, attempting to update to white')
        updateColor(emptySlotIndex, '#ffffff');
        // console.log('after uodate should be white ffff..: ', colorPalette[emptySlotIndex].color)
        updateShow(emptySlotIndex, true);
        console.log('empty slot index:',emptySlotIndex);
    } 
    else {
        alert("You can't add more than 8 colors!");
    }
    for (const color in colorPalette){
        console.log(`${color}: ${colorPalette[color].color}`);
    }
};

</script>
<template>
    <div>
        <p>colorPalette trial</p>
        <div v-for="(colorObject, index ) in colorPalette" 
        :key="index" 
        v-show="colorPalette[index].show"        
        >
            <ColorPickerInput 
            :index="index"
            />
        </div>
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

