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
    const currentAnswer = ref(null);
    const currentQuestion = ref(null);
    const score = ref(0);

    let shuffler = (arr, n) => {
      for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
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
          _temp.correct_answer = prp.correct_answer;
          _temp.options = [...prp.incorrect_answers, prp.correct_answer]
          _temp.type = prp.type;

          _temp.options = shuffler(_temp.options, _temp.options.length);

          return _temp;
        })

        currentQuestion.value = questions.value.pop();
      }
      else {
        questions.value = [];
      }
    })

    const answerQuestion = () => {
      currentQuestion.value = questions.value.pop();
      currentAnswer.value = currentQuestion.value.options[0];

      if (currentQuestion.value.correct_answer === currentAnswer.value) {
        score.value++;
      }

      if (questions.value.length === 0) {
        isPlaying.value = false;
      }
    };

    return { isPlaying, score, currentQuestion, currentAnswer, answerQuestion }
  }
}
</script>

<template>
  <div v-if="isPlaying" class="nes-container with-title">
    <p class="title">Score:{{ score }}</p>
    <!-- Body -->
    <div v-if="currentQuestion !== null">
      <div v-html="currentQuestion.question"></div>
      <ul class="answers-list">
        <li v-for="answers in currentQuestion.options">
          <label>
            <input
              type="radio"
              class="nes-radio"
              name="answer"
              id="answer"
              :value="answers"
              v-model="currentAnswer"
            />
            <span v-html="answers"></span>
          </label>
        </li>
      </ul>
      <button class="nes-btn" @click="answerQuestion">ANSWER</button>
    </div>
    <p v-else>Waiting for Questions...</p>
  </div>

  <div class="nes-container is-dark" v-else>
    <p>Setup Your Game First!</p>
  </div>
</template>

<style scoped>
.nes-container {
  min-width: 600px;
}
.answers-list {
  list-style-type: none;
}
</style>