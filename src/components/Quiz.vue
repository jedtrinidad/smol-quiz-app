<script>
import { storeToRefs } from "pinia";
import { useQuizStore } from "../stores/quiz"
import API_URL, { endpoints } from '../constants';
import { ref } from "vue";
import Question from "./Question.vue";

export default {
  async setup() {
    const quizStore = useQuizStore();
    const { isPlaying } = storeToRefs(quizStore);

    const currentQuestionIndex = ref(1);
    const currentQuestion = ref(null);

    const fetchQuestions = async (categoryId, amount) => {
      try {
        let response = await fetch(`${API_URL}/${endpoints.QUIZ}?amount=${amount}&category=${categoryId}`);
        let { results } = await response.json();
        currentQuestion.value = results[0];
      }
      catch (error) {
        throw error;
      }
    };

    quizStore.$subscribe(async (mutation, state) => {
      if (mutation.storeId === "quiz") {
        currentQuestion.value = null;
        if (state.isPlaying === true) {
          await fetchQuestions(state.categoryId, 10);
        }
      }
    });
    return {
      isPlaying,
      currentQuestion,
      currentQuestionIndex
    };
  },
  components: { Question }
}
</script>

<template>
  <div class="nes-container with-title" v-if="isPlaying">
    <p class="title">Question # {{ currentQuestionIndex }}</p>
    <Question
      :questionObject="currentQuestion"
    />
  </div>
</template>

<style scoped>
.nes-container {
  margin-top: 100px;
}
</style>