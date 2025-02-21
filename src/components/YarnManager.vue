<script setup>
import ColorPickerInput from './ColorPickerInput.vue';
import { colorPalette, updateColor } from '@/colorPalette';
import { ref } from 'vue';

const colorNumber = ref(2);

const handleAddColorPicker = () => {
    updateColor(`color${colorNumber.value}`, "ffffff");
    colorNumber.value++;
 
    for (const color in colorPalette){
        console.log(`${color}: ${colorPalette[color]}`);
    }
}

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

