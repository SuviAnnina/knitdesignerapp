<script setup>
import ColorPicker from 'primevue/colorpicker';
import { ref, watch, defineProps } from "vue";
import { colorPalette, updateColor, setColorEmpty } from '@/colorPalette';

// TODO: input checker

 const props = defineProps({
    title: String,
    colorKey: String,
    index: Number
});

// const color = ref(colorPalette[props.colorKey]);
const color = ref(colorPalette[props.colorKey]);

// Watches changes to the wanted hex color code in global obj colorPalette, 
// updates local color variable if wanted hex color code is changed elsewhere in the app
watch(
  () => colorPalette[props.colorKey],
  (newColor) => {
    if (color.value !== newColor) {
     color.value = newColor;
    }
  }
);

// Watches changes to local color variable and updates colorPalette when local color variable changes
watch(color, (newColor) => {
  if (colorPalette[props.colorKey] !== newColor) {
    updateColor(props.colorKey, newColor);
  }
});

const handleDeleteColorPicker = (colorKey) => {
    // console.log("Attempting to delete a colorpicker");
    // console.log('received colorkey: ',colorKey);
    setColorEmpty(colorKey);
    //console.log('should be empty: ',colorPalette[colorKey]);
}
</script>

<template>
    <div>
    title: {{ title }}, index: {{ index }}, colorkey: {{ colorKey }}
        <ColorPicker v-model="color" />
        <input v-model.lazy="color" v-tooltip="'Enter hex code without #'" placeholder="123456"/>
        <button @click="handleDeleteColorPicker(colorKey)" >X</button>
    </div>
</template>

<style>
.p-tooltip {
  background-color: #ffffff; 
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>