<script>
import { storeToRefs } from "pinia"
import { ref } from "vue";
import API_URL, { endpoints } from "../constants";
import { useQuizStore } from "../stores/quiz"

export default {
  async setup() {
    const quizStore = useQuizStore();
    const { isPlaying, categoryId, questionsAmount } = storeToRefs(quizStore);
    const questions = ref([]);
    const questionsIndex = ref(0);

    let getQuestions = async () => {
      try {
        let response = await fetch(`${API_URL}/${endpoints.QUIZ}?category=${categoryId.value}&amount=${questionsAmount.value}`)
        let { results } = await response.json();

        return results;
      } catch (error) {
        throw error;
      }
    };

    quizStore.$subscribe(async (mutation, state) => {
      if (state.isPlaying) {
        let _hold = await getQuestions();
        questions.value = _hold.map(prp => {
          let _temp = new Object();
          _temp.category = prp.category;
          _temp.question = prp.question;
          _temp.difficulty = prp.difficulty;
          _temp.options = [...prp.incorrect_answers, prp.correct_answer]
          _temp.type = prp.type;

          return _temp;
        })
      }
      else {
        questions.value = [];
      }
    })

    return { isPlaying, categoryId, questions, questionsIndex, questionsAmount }
  }
}
</script>

<template>
  <div class="nes-container with-title" v-if="isPlaying">
    <p class="title" v-if="questions.length > 0">Question {{ questionsIndex + 1 }} / {{ questionsAmount }}</p>
    <p class="title" v-else>Quiz</p>
    <!-- Body -->
    <p v-if="questions.length > 0">
      {{ questions[questionsIndex].question }}
      <label v-for="answers in questions[questionsIndex].options">
        <input type="radio" class="nes-radio" name="answer" id="answer" :value="answers">
        <span>{{ answers }}</span>
      </label>
    </p>
    <p v-else>Waiting for Questions...</p>
  </div>
  <div class="nes-container is-dark" v-else>
    <p>Setup Your Game First!</p>
  </div>
</template>

<style scoped>
.nes-container {
  margin-top: 2.5em;
}
</style>