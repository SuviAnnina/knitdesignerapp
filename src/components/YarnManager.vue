<script setup>
import ColorPickerInput from './ColorPickerInput.vue';
import { colorPalette, updateColor } from '@/colorPalette';
import { ref } from 'vue';

const colorNumber = ref(2);

const handleAddColor = () => {
    console.log("yay");
    updateColor(`color${colorNumber.value}`, "ffffff");
    colorNumber.value++;
}

</script>
<template>
    <div>
        <p>Pick colors!</p>
        <!-- <ColorPickerInput title="Background" colorKey="mainColor"/>
        <br/>
        <ColorPickerInput title="Color 1" colorKey="color1"/>
        <br/> -->
        <button @click="handleAddColor">+</button>
        <br/>
        <br/>
        <br/>
        <br/>
        <p>Testing array looping with vue loop..</p>
         <div v-for="(value, key, index) in colorPalette" :key="index">
            <ColorPickerInput 
            v-show="value" 
            :title="index === 0 ? 'Main color' : `Color ${index}`" 
            :colorKey="key" />
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

