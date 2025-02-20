<script setup>
import YarnManager from './components/YarnManager.vue';
import P5Grid from './components/P5Grid.vue';

/* colorPalette.consoleLogColor();
colorPalette.updateColor("mainColor1", "red");
colorPalette.consoleLogColor();
colorPalette.setColorEmpty("mainColor1");
colorPalette.consoleLogColor();  */

</script>

<template>
  <div>
    <YarnManager />
    <br/>
    <br/>
    <P5Grid />
  </div>
</template>


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
