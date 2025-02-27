<script setup>
import { ref, watch, defineProps } from "vue";
import { updateColor, setColorEmpty, colorPalette, updateShow } from '@/colorPalette';

// TODO: input checker

 const props = defineProps({
    index: Number
});

const color = ref(colorPalette[props.index].color);

watch(color, (newColor) => {
    console.log("vanha väri: ", colorPalette[props.index].color);
    updateColor(props.index, newColor);
    console.log("uusi väri: ", colorPalette[props.index].color)
});

const handleDeleteColorPicker = (index) => {
    setColorEmpty(index);
    updateShow(index, false);
    console.log("poistetulta indeksipaikalta väritsekki, pitäs olla tyhjä: ", colorPalette[index].color);
}
</script>

<template>
    <div>
    index: {{ index }}
        <input type="color" v-model="color"/>
<!--         <input v-model.lazy="color" v-tooltip="'Enter hex code without #'" placeholder="123456"/>
 -->        <button @click="handleDeleteColorPicker(index)" >X</button>
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