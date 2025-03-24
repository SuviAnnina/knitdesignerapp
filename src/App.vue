<script setup>
import YarnManager from './components/YarnManager.vue';
import P5Grid from './components/P5Grid.vue';
import { onMounted, onUnmounted } from "vue";
import PatternImage from './components/PatternImage.vue';

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
    <YarnManager />
    <br/>
    <br/>
    <div class="container">
      <P5Grid />
    </div>
  </div>
</template>

<!-- <PatternImage /> -->
 
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
