<script setup>
import { onErrorCaptured, ref } from 'vue';
import SetupGame from './components/SetupGame.vue';
import Game from './components/Game.vue';
import ScoreDialog from './components/ScoreDialog.vue';
import { useQuizStore } from './stores/quiz';
import { storeToRefs } from 'pinia';

const quizStore = useQuizStore();
const { isPlaying } = storeToRefs(quizStore);

const error = ref(null);
onErrorCaptured(e => {
  error.value = e;
  return true
});
</script>

<template>
  <h1 class="nes-text text-is-centered">smol quiz app</h1>
  <img class="nes-avatar is-large" id="logo" src="./assets/logo.png" style="image-rendering: pixelated;" />

  <Suspense>
    <template #default>
      <div>
        <div class="container">
          <Transition name="fade">
            <Game v-if="isPlaying"/>
            <ScoreDialog v-else/>
          </Transition>
        </div>
        <div class="container">
          <SetupGame v-if="!isPlaying"/>
        </div>
      </div>
    </template>
    <template #fallback>
      <div class="container">
        <div v-if="error" class="nes-container">{{ error }}</div>
        <h3 v-else class="nes-text">Loading...</h3>
      </div>
    </template>
  </Suspense>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

#app {
  margin-top: 0.5em;
  margin-left: 1.5em;
  margin-right: 1.5em;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.text-is-centered {
  text-align: center;
}

#logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>