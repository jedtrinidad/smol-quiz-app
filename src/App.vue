<script setup>
import { onErrorCaptured, ref } from 'vue';
import CategorySelector from './components/CategorySelector.vue';

const error = ref(null);
onErrorCaptured(e => {
  error.value = e;
  return true
});

const categorySelectedHandler = (id) => {
  console.log(id)
};
</script>

<template>
  <h1 class="nes-text">smol quiz app</h1>
  <img class="nes-avatar is-large" src="./assets/logo.png" style="image-rendering: pixelated;">

  <Suspense>
    <template #default>
      <CategorySelector @category-selected="categorySelectedHandler"/>
    </template>
    <template #fallback>
      <div v-if="error" class="nes-container">{{ error }}</div>
      <h3 v-else class="nes-text">Loading...</h3>
    </template>
  </Suspense>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

#app {
  text-align: center;
  margin-top: 0.5em;
  margin-left: 1.5em;
  margin-right: 1.5em;
}
</style>