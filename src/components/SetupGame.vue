<script>
import API_URL, { endpoints } from '../constants';
import { useQuizStore } from '../stores/quiz';
import { storeToRefs } from 'pinia';

export default {
  async setup() {
    const quizStore = useQuizStore();
    const { categoryId, isPlaying, questionsAmount } = storeToRefs(quizStore);

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

    return {
      trivia_categories,
      categoryId,
      isPlaying,
      questionsAmount,
      startPlaying,
      resetGame
    }
  }
}
</script>

<template>
  <div class="nes-container with-title">
    <p class="title">Setup Game</p>

    <div class="nes-field">
      <label for="category-selector">Select a Category</label>
      <div class="nes-select">
        <select name="category" id="category-selector" v-model="categoryId" :disabled="isPlaying">
          <option
            v-for="(category, index) in trivia_categories"
            :value="category.id"
            :key="index"
          >{{ category.name }}</option>
        </select>
      </div>
    </div>

    <div class="nes-field">
      <label for="question-amount">Number of Questions</label>
      <input type="number" min="0" max="100" v-model="questionsAmount" id="question-amount" class="nes-input" :disabled="isPlaying">
    </div>

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