<script setup>
import { onErrorCaptured, ref } from 'vue';
import SetupGame from './components/SetupGame.vue';

const error = ref(null);
onErrorCaptured(e => {
  error.value = e;
  return true
});
</script>

<template>
  <h1 class="nes-text">smol quiz app</h1>
  <img class="nes-avatar is-large" src="./assets/logo.png" style="image-rendering: pixelated;">

  <div class="container">
    <Suspense>
      <SetupGame/>
      <template #fallback>
        <div v-if="error" class="nes-container">{{ error }}</div>
        <h3 v-else class="nes-text">Loading...</h3>
      </template>
    </Suspense>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

#app {
  margin-top: 0.5em;
  margin-left: 1.5em;
  margin-right: 1.5em;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>