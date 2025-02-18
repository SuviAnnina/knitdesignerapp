<template>
  <div>
    <YarnManager :mainColor="mainColor" :color1="color1" @update-colors="updateColors" />
 <br/><br/>
    <P5Grid :mainColor="mainColor" :color1="color1" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import YarnManager from './components/YarnManager.vue';
import P5Grid from './components/P5Grid.vue';

const mainColor = ref('#ffffff');
const color1 = ref('#ff0000');

const updateColors = (newColors) => {
 // console.log('updateColors function received: ', newColors);
  mainColor.value = newColors.mainColor;
  color1.value = newColors.color1;
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
