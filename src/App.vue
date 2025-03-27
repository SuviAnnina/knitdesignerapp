<script setup>
import YarnManager from './components/YarnManager.vue';
import P5Grid from './components/P5Grid.vue';
import { onMounted, onUnmounted } from "vue";
import PatternImage from './components/PatternImage.vue';
import KnitModel from './components/KnitModel.vue';

const handleBeforeUnload = (event) => {
  event.preventDefault();
  event.returnValue = "";
};

onMounted(() => {
  window.addEventListener("beforeunload", handleBeforeUnload);
});

onUnmounted(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});
</script>

<template>
  <div>
    <br/>
    <br/>
    <div class="container">
      <YarnManager />
      <P5Grid />
      <div id="lookies">
        <PatternImage />
        <KnitModel />
      </div>
    </div>
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

.container {
  display: flex;
  justify-content: center; /* Center them horizontally */
  align-items: flex-start; /* Align them to the top */
  gap: 20px; /* Space between components */
}
</style>
