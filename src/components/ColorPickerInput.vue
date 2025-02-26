<script setup>
import ColorPicker from 'primevue/colorpicker';
import { ref, watch, defineProps } from "vue";
import { updateColor, setColorEmpty, colorPalette2 } from '@/colorPalette';
// importtaa colorpalette takas jos tarvii mennä bäkkii

// TODO: input checker

 const props = defineProps({
    // title: String,
    // colorKey: String,
    index: Number
});

// const color = ref(colorPalette[props.colorKey]);
const color = ref(colorPalette2[props.index].color);

// Watches changes to the wanted hex color code in global obj colorPalette, 
// updates local color variable if wanted hex color code is changed elsewhere in the app
// watch(
//   () => colorPalette[props.colorKey],
//   (newColor) => {
//     if (color.value !== newColor) {
//      color.value = newColor;
//     }
//   }
// );
// watch(
//   () => colorPalette2[props.index].color,
//   (newColor) => {
//     if (color.value !== newColor) {
//      color.value = newColor;
//     }
//   }
// );

// Watches changes to local color variable and updates colorPalette when local color variable changes
// watch(color, (newColor) => {
//   if (colorPalette[props.colorKey] !== newColor) {
//     updateColor(props.colorKey, newColor);
//   }
// });
watch(color, (newColor) => {
//   if (colorPalette2[props.index].color !== newColor) {
    console.log("vanha väri: ", colorPalette2[props.index].color);
    updateColor(props.index, newColor);
    console.log("uusi väri: ", colorPalette2[props.index].color)
//    }
});

const handleDeleteColorPicker = (index) => {
    // console.log("Attempting to delete a colorpicker");
    // console.log('received colorkey: ',colorKey);
    setColorEmpty(index);
    //console.log('should be empty: ',colorPalette[colorKey]);
    console.log("poistetulta indeksipaikalta väritsekki, pitäs olla tyhjä: ", colorPalette2[index].color);
}
</script>

<template>
    <!-- <div>
    title: {{ title }}, index: {{ index }}, colorkey: {{ colorKey }}
        <ColorPicker v-model="color" />
        <input v-model.lazy="color" v-tooltip="'Enter hex code without #'" placeholder="123456"/>
        <button @click="handleDeleteColorPicker(colorKey)" >X</button>
        <button>Select</button>
    </div> -->
    <div>
    index: {{ index }}
        <ColorPicker v-model="color" />
        <input v-model.lazy="color" v-tooltip="'Enter hex code without #'" placeholder="123456"/>
        <button @click="handleDeleteColorPicker(index)" >X</button>
        <button>Select</button>
    </div>
</template>

<style>
.p-tooltip {
  background-color: #ffffff; 
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>