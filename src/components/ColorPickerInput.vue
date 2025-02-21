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

const color = ref(colorPalette[props.colorKey]);

const handleDeleteColorPicker = (colorKey) => {
    // console.log("Attempting to delete a colorpicker");
    // console.log('received colorkey: ',colorKey);
    setColorEmpty(colorKey);
    //console.log('should be empty: ',colorPalette[colorKey]);
}

watch(color, () => {
    //console.log('colorpalette original mainColor, should be #ba9cba: ',colorPalette.mainColor);
    //console.log('colorpalette original color1: ', colorPalette.color1);
    //console.log('colorKey should be "mainColor" or "color": ',props.colorKey);
    //console.log('color.value, should be hex code: ',color.value);
    //console.log('props colorKey, should be "mainColor": ', props.colorKey);
    updateColor(props.colorKey, color.value);
    //console.log('colorpalette updated mainColor: ',colorPalette.mainColor);
    //console.log('colorpalette updated color1: ', colorPalette.color1);
});

</script>

<template>
    <div>
    title: {{ title }}, index: {{ index }}, colorkey: {{ colorKey }}
        <ColorPicker v-model="color" />
        <input v-model="color" v-tooltip="'Enter hex code without #'" placeholder="123456"/>
        <button @click="handleDeleteColorPicker(colorKey)" >X</button>
    </div>
</template>

<style>
.p-tooltip {
  background-color: #ffffff; /* Dark background */
  border-radius: 8px; /* Rounded corners */
  padding: 8px 12px; /* Padding inside tooltip */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}
</style>