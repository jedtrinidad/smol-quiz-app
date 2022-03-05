<script>
import { storeToRefs } from "pinia"
import { useQuizStore } from "../stores/quiz"

export default {
  setup() {
    const quizStore = useQuizStore();
    const { isPlaying, categoryId, questionsAmount } = storeToRefs(quizStore);

    return { isPlaying, categoryId, questionsAmount }
  }
}
</script>

<template>
  <div class="nes-container with-title" v-if="isPlaying">
    <p class="title">Quiz</p>
  </div>
  <div class="nes-container is-dark" v-else>
    <p>Setup Your Game First!</p>
  </div>
</template>

<style scoped>
.nes-container {
  margin-top: 1.5em;
}
</style>