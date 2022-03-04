<script>
import API_URL, { endpoints } from '../constants';
import { useQuizStore } from '../stores/quiz';
import { storeToRefs } from 'pinia';

export default {
  async setup() {
    const quizStore = useQuizStore();
    const { categoryId, isPlaying } = storeToRefs(quizStore);

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

    return {
      trivia_categories,
      categoryId,
      isPlaying,
      startPlaying
    }
  }
}
</script>

<template>
  <div class="nes-container with-title">
    <p class="title">Select Category</p>
    <div class="nes-select">
      <select name="category" id="category-selector" v-model="categoryId" :disabled="isPlaying">
        <option
          v-for="(category, index) in trivia_categories"
          :value="category.id"
          :key="index"
        >{{ category.name }}</option>
      </select>
    </div>
    <button class="nes-btn is-primary" @click="startPlaying">PLAY</button>
  </div>
</template>

<style scoped>
.nes-container {
  text-align: start;
  margin-top: 8em;
}
.nes-select {
  margin-bottom: 20px;
}
</style>