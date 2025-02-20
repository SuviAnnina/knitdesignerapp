<script setup>
import ColorPicker from 'primevue/colorpicker';
import { ref, watch, defineProps } from "vue";
import { colorPalette } from '@/colorPalette';
import { updateColor } from '@/colorPalette';

// TODO: input checker

 const props = defineProps({
    title: String,
    colorKey: String
});

const color = ref(colorPalette[props.colorKey]); // refin sisälle väri mikä renderöidään alkuun

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
    {{ title }} 
        <ColorPicker v-model="color" />
        <input v-model="color" v-tooltip="'Enter hex code without #'" placeholder="123456"/>
</template>

<style>
</style>