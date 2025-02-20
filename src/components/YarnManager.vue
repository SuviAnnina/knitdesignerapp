<script setup>
import ColorPickerInput from './ColorPickerInput.vue';
//import { colorPalette } from '@/colorPalette';

/* const createColorId = () => {

} */



// TODO: add option for user to add colors

</script>
<template>
    <div>
        <p>Pick colors!</p>
        <ColorPickerInput title="Background" colorKey="mainColor"/>
        <br/>
        <ColorPickerInput title="Color 1" colorKey="color1"/>
    </div>
</template>

<style>
input {
  width: 55px; 
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

