<script setup>
import { ref, watch, defineProps } from "vue";
import { updateColor, setColorEmpty, colorPalette, updateShow, selectedColorIndex, changeSelectedColor } from '@/colorStore';

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

const handleSelectedColor = (index) => {
    console.log('default(1)/old selected color index : ', selectedColorIndex.value);
    console.log('clicked index: ',index);
    changeSelectedColor(index);
    console.log('updated selected color index: ', selectedColorIndex.value);
} 
</script>

<template>
    <div 
    class="clickable-div"
    @click="handleSelectedColor(index)"
    >
        {{ index === 0 ? 'Main Color' : 'Color' }}
        <input type="color" v-model.lazy="color"/>
<!--         <input v-model.lazy="color" placeholder="123456"/> -->        
        <button @click="handleDeleteColorPicker(index)" v-if="index !== 0" >
            <img src="/icons/delete.svg" alt="Delete" class="icon"/>
        </button>
        <button @click="handleSelectedColor(index)">
            <img src="/icons/select.svg" alt="Select" class="icon"/>
        </button>
    </div>
</template>

<style>
.clickable-div{
    cursor:pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.clickable-div:hover{
    background-color: rgb(226, 232, 228);
}

.clickable-div:active{
    background-color: rgb(136, 159, 152);
}

.icon {
  width: 23px;
  height: 23px;
}

button {
  all: unset; /* Removes all default styles */
  display: inline-block; /* Keeps it behaving like a button */
  cursor: pointer; /* Ensures it still looks clickable */
  width: 25px; 
  height: 25px;
}
</style>