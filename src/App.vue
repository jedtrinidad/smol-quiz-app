<script setup>
import { onErrorCaptured, ref } from 'vue';
import SetupGame from './components/SetupGame.vue';
import Game from './components/Game.vue';
import { useQuizStore } from './stores/quiz';
import { useScoresStore } from './stores/scores';
import { storeToRefs } from 'pinia';

const quizStore = useQuizStore();
const scoresStore = useScoresStore();
const { isPlaying } = storeToRefs(quizStore);
const { scores } = storeToRefs(scoresStore);

const error = ref(null);
onErrorCaptured(e => {
  error.value = e;
  return true
});
</script>

<template>
  <h1 class="nes-text">smol quiz app</h1>
  <img class="nes-avatar is-large" src="./assets/logo.png" style="image-rendering: pixelated;" />

  <Suspense>
    <template #default>
      <div>
        <div class="container">
          <Game v-if="isPlaying"/>
        </div>
        <div class="container">
          <SetupGame />

          <div class="nes-table-responsive">
            <table class="nes-table is-centered is-bordered">
              <thead>
                <th>Score</th>
                <th>Time</th>
              </thead>
              <tbody>
                <tr v-for="score in scores">
                  <td>{{ score.score }}/{{ score.amount }}</td>
                  <td>{{ score.timestamp }}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
</style>