<script setup>
import ColorPickerInput from './ColorPickerInput.vue';
import { palette, updateColor, updateShow } from '@/colorStore';

// TODO: change logic to display colorpickers 1...9

const handleAddColorPicker = () => {
    // Find empty color slot
    const emptySlotIndex = Object.keys(palette).find(
        index => palette[index].color === ''
    );

    if (emptySlotIndex) {
        updateColor(emptySlotIndex, '#ffffff');
        updateShow(emptySlotIndex, true);
        // console.log('empty slot index:',emptySlotIndex);
    } 
    else {
        alert("You can't add more than 8 colors!");
    }
    // for (const color in palette){
    //     console.log(`${color}: ${palette[color].color}`);
    // }
};

</script>
<template>
    <div>
        <p>Choose colors for the pattern</p>
        <div v-for="(colorObject, index ) in palette" 
        :key="index" 
        v-show="palette[index].show"        
        >
            <ColorPickerInput 
            :index="index"
            />
        </div>
    </div>
    <div class="add-container">
        <button @click="handleAddColorPicker">
            <img src="/icons/add.svg" alt="Add" class="icon"/>
        </button>
    </div>
</template>

<style>


input[type="color"] {
  -webkit-appearance: none; /* Remove default styles in WebKit browsers */
  -moz-appearance: none; /* Remove default styles in Firefox */
  appearance: none;
  border: none;
  background: none;
  width: 25px;
  height: 25px;
  padding: 0;
  cursor: pointer;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border-radius: 20px;
}

.p-colorpicker-preview {
  width: 20px !important;
  height: 20px !important; 
  border-radius: 4px !important;
  border: 1px solid #ccc !important; 
  margin-right: 6px;
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

.add-container{
    margin-top: 20px;
}
</style>

