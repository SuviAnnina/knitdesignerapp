<script setup>
import ColorPicker from 'primevue/colorpicker';
import { ref, defineEmits, watch } from "vue";

const mainColor = ref('#ffffff');
const color1 = ref('#ff0000');

const emit = defineEmits(["update-colors"]);
const emitColorChange = () => {
   // console.log("YarnManager.vue is attempting to emit colors", mainColor.value, color1.value);
    emit('update-colors', { mainColor: mainColor.value, color1: color1.value });
};

watch([mainColor, color1], () => {
    emitColorChange();
});

// TODO: add option for user to add colors

</script>
<template>
    <div>
        <p>Pick colors!</p>
        Background: <ColorPicker v-model="mainColor" @input="emitColorChange"/>
        <input v-model="mainColor" v-tooltip="'You can enter hex code with or without #'" placeholder="123456" />
        <br />
       
        Color 1:  <ColorPicker v-model="color1" @input="emitColorChange"/>
        <input v-model="color1" v-tooltip="'You can enter hex code with or without #'" placeholder="123456"/>

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

/* Style the ColorPicker button to be more rectangular */
.p-colorpicker-preview {
  width: 20px !important;
  height: 20px !important; 
  border-radius: 4px !important;
  border: 1px solid #ccc !important; 
  margin-right: 6px;
}
</style>

