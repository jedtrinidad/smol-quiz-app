<script setup>
import API_URL, { endpoints } from '../constants';
import { useQuizStore } from '../stores/quiz';
import { storeToRefs } from 'pinia';
import CategorySelector from './form/CategorySelector.vue';
import QuestionAmountInput from './form/QuestionAmountInput.vue';

const quizStore = useQuizStore();
const { isPlaying } = storeToRefs(quizStore);

const { trivia_categories } = await fetch(`${API_URL}/${endpoints.CATEGORY}`)
  .then(data => {
    return data.json()
  })
  .catch(e => {
    throw e
  })

const startPlaying = () => {
  quizStore.$patch((state) => {
    state.isPlaying = true
  });
};

const resetGame = () => {
  quizStore.$patch((state) => {
    state.isPlaying = false
    state.score = 0;
  });
};
</script>

<template>
  <div class="nes-container with-title">
    <p class="title">Setup Game</p>

    <CategorySelector :categories="trivia_categories" :disabled="isPlaying"/>

    <QuestionAmountInput :disabled="isPlaying" />

    <div class="button-group">
      <button class="nes-btn" :class="[isPlaying ? 'is-disabled' : 'is-primary']" @click="startPlaying">PLAY</button>
      <button class="nes-btn is-danger" v-if="isPlaying" @click="resetGame">RESET</button>
    </div>
  </div>
</template>

<style scoped>
.nes-container {
  text-align: start;
  margin-top: 8em;
  margin-bottom: 2.5em;
}
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>