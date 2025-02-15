<script setup>
import ColorPicker from 'primevue/colorpicker';
import { ref, defineEmits, watch } from "vue";

const mainColor = ref('#ffffff');
const color1 = ref('#ff0000');

const emit = defineEmits(["update-colors"]);
const emitColorChange = () => {
    console.log("YarnManager.vue is attempting to emit colors", mainColor.value, color1.value);
    emit('update-colors', { mainColor: mainColor.value, color1: color1.value });
};

watch([mainColor, color1], () => {
    emitColorChange();
});
</script>
<template>
    <div>
        <p>Pick colors!</p>
        Background: <ColorPicker v-model="mainColor" @input="emitColorChange"/> valittu: {{ mainColor }} <br />
       
        Accent: <ColorPicker v-model="color1" @input="emitColorChange"/>


    </div>
</template>

<style>
</style>

