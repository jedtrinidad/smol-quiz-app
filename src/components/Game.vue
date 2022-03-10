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

    const currentAnswer = ref(null);

    let shuffler = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i],arr[j]] = [arr[j],arr[i]];
      }

      return arr;
    };

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

          _temp.options = shuffler(_temp.options);

          return _temp;
        })
      }
      else {
        questions.value = [];
      }
    })

    return { isPlaying, categoryId, questions, questionsIndex, questionsAmount, currentAnswer }
  }
}
</script>

<template>
  <div class="nes-container with-title" v-if="isPlaying">
    <p class="title" v-if="questions.length > 0">Question {{ questionsIndex + 1 }} / {{ questionsAmount }}</p>
    <p class="title" v-else>Quiz</p>
    <!-- Body -->
    <p v-if="questions.length > 0">
      <div v-html="questions[questionsIndex].question"></div>
      <label v-for="answers in questions[questionsIndex].options">
        <input type="radio" class="nes-radio" name="answer" id="answer" :value="answers" v-model="currentAnswer">
        <span v-html="answers"></span>
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
  max-width: 600px;
}
</style>